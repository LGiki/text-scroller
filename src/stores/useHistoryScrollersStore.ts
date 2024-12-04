import { MAX_HISTORY_SCROLLER_COUNT } from "@/utils/constants";
import { createScrollerStore } from "./createScrollersStore";

export const useHistoryScollersStore = createScrollerStore('historyScrollers', MAX_HISTORY_SCROLLER_COUNT)