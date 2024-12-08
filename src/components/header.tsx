import { History, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useState } from "react";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { DEFAULT_TITLE } from "@/utils/constants";
import { useHistoryScollersStore } from "@/stores/use-history-scrollers-store";
import ScrollerListSheet from "./scroller-list-sheet";
import { useFavoriteScollersStore } from "@/stores/use-favorite-scrollers-store";
import { toast } from "sonner";
import { LanguageToggle } from "./language-toggle";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [isHistorySheetVisible, setIsHistorySheetVisible] =
    useState<boolean>(false);
  const [isFavoriteSheetVisible, setIsFavoriteSheetVisible] =
    useState<boolean>(false);

  const historyScrollersStore = useHistoryScollersStore();
  const favoriteScrollersStore = useFavoriteScollersStore();

  const { t } = useTranslation();

  return (
    <>
      <div className="border-b flex h-12 items-center justify-between px-4">
        <div className="flex gap-2 items-center group">
          <img
            src="icons/logo.svg"
            className="w-[25px] h-[25px] group-hover:brightness-110 duration-200 ease-in-out transition-all group-hover:drop-shadow-sm"
            title={`${DEFAULT_TITLE} Logo`}
            aria-label={`${DEFAULT_TITLE} Logo`}
          />
          <h1
            className="font-['Oxanium_Variable'] text-lg font-bold transition-all duration-200 ease-in-out group-hover:drop-shadow-sm group-hover:bg-gradient-to-l group-hover:from-pink-300 group-hover:via-fuchsia-400 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent"
            title={DEFAULT_TITLE}
            aria-label={DEFAULT_TITLE}
          >
            {DEFAULT_TITLE}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsFavoriteSheetVisible(true)}
            title={t("favorite")}
            aria-label={t("favorite")}
          >
            <Sparkles />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsHistorySheetVisible(true)}
            title={t("history")}
            aria-label={t("history")}
          >
            <History />
          </Button>
          <LanguageToggle />
          <DarkModeToggle />
          <a
            href="https://github.com/LGiki/text-scroller"
            target="_blank"
            title="Github"
            aria-label="Github"
          >
            <Button size="icon" variant="outline">
              <SiGithub />
            </Button>
          </a>
        </div>
      </div>
      <ScrollerListSheet
        open={isFavoriteSheetVisible}
        onOpenChange={setIsFavoriteSheetVisible}
        scrollersStore={favoriteScrollersStore}
        onDeleteAllClick={() => {
          favoriteScrollersStore.removeAll();
          toast.success(t("toast.allScrollerDeleted"));
        }}
        onDeleteItemClick={(id) => {
          favoriteScrollersStore.remove(id);
          toast.success(t("toast.scrollerDeleted"));
        }}
      >
        <div className="flex gap-2 items-center">
          <Sparkles className="w-4 h-4" />
          {t("favorite")}
        </div>
      </ScrollerListSheet>
      <ScrollerListSheet
        open={isHistorySheetVisible}
        onOpenChange={setIsHistorySheetVisible}
        scrollersStore={historyScrollersStore}
        onDeleteAllClick={() => {
          historyScrollersStore.removeAll();
          toast.success(t("toast.allScrollerDeleted"));
        }}
        onDeleteItemClick={(id) => {
          historyScrollersStore.remove(id);
          toast.success(t("toast.scrollerDeleted"));
        }}
      >
        <div className="flex gap-2 items-center">
          <History className="w-4 h-4" />
          {t("history")}
        </div>
      </ScrollerListSheet>
    </>
  );
}
