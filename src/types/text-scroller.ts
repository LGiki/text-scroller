export enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right',
}

export enum ScrollSpeed {
    Slow = 'slow',
    Medium = 'medium',
    Fast = 'fast',
}

export enum GlowIntensity {
    Weak = 'weak',
    Medium = 'medium',
    Strong = 'strong',
}

export enum BlinkFrequency {
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
    blinkFrequency: BlinkFrequency
    scrollDirection: Direction
    textDirection: Direction
    scrollSpeed: ScrollSpeed
}

export interface ScrollerConfigState {
    scrollerConfig: TextScrollerConfig
    updateScrollerConfig: (scrollerConfig: Partial<TextScrollerConfig>) => void
    setScrollerConfig: (scrollerConfig: TextScrollerConfig) => void
    resetScrollerConfig: () => void
}