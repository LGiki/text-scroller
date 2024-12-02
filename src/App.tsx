import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Play, Star } from "lucide-react";
import { useState } from "react";
import Header from "./components/header";
import {
  BlinkFrequency,
  GlowIntensity,
  Direction,
  ScrollSpeed,
  TextScrollerConfig,
} from "./types/text-scroller";
import TextScrollerCanvas from "./components/text-scroller-canvas";
import TextScrollerSettings from "./components/text-scroller-settings";

export default function App() {
  const [isScrollerVisible, setIsScrollerVisible] = useState<boolean>(false);

  const [scrollerConfig, setScrollerConfig] = useState<TextScrollerConfig>({
    italic: false,
    backgroundColor: "#000000",
    textColor: "#ffffff",
    fontWeight: "500",
    fontSizePercentage: "100",
    glow: false,
    glowIntensity: GlowIntensity.Medium,
    blink: false,
    blinkFrequency: BlinkFrequency.Medium,
    textDirection: Direction.Down,
    scrollDirection: Direction.Left,
    scrollSpeed: ScrollSpeed.Medium,
    scrollerText: "你好世界",
  });

  return (
    <>
      <div className="flex flex-col h-dvh">
        <Header />
        <div className="flex flex-col gap-3 flex-1 h-0 w-full p-3">
          <div className="flex-shrink-0">
            <Textarea
              className="resize-none"
              placeholder="Your Text Here..."
              value={scrollerConfig.scrollerText}
              onChange={(e) =>
                setScrollerConfig((config) => ({
                  ...config,
                  scrollerText: e.target.value,
                }))
              }
            />
          </div>
          <TextScrollerSettings
            scrollerConfig={scrollerConfig}
            onScrollerConfigChange={(newScollerConfig) => {
              setScrollerConfig((config) => ({
                ...config,
                ...newScollerConfig,
              }));
            }}
          />
          <div className="flex-shrink-0 flex gap-2">
            <Button variant="outline">
              <Star />
              Favorite
            </Button>
            <Button
              onClick={() => setIsScrollerVisible(true)}
              className="flex-1"
            >
              <Play />
              Play
            </Button>
          </div>
        </div>
      </div>
      {isScrollerVisible && (
        <div className="absolute left-0 top-0 h-dvh w-screen">
          <TextScrollerCanvas
            onCloseClick={() => setIsScrollerVisible(false)}
            scrollerConfig={scrollerConfig as TextScrollerConfig}
          />
        </div>
      )}
    </>
  );
}
