import { ScrollerConfigState, TextScrollerConfig } from "@/types/text-scroller";
import { INITIAL_SCROLLER_CONFIG } from "@/utils/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useScrollerEditorStore = create<ScrollerConfigState>()(persist(
    (set) => ({
        scrollerConfig: INITIAL_SCROLLER_CONFIG,
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
            set({
                scrollerConfig: INITIAL_SCROLLER_CONFIG
            })
        }
    }),
    {
        name: 'scroller-editor'
    }
))