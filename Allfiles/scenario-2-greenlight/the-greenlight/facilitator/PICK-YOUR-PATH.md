# PICK YOUR PATH
## The Greenlight · who's actually in the room

**Three paths, one set of rungs.** Everyone seats a council, convenes it, and greenlights a plan — but your tool determines HOW you build the room and WHERE your finish line is.

> **These are not the seats.** The seats are the four Contoso audiences the *content* is written for (`../../data-pack/audience-cards/`). These profiles describe **you**, the person building the council.

---

## The rules that come first

| # | Rule | Why |
|:---:|---|---|
| 1 | **Level is tool fluency, not seniority** | A Principal PM who's never opened VS Code is Base. A vendor two months in who lives in a terminal is Advanced. Nothing maps to your title. |
| 2 | **Higher isn't automatically more points** | Deck slide 4: *"the rubric rewards the right tool for the job."* A three-seat Cowork council that genuinely disagrees beats a VS Code harness whose seats are interchangeable. |
| 3 | **Everyone climbs the same rungs** | Seat → debate → plan → greenlight → automate → … Only the tool and the finish line differ. |
| 4 | **Reaching YOUR finish line = shipping the assignment** | Not the top of the table — *your* finish line. Altitude beyond it is a modest bonus. |

---

## The rungs — what every path climbs

| Rung | Feature | ⚡ Skill it teaches |
|:---:|---|---|
| **v0** | Solo critic — provided, already scored | — |
| **v1** | **Seat the council** — ≥ 2 audiences, each nominates outcome-protecting criteria | Multi-persona conditioning · anchors · grounding |
| **v2** | **The debate** — evidence + source + confidence; seats argue; abstain when unsure | Orchestration · adversarial cross-talk · calibration |
| **v3** | **Transformation plan + greenlight** — assets from the failures; re-score on the same criteria | Eval → generation · closing the loop |
| **v4** | **Automate** — convene on a new subject unattended; the plan lands where people are | Triggers · unattended runs · routing |
| **v5** | **Swap the roster** — someone runs the room with their own audiences | Reusable multi-agent artifacts |
| **v6** | **Coverage matrix** — every piece × every seat, ranked | Orchestration at scale · gap analysis |
| **v7** | **The greenlight gate** — nothing ships until every seat clears | Consensus gating · publish-time integration |

---

## Pick yours in 30 seconds

| | **🟢 BASE** | **🔵 BUILDER** | **🟣 ADVANCED** |
|---|---|---|---|
| **Build in** | Cowork | Copilot Studio | Scout · GitHub Copilot · VS Code |
| **You'd say** | *"I use Copilot every day, I've never built anything with it."* | *"I've built a flow. I want something my team can reuse."* | *"Just let me have a repo."* |
| **Comfort with code** | None needed | Little to none | It's how you think |
| **Finish line** | **v4 — Automate** | **v5 — Swap the roster** | **v7 — Gate** |
| **The sentence you earn** | *"Paste a blog, the room tells us what to build and drops it in our channel."* | *"My teammate ran the council Monday with her own audiences."* | *"A PR went red because the plan left Manufacturing with nothing."* |
| **What'll stop you** | The blank page — seating a second audience that truly disagrees | Instruction drift across seats | Yourself — building the harness, forgetting the seats must bite |
| **Time to first result** | ~10 min | ~25 min | ~30 min |

**Still not sure?** Start at Base. Once the council disagrees, rebuilding it one level up is fast — you already solved the hard part (the seats and their criteria).

---

## How the same rung looks in three tools

