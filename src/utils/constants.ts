import { Direction, GlowIntensity, Speed, TextScrollerConfig } from "@/types/text-scroller";

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
    blinkFrequency: Speed.Medium,
    textDirection: Direction.Down,
    scrollDirection: Direction.Left,
    scrollSpeed: Speed.Medium,
    scrollerText: "",
}

export const BlinkFrequencySettings = {
    [Speed.Slow]: -0.01,
    [Speed.Medium]: -0.025,
    [Speed.Fast]: -0.05,
    [Speed.UltraFast]: -0.15,
}

export const GlowShadowBlurBaseValues = {
    [GlowIntensity.Weak]: 20,
    [GlowIntensity.Medium]: 35,
    [GlowIntensity.Strong]: 50,
}

export const ScrollSpeedSettings = {
    [Speed.Slow]: 0.005,
    [Speed.Medium]: 0.01,
    [Speed.Fast]: 0.017,
    [Speed.UltraFast]: 0.025,
}