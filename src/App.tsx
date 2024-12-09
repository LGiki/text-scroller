import { Button } from "@/components/ui/button";
import { Eraser, Play, RotateCcw, Star } from "lucide-react";
import Header from "@/components/header";
import TextScrollerCanvas from "@/components/text-scroller-canvas";
import TextScrollerSettings from "@/components/text-scroller-settings";
import { useHistoryScollersStore } from "@/stores/use-history-scrollers-store";
import { useScrollerInstanceStore } from "@/stores/use-scroller-instance-store";
import { useScrollerEditorStore } from "@/stores/use-scroller-editor-store";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useFavoriteScollersStore } from "@/stores/use-favorite-scrollers-store";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import useFullScreen from "@/hooks/use-full-screen";
import { Input } from "@/components/ui/input";
import { hash } from "ohash";

export default function App() {
  const historyScrollersStore = useHistoryScollersStore();
  const favoriteScollersStore = useFavoriteScollersStore();
  const scrollerInstanceStore = useScrollerInstanceStore();
  const scrollerEditorStore = useScrollerEditorStore();

  const scrollerRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const { enterFullScreen, exitFullScreen } = useFullScreen(scrollerRef);

  useEffect(() => {
    if (scrollerInstanceStore.isScrollerInstanceVisible) {
      enterFullScreen();
    }
  }, [enterFullScreen, scrollerInstanceStore.isScrollerInstanceVisible]);

  const onScrollerClose = () => {
    scrollerInstanceStore.hideScroller();
    exitFullScreen();
  };

  return (
    <>
      <div
        className="flex flex-col h-svh"
        style={{
          height: "calc(100svh - env(safe-area-inset-bottom, 0px))",
          marginTop: "env(safe-area-inset-top, 0px)",
          marginBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <Header />
        <div className="flex flex-col gap-3 flex-1 h-0 w-full p-3">
          <div className="flex-shrink-0 flex gap-2 w-full">
            <Input
              className="resize-none flex-1"
              placeholder={t("scrollerTextInputPlacerholder")}
              value={scrollerEditorStore.scrollerConfig.scrollerText}
              onChange={(e) =>
                scrollerEditorStore.updateScrollerConfig({
                  scrollerText: e.target.value,
                })
              }
            />
            <Button
              className="flex-shrink-0"
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
              {t("clear")}
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
          <div className="flex-shrink-0 flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-shrink-0"
              onClick={() => {
                scrollerEditorStore.resetScrollerConfig();
                toast.success(t("toast.scrollerConfigReset"));
              }}
            >
              <RotateCcw />
              {t("reset")}
            </Button>
            <Button
              variant="outline"
              className="flex-shrink-0"
              onClick={() => {
                if (
                  scrollerEditorStore.scrollerConfig.scrollerText.length === 0
                ) {
                  toast.error(t("toast.emptyScrollerContent"));
                  return;
                }
                const scrollerHash = hash(scrollerEditorStore.scrollerConfig);
                const isScrollerExists = favoriteScollersStore.scrollers.some(
                  (scroller) => scroller.id === scrollerHash
                );
                if (isScrollerExists) {
                  toast.error("toast.favoriteScrollerExists");
                } else {
                  favoriteScollersStore.add(scrollerEditorStore.scrollerConfig);
                  toast.success(t("toast.addedToFavoriteScrollers"));
                }
              }}
            >
              <Star />
              {t("favorite")}
            </Button>
            <Separator orientation="vertical" />
            <Button
              onClick={() => {
                if (
                  scrollerEditorStore.scrollerConfig.scrollerText.length === 0
                ) {
                  toast.error(t("toast.emptyScrollerContent"));
                  return;
                }
                scrollerInstanceStore.showScrollerWithConfig(
                  scrollerEditorStore.scrollerConfig
                );
                historyScrollersStore.add(scrollerEditorStore.scrollerConfig);
              }}
              className="flex-1 w-0"
            >
              <Play />
              {t("play")}
            </Button>
          </div>
        </div>
      </div>
      <div ref={scrollerRef} className="w-[0px] h-[0px]">
        {scrollerInstanceStore.isScrollerInstanceVisible && (
          <TextScrollerCanvas
            className="absolute left-0 top-0 h-dvh w-screen z-[9999]"
            onClick={onScrollerClose}
            scrollerConfig={scrollerInstanceStore.scrollerConfig}
          />
        )}
      </div>
    </>
  );
}