| Rung | 🟢 **Cowork** | 🔵 **Copilot Studio** | 🟣 **Scout · VS Code** |
|---|---|---|---|
| **v1 Seat** | Ask Cowork to voice 2–3 seats in turn from the cards, each written into `THE-COUNCIL.md` | Each seat a knowledge-grounded topic/agent | Parallel persona agents, structured per-seat scorecards |
| **v2 Debate** | Seats "respond to what the others said"; you moderate; each cites quote + source + confidence | A synthesizer agent surfaces the conflicts | Orchestrator fans out; a judge agent diffs positions; abstain on low confidence |
| **v3 Plan + greenlight** | The room agrees the plan; re-reads each asset's spec to confirm it clears | A Responder drafts asset stubs; the classifier re-scores | Pipeline emits the plan, generates outlines, re-runs the rubric |
| **v4 Automate** | Scheduled convene → plan digest into Teams | Agent Flow on a trigger → Adaptive Card | Scheduled action or folder watcher |
| **v5 Swap** | Export the skill; someone reseats the roster | Publish; someone reseats and runs | Push repo; clone + swap `THE-COUNCIL.md` |
| **v6 Matrix** | Convene across the folder | Flow iterates the library | One command, all pieces × all seats, ranked |
| **v7 Gate** | Scheduled convene flags before publish — a soft gate | Approval flow: nothing moves until every seat passes | PR check turns red until quorum |

> **Capability is allowed to differ.** A Cowork council is three voices in one thread; a VS Code council is parallel agents with a judge and a hard gate. Both are honest answers to the same rung.

---

# 🟢 BASE · Cowork

## Pick this if
| ✔ | |
|:---:|---|
| 1 | You use Copilot every day and have never built anything with it |
| 2 | "Just install the skill" makes you nervous |
| 3 | You'd rather describe what you want than configure it |

## Who this usually is
| | |
|---|---|
| **Job families** | Content developer · PM · marketing · learning designer · support lead · business ops |
| **Your edge** | ⭐ **Knowing what different audiences actually need** — the expertise this council runs on |
| **Never done** | Written a skill · opened Copilot Studio · touched a repo |

## The build — rung by rung
| Rung | What you do | How you know it worked |
|:---:|---|---|
| **v1** | Install the Kit → `seat the council` for two audiences that disagree → `convene` on `P4` | The two seats return different verdicts on the same piece |
| **v2** | Have the seats cite a quote + source + confidence, then respond to each other | A real conflict appears on one passage, argued both ways |
| **v3** | `greenlight` — turn the failures into a per-audience plan, re-read each asset to confirm it clears | A plan with format calls, and a greenlight re-score |
| **v4** 🏁 | Scheduled convene → plan digest into a Teams channel | It ran without you and the plan landed where people are |

## Where it goes wrong
| | |
|---|---|
| ⚠️ **Sticking point** | **The blank page — a second seat that only *looks* different** |
| **What happens** | You seat two audiences, convene, and they agree on everything |
| 🧭 **Guide's move** | *"Take Retail and Compliance. One wants a 6-minute standing read; the other wants audit rigor. On P4 they must split — if they don't, the criteria aren't reading the cards."* |

## Done
| | |
|---|---|
| **Finish line** | **v4 — Automate.** *"Paste a blog, the room tells us what to build and drops it in our channel."* |
| **Bar** | ≥ 2 seats that disagree · a debate with evidence · a greenlit plan · it runs without you |
| 🎁 **The moment** | You described a room of your audiences in English and got a working council back. **You wrote no code.** |

---

# 🔵 BUILDER · Copilot Studio

## Pick this if
| ✔ | |
|:---:|---|
| 1 | You've built a Power Automate flow, or clicked around Copilot Studio |
| 2 | You think about *who else needs this* before how to build it |
| 3 | You want something you can send a link to |

## The build — rung by rung
| Rung | What you do | How you know it worked |
|:---:|---|---|
| **v1** | Each seat a knowledge-grounded agent; audience cards + style guide as sources | Two agents score `P4` differently |
| **v2** | A synthesizer agent reviews the seat scorecards and surfaces the conflicts | The synthesizer names a clash, not a compromise |
| **v3** | A Responder drafts asset stubs; the classifier re-scores them | Output has format calls + a greenlight re-score |
| **v4** | Agent Flow on a trigger → Adaptive Card into Teams | Fires unattended on new content |
| **v5** 🏁 | Publish; someone reseats the roster with their audiences and runs it | A person who wasn't at the hack runs the council |

