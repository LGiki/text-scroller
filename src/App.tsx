import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Eraser, Play, Star } from "lucide-react";
import Header from "./components/header";
import TextScrollerCanvas from "@/components/text-scroller-canvas";
import TextScrollerSettings from "@/components/text-scroller-settings";
import { useHistoryScollersStore } from "@/stores/useHistoryScrollersStore";
import { useScrollerInstanceStore } from "@/stores/useScrollerInstanceStore";
import { useScrollerEditorStore } from "./stores/useScrollerEditorStore";

export default function App() {
  const historyScrollersStore = useHistoryScollersStore();
  const scrollerInstanceStore = useScrollerInstanceStore();
  const scrollerEditorStore = useScrollerEditorStore();

  return (
    <>
      <div className="flex flex-col h-dvh">
        <Header />
        <div className="flex flex-col gap-3 flex-1 h-0 w-full p-3">
          <div className="flex-shrink-0 flex gap-2 w-full">
            <Textarea
              className="resize-none flex-1"
              placeholder="Your Text Here..."
              value={scrollerEditorStore.scrollerConfig.scrollerText}
              onChange={(e) =>
                scrollerEditorStore.updateScrollerConfig({
                  scrollerText: e.target.value,
                })
              }
            />
            <Button
              className="h-full flex-shrink-0"
              variant="outline"
              disabled={
                scrollerEditorStore.scrollerConfig.scrollerText.length === 0
              }
              onClick={() => {
                scrollerEditorStore.updateScrollerConfig({
                  scrollerText: "",
                });
              }}
            >
              <Eraser />
              Clear
            </Button>
          </div>
          <TextScrollerSettings
            scrollerConfig={scrollerEditorStore.scrollerConfig}
            onScrollerConfigChange={(newScollerConfig) => {
              scrollerEditorStore.updateScrollerConfig({
                ...newScollerConfig,
              });
            }}
          />
          <div className="flex-shrink-0 flex gap-2">
            <Button variant="outline">
              <Star />
              Favorite
            </Button>
            <Button
              onClick={() => {
                scrollerInstanceStore.setScrollerConfig(
                  scrollerEditorStore.scrollerConfig
                );
                scrollerInstanceStore.showScroller();
                historyScrollersStore.add(scrollerEditorStore.scrollerConfig);
              }}
              className="flex-1"
            >
              <Play />
              Play
            </Button>
          </div>
        </div>
      </div>
      {scrollerInstanceStore.isScrollerInstanceVisible && (
        <div className="absolute left-0 top-0 h-dvh w-screen z-[1000]">
          <TextScrollerCanvas
            onClick={scrollerInstanceStore.hideScroller}
            scrollerConfig={scrollerInstanceStore.scrollerConfig}
          />
        </div>
      )}
    </>
  );
}
