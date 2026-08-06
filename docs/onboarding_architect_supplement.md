# Onboarding supplement — Architect

> **Use alongside [`ONBOARDING_TEMPLATE.md`](ONBOARDING_TEMPLATE.md), not instead of it.** The base plan carries the 30/60/90 structure, the manager checklist and the check-in questions. This adds only what differs at Architect level.

Applies to the 49 roles at **Architect** level. 47 of them state a **Domain-wide** scope of influence: the standards other roles work within are set here, which makes the first 90 days as much about understanding existing commitments as about proposing new ones.

## What changes at this level

- **Authority by standard, not by instruction.** The Owns column typically covers architecture standards, reference patterns and technology selection for the domain. Those bind engineers who never report to you.
- **You inherit decisions you did not make.** Existing reference architectures, guardrails and vendor commitments all constrain what you can change and how quickly.
- **Governed By is real.** Most Architect definitions sit under the Enterprise Architect for cross-domain standards, and under Security for control requirements. Both are named in *Interactions with Other Roles*.

## 30 days — additions

- [ ] Read every reference architecture and standard the domain currently publishes, before proposing changes to any
- [ ] Meet the Enterprise Architect and any Security or DevSecOps Architect named in the role's *Interactions* table
- [ ] Understand the vendor and licensing commitments already in place — they constrain design more than most new Architects expect
- [ ] Identify the Senior Engineers who escalate to this role, and what they escalate

## 60 days — additions

- [ ] Take a design through the architecture review board, including handling the challenge
- [ ] Form a view on where the domain's standards are outdated, with evidence rather than preference
- [ ] Review a Senior Engineer's design and give feedback that improves it without taking it over

## 90 days — additions

- [ ] Own a standard or reference pattern for the domain, published and communicated
- [ ] Have a 12-month technology direction for the domain, agreed with the Chapter Lead
- [ ] Retire or consolidate at least one thing — a duplicated pattern, an unused tool, a standard nobody follows

## Common early failure modes

- **Rewriting standards before understanding why they exist.** Most look arbitrary until you find the incident or constraint behind them. Ask before replacing.
- **Designing without the Senior Engineers who will implement it.** They hold the operational detail that determines whether a design survives contact with production.
- **Treating Governed By as advisory.** Enterprise architecture and security requirements are constraints, not input. The *Out of Scope* bullets say which decisions are not yours.
- **Optimising for elegance over adoption.** A standard nobody follows is worse than a rough one everybody does, because it hides the real practice.
