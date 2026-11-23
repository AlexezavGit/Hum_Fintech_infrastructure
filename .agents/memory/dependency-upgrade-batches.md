---
name: Dependency upgrade batches
description: Lessons for safely upgrading interdependent JavaScript tooling.
---

When upgrading JavaScript tooling, check peer dependencies and update required companion packages in the same install batch. Scope overrides to the affected version range when different major versions of a transitive package must coexist. When a stale transitive range blocks reuse of a safe direct dependency, npm can reference the root dependency's spec with an override alias such as `$esbuild`.

**Why:** Package installation rejected sequential Vite upgrades when its esbuild and plugin peers were too old; an overly broad override forced an incompatible picomatch major into Vite, while a package-scoped esbuild override left the stale nested version locked.

**How to apply:** Inspect peer ranges before installing, group compatible toolchain updates, and verify the resolved tree after using a scoped or root-reference override.
