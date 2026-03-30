# Security Policy

## Supported versions

Use this table as the current support policy for security fixes.

| Version | Supported |
| --- | --- |
| 1.2.x | Yes |
| < 1.2 | No |
| `master` | Best effort |

## Reporting a vulnerability

If you believe you have found a security vulnerability in snappycart, please report it privately by emailing:

**node@idncod.com**

### Please do not

- do not open a public GitHub Issue for security vulnerabilities
- do not post exploit details in Discussions, PR comments, or social media
- do not disclose the issue publicly before a fix is ready

### Preferred reporting method

Use GitHub private vulnerability reporting for this repository if it is enabled.

If it is not enabled or unavailable, send your report to:

**node@idncod.com**

Please include:

- a short summary of the issue
- affected version or commit
- reproduction steps
- impact assessment
- proof of concept, if relevant
- suggested fix, if you have one

## What to include in your report

A strong report usually includes:

- where the issue exists
- how it can be reproduced
- what the real security impact is
- whether the issue affects package consumers, contributors, or the demo or docs apps
- any known workaround

## What happens next

Once a valid report is received, the maintainer will aim to:

1. acknowledge the report
2. reproduce and validate the issue
3. work on a fix
4. coordinate disclosure after a patch is ready

Response and remediation times may vary depending on severity, maintainer availability, and release timing.

## Scope guidance

Security-sensitive reports may include issues such as:

- dependency or supply-chain risks directly affecting this repository
- unsafe package behavior that could expose consumers to security issues
- credential leaks, tokens, or secrets committed to the repository
- CI workflow or release pipeline vulnerabilities
- documentation examples that encourage unsafe usage patterns

Non-security bugs, feature requests, styling problems, and general test failures should be reported through normal GitHub Issues instead.