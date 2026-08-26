import pptxgen from "pptxgenjs";
import { Presentation } from "@/lib/types";
import { allThemes } from "@/lib/theme";
import { resolveSlideLayoutData } from "@/lib/slideLayouts";

// ── Color Utilities ──────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return [r, g, b]
    .map((c) =>
      Math.round(Math.min(255, Math.max(0, c)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")
    .toUpperCase();
}

/** Blend fgHex over bgHex at the given opacity (0–1) */
function blendColors(bgHex: string, fgHex: string, opacity: number): string {
  const [br, bg, bb] = hexToRgb(bgHex);
  const [fr, fg, fb] = hexToRgb(fgHex);
  return rgbToHex(
    br * (1 - opacity) + fr * opacity,
    bg * (1 - opacity) + fg * opacity,
    bb * (1 - opacity) + fb * opacity,
  );
}

/** Relative luminance 0 (black) → 1 (white) */
function getLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

// ── Main Export ──────────────────────────────────────────────────────────────

/**
 * Exports a presentation into a layout-aware PowerPoint (.pptx) deck.
 * Each layout case mirrors the corresponding React component in
 * components/slide-layouts/ so the exported file matches the web preview.
 */
export async function exportPresentationToPPTX(
  presentation: Presentation,
): Promise<void> {
  if (!presentation || !presentation.slides?.length) return;

  const activeTheme =
    allThemes.find((t) => t.id === presentation.themeColors) || allThemes[0];
  const pptxColors = activeTheme.pptxColors || {
    bg: "FCFAF5",
    title: "1A3300",
    subtitle: "3F4E34",
    bullet: "2A4015",
    accent: "CB5521",
  };

  // Luminance-based detection instead of hardcoded hex checks
  const isDark = getLuminance(pptxColors.bg) < 0.45;

  // Card colors matching the web's translucent fills:
  //   bg-current/[0.03] → 3 % of text color over background
  //   border-current/15  → 15 % of text color over background
  const cardFill = blendColors(pptxColors.bg, pptxColors.title, 0.04);
  const cardBorder = blendColors(pptxColors.bg, pptxColors.title, 0.15);
  const separatorColor = cardBorder;

  // Badge contrast: light text on dark accent, dark text on light accent
  const badgeText =
    getLuminance(pptxColors.accent) > 0.5
      ? blendColors("000000", pptxColors.bg, 0.15)
      : "FFFFFF";

  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9"; // 10.0 × 5.625 inches

  // Layout constants
  const MX = 0.8; // horizontal margin
  const CW = 8.4; // content width (10 − 2 × MX)

  presentation.slides.forEach((slide, idx) => {
    const pptxSlide = pptx.addSlide();
    pptxSlide.background = { color: pptxColors.bg };

    const resolved = resolveSlideLayoutData({
      title: slide.title,
      subtitle: slide.subtitle,
      slideLayout: slide.slideLayout,
      content: slide.content,
      imgUrl: slide.imgUrl,
      slideNumber: slide.slideNumber || idx + 1,
    });

    switch (resolved.layoutType) {
      // ══════════════════════════════════════════════════════════════════
      // 1. INTRO  —  Mirrors IntroSlide.tsx
      //    Centered hero: eyebrow pill → title → subtitle → footer
      // ══════════════════════════════════════════════════════════════════
      case "intro": {
        // ── Eyebrow pill ──
        if (resolved.eyebrow) {
          const label = resolved.eyebrow.toUpperCase();
          const pillW = Math.min(3.0, Math.max(1.5, label.length * 0.09 + 0.5));
          const pillX = (10 - pillW) / 2;

          pptxSlide.addShape(pptx.ShapeType.roundRect, {
            x: pillX,
            y: 0.6,
            w: pillW,
            h: 0.32,
            fill: { color: blendColors(pptxColors.bg, pptxColors.title, 0.04) },
            line: { color: cardBorder, width: 0.75 },
            rectRadius: 0.16,
          });

          pptxSlide.addText(label, {
            x: pillX,
            y: 0.6,
            w: pillW,
            h: 0.32,
            fontSize: 8,
            bold: true,
            color: pptxColors.accent,
            align: "center",
            valign: "middle",
            margin: 0,
            fontFace: "Arial",
            charSpacing: 2,
          });
        }

        // ── Hero title ──
        pptxSlide.addText(resolved.title, {
          x: 1.2,
          y: 1.3,
          w: 7.6,
          h: 2.0,
          fontSize: 36,
          bold: true,
          color: pptxColors.title,
          align: "center",
          valign: "middle",
          margin: 0,
          fontFace: "Arial",
        });

        // ── Subtitle ──
        if (resolved.subtitle) {
          pptxSlide.addText(resolved.subtitle, {
            x: 2.0,
            y: 3.25,
            w: 6.0,
            h: 0.7,
            fontSize: 14,
            color: pptxColors.subtitle,
            align: "center",
            valign: "top",
            margin: 0,
            fontFace: "Arial",
          });
        }

        // ── Footer separator + metadata ──
        const footerParts = [resolved.presenter, resolved.date].filter(Boolean);
        if (footerParts.length) {
          pptxSlide.addShape(pptx.ShapeType.line, {
            x: 3.2,
            y: 4.5,
            w: 3.6,
            h: 0,
            line: { color: separatorColor, width: 0.75 },
          });

          pptxSlide.addText(footerParts.join("  •  "), {
            x: 2.0,
            y: 4.65,
            w: 6.0,
            h: 0.4,
            fontSize: 10,
            color: pptxColors.subtitle,
            align: "center",
            valign: "top",
            margin: 0,
            fontFace: "Arial",
          });
        }
        break;
      }

      // ══════════════════════════════════════════════════════════════════
      // 2. STAT GRID  —  Mirrors StatGrid.tsx
      //    Header → grid of metric cards (value + label)
      // ══════════════════════════════════════════════════════════════════
      case "stat_grid": {
        // ── Header ──
        const headerRuns: pptxgen.TextProps[] = [
          {
            text: `${resolved.title}\n`,
            options: {
              fontSize: 22,
              bold: true,
              color: pptxColors.title,
              breakLine: true,
              fontFace: "Arial",
            },
          },
        ];
        if (resolved.subtitle) {
          headerRuns.push({
            text: resolved.subtitle,
            options: {
              fontSize: 11,
              color: pptxColors.subtitle,
              fontFace: "Arial",
            },
          });
        }
        pptxSlide.addText(headerRuns, {
          x: MX,
          y: 0.55,
          w: CW,
          h: 0.85,
          valign: "top",
          margin: 0,
        });

        // ── Stat cards ──
        const stats = resolved.stats || [];
        const statCount = Math.min(4, Math.max(1, stats.length));
        const statGap = 0.2;
        const statCardW = (CW - (statCount - 1) * statGap) / statCount;
        const statCardH = 2.7;
        const statsY = 1.65;

        stats.slice(0, 4).forEach((stat, i) => {
          const sx = MX + i * (statCardW + statGap);

          // Card shape
          pptxSlide.addShape(pptx.ShapeType.roundRect, {
            x: sx,
            y: statsY,
            w: statCardW,
            h: statCardH,
            fill: { color: cardFill },
            line: { color: cardBorder, width: 0.75 },
            rectRadius: 0.08,
          });

          // Dynamic font for value
          const valLen = (stat.value || "").length;
          const valFont = valLen <= 4 ? 32 : valLen <= 7 ? 26 : 20;

          // Value — left-aligned, matching web
          pptxSlide.addText(stat.value, {
            x: sx + 0.22,
            y: statsY + 0.3,
            w: statCardW - 0.44,
            h: 0.85,
            fontSize: valFont,
            bold: true,
            color: pptxColors.accent,
            align: "left",
            valign: "middle",
            margin: 0,
            fontFace: "Arial",
          });

          // Label
          pptxSlide.addText(stat.label, {
            x: sx + 0.22,
            y: statsY + 1.25,
            w: statCardW - 0.44,
            h: 1.15,
            fontSize: 11,
            color: pptxColors.title,
            align: "left",
            valign: "top",
            margin: 0,
            fontFace: "Arial",
          });
        });
        break;
      }

      // ══════════════════════════════════════════════════════════════════
      // 3. QUOTE  —  Mirrors Quote.tsx
      //    Circle icon → blockquote → separator → author + role
      // ══════════════════════════════════════════════════════════════════
      case "quote": {
        // ── Decorative circle with quote mark ──
        const circleSize = 0.85;
        const circleX = (10 - circleSize) / 2;

        pptxSlide.addShape(pptx.ShapeType.ellipse, {
          x: circleX,
          y: 0.45,
          w: circleSize,
          h: circleSize,
          fill: {
            color: blendColors(pptxColors.bg, pptxColors.title, 0.04),
          },
          line: { color: cardBorder, width: 0.75 },
        });

        pptxSlide.addText("\u201C", {
          x: circleX,
          y: 0.35,
          w: circleSize,
          h: circleSize,
          fontSize: 30,
          bold: true,
          color: pptxColors.accent,
          align: "center",
          valign: "middle",
          margin: 0,
          fontFace: "Georgia",
        });

        // ── Blockquote ──
        pptxSlide.addText(`\u201C${resolved.quote}\u201D`, {
          x: 1.5,
          y: 1.55,
          w: 7.0,
          h: 2.3,
          fontSize: 22,
          italic: true,
          color: pptxColors.title,
          align: "center",
          valign: "middle",
          margin: 0,
          fontFace: "Georgia",
        });

        // ── Separator ──
        pptxSlide.addShape(pptx.ShapeType.line, {
          x: 3.5,
          y: 4.1,
          w: 3.0,
          h: 0,
          line: { color: separatorColor, width: 0.75 },
        });

        // ── Attribution ──
        const attrRuns: pptxgen.TextProps[] = [
          {
            text: resolved.author || "",
            options: {
              fontSize: 13,
              bold: true,
              color: pptxColors.title,
              fontFace: "Arial",
            },
          },
        ];
        if (resolved.titleOrRole) {
          attrRuns.push({
            text: `\n${resolved.titleOrRole}`,
            options: {
              fontSize: 10,
              color: pptxColors.subtitle,
              fontFace: "Arial",
            },
          });
        }
        pptxSlide.addText(attrRuns, {
          x: 2.5,
          y: 4.25,
          w: 5.0,
          h: 0.85,
          align: "center",
          valign: "top",
          margin: 0,
        });
        break;
      }

      // ══════════════════════════════════════════════════════════════════
      // 4. IMAGE + TEXT  —  Mirrors ImageText.tsx
      //    50/50 grid (col-span-6 each) with title, text, bullets + image
      // ══════════════════════════════════════════════════════════════════
      case "image_text": {
        const isLeft = resolved.imagePosition === "left";
        const halfW = 3.9; // ≈ 6/12 of CW
        const gapW = 0.6;
        const textX = isLeft ? MX + halfW + gapW : MX;
        const imgX = isLeft ? MX : MX + halfW + gapW;

        // ── Text column ──
        const textRuns: pptxgen.TextProps[] = [
          {
            text: `${resolved.title}\n`,
            options: {
              fontSize: 22,
              bold: true,
              color: pptxColors.title,
              breakLine: true,
              fontFace: "Arial",
            },
          },
        ];

        if (resolved.text) {
          textRuns.push({
            text: `${resolved.text}\n\n`,
            options: {
              fontSize: 11,
              color: pptxColors.subtitle,
              breakLine: true,
              fontFace: "Arial",
            },
          });
        } else {
          textRuns.push({ text: "\n", options: { breakLine: true } });
        }

        (resolved.bullets || []).forEach((b) => {
          textRuns.push({
            text: b,
            options: {
              fontSize: 11,
              bullet: true,
              color: pptxColors.bullet,
              fontFace: "Arial",
              paraSpaceAfter: 6,
            },
          });
        });

        pptxSlide.addText(textRuns, {
          x: textX,
          y: 0.6,
          w: halfW,
          h: 4.2,
          valign: "middle",
          margin: 0,
        });

        // ── Image column ──
        if (resolved.imgUrl) {
          pptxSlide.addImage({
            path: resolved.imgUrl,
            x: imgX,
            y: 1.0,
            w: halfW,
            h: 3.2,
            sizing: { type: "cover", w: halfW, h: 3.2 },
          });
        }
        break;
      }

      // ══════════════════════════════════════════════════════════════════
      // 5. PROCESS STEPS  —  Mirrors ProcessSteps.tsx
      //    Header → grid of step cards (badge → arrow → title → desc)
      // ══════════════════════════════════════════════════════════════════
      case "process_steps": {
        // ── Header ──
        const headerRuns: pptxgen.TextProps[] = [
          {
            text: `${resolved.title}\n`,
            options: {
              fontSize: 22,
              bold: true,
              color: pptxColors.title,
              breakLine: true,
              fontFace: "Arial",
            },
          },
        ];
        if (resolved.subtitle) {
          headerRuns.push({
            text: resolved.subtitle,
            options: {
              fontSize: 11,
              color: pptxColors.subtitle,
              fontFace: "Arial",
            },
          });
        }
        pptxSlide.addText(headerRuns, {
          x: MX,
          y: 0.55,
          w: CW,
          h: 0.85,
          valign: "top",
          margin: 0,
        });

        // ── Step cards ──
        const steps = resolved.steps || [];
        const stepCount = Math.min(4, Math.max(1, steps.length));
        const stepGap = 0.2;
        const stepCardW = (CW - (stepCount - 1) * stepGap) / stepCount;
        const stepCardH = 2.7;
        const stepsY = 1.65;
        const badgeSize = 0.34;

        steps.slice(0, 4).forEach((step, i) => {
          const sx = MX + i * (stepCardW + stepGap);

          // Card shape
          pptxSlide.addShape(pptx.ShapeType.roundRect, {
            x: sx,
            y: stepsY,
            w: stepCardW,
            h: stepCardH,
            fill: { color: cardFill },
            line: { color: cardBorder, width: 0.75 },
            rectRadius: 0.08,
          });

          // Circular step badge (filled accent circle)
          pptxSlide.addShape(pptx.ShapeType.ellipse, {
            x: sx + 0.18,
            y: stepsY + 0.2,
            w: badgeSize,
            h: badgeSize,
            fill: { color: pptxColors.accent },
            line: { width: 0 },
          });

          pptxSlide.addText(String(step.stepNumber || i + 1), {
            x: sx + 0.18,
            y: stepsY + 0.2,
            w: badgeSize,
            h: badgeSize,
            fontSize: 10,
            bold: true,
            color: badgeText,
            align: "center",
            valign: "middle",
            margin: 0,
            fontFace: "Arial",
          });

          // Arrow indicator (inside card, top-right of badge row)
          if (i < stepCount - 1) {
            pptxSlide.addText("\u2192", {
              x: sx + stepCardW - 0.48,
              y: stepsY + 0.2,
              w: 0.3,
              h: badgeSize,
              fontSize: 12,
              color: blendColors(pptxColors.bg, pptxColors.title, 0.4),
              align: "center",
              valign: "middle",
              margin: 0,
              fontFace: "Arial",
            });
          }

          // Step title
          pptxSlide.addText(step.title, {
            x: sx + 0.18,
            y: stepsY + 0.68,
            w: stepCardW - 0.36,
            h: 0.45,
            fontSize: 12,
            bold: true,
            color: pptxColors.title,
            valign: "top",
            margin: 0,
            fontFace: "Arial",
          });

          // Step description
          if (step.description) {
            pptxSlide.addText(step.description, {
              x: sx + 0.18,
              y: stepsY + 1.15,
              w: stepCardW - 0.36,
              h: 1.3,
              fontSize: 10,
              color: pptxColors.subtitle,
              valign: "top",
              margin: 0,
              fontFace: "Arial",
            });
          }
        });
        break;
      }

      // ══════════════════════════════════════════════════════════════════
      // 6. COMPARISON  —  Mirrors Comparison.tsx
      //    Header → two equal columns (title, divider, bullets)
      // ══════════════════════════════════════════════════════════════════
      case "comparison": {
        // ── Header ──
        const headerRuns: pptxgen.TextProps[] = [
          {
            text: `${resolved.title}\n`,
            options: {
              fontSize: 22,
              bold: true,
              color: pptxColors.title,
              breakLine: true,
              fontFace: "Arial",
            },
          },
        ];
        if (resolved.subtitle) {
          headerRuns.push({
            text: resolved.subtitle,
            options: {
              fontSize: 11,
              color: pptxColors.subtitle,
              fontFace: "Arial",
            },
          });
        }
        pptxSlide.addText(headerRuns, {
          x: MX,
          y: 0.55,
          w: CW,
          h: 0.85,
          valign: "top",
          margin: 0,
        });

        // ── Two equal columns ──
        const colGap = 0.3;
        const colW = (CW - colGap) / 2;
        const colH = 2.9;
        const colY = 1.65;

        const renderColumn = (
          col: { title: string; points: string[] },
          startX: number,
        ) => {
          // Column card
          pptxSlide.addShape(pptx.ShapeType.roundRect, {
            x: startX,
            y: colY,
            w: colW,
            h: colH,
            fill: { color: cardFill },
            line: { color: cardBorder, width: 0.75 },
            rectRadius: 0.08,
          });

          // Column title
          pptxSlide.addText(col.title, {
            x: startX + 0.24,
            y: colY + 0.2,
            w: colW - 0.48,
            h: 0.35,
            fontSize: 13,
            bold: true,
            color: pptxColors.title,
            valign: "top",
            margin: 0,
            fontFace: "Arial",
          });

          // Divider line under title
          pptxSlide.addShape(pptx.ShapeType.line, {
            x: startX + 0.24,
            y: colY + 0.6,
            w: colW - 0.48,
            h: 0,
            line: { color: separatorColor, width: 0.75 },
          });

          // Bullet points
          const bullets = col.points.map((p) => ({
            text: p,
            options: {
              fontSize: 11,
              bullet: true,
              color: pptxColors.bullet,
              fontFace: "Arial",
              paraSpaceAfter: 8,
            },
          }));

          pptxSlide.addText(bullets, {
            x: startX + 0.24,
            y: colY + 0.72,
            w: colW - 0.48,
            h: colH - 1.0,
            valign: "top",
            margin: 0,
          });
        };

        renderColumn(resolved.leftColumn, MX);
        renderColumn(resolved.rightColumn, MX + colW + colGap);
        break;
      }

      // ══════════════════════════════════════════════════════════════════
      // 7. TITLE + BULLETS (default)  —  Mirrors TitleBullets.tsx
      //    With image: 7/12 text + 5/12 image
      //    Without:    full-width centred content
      // ══════════════════════════════════════════════════════════════════
      case "title_bullets":
      default: {
        if (resolved.imgUrl) {
          // Two-column: 7/12 + 5/12 matching web grid-cols-12
          const textW = 5.0; // ≈ 7/12 of CW
          const imgW = 3.1; // ≈ 5/12 of CW
          const gapW = 0.3;

          const textRuns: pptxgen.TextProps[] = [
            {
              text: `${resolved.title}\n`,
              options: {
                fontSize: 24,
                bold: true,
                color: pptxColors.title,
                breakLine: true,
                fontFace: "Arial",
              },
            },
            ...(resolved.subtitle
              ? [
                  {
                    text: `${resolved.subtitle}\n\n`,
                    options: {
                      fontSize: 12,
                      color: pptxColors.subtitle,
                      breakLine: true,
                      fontFace: "Arial",
                    },
                  },
                ]
              : [{ text: "\n", options: { breakLine: true } }]),
            ...(resolved.bullets || []).map((point) => ({
              text: point,
              options: {
                fontSize: 12,
                bullet: true,
                color: pptxColors.bullet,
                fontFace: "Arial",
                paraSpaceAfter: 8,
              },
            })),
          ];

          pptxSlide.addText(textRuns, {
            x: MX,
            y: 0.6,
            w: textW,
            h: 4.2,
            valign: "middle",
            margin: 0,
          });

          pptxSlide.addImage({
            path: resolved.imgUrl,
            x: MX + textW + gapW,
            y: 1.2,
            w: imgW,
            h: 3.0,
            sizing: { type: "cover", w: imgW, h: 3.0 },
          });
        } else {
          // Full-width layout
          const textRuns: pptxgen.TextProps[] = [
            {
              text: `${resolved.title}\n`,
              options: {
                fontSize: 26,
                bold: true,
                color: pptxColors.title,
                breakLine: true,
                fontFace: "Arial",
              },
            },
            ...(resolved.subtitle
              ? [
                  {
                    text: `${resolved.subtitle}\n\n`,
                    options: {
                      fontSize: 13,
                      color: pptxColors.subtitle,
                      breakLine: true,
                      fontFace: "Arial",
                    },
                  },
                ]
              : [{ text: "\n", options: { breakLine: true } }]),
            ...(resolved.bullets || []).map((point) => ({
              text: point,
              options: {
                fontSize: 13,
                bullet: true,
                color: pptxColors.bullet,
                fontFace: "Arial",
                paraSpaceAfter: 10,
              },
            })),
          ];

          pptxSlide.addText(textRuns, {
            x: MX,
            y: 0.6,
            w: CW,
            h: 4.2,
            valign: "middle",
            margin: 0,
          });
        }
        break;
      }
    }
  });

  await pptx.writeFile({
    fileName: `${presentation.title || "presentation"}.pptx`,
  });
}
