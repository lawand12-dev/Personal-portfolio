# Repository Agent Instructions

Follow the workspace Git commit rule and commit-writing system on every turn that modifies files:
- See [.agents/rules/git-commit.md](.agents/rules/git-commit.md) and [docs/GIT-WORKFLOW.md](docs/GIT-WORKFLOW.md).
- After any file is created, edited, or deleted in the workspace, always end your final response with a ready-to-run `git add <exact paths>` and `git commit -m "..."` command block following Conventional Commits (`<type>(<scope>): <imperative lowercase subject>`, max 72 chars, no trailing period, with `-m "- ..."` body bullets for multi-file or architectural changes).
- Never stage blindly with `git add .` and never run `git commit` unless explicitly requested.
