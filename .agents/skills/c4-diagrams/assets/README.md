# c4-diagrams assets

How to render the examples:

- Mermaid (mmdc):

  ```bash
  # From the repository root
  mmdc -i assets/mermaid-example.mmd -o /tmp/mermaid.png
  ```

- PlantUML (plantuml):

  ```bash
  # From the repository root
  plantuml -tpng assets/plantuml-example.puml
  ```

Recommendations:

- Install mmdc (mermaid-cli) and plantuml locally if you want to render diagrams.
- For PlantUML, use the C4-PlantUML library (`https://github.com/plantuml-stdlib/C4-PlantUML`).
