# AUDIENCE CARD · AC-04
## 🏭 Production Manager — Contoso Industries

> **In one line:** Owns a line that runs three shifts. Judges every tool by one question: does it stop the line, or keep it running?

---

## The business

| | |
|---|---|
| **Business unit** | Contoso Industries — 22 plants, discrete manufacturing, ~24,000 employees |
| **Their remit** | Two production lines, 3 shifts, ~180 people across shift supervisors and operators |
| **Measured on** | OEE *(overall equipment effectiveness)* · scrap rate · on-time delivery · **recordable safety incidents** · overtime spend |
| **Reports to** | Plant Manager → Regional Operations |
| **Career path** | Started as an operator 16 years ago. Ran maintenance for four. **Knows the equipment better than the engineers who specified it.** |

## Where they work

| | |
|---|---|
| **Physically** | On the floor. Hearing protection, safety glasses, sometimes gloves. |
| **Devices** | A shared plant-floor terminal · a ruggedized tablet that works about half the time · a personal-issue phone with **poor reception inside the building** |
| **When they read** | At shift change, or in the 20 minutes before the morning production meeting |

## What they know

| | |
|---|---|
| ✅ **Fluent — assume it, don't explain it** | Line balancing · changeover · preventive maintenance schedules · the MES · lockout/tagout · root-cause analysis · reading a control chart |
| 🟣 **Comfortable** | HMI and PLC screens at an operator level · pulling data out of the MES · Excel for real analysis |
| 🟡 **Shaky** | Anything on the corporate IT side of the network · SharePoint · why some sites are blocked from the plant floor |
| ❌ **Never done** | Written code · used a terminal · touched a repo |

> ⚠️ **They are technical — in a different direction than the content author.** They will not be impressed by IT terminology and will not be confused by complexity. What loses them is content that assumes the plant network behaves like the office network.

## Tools and access

| Tool | Access | Note |
|---|---|---|
| **Microsoft 365 Copilot** | Standard user | **Office network only.** Not reachable from the plant-floor terminal. |
| MES | Supervisor role | Their home system, all shift |
| Maintenance / CMMS | Full for their lines | |
| Quality system | Read + raise a nonconformance | |
| Teams, Outlook | Standard | Checked at shift change, not during |
| ERP | Read-only | Requests go to planning |

### The network floor

| | |
|---|---|
| 🔒 **The plant floor network is segmented from corporate IT** | This is a **security control**, not an oversight — and it will not be changed for a productivity tool |
| ❌ Cannot install anything on a plant-floor terminal | Locked image, change-controlled |
| ❌ Cannot connect a new system to line data without an OT change request | 6–8 weeks, engineering-owned |
| ✅ **Can** authorize overtime and stop the line on safety grounds | Immediately, no approval |

> **This is the sharpest line on the card.** Content that says *"connect Copilot to your production data"* is not ambitious. **It describes something that cannot happen** without a change request this reader does not own.

## What they're trying to do

| | |
|---|---|
| **Stated goal** | *"Give me shift handover and the morning meeting summary without me typing it at 5am."* |
| **The real job** | Protect uptime. Every metric they own is downstream of the line running. |
| **Do not care about** | Anything that costs line time to learn, or that only works from a desk they're never at |

## How they learn

| | |
|---|---|
| **Learns by** | Doing it once at shift change, with someone watching |
| **Will actually finish** | A laminated job aid at the terminal · a video **under two minutes** |
| ⚠️ **Video constraint** | **It must work with the sound off.** The floor is loud and they wear hearing protection. Narration-only video is unusable here. |
| **Will not finish** | Anything needing a desk, a quiet room, or a separate login |
| **Time budget for learning** | 10–15 minutes at shift change. That is the entire window. |
| **Passes it on by** | Showing the night supervisor, or leaving a job aid where the work happens |
| ⭐ **Best format** | A job aid that lives at the terminal, or a silent-captioned clip under two minutes |
| ⚠️ **Worst format** | A blog post. An email. Anything read away from the line and forgotten before they reach it. |

> **The format question for this reader:** does it exist where the work happens? Content that requires them to remember it from somewhere else has already failed.

## Constraints

| | |
|---|---|
| ⏱️ **Time** | 10–15 minutes at shift change. That's the window. |
| 📵 **Connectivity** | Poor inside the building. **Assume it fails, not that it's slow.** |
| 🧤 **Physical** | Gloves, noise, standing. Nothing requiring careful typing or a fine touch. |
| ✋ **Approval** | Owns overtime and line stoppage. Anything touching OT systems or capex goes to the Plant Manager and engineering. |
| 👷 **Pass-it-on** | Shift supervisors have to be able to use it too — **including on nights, when nobody is around to ask** |

## Risk reality

| | |
|---|---|
| **Regulatory exposure** | High — OSHA, plus customer quality audits and traceability requirements |
| **Tolerance for a confident guess** | **Low.** A wrong number in a handover propagates through three shifts before anyone catches it. |
| **Worst realistic outcome** | A safety incident, a quality escape reaching a customer, an unplanned line stop |

> **The inversion that trips up content written for other audiences:** *"try it and see what happens"* is fine in an office and unacceptable here. Experimentation is something that happens in a planned window, not during a run.

## What makes them bounce

| | |
|---|---|
| Assuming the plant floor and the office are the same network | Instant credibility loss |
| *"Just install"* or *"just enable"* anything | |
| Examples set in an office | They'll assume it wasn't written for manufacturing |
| Steps requiring more than one hand | |
| No offline or degraded-mode answer | |
| Anything implying they should experiment during a run | |
| IT terminology used to sound authoritative | They've been sold to before |

## What they expect to find

| | |
|:---:|---|
| 1 | Whether it works from where they actually stand |
| 2 | What it does when the connection drops |
| 3 | How long it takes to learn — in minutes, honestly |
| 4 | Whether a night-shift supervisor can use it unsupervised |
| 5 | What it will not do, so they stop wondering |

## Vocabulary

| Use | Not |
|---|---|
| shift handover | knowledge transfer |
| the line | the production process |
| from the plant-floor terminal | from your workstation |
| this needs an OT change request | work with IT to connect it |
| when the connection drops | in the event of network unavailability |
| **it won't reach line data today** | *(vagueness)* — say it, they'll trust you more |

**Assume without gloss:** OEE · changeover · scrap · lockout/tagout · MES · takt · nonconformance · PM *(preventive maintenance)* · escape

## Reading context

Twenty minutes before the morning production meeting, or at shift change with people waiting to talk to them. **If it doesn't work from where they're standing, they will not try it twice.**
