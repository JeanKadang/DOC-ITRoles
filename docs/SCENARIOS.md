# Scenario: a P1 outage moves through the org

The viewer's **🌳 Org** chart and **🔗 Graph** views show escalation lines as
nodes and edges — accurate, but abstract.
[`CROSS_DOMAIN_INTERACTIONS.md`](CROSS_DOMAIN_INTERACTIONS.md) documents the
same escalation paths as structured reference data. Neither shows what moving
through those lines actually looks like for the people in the roles.

This walks through one realistic scenario end to end, linking to the real role
definitions at each step. Every claim below is taken directly from those
roles' own **Key Responsibilities**, **Role Scope & Boundaries**, and
**Interactions with Other Roles** sections, or from
[`CROSS_DOMAIN_INTERACTIONS.md`](CROSS_DOMAIN_INTERACTIONS.md#escalation-paths) —
nothing here is invented for narrative flow.

## The scenario: a wide-scale outage

**08:41.** Three unrelated employees report the same symptom — VPN drops
within minutes of connecting — within a ten-minute window. A
[Service Desk Analyst](../Roles/service_desk/service_desk_analyst.md) is
handling the tickets individually. Their own role file names exactly this
moment: *"Recognize patterns suggesting a wider outage (multiple simultaneous
reports of the same symptom) and flag them immediately to the Service Desk
Senior Analyst or directly to the Major Incident Manager."* They flag it to
the Senior Analyst rather than escalating directly — the pattern is
suggestive, not yet confirmed.

**08:47.** The
[Service Desk Senior Analyst](../Roles/service_desk/service_desk_senior_analyst.md)
picks it up. Confirming a genuine outage before it reaches the Major Incident
Manager is explicitly their job, not a courtesy: their role file describes
them as *"the desk's first line of defense against declaring (or missing) a
major incident — confirming genuine pattern-driven outages before they reach
the Major Incident Manager."* They pull the affected-user count, the common
thread (all on the same VPN gateway), and the timing, and rule out a
coincidental cluster of unrelated tickets.

**08:53.** Confirmed. The Senior Analyst escalates to the
[Major Incident Manager](../Roles/service_management/major_incident_manager.md),
who declares a P1 and opens the incident bridge. This role's authority is
temporary and cross-cutting by design — its own scope states it *"has
temporary authority to direct any team's engineers onto a declared major
incident bridge, regardless of their normal reporting line, for the duration
of the incident."* The Major Incident Manager does not diagnose the VPN
gateway themselves — their role file is explicit that they *"do not perform
the technical remediation itself"* — they run the bridge, the timeline, and
the communication.

**08:55.** The bridge pulls in a
[Client Platform Engineer](../Roles/client_platform/client_platform_engineer.md)
to investigate the gateway's client-side behaviour. Service Desk already has
a direct escalation line here independent of the incident bridge — the
Engineer's role file lists *"Service Desk (Tier 1) on OS-level issues
requiring engineering-tier resolution"* as who escalates to them day to day.
On the bridge, the same technical relationship carries the diagnostic load:
reproducing the symptom, checking recent client config pushes, narrowing the
root cause.

**09:10.** The root cause turns out to be a misapplied network policy change,
not an attack — so this incident stays with engineering and does not trigger
the security hand-off. Had the evidence pointed the other way,
[`CROSS_DOMAIN_INTERACTIONS.md`](CROSS_DOMAIN_INTERACTIONS.md#escalation-paths)
records the branch this scenario didn't take: *"incidents identified as
security events hand off to the Security Architect."* The Major Incident
Manager's own scope names the same handoff as a standing part of the role,
not a one-off judgment call.

**09:35.** Fix confirmed, incident closed. What happens next is also on
record rather than assumed: the Major Incident Manager's role file requires
*"every major incident has a scheduled blameless post-incident review within
the agreed SLA,"* with *"a concrete corrective action list with owners and due
dates"* tracked to closure — not the incident simply ending when the symptom
stops.

## Reading this against the structural data

Every hand-off above already exists as structured relationship data —
in each role's own **Interactions with Other Roles** table, and in
[`CROSS_DOMAIN_INTERACTIONS.md`](CROSS_DOMAIN_INTERACTIONS.md#escalation-paths)'s
own summary of the major-incident path. This scenario doesn't add new facts;
it's one way of reading the facts that already exist in sequence, for anyone
who finds a graph of nodes and edges harder to hold onto than a story.
