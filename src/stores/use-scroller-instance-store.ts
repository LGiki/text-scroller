import { create } from "zustand";
import { ScrollerConfigState, TextScrollerConfig } from "@/types/text-scroller";
import { INITIAL_SCROLLER_CONFIG } from "@/utils/constants";

interface ScrollerInstanceState extends ScrollerConfigState {
    isScrollerInstanceVisible: boolean
    showScroller: () => void
    showScrollerWithConfig: (scrollerConfig: TextScrollerConfig) => void
    hideScroller: () => void
    toggleScroller: () => void
}

export const useScrollerInstanceStore = create<ScrollerInstanceState>()(set => ({
    isScrollerInstanceVisible: false,
    scrollerConfig: INITIAL_SCROLLER_CONFIG,
    showScroller: () => {
        set({
            isScrollerInstanceVisible: true
        })
    },
    showScrollerWithConfig: (scrollerConfig: TextScrollerConfig) => {
        set({
            scrollerConfig: scrollerConfig,
            isScrollerInstanceVisible: true
        })
    },
    hideScroller: () => {
        set({
            isScrollerInstanceVisible: false
        })
    },
    toggleScroller: () => {
        set(state => ({
            isScrollerInstanceVisible: !state.isScrollerInstanceVisible
        }))
    },
    updateScrollerConfig: (scrollerConfig: Partial<TextScrollerConfig>) => {
        set(state => ({
            scrollerConfig: {
                ...state.scrollerConfig,
                ...scrollerConfig
            }
        }))
    },
    setScrollerConfig: (scrollerConfig: TextScrollerConfig) => {
        set({
            scrollerConfig: scrollerConfig
        })
    },
    resetScrollerConfig: () => {
        set(state => ({
            scrollerConfig: {
                ...INITIAL_SCROLLER_CONFIG,
                scrollerText: state.scrollerConfig.scrollerText
            }
        }))
    }
}))