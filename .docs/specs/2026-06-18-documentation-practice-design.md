# Documentation Practice Design

**Date:** 2026-06-18  
**Status:** Accepted

## Goal

Establish a sustainable, multi-audience documentation practice for the tennis-stats project from day one. Documentation must serve three audiences: end-users of the app, developers contributing to the codebase, and AI agents working in the repo.

## Structure

```
.docs/
  README.md              ← wiki home, links to all sections
  adr/
    README.md            ← ADR index table
    0001-documentation-practice.md
    0002-react-vite-typescript-stack.md
    0003-tennisstats-api-approach.md
  specs/
    README.md            ← specs index (brainstorming outputs)
  dev/
    README.md            ← developer overview
    getting-started.md   ← local setup and commands
    architecture.md      ← component map and data flow
    data-schema.md       ← tennisstats.be API schema (human-readable mirror of CLAUDE.md)
  user/
    README.md            ← end-user guide (grows with features)

CHANGELOG.md             ← root-level, updated with every meaningful change
```

## ADR Template (Nygard)

File naming: `.docs/adr/NNNN-slug.md`, numbered sequentially from `0001`.

```markdown
# ADR-NNNN: Title

**Status:** Accepted | Superseded by ADR-XXXX | Deprecated  
**Date:** YYYY-MM-DD

## Context
Why this decision needed to be made.

## Decision
What was decided.

## Consequences
What becomes easier, harder, or is now constrained.
```

Status is updated in-place when a decision is superseded.

## Rules

1. **Every significant change** → entry in `CHANGELOG.md` (what changed + why, one sentence minimum).
2. **Every architectural decision** → new ADR in `.docs/adr/`.
3. **Every brainstormed feature** → spec saved in `.docs/specs/YYYY-MM-DD-<topic>-design.md`.
4. **CLAUDE.md** stays the AI-agent-optimised source of truth; `.docs/dev/` mirrors content for human readers with more narrative.

## CHANGELOG.md Format

Reverse-chronological, grouped by date. No semver required for now.

```markdown
## YYYY-MM-DD
- **Added** short description
- **Changed** short description
- **Fixed** short description
```

## Initial ADRs to Seed

| # | Title | Status |
|---|---|---|
| 0001 | Documentation practice | Accepted |
| 0002 | React + TypeScript + Vite as tech stack | Accepted |
| 0003 | Consume tennisstats.be API directly (no proxy) | Accepted |
