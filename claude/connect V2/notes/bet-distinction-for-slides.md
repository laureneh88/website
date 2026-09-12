# Portfolio framing to preserve for slides

Decision recorded September 12, 2026: retain Discover as the big bet and Connect with a purpose as the medium bet. They share the activation goal but address different barriers. Do not frame both as “show users more capabilities.” The tactical bet remains undecided.

## Overview slide: short descriptions

**Big — Discover | 1–2 months**
Help users recognize a useful possibility through interactive capability demonstrations, then make it easy to try it themselves.

**Medium — Connect with a purpose | approximately 2 weeks**
Use a quiet first-login tip to introduce a dedicated Connectors sidebar entry. After existing authorization, offer four concrete actions for the connected app; execute only the action the user selects.

## The distinction

| | Discover | Connect with a purpose |
|---|---|---|
| Barrier hypothesis | Users do not recognize the breadth of Claude’s capabilities or know what to try. | Connection setup has an uncertain payoff, and users must invent a task after granting access. |
| Mechanism | Demonstrate possibilities and support exploration. | Offer immediately relevant next actions after connection, removing the need to invent a first task. |
| First value | Recognize a possibility, then try it. | Get a useful result from personal information. |
| Placement hypothesis | Persistent optional entry for exploration. | Dedicated Connectors sidebar destination, introduced by a small dismissible new-user tip. |
| Leading signals | Demo-to-try progression; meaningful use of the demonstrated capability. | Completed first connected task; connector reuse on a later day. |
| Ultimate outcome | Week-4 retention. | Week-4 retention. |

Be candid: there is overlap in feature adoption and user education. These are distinct mechanisms, not unrelated ideas. Avoid stacking two competing promotional cards on the homepage. The prototypes are separate presentations of each experiment, not a recommendation to show both simultaneously.

## Medium bet: implementation boundary

The two-week estimate assumes existing connector eligibility checks, authorization, tool execution, and experimentation infrastructure can be reused. Validate with engineering; this is an estimate, not a commitment. The card alone is a small change. The complete medium bet includes preserving connector state through authentication, presenting relevant actions on return, executing the selected task, error/empty-result handling, instrumentation, QA, and rollout behind a flag.

Keep Google’s existing permission flow unchanged. Connecting alone does not request account exploration. Show a four-option action menu on return; selecting an action requests that bounded task. Follow existing permission and action-confirmation rules. Do not require all three apps to be connected to receive value. Respect organization availability and admin settings.

For an initial production test, one connector can validate the mechanism; broaden only if the existing abstractions make all three feasible within the timebox. If those assumptions fail, reduce scope rather than promise a two-week three-connector launch.

## Measurement

Randomize eligible new users before showing the offer. Compare the existing journey with the outcome-led connection offer. Evaluate all assigned eligible users, not just people who successfully connect. Predefine eligibility, experiment window, and meaningful task completion with analytics.

- Primary outcome: Week-4 retention, using the assignment’s agreed activity definition.
- Leading measures: successful first connected task within seven days of assignment; connector use on a later day within fourteen days.
- Diagnostic funnel: offer shown → app selected → authorization started → authorization succeeded → action menu shown → action selected → task requested → useful result delivered → follow-up or reuse.
- Guardrails: first-chat abandonment, failed/empty results, latency, disconnects, user complaints, and incremental inference cost. Monitor paid conversion where relevant without treating it as the only activation outcome.

Connection rate by itself is insufficient. Tool execution succeeding is also not proof the output was useful; use follow-up actions and sampled feedback to interpret task-completion signals. Choose sample size and detectable effect from actual baseline data. Two weeks describes implementation, not the time needed to observe Week-4 retention.

## Current prototype limitations

All accounts, documents, emails, calendar events, and responses are simulated. Gmail reproduces the recorded sequence with a sample account. Calendar and Drive jump to clearly labeled example results; their permission screens are intentionally not invented. Drive requires choosing a sample document before summarizing it. No actual account access, sending, scheduling, or live model response occurs.

## Reference

Google connector capabilities: https://support.claude.com/en/articles/10166901-use-google-workspace-connectors

## Latest interaction decision

September 12 revision: this experience must occupy its own Connectors sidebar destination, not the Discover/home-card position. The first-login tip is small, dismissible, and disappears when the user starts typing. After Gmail connection, show: Summarize my unread emails; Help me reply to an email; Draft an email for me to review; Find upcoming deadlines. No inbox scan occurs automatically. Calendar and Drive have corresponding menus, with unrecorded authorization omitted in the prototype. The tip is session-only in this mock; production dismissal should persist per user.
