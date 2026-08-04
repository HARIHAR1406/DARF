```mermaid
sequenceDiagram
    User->>Auth: Login Request
    Auth->>Provider: Validate
    Provider-->>Auth: Token
    Auth-->>User: Authenticated State
```