## Where it goes wrong
| | |
|---|---|
| ⚠️ **Sticking point** | **Instruction drift across seats** — the agents blur into one voice |
| 🧭 **Guide's move** | Keep each seat's outcome in its instructions as a hard rule. Test one piece early. State "quote + source + confidence, every score" as non-negotiable. |

## Done
| | |
|---|---|
| **Finish line** | **v5 — Swap the roster.** *"My teammate ran the council Monday with her own audiences."* |
| 🎁 **The moment** | Watching someone reseat the room and get a different, correct set of verdicts |

> ### ⚠️ This level is designed to lift out
> If Copilot Studio comes out of the hack, nothing here is stranded — the rungs are tool-agnostic. Replacement path: "Cowork, deeper" (scheduled convenes + Graph tie-ins), same brief, finish at v5.

---

# 🟣 ADVANCED · Scout · GitHub Copilot · VS Code

## Pick this if
| ✔ | |
|:---:|---|
| 1 | You have VS Code open right now |
| 2 | Your instinct on "score five pieces from four points of view" was *"fan out and collect"* |
| 3 | You want the whole set ranked, with a gate |

## The build — rung by rung
| Rung | What you do | How you know it worked |
|:---:|---|---|
| **v1** | `THE-COUNCIL.md` seats → a prompt that loads each seat's card + criteria | Per-seat scorecards disagree on `P4` |
| **v2** | Orchestrator fans out to seat agents; a judge sub-agent diffs positions; abstain on low confidence | Scorecards show the same passage scored opposite, with sources |
| **v3** | A generation step emits the plan + asset outlines; re-run the rubric | Greenlight re-score passes only when the rejecting seat would now pass |
| **v4** | Scheduled action / folder watcher convenes unattended | Plan appears without a human trigger |
| **v5** | Push the repo; someone clones, swaps the roster, runs it | Another person produces the council output from your code |
| **v6** | One command: all pieces × all seats, ranked coverage dashboard | HTML/JSON dashboard of served vs. abandoned |
| **v7** 🏁 | PR check turns red until every seated audience clears threshold | A PR carrying an under-serving plan is blocked |

## Where it goes wrong
| | |
|---|---|
| ⚠️ **Sticking point** | **You** — a beautiful orchestration whose four seats return the same verdict |
| **Why it matters** | distinct_seats (weight 3) + severity_discrimination (weight 4) = 35% of your score. No architecture catches the `P4` split if the seats don't bite. |
| 🧭 **Guide's move** | Interrupt at 20 min: *"name two seats and predict their verdicts on P4. If they match, stop building and fix the seats."* |

## Done
| | |
|---|---|
| **Finish line** | **v7 — Gate.** *"A PR went red because the plan left Manufacturing with nothing."* |
| **Bar** | A repo with a working gate · a ranked coverage dashboard · P4 = REJECT-for-Retail + SHIP-for-Compliance with quoted evidence |
| 🎬 **Video bonus** | Skip ClipChamp — install **HyperFrames**, get an animated walkthrough with AI voiceover |

---

## If your team is mixed — and it will be

| | Do | Don't |
|---|---|---|
| **Start** | Seat your two audiences and their outcomes together, out loud, before anyone opens a tool | Split by level and work separately |
| **Why** | Everyone climbs the same rungs — the hard part (seats that disagree) is shared | The design falls apart if you split the seating |
| **Re-run together** | After each rung, convene and compare — same shape, deliberately | |

> 💡 **If the Cowork council and the VS Code council disagree about a piece, that's the most interesting thing that will happen to your team all day. Put it in the video.**

### The rung check
| Time | All paths | What to check |
|---|---|---|
| 0:20 | v1 done | Two seats return different verdicts on P4 |
| 0:40 | v2–v3 done | A backed conflict surfaced; plan has format calls; greenlight re-scores |
| 1:00 | v4 done | It convened without you |
| 1:25 | Path-dependent | 🟢 Recording · 🔵 Publishing + reseating · 🟣 Gate live |
