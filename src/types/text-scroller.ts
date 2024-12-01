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
}

export enum BlinkMode {
    Linear = 'linear',
    Step = 'step',
}

export interface TextScrollerConfig {
    scrollerText: string
    backgroundColor: string
    textColor: string
    fontWeight: React.CSSProperties["fontWeight"]
    fontSizePercentage: string
    glow: boolean
    glowIntensity: GlowIntensity
    blink: boolean
    blinkFrequency: BlinkFrequency
    blinkMode: BlinkMode
    scrollDirection: Direction
    textDirection: Direction
    scrollSpeed: ScrollSpeed
}