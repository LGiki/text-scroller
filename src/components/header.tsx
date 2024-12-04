import { History, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useState } from "react";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { DEFAULT_TITLE } from "@/utils/constants";
import { useHistoryScollersStore } from "@/stores/useHistoryScrollersStore";
import ScrollerListSheet from "./scroller-list-sheet";
import { useFavoriteScollersStore } from "@/stores/useFavoriteScrollersStore";
import { toast } from "sonner";

export default function Header() {
  const [isHistorySheetVisible, setIsHistorySheetVisible] =
    useState<boolean>(false);
  const [isFavoriteSheetVisible, setIsFavoriteSheetVisible] =
    useState<boolean>(false);

  const historyScrollersStore = useHistoryScollersStore();
  const favoriteScrollersStore = useFavoriteScollersStore();

  return (
    <>
      <div className="border-b flex h-12 items-center justify-between px-4">
        <div className="flex gap-2 items-center">
          <svg
            className="coolshapes ellipse-5 "
            height="30"
            width="30"
            fill="none"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#cs_clip_1_ellipse-5)">
              <mask
                height="200"
                id="cs_mask_1_ellipse-5"
                style={{ maskType: "alpha" }}
                width="200"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
              >
                <path
                  d="M200 33.333c0 18.41-14.924 33.334-33.333 33.334-18.41 0-33.334-14.924-33.334-33.334C133.333 14.923 148.257 0 166.667 0 185.076 0 200 14.924 200 33.333zM200 100c0 18.409-14.924 33.333-33.333 33.333-18.41 0-33.334-14.924-33.334-33.333 0-18.41 14.924-33.333 33.334-33.333C185.076 66.667 200 81.59 200 100zM200 166.667C200 185.076 185.076 200 166.667 200c-18.41 0-33.334-14.924-33.334-33.333 0-18.41 14.924-33.334 33.334-33.334 18.409 0 33.333 14.924 33.333 33.334zM133.333 33.333c0 18.41-14.924 33.334-33.333 33.334-18.41 0-33.333-14.924-33.333-33.334C66.667 14.923 81.59 0 100 0s33.333 14.924 33.333 33.333zM133.333 100c0 18.409-14.924 33.333-33.333 33.333-18.41 0-33.333-14.924-33.333-33.333 0-18.41 14.924-33.333 33.333-33.333S133.333 81.59 133.333 100zM133.333 166.667C133.333 185.076 118.409 200 100 200c-18.41 0-33.333-14.924-33.333-33.333 0-18.41 14.924-33.334 33.333-33.334s33.333 14.924 33.333 33.334zM66.667 33.333c0 18.41-14.924 33.334-33.334 33.334C14.923 66.667 0 51.743 0 33.333 0 14.923 14.924 0 33.333 0c18.41 0 33.334 14.924 33.334 33.333zM66.667 100c0 18.409-14.924 33.333-33.334 33.333C14.923 133.333 0 118.409 0 100c0-18.41 14.924-33.333 33.333-33.333 18.41 0 33.334 14.924 33.334 33.333zM66.667 166.667c0 18.409-14.924 33.333-33.334 33.333C14.923 200 0 185.076 0 166.667c0-18.41 14.924-33.334 33.333-33.334 18.41 0 33.334 14.924 33.334 33.334z"
                  fill="#fff"
                />
              </mask>
              <g mask="url(#cs_mask_1_ellipse-5)">
                <path d="M200 0H0v200h200V0z" fill="#fff" />
                <path
                  d="M200 0H0v200h200V0z"
                  fill="url(#paint0_linear_748_4769)"
                  fillOpacity="0.55"
                />
                <g filter="url(#filter0_f_748_4769)">
                  <path d="M131 3H-12v108h143V3z" fill="#18A0FB" />
                  <path d="M190 109H0v116h190V109z" fill="#FF58E4" />
                  <ellipse
                    cx="153.682"
                    cy="64.587"
                    fill="#FFD749"
                    rx="83"
                    ry="57"
                    transform="rotate(-33.875 153.682 64.587)"
                  />
                </g>
              </g>
            </g>
            <g
              style={{ mixBlendMode: "overlay" }}
              mask="url(#cs_mask_1_ellipse-5)"
            >
              <path
                d="M200 0H0v200h200V0z"
                fill="gray"
                stroke="transparent"
                filter="url(#cs_noise_1_ellipse-5)"
              />
            </g>
            <defs>
              <filter
                height="346.593"
                id="filter0_f_748_4769"
                width="361.583"
                x="-72"
                y="-61.593"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood result="BackgroundImageFix" floodOpacity="0" />
                <feBlend
                  result="shape"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                />
                <feGaussianBlur
                  result="effect1_foregroundBlur_748_4769"
                  stdDeviation="30"
                />
              </filter>
              <linearGradient
                id="paint0_linear_748_4769"
                gradientUnits="userSpaceOnUse"
                x1="200"
                x2="0"
                y1="0"
                y2="200"
              >
                <stop stopColor="#FF1F00" />
                <stop offset="1" stopColor="#FFD600" />
              </linearGradient>
              <clipPath id="cs_clip_1_ellipse-5">
                <path d="M0 0H200V200H0z" fill="#fff" />
              </clipPath>
            </defs>
            <defs>
              <filter
                height="100%"
                id="cs_noise_1_ellipse-5"
                width="100%"
                x="0%"
                y="0%"
                filterUnits="objectBoundingBox"
              >
                <feBlend result="out3" in="SourceGraphic" in2="out2" />
              </filter>
            </defs>
          </svg>
          <h1 className="font-bold">{DEFAULT_TITLE}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsFavoriteSheetVisible(true)}
          >
            <Sparkles />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsHistorySheetVisible(true)}
          >
            <History />
          </Button>
          <DarkModeToggle />
          <a href="https://github.com/LGiki/text-scroller" target="_blank">
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
          toast.success("All items deleted.");
        }}
        onDeleteItemClick={(id) => {
          favoriteScrollersStore.remove(id);
          toast.success("Item deleted.");
        }}
      >
        <div className="flex gap-2 items-center">
          <Sparkles className="w-4 h-4" />
          Favorite
        </div>
      </ScrollerListSheet>
      <ScrollerListSheet
        open={isHistorySheetVisible}
        onOpenChange={setIsHistorySheetVisible}
        scrollersStore={historyScrollersStore}
        onDeleteAllClick={() => {
          historyScrollersStore.removeAll();
          toast.success("All items deleted.");
        }}
        onDeleteItemClick={(id) => {
          historyScrollersStore.remove(id);
          toast.success("Item deleted.");
        }}
      >
        <div className="flex gap-2 items-center">
          <History className="w-4 h-4" />
          History
        </div>
      </ScrollerListSheet>
    </>
  );
}
