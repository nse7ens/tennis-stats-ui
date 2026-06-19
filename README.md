# Tennis Stats

Alternative UI for [tennisstats.be](https://tennisstats.be) — React + TypeScript + Vite SPA consuming Tennis Vlaanderen match data.

## Sections

| Section                      | Audience               | Contents                         |
| ---------------------------- | ---------------------- | -------------------------------- |
| [ADR](.docs/adr/README.md)         | Developers / AI agents | Architecture Decision Records    |
| [Specs](.docs/specs/README.md)     | Developers / AI agents | Feature design specs             |
| [Dev](.docs/dev/README.md)         | Developers             | Setup, architecture, data schema |
| [User guide](.docs/user/README.md) | End-users              | How to use the app               |

## Key files

- [`CLAUDE.md`](./CLAUDE.md) — AI-agent-optimised project context and API schema
- [`CHANGELOG.md`](./CHANGELOG.md) — reverse-chronological change log

## Documentation rules

These apply after every task — no need to be asked:

| Trigger                                                     | Action                                                                  |
| ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| Any change, no exceptions                                   | Add a `CHANGELOG.md` entry (one line minimum)                           |
| Tech or architectural decision (library, approach, pattern) | New ADR in `.docs/adr/` + update the ADR index                          |
| Component structure, data flow, or dev setup changes        | Update `.docs/dev/architecture.md` or `getting-started.md`              |
| API schema or data behaviour discovered/confirmed           | Update `CLAUDE.md` schema tables AND `.docs/dev/data-schema.md`         |
| User-facing feature added or changed                        | Update `.docs/user/README.md`                                           |
| New brainstormed feature spec                               | Save to `.docs/specs/YYYY-MM-DD-<topic>-design.md` + update specs index |
| `CLAUDE.md` itself becomes stale                            | Update it in the same commit as the code change                         |
