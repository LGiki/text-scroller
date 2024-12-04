import { BlinkFrequency, Direction, GlowIntensity, ScrollSpeed, TextScrollerConfig } from "@/types/text-scroller";

export const DEFAULT_TITLE = import.meta.env.DEFAULT_TITLE || 'Text Scroller'

export const MAX_HISTORY_SCROLLER_COUNT = 30

export const INITIAL_SCROLLER_CONFIG: TextScrollerConfig = {
    italic: false,
    backgroundColor: "#000000",
    textColor: "#ffffff",
    fontWeight: "500",
    fontSizePercentage: "100",
    glow: false,
    glowIntensity: GlowIntensity.Medium,
    blink: false,
    blinkFrequency: BlinkFrequency.Medium,
    textDirection: Direction.Down,
    scrollDirection: Direction.Left,
    scrollSpeed: ScrollSpeed.Medium,
    scrollerText: "",
}

export const BlinkFrequencySettings = {
    [BlinkFrequency.Slow]: -0.01,
    [BlinkFrequency.Medium]: -0.025,
    [BlinkFrequency.Fast]: -0.05,
    [BlinkFrequency.UltraFast]: -0.15,
}