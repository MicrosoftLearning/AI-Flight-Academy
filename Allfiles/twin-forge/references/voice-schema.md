# voice.md schema

`voice.md` captures how the person actually writes. Do not rely on adjectives alone. Use samples.

## 1. Source note

State where the samples came from.

Example: `Source: 10 sent emails from the last 60 days for Marcus Webb synthetic persona data.`

## 2. Verbatim samples

Quote 5-10 samples exactly. Keep punctuation, casing, dashes, greetings, signoffs, emojis, and line breaks.

Use this shape:

```md
### Sample 1 — peer update
Recipient type: peer
Context: launch narrative review

> Hey team — quick pass below.
> I tightened the customer proof point but left the risk callout in place.
> Marcus
```

Never normalize the quote. If the person writes `Thanks!`, keep `Thanks!`. If they use an em dash, keep it.

## 3. Inferred style rules

Infer rules from the samples.

Cover:

- Openers.
- Signoffs.
- Punctuation tells.
- Sentence length.
- Paragraph length.
- Use of bullets.
- Level of warmth.
- Directness.
- Register by recipient: exec, peer, customer, manager.
- How the person makes asks.
- How the person pushes back.

Good rule: `With execs, Marcus opens with the decision needed, then gives two options and a recommendation.`

Bad rule: `Marcus is professional and clear.`

## 4. Do / avoid

### Do

- Use the person's real sentence rhythm from samples.
- Preserve their normal amount of warmth.
- Match the recipient type.

### Avoid

- Adding jokes if none appear in samples.
- Over-polishing into generic corporate voice.
- Replacing the person's signoff with a default one.

## 5. Rewrite test

Include one short test prompt and a before/after rewrite to validate the style.
