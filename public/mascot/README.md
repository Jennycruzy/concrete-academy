# Concrete Academy — Mascot Assets

## The Concrete Moai

The platform mascot is the **Concrete Moai** — a stone Easter Island head in a gold/yellow business suit making a heart shape with its hands.

## Required Files

| File | Rank | Score Range | Description |
|------|------|-------------|-------------|
| `moai-master.png` | MASTER | 81–100% | Reference image — Moai in gold suit, heart hands, teal glow |
| `moai-guru.png` | GURU | 51–80% | Confident, thumbs up, bright yellow |
| `moai-navigator.png` | NAVIGATOR | 26–50% | Uncertain, scratching head, muted colors |
| `moai-newbie.png` | NEWBIE | 0–25% | Defeated, slumped, desaturated |

## CSS Filter System

Rather than requiring separate images for each rank variant, the platform applies CSS filters
to the base `moai-master.png` image to create emotional variations:

```css
.mascot-newbie    { filter: grayscale(70%) brightness(0.7) saturate(0.3); }
.mascot-navigator { filter: grayscale(20%) brightness(0.85) saturate(0.7); }
.mascot-guru      { filter: brightness(1.05) saturate(1.2) drop-shadow(0 0 12px #f5a62350); }
.mascot-master    { filter: brightness(1.1) saturate(1.3) drop-shadow(0 0 20px #00d4aa60);
                    animation: masterPulse 2s ease-in-out infinite; }
```

## Instructions

1. Place the MASTER rank image as `moai-master.png` in this directory
2. Optionally place separate images for other ranks with the filenames above
3. If separate images are not provided, CSS filters are applied to `moai-master.png`

The reference image should be: 512×512px or larger, PNG format with transparency preferred.
