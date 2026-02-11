@file:Suppress("PackageDirectoryMismatch")

import com.profiletailors.plugin.injected
import org.gradle.api.tasks.PathSensitivity

plugins { base }

/**
 * AgentSync Gradle Plugin
 *
 * Keep AI assistant configurations synchronized across different environments. See:
 * https://dallay.github.io/agentsync/
 */
val agentsyncApply =
  tasks.register("agentsyncApply") {
    group = "toolbox"
    description = "Synchronizes AI agent configurations using AgentSync"

    val inject = injected
    val agentsDir = rootProject.file(".agents")

    // Register inputs for incremental build support
    inputs
      .dir(agentsDir)
      .optional()
      .withPropertyName("agentsDir")
      .withPathSensitivity(PathSensitivity.RELATIVE)

    doLast {
      if (!agentsDir.exists()) {
        logger.info("Skipping agentsyncApply: .agents directory not found")
        return@doLast
      }

      try {
        inject.exec.exec { commandLine("agentsync", "apply") }
        println("✓ AI agents synchronized successfully")
      } catch (e: Exception) {
        // We print a message instead of failing the build to make it optional
        println(
          "⚠️ AgentSync not found or failed. Visit https://dallay.github.io/agentsync/ to install it."
        )
      }
    }
  }

// Hook into qualityGate if it exists in the project
tasks.matching { it.name == "qualityGate" }.configureEach { dependsOn(agentsyncApply) }
