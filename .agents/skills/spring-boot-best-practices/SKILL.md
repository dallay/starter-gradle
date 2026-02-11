---
name: spring-boot-best-practices
description: >
    Spring Boot, Kotlin, and WebFlux implementation patterns.
    Trigger: When writing any Spring Boot code, reviewing PRs, or refactoring.
    Includes: Dependency Injection, Controller design, DTOs, Error Handling, Testing.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
metadata:
    author: danvega (adapted by cvix)
    version: "1.0"
---

# Spring Boot & Kotlin Best Practices

Clean code patterns for Spring Boot applications using **Kotlin** and **WebFlux**.

> **Note**: For high-level architecture (Ports & Adapters), see the [hexagonal-architecture](../hexagonal-architecture/SKILL.md) skill.
> This skill focuses on implementation details.

## Dependency Injection

**Use Constructor Injection.** In Kotlin, this is the default and idiomatic way.

```kotlin
// ❌ Don't
@RestController
class UserController {
    @Autowired
    lateinit var userService: UserService
}

// ✅ Do
@RestController
class UserController(
    private val userService: UserService
)
```

**Why**: Immutability (`val`), testability (no reflection needed), and explicit dependencies.

## REST Controller Design

**Use `@RestController` with Coroutines.**

```kotlin
@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {

    // ✅ Use suspend functions for async operations
    @GetMapping("/{id}")
    suspend fun getUser(@PathVariable id: Long): ResponseEntity<UserResponse> {
        return userService.findById(id)
            ?.let { ResponseEntity.ok(it) }
            ?: ResponseEntity.notFound().build()
    }

    // ✅ Use Flow for streams (Server-Sent Events / JSON stream)
    @GetMapping
    fun getAllUsers(): Flow<UserResponse> {
        return userService.findAll()
    }

    // ✅ Return standard HTTP status codes
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    suspend fun createUser(@RequestBody request: CreateUserRequest): UserResponse {
        return userService.create(request)
    }
}
```

## Data Transfer Objects (DTOs)

**Use Kotlin Data Classes.**

```kotlin
// Immutable, concise, JSON-friendly
data class UserDto(
    val email: String,
    val name: String
)

data class CreateUserRequest(
    val email: String,
    val name: String
)
```

Avoid exposing `@Table` entities directly in the API. Map them to DTOs.

## Exception Handling

**Use `@RestControllerAdvice` and `ProblemDetail`.**

```kotlin
@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException::class)
    fun handleNotFound(e: ResourceNotFoundException): ProblemDetail {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.message ?: "Not found").apply {
            title = "Resource Not Found"
        }
    }
}
```

## Testing

**Use Slices for Speed.**

| Annotation | Use Case |
|------------|----------|
| `@WebFluxTest` | Reactive Controllers (mock services) |
| `@DataR2dbcTest` | R2DBC Repositories (real DB/Testcontainers) |
| `@JsonTest` | JSON serialization |

```kotlin
// ✅ Integration test for Controller only
@WebFluxTest(UserController::class)
class UserControllerTest(@Autowired val webTestClient: WebTestClient) {

    @MockkBean
    lateinit var userService: UserService

    @Test
    fun `should return user`() {
        coEvery { userService.findById(1) } returns UserResponse(...)

        webTestClient.get().uri("/api/users/1")
            .exchange()
            .expectStatus().isOk
    }
}
```

## Configuration

**Use `@ConfigurationProperties` with Kotlin Data Classes.**

```kotlin
@ConfigurationProperties(prefix = "app.mail")
data class MailProperties(
    val host: String = "smtp.example.com",
    val port: Int = 587,
    val ssl: Boolean = false
)
```

Enable with `@EnableConfigurationProperties(MailProperties::class)` in your main class or configuration.

## Package Structure

**Package by Feature** (Vertical Slicing).

```text
com.example.user/        <-- Feature
    UserController.kt
    UserService.kt       <-- Port/UseCase
    UserRepository.kt    <-- Port
    adapter/
       UserR2dbcRepository.kt
com.example.order/       <-- Feature
    OrderController.kt
```

This aligns with Hexagonal Architecture (Bounded Contexts).

## HTTP Clients

**Use Declarative Clients (`@HttpExchange`).**

See [spring-boot-4](../spring-boot-4/SKILL.md) for details.

## Observability

Use Micrometer with Coroutines context.

```kotlin
@GetMapping("/{id}")
suspend fun getUser(@PathVariable id: Long): User {
    // Context propagation works automatically with Micrometer & Reactor Context
    return userService.findById(id)
}
```
