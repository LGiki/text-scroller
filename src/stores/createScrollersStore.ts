import { TextScrollerConfig } from "@/types/text-scroller";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";

interface ScrollerStoreItem {
    id: string;
    scrollerConfig: TextScrollerConfig;
}

export interface ScrollersState {
    scrollers: ScrollerStoreItem[];
    add: (scroller: TextScrollerConfig) => void;
    remove: (id: string) => void;
    removeAll: () => void;
}

export const createScrollerStore = (localStorageName: string, maxScrollersCount?: number) => {
    return create<ScrollersState>()(
        persist(
            (set) => ({
                scrollers: [],
                add: (scroller: TextScrollerConfig) => {
                    set((state) => {
                        const newScrollerStoreItem: ScrollerStoreItem = {
                            id: nanoid(10),
                            scrollerConfig: scroller,
                        };
                        const updatedScrollers = [newScrollerStoreItem, ...state.scrollers];

                        return {
                            scrollers: maxScrollersCount
                                ? updatedScrollers.slice(0, maxScrollersCount)
                                : updatedScrollers,
                        };
                    });
                },
                remove: (id: string) => {
                    set((state) => ({
                        scrollers: state.scrollers.filter((scroller) => scroller.id !== id),
                    }));
                },
                removeAll: () => {
                    set({
                        scrollers: [],
                    });
                }
            }),
            {
                name: localStorageName,
            }
        )
    );
}