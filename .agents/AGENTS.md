# Project Overview

This project is a Gradle-based multi-module project primarily written in Kotlin. It serves as a starter template emphasizing centralized and maintainable build configurations. It leverages custom Gradle plugins for build logic, manages dependencies via `gradle/libs.versions.toml`, and includes distinct modules for an application (`app`), documentation (`docs`), and various examples (`example-java`, `example-kotlin`, `example-spring`).

The main application, located in the `app` module, is a basic command-line application that initializes and logs startup information.

# Building and Running

The project utilizes the Gradle wrapper for all build and run operations.

*   **Build the entire project:**
    ```bash
    ./gradlew build
    ```
*   **Run the main application module (`app`):**
    ```bash
    ./gradlew app:run
    ```
*   **View available Gradle tasks and help:**
    ```bash
    ./gradlew help
    ```
*   **Ensure `gradlew` script is executable (if needed):**
    ```bash
    git update-index --chmod=+x gradlew
    ```

# Development Conventions

The project enforces code quality and maintainability through the integration of several Gradle plugins and practices:

*   **Code Formatting:** Uses **Spotless** for consistent code formatting across the codebase.
*   **Static Code Analysis (Kotlin):** Employs **Detekt** to analyze Kotlin code for potential issues and style violations.
*   **Static Code Analysis (Java):** Utilizes **Spotbugs** for static analysis to identify common programming errors in Java code.
*   **Code Coverage:** Integrates **Kover** for measuring and reporting Kotlin code coverage.
*   **Dependency Management:** Centralizes dependency version management using `gradle/libs.versions.toml` and includes various dependency analysis plugins to ensure effective and healthy dependency graphs.