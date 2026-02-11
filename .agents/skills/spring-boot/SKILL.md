---
name: spring-boot
description: >
  Spring Boot implementation patterns for WebFlux, R2DBC, and Kotlin.
  Includes modern Spring Boot 4/Spring Framework 7 features (HTTP Interfaces, RestTestClient).
  Trigger: When working with controllers, services, repositories, configurations, or upgrading Spring components.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
metadata:
  author: cvix (merged with danvega/skills)
  version: "3.0"
---

# Spring Boot Skill

Conventions for Spring Boot backend development using **Kotlin**, **WebFlux**, and **R2DBC**. This
skill covers the **Infrastructure Layer** of our Hexagonal Architecture.

> **Architecture Note**:
> For domain models, use cases, and overall feature organization, see
> the [hexagonal-architecture skill](../hexagonal-architecture/SKILL.md).

## Layer Context

| Layer                           | What Goes Here                                 | Spring Annotations? |
|---------------------------------|------------------------------------------------|---------------------|
| **Domain**                      | Entities, Value Objects, Repository interfaces | NO                  |
| **Application**                 | Commands, Queries, Handlers, Use Case services | NO                  |
| **Infrastructure** (this skill) | Controllers, R2DBC repos, Configs, Adapters    | YES                 |

## Modern Spring Patterns (Spring Boot 3.2+ / 4.0)

### 1. Declarative HTTP Interfaces

The **preferred way** to consume internal/external APIs (replaces `WebClient` manual setup).

```kotlin
@HttpExchange(url = "https://api.example.com", accept = ["application/json"])
interface TodoClient {
  @GetExchange("/todos")
  fun getAllTodos(): Flow<Todo> // Reactive stream support!

  @GetExchange("/todos/{id}")
  suspend fun getTodoById(@PathVariable id: Long): Todo?

  @PostExchange("/todos")
  suspend fun createTodo(@RequestBody todo: Todo): Todo
}

// Configuration
@Configuration(proxyBeanMethods = false)
@ImportHttpServices(TodoClient::class)
class HttpClientConfig
```

### 2. Resilience

Built-in resilience (replaces Spring Retry) works natively with Coroutines.

```kotlin
@Service
class ExternalApiService(private val webClient: WebClient) {
  @Retryable(maxAttempts = 4, delay = 500, multiplier = 2.0)
  suspend fun fetchData(id: String): String {
    return webClient.get().uri("/{id}", id).retrieve().awaitBody()
  }
}
```

### 3. Jackson 3 (JSON)

We use Jackson 3 (`tools.jackson.*`). Use `JsonMapper` instead of `ObjectMapper`.

```kotlin
@Service
class JsonService(private val jsonMapper: JsonMapper) {
  fun toJson(obj: Any): String = jsonMapper.writeValueAsString(obj)
  inline fun <reified T> fromJson(json: String): T = jsonMapper.readValue(json)
}
```

## Testing Patterns

### Unified Testing (`RestTestClient`)

Replaces `WebTestClient` and `MockMvc` for a unified API.

```kotlin
// Unit Test (Controller only)
@Test
fun `should get all todos`() {
  val controller = TodoController(todoService)
  val client = RestTestClient.bindToController(controller).build()

  coEvery { todoService.findAll() } returns flowOf(Todo(1, "Learn Spring"))

  client.get().uri("/api/todos").exchange()
    .expectStatus().isOk
    .expectBody().jsonPath("$[0].title").isEqualTo("Learn Spring")
}

// E2E Test (Full Server)
@Test
fun `should create todo`(@LocalServerPort port: Int) {
  val client = RestTestClient.bindToServer().baseUrl("http://localhost:$port").build()
  // ... same API
}
```

## Quick Reference & References

### Controllers & HTTP Layer

Thin HTTP adapters. No business logic.

- **[Controllers](references/controllers.md)** - `@RestController`, routing
- **[Request/Response DTOs](references/request-response-dtos.md)** - Validation, Schema annotations
- **[Swagger Standard](references/swagger-standard.md)** - OpenAPI documentation

### Persistence Layer

- **[Repositories](references/repositories.md)** - R2DBC adapters
- **[Entities & Mappers](references/entities-mappers.md)** - `@Table` entities

### Cross-Cutting

- **[Error Handling](references/error-handling.md)** - `ProblemDetail` (RFC 7807)
- **[Configuration](references/configuration.md)** - `@ConfigurationProperties`
- **[WebFlux & Coroutines](references/webflux-coroutines.md)** - Reactive patterns

## HTTP Status Codes

| Code  | Usage                        |
|-------|------------------------------|
| `200` | Successful GET/PUT           |
| `201` | Successful POST (Created)    |
| `204` | Successful DELETE            |
| `400` | Invalid input/malformed JSON |
| `404` | Resource not found           |
| `422` | Validation errors (semantic) |
| `500` | Server error                 |

## Anti-Patterns

| Anti-Pattern            | Why It's Wrong                                    |
|-------------------------|---------------------------------------------------|
| **Spring in Domain**    | Domain must be framework-agnostic                 |
| **Logic in Controller** | Controllers only delegate/translate               |
| **Exposing Entities**   | Always map to Request/Response DTOs               |
| **Blocking Code**       | NEVER block in WebFlux (use `suspend`/`Flow`)     |
| **Generic Catch**       | Catch specific exceptions, return `ProblemDetail` |

## Resources

- [Spring WebFlux Docs](https://docs.spring.io/spring-framework/reference/web/webflux.html)
- [Spring Data R2DBC](https://spring.io/projects/spring-data-r2dbc)
- [Coroutines Guide](https://kotlinlang.org/docs/coroutines-guide.html)
