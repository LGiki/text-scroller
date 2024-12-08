export enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right',
}

export enum GlowIntensity {
    Weak = 'weak',
    Medium = 'medium',
    Strong = 'strong',
}

export enum Speed {
    Slow = 'slow',
    Medium = 'medium',
    Fast = 'fast',
    UltraFast = 'ultraFast'
}

export interface TextScrollerConfig {
    scrollerText: string
    backgroundColor: string
    italic: boolean
    textColor: string
    fontWeight: React.CSSProperties["fontWeight"]
    fontSizePercentage: string
    glow: boolean
    glowIntensity: GlowIntensity
    blink: boolean
    blinkFrequency: Speed
    scrollDirection: Direction
    textDirection: Direction
    scrollSpeed: Speed
}

export interface ScrollerConfigState {
    scrollerConfig: TextScrollerConfig
    updateScrollerConfig: (scrollerConfig: Partial<TextScrollerConfig>) => void
    setScrollerConfig: (scrollerConfig: TextScrollerConfig) => void
    resetScrollerConfig: () => void
}