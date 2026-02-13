---
name: "❓ Question"
about: Ask a question about using or contributing to Gentleduck
title: "[Question] "
labels: question
assignees: ""
---

## Your Question
Please describe your question clearly.  
What are you unsure about? Be as specific as possible.

---

## Goal / Context
- What are you trying to achieve?  
- Why do you need this information? (e.g. fixing a bug, understanding design decisions, contributing code, using a feature in production)  

---

## Environment (if applicable)
- **OS:** [e.g. Ubuntu 22.04 / Windows 11 / macOS Sonoma]  
- **Bun version:** [e.g. 1.3.5]  
- **Gentleduck Package(s) & Version(s):**  
  - `@gentleduck/gen@X.Y.Z`  
  - `@gentleduck/query@X.Y.Z`  
  - …  

---

## Code Snippet (if relevant)
If your question involves using Gentleduck in code, please share a **minimal code snippet** or example:  

```tsx
// Example
import type { ApiRoutes } from "@gentleduck/gen/nestjs"
import { createDuckQueryClient } from "@gentleduck/query"

const client = createDuckQueryClient<ApiRoutes>({ baseURL: "/api" })
```

---

## What I’ve Tried

* List any documentation, guides, or issues you’ve already checked.
* Explain what worked and what didn’t.

---

## Additional Notes

* Add links, references, or related issues/discussions here.
* Mention if this should be turned into a feature request or bug report.
