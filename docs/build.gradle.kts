@file:Suppress("UnstableApiUsage")

import com.github.gradle.node.npm.task.NpmTask
import com.profiletailors.plugin.environment.EnvAccess
import com.profiletailors.plugin.gradle.cachedFlatMap
import com.profiletailors.plugin.gradle.cachedProvider
import com.profiletailors.plugin.spotless.SpotlessConfig
import com.profiletailors.plugin.spotless.defaultStep

plugins {
  alias(libs.plugins.com.github.node.gradle.node)
  id("com.profiletailors.check.format-base")
}

val isCI = EnvAccess.isCi(providers)
val nodeVersion = libs.versions.node.get()

val nodeDir = isolated.rootProject.projectDirectory.dir(".gradle/nodejs")

node {
  download = nodeDir.asFile.exists().not()
  version = nodeVersion
  distBaseUrl = null
  npmInstallCommand.set(if (isCI) "ci" else "install")
  workDir = nodeDir
  nodeProjectDir = file("website")
}

val isWindows = org.gradle.internal.os.OperatingSystem.current().isWindows
val npm =
  cachedProvider { tasks.npmSetup }
    .cachedFlatMap(objects) { npmSetup ->
      npmSetup.map {
        val npmExec = if (isWindows) "npm.cmd" else "bin/npm"
        it.npmDir.get().file(npmExec)
      }
    }

@Suppress("ConstPropertyName")
object StarlightConfig {
  const val starlightDist = "dist"
  const val srcDocs = "src/content/docs"
}

"website"
  .also { website ->
    val starlightdoc =
      tasks.register<NpmTask>("docStarlight") {
        group = "docs"
        description = "Generate Starlight docs"
        dependsOn(tasks.npmInstall)
        args.set(listOf("run", "build"))
      }

    tasks.register<Zip>("distZipWebsite") {
      group = "toolbox"
      description = "Zips the website dist directory"
      archiveFileName = "dist.zip"
      destinationDirectory.set(isolated.projectDirectory.dir("build/distributions"))
      from(isolated.projectDirectory.dir("${website}/${StarlightConfig.starlightDist}"))
      dependsOn(starlightdoc)
    }
  }
  .also { website ->
    spotless {
      format("prettierDocs") {
        defaultStep {
          prettier(SpotlessConfig.prettierDevDependencies)
            .npmExecutable(npm.get())
            .npmrc("${website}/.npmrc")
            .npmInstallCache()
            .configFile("${website}/.prettierrc.json5")
        }
        target(
          isolated.projectDirectory.files(
            "${website}/README.md",
            "${website}/package.json",
            "${website}/.prettierrc.json5",
          ),
          fileTree("${website}/${StarlightConfig.srcDocs}")
            .include(
              "**/*.md",
              "**/*.mdx",
              "**/*.json",
              "**/*.json5",
              "**/*.yml",
              "**/*.js",
              "**/*.mjs",
              "**/*.ts",
              "**/*.mts",
              "**/*.tsx",
              "**/*.css",
              "**/*.less",
              "**/*.scss",
            ),
        )
      }
    }
    tasks.named("spotlessPrettierDocs") { dependsOn(tasks.npmSetup) }
  }
