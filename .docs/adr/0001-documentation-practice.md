# ADR-0001: Documentation practice

**Status:** Accepted  
**Date:** 2026-06-18

## Context

The project needs a documentation approach that serves three audiences from the start: end-users of the app, developers working on the codebase, and AI agents (Claude Code) operating in the repository. Without a clear convention, documentation accumulates inconsistently and future contributors — human or AI — lack context for past decisions.

## Decision

Adopt a `.docs/` directory at the project root with the following structure:

- `.docs/adr/` — Architecture Decision Records (Nygard format, sequentially numbered)
- `.docs/specs/` — Feature design specs produced during brainstorming (`YYYY-MM-DD-<topic>-design.md`)
- `.docs/dev/` — Developer documentation (setup, architecture, data schema)
- `.docs/user/` — End-user guide

Additionally:
- `CHANGELOG.md` at the project root tracks all meaningful changes in reverse-chronological order.
- `CLAUDE.md` remains the AI-agent-optimised source of truth (inline schema, commands, gotchas).
- `.docs/dev/` mirrors `CLAUDE.md` content with more narrative for human readers.

Every significant change gets a `CHANGELOG.md` entry. Every architectural decision gets an ADR.

## Consequences

- Documentation overhead on each meaningful change, but the cost is low (one CHANGELOG line minimum).
- New contributors and AI agents have a clear map of where to find context.
- ADRs accumulate over time and provide a traceable decision history.
- The `.docs/` prefix keeps documentation out of the way of `docs/` if a framework or tool ever claims that path.
