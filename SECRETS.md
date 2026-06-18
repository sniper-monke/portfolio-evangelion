# SECRETS & EASTER EGGS — NERV ARCHIVE

> Keep this file updated as new secrets are added.

---

## Keyboard Shortcuts

| Trigger | Effect | Achievement |
|---|---|---|
| `` ` `` / `~` | Opens/close the hidden terminal | `TERMINAL_OPENED` |
| `Escape` | Closes all overlays, pages & terminal | — |
| `↑↑↓↓←→←→ba` (Konami code) | SEELE overlay with looping audio | `KONAMI_UNLOCK` |
| Type `congratulations` | Congratulations overlay (Rei + Komm süsser Tod) | `SECRET_EVA` |
| Type `rei` | Fake MAGI error popup | — |
| Type `asuka` | Angel detected popup | — |
| Type `shinji` | (silent unlock) | `SECRET_EVA` |

---

## NERV Logo

- Click the NERV logo **10 times** → Third Impact overlay + EVA theme
- Counter shown in the title attribute

---

## Hidden Terminal (`~`)

Press `` ` `` or `~` to open. Available commands:

| Command | Effect | Achievement |
|---|---|---|
| `help` | List commands | — |
| `whoami` | Identify pilot | — |
| `whoareyou` | Interactive Rei Ayanami dialogue (Y/N responses) | `WHO_ARE_YOU` |
| `projects` / `ls projects` | List ops | — |
| `skills` | Sync ratio | — |
| `contact` | Contact info | — |
| `resume` | Download resume PDF | — |
| `magi` | MAGI login screen | `MAGI_LOGIN` |
| `eva` | Sync EVA unit | `SECRET_EVA` |
| `thirdimpact` | Trigger Third Impact | `THIRD_IMPACT` |
| `seele` | SEELE override | `KONAMI_UNLOCK` |
| `instrumentality` | Hidden essay page | `INSTRUMENTALITY` |
| `dog` | Pen-Pen page | `DOG_PAGE` |
| `congrats` / `congratulations` | Congratulations overlay | — |
| `open github` | Open GitHub profile | — |
| `clear` | Clear terminal | — |
| `exit` | Close terminal | — |

---

## Random Events (NERV mode only)

Every ~65s, one of these fires randomly:
- **Angel detected** → red popup, `ANGEL_SIGHTED`
- **Fake error** → yellow popup

---

## Page Secrets

- **Shinji's chair**: faint text at bottom-right corner: `// [shinji's chair: still here]`
- **TERMINATE SESSION** button at page footer → ending animation
- **MODE toggle** in nav switches between NERV and Professional themes

---

## Achievement Reference

| # | ID | How to Unlock |
|---|---|---|
| SEC-01 | `KONAMI_UNLOCK` | Konami code or terminal `seele` |
| SEC-02 | `THIRD_IMPACT` | NERV logo 10× or terminal `thirdimpact` |
| SEC-03 | `TERMINAL_OPENED` | Open terminal with `` ` `` |
| SEC-04 | `MAGI_LOGIN` | Terminal `magi` |
| SEC-05 | `INSTRUMENTALITY` | Terminal `instrumentality` |
| SEC-06 | `DOG_PAGE` | Terminal `dog` |
| SEC-07 | `ANGEL_SIGHTED` | Random angel event |
| SEC-08 | `SECRET_EVA` | Type `shinji` or `congratulations` or terminal `eva` |
| SEC-09 | `WHO_ARE_YOU` | Terminal `whoareyou` — complete the Rei dialogue |

---

## localStorage Keys

| Key | Type | Purpose |
|---|---|---|
| `nerv_boot_done_v1` | boolean | Skip boot on revisit |
| `nerv_pro_mode` | boolean | Theme preference |
| `nerv_sound` | boolean | Sound toggle |
| `nerv_unlocked` | string[] | Unlocked achievements |

---

## Audio Reference

| Sound | File | Used When |
|---|---|---|
| beep | `power-disconnect.mp3` | Terminal toggle, mode/sound toggle |
| click | `laser.mp3` | Button clicks |
| warn | `at-field.mp3` | Angel detected |
| alert | `laser-explosion.mp3` | Angel detected (layered) |
| boot | `decisive-battle.mp3` | Boot sequence |
| theme | `evangelion-theme.mp3` | Third Impact, SEELE |
| congrats | YouTube `oyFQVZ2h0V8` | Congratulations overlay |
