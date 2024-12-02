import { BlinkFrequency } from "@/types/text-scroller";

export const DEFAULT_TITLE = import.meta.env.DEFAULT_TITLE || 'Text Scroller'

export const BlinkFrequencySettings = {
    [BlinkFrequency.Slow]: -0.01,
    [BlinkFrequency.Medium]: -0.025,
    [BlinkFrequency.Fast]: -0.05,
    [BlinkFrequency.UltraFast]: -0.15,
}