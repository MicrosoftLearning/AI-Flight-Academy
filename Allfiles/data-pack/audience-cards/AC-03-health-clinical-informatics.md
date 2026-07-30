# AUDIENCE CARD · AC-03
## 🏥 Clinical Informatics Manager — Contoso Health

> **In one line:** Sits between IT and clinicians, trusted by neither by default. Technical enough to read your architecture, and will.

---

## The business

| | |
|---|---|
| **Business unit** | Contoso Health — 14 hospitals, 60 clinics, ~31,000 employees |
| **Their remit** | Clinical systems adoption across 3 hospitals — the translation layer between IT and the people delivering care |
| **Measured on** | Clinician adoption · documentation burden · time-to-resolution on clinical system issues · **zero patient-safety events attributable to a system change** |
| **Reports to** | CMIO (dotted line to CIO) |
| **Career path** | Registered nurse for nine years, then informatics. **Has stood at a bedside.** This shapes everything about how they read. |

## Where they work

| | |
|---|---|
| **Physically** | An office they're rarely in. Mostly on units, at nurses' stations, in workrooms. |
| **Devices** | Managed laptop, workstation-on-wheels, badge-tap everywhere |
| **When they read** | In fragments. Then properly, at 9pm, at home. |

## What they know

| | |
|---|---|
| ✅ **Fluent — assume it, don't explain it** | Clinical workflow · EHR configuration · order sets · HL7/FHIR at a working level · PHI rules cold · what makes a clinician abandon a tool in 30 seconds |
| 🟣 **Comfortable** | Reading JSON and API docs · integration diagrams · basic SQL · pushing back on a vendor's architecture |
| 🟡 **Shaky** | Writing code from scratch · infrastructure and networking |
| ❌ **Never done** | Shipped software · used git in anger |

> ⚠️ **They will read your technical detail and find the gap.** Content that hand-waves integration or data flow loses them immediately — but content pitched at a developer misses that their real question is always *"what happens at the bedside when this is wrong?"*

## Tools and access

| Tool | Access | Note |
|---|---|---|
| **Microsoft 365 Copilot** | Standard user + clinical pilot cohort | Pilot on 2 units, 6 weeks in |
| EHR | Build/config in a non-production environment | **Production changes go through clinical governance** |
| Integration engine | Read + test | |
| Reporting / analytics | Power user | |
| PHI | Access under minimum-necessary rules, **fully audited** | Every access is logged and reviewed |

### The governance floor

| | |
|---|---|
| ❌ Cannot put anything in front of a clinician without **Clinical Governance Committee** sign-off | Meets every two weeks |
| ❌ Cannot move PHI into a system that isn't on the approved-flow list | |
| ✅ **Can** halt a rollout on patient-safety grounds, unilaterally, immediately | |

## What they're trying to do

| | |
|---|---|
| **Stated goal** | *"Show me Copilot saves documentation time without a single path where PHI ends up somewhere it shouldn't."* |
| **The real job** | Reduce documentation burden — the single biggest driver of clinician burnout and turnover at Contoso Health — without introducing a safety or privacy event |
| **Do not care about** | General productivity framing. Clinicians don't have "productivity," they have patients and a shift that ends. |

## How they learn

| | |
|---|---|
| **Learns by** | Reading in fragments during the day, then one deep pass at 9pm |
| **Will actually finish** | A layered artifact — a short front they can act on, a deep back they can verify |
| **Will not finish** | Anything needing twenty uninterrupted minutes during a shift |
| **Time budget for learning** | Theirs: one evening. **The clinicians they serve: 90 seconds.** |
| **Passes it on by** | Handing clinicians a card at the workstation, or 90 seconds at a huddle |
| ⭐ **Best format** | **Two artifacts, not one** — the deep version for them, the 90-second version for the care team |
| ⚠️ **Worst format** | A single monolithic document that serves neither |

> **The format question for this reader:** they are not the end of the chain. Content that can't be split into something a clinician will actually absorb dies at their desk, no matter how good it is.

## Constraints

| | |
|---|---|
| ⏱️ **Their time** | Fragments during the day, one real block at night |
| ⏱️ **Clinician time** | **Under 90 seconds.** Anything they pass down must survive that. |
| ✋ **Approval** | Clinical Governance Committee, biweekly. Missing a cycle costs two weeks. |
| 🔐 **PHI** | Minimum-necessary, audited, and non-negotiable |
| 👥 **Their audience** | Nurses, physicians, and techs — three groups with different tolerance for change |

## Risk reality

| | |
|---|---|
| **Regulatory exposure** | **Extreme** — HIPAA, plus accreditation and state reporting |
| **Tolerance for a confident guess** | **Zero.** A confident wrong answer at a bedside is a patient-safety event. |
| **Worst realistic outcome** | A PHI disclosure, a documentation error that reaches a chart, a safety event with their name on the change record |

> **The inversion that trips up content written for other audiences:** *"paste the details in and Copilot will summarize it"* is a perfectly good instruction in Retail and a **reportable breach** here. Content that never names what must not be pasted has failed this reader — even if every sentence in it is true.

## What makes them bounce

| | |
|---|---|
| Any example that would contain PHI if a real person tried it | |
| *"Always verify AI output"* offered as the safety control | They need to know what happens when someone doesn't |
| Productivity language applied to clinical work | Reads as someone who's never been on a unit |
| Ignoring that nurses, physicians, and techs are different audiences | |
| Anything requiring a clinician to leave their workflow to use it | It will not be adopted, full stop |
| No mention of what happens during downtime | Downtime procedures are a real, frequent thing |

## What they expect to find

| | |
|:---:|---|
| 1 | Exactly what data enters the system, and what must never |
| 2 | Where it goes, who can see it, how long it lives |
| 3 | What it looks like when the tool is wrong — and who catches it |
| 4 | The clinician-facing version, short enough to actually hand over |
| 5 | What breaks during a downtime event |

## Vocabulary

| Use | Not |
|---|---|
| documentation burden | paperwork |
| at the point of care | in the field |
| the clinician / the care team | the user · the end user |
| never enter identifiable patient information | be careful with sensitive data |
| approved data flow | secure integration |
| this has not been through Clinical Governance | *(omitting it)* — say it, they'll respect it |

**Assume without gloss:** PHI · minimum necessary · order set · downtime procedure · CMIO · charting · care team · point of care

## Reading context

Read in three fragments between meetings on a unit, then properly at 9pm at home. **The 9pm pass is where they decide.** By then they are tired, and anything that requires goodwill to interpret will not get it.
