# Connect with a purpose

## Portfolio overview

**Medium bet · approximately two weeks for a scoped MVP**
Introduce the right workspace, then turn connection into first use with relevant actions immediately after setup.

## Slide 1 — Make the next step obvious

**Opportunity**
Users may not recognize which integrations are relevant to them, and connection setup still leaves them needing to invent a first task.

**Hypothesis**
A relevant workspace suggestion followed by concrete post-connection actions will increase first connected-task completion and repeat use, contributing to Week-4 retention.

**Experience**
A small, dismissible sidebar nudge leads to Connectors. Suggest a workspace when there is a reliable signal; otherwise ask users to choose Google Workspace or Microsoft 365. After existing authorization, Claude offers four useful next actions. No account exploration starts until an action is selected.

*Show: sidebar entry → relevant workspace → connect → action menu.*

## Slide 2 — Personalize the starting point; let users correct it

**Google Workspace**
A Gmail signup address can prioritize Google. Show Gmail, Calendar, and Drive, with actions specific to the selected connector.

**Microsoft 365**
Use verified work-tenant or organization configuration to prioritize Microsoft 365. One connector covers Outlook, Calendar, OneDrive, SharePoint, and Teams. Show actions supported by the user's enabled tools.

**Unknown**
A custom domain such as @spotify.com does not tell us which workspace the user wants to connect. Show two clear choices: Google Workspace or Microsoft 365. Remember the user's selection and always allow Change workspace.

**Scope**
Reuse existing authorization and tool execution. Add provider selection, a one-time nudge, action menus, and instrumentation. Prototype all three variants; validate whether the two-week production MVP can include both ecosystems. Microsoft eligibility and tenant consent add dependencies, so phase rollout if needed.

*Presenter note:* A personal @outlook.com, @hotmail.com, or @live.com address is not eligible for the documented Microsoft 365 connector. A signup provider is a relevance hint, not proof of workplace, access, or consent. Do not infer a company's workspace from its name, silently scan DNS, or equate signing in with Microsoft with eligibility for a work connector.

## Slide 3 — Measure useful adoption

**Experiment**
Randomize eligible new users with no connected apps before exposure. Compare the existing experience with the workspace-aware entry plus action menu. Stratify by recommended workspace and unknown status. Respect organization eligibility and available tools.

**Leading outcome**
Percentage of assigned users completing a connected task within seven days.

**Lasting value**
Connector use on a later day within fourteen days; Week-4 retention as the ultimate outcome.

**Funnel**
Nudge shown → Connectors opened → workspace confirmed → authorization completed → action selected → task completed.

**Diagnostics and guardrails**
Workspace correction rate; unknown-choice completion; authorization or admin-blocked abandonment; first-chat abandonment; empty or failed results; disconnects; latency; incremental cost.

**Decision**
Expand if completed tasks and repeat use improve without material guardrail harm. Connection rate alone is insufficient. Report all assigned eligible users, not only those who successfully connect.

*Presenter note:* The combined experiment tests the package, not the isolated causal effect of personalization. Use a later ablation or adequately powered factorial test to separate contributions. Two weeks estimates implementation, not the retention readout period.

## Distinction from Discover

Discover helps users recognize what they could do. Connect with a purpose removes the gap between setting up an integration and using it. The medium bet adds context relevance and setup-to-first-use progression; the big bet focuses on capability exploration.

## Prototype and production boundaries

The prototype dropdown selects Google Workspace, Microsoft 365, or Unknown. It replaces the old result/error dropdown and is a presentation control, not a production setting. Google retains the recorded Gmail authorization sequence. Unrecorded Calendar, Drive, and Microsoft authorization is omitted and identified as simulated. Microsoft assumes an eligible work account with required admin setup complete. The demo's Microsoft action menus use reading and analysis; drafting in the chat does not imply permission to save or send through Outlook. Production must filter menus by enabled tools and preserve existing permission and confirmation controls.

## Sources checked September 12, 2026

- Google: https://support.claude.com/en/articles/10166901-use-google-workspace-connectors
- Microsoft: https://support.claude.com/en/articles/15183774-connect-to-microsoft-365
