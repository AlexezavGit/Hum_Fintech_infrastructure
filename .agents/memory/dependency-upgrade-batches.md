---
name: Dependency upgrade batches
description: Lessons for safely upgrading interdependent JavaScript tooling.
---

When upgrading JavaScript tooling, check peer dependencies and update required companion packages in the same install batch. Scope overrides to the affected version range when different major versions of a transitive package must coexist.

**Why:** Package installation rejected sequential Vite upgrades when its esbuild and plugin peers were too old; an overly broad override also forced an incompatible picomatch major into Vite.

**How to apply:** Inspect package peer ranges before installing, group compatible toolchain updates, and use version-qualified overrides for transitive dependencies when the dependency tree has multiple majors.
