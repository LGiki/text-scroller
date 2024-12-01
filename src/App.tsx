import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import {
  Play,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Type,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "./components/ui/separator";
import { Switch } from "./components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Header from "./components/header";
import {
  BlinkFrequency,
  BlinkMode,
  GlowIntensity,
  Direction,
  ScrollSpeed,
  TextScrollerConfig,
} from "./types/text-scroller";
import TextScrollerCanvas from "./components/text-scroller-canvas";

export default function App() {
  const [isScrollerVisible, setIsScrollerVisible] = useState<boolean>(false);

  const [scrollerConfig, setScrollerConfig] = useState<TextScrollerConfig>({
    backgroundColor: "#000000",
    textColor: "#ffffff",
    fontWeight: "500",
    fontSizePercentage: "100",
    glow: false,
    glowIntensity: GlowIntensity.Medium,
    blink: false,
    blinkFrequency: BlinkFrequency.Medium,
    blinkMode: BlinkMode.Linear,
    textDirection: Direction.Down,
    scrollDirection: Direction.Left,
    scrollSpeed: ScrollSpeed.Medium,
    scrollerText: '你好👋'
  });

  return (
    <>
      <div className="flex flex-col h-dvh">
        <Header />
        <div className="flex flex-col gap-3 flex-1 h-0 w-full p-3">
          <div className="flex-shrink-0">
            <Textarea
              placeholder="Your Text Here..."
              value={scrollerConfig.scrollerText}
              onChange={(e) =>
                setScrollerConfig((config) => ({
                  ...config,
                  ScrollText: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex-1 h-0 overflow-y-auto rounded-lg shadow-sm border p-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="font-bold">Background Setting</div>
                <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                  <span>背景颜色</span>
                  <input
                    type="color"
                    value={scrollerConfig.backgroundColor}
                    onChange={(e) =>
                      setScrollerConfig((config) => ({
                        ...config,
                        backgroundColor: e.target.value,
                      }))
                    }
                    className="appearance-none h-[22px] w-[50px] p-0 rounded shadow-sm"
                  />
                </div>
              </div>
              <Separator className="w-full my-1" />
              <div className="flex flex-col gap-2">
                <div className="font-bold">Font Setting</div>
                <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                  <span>文字颜色</span>
                  <input
                    type="color"
                    value={scrollerConfig.textColor}
                    onChange={(e) =>
                      setScrollerConfig((config) => ({
                        ...config,
                        textColor: e.target.value,
                      }))
                    }
                    className="appearance-none h-[22px] w-[50px] p-0 rounded shadow-sm"
                  />
                </div>
                <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                  <span>文字粗细</span>
                  <Select
                    value={scrollerConfig.fontWeight as string}
                    onValueChange={(newFontWeight) =>
                      setScrollerConfig((config) => ({
                        ...config,
                        fontWeight: newFontWeight,
                      }))
                    }
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Font Weight" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(9)].map((_, i) => (
                        <SelectItem
                          value={`${(i + 1) * 100}`}
                          key={`fontWeight-${i}`}
                          style={{ fontWeight: (i + 1) * 100 }}
                        >
                          {(i + 1) * 100}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                  <span>字体大小</span>
                  <Select
                    value={scrollerConfig.fontSizePercentage}
                    onValueChange={(newFontSizePercentage) => {
                      setScrollerConfig((config) => ({
                        ...config,
                        fontSizePercentage: newFontSizePercentage,
                      }));
                    }}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Font Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(10)].map((_, i) => (
                        <SelectItem
                          value={`${(i + 1) * 10}`}
                          key={`fontSize-${i}`}
                        >
                          {(i + 1) * 10}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator className="w-full my-1" />
              <div className="flex flex-col gap-2">
                <div className="font-bold">Effect</div>
                <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                  <span>发光</span>
                  <Switch
                    checked={scrollerConfig.glow}
                    onCheckedChange={(newGlow) =>
                      setScrollerConfig((config) => ({
                        ...config,
                        glow: newGlow,
                      }))
                    }
                  />
                </div>
                <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                  <span>发光强度</span>
                  <Tabs
                    value={scrollerConfig.glowIntensity}
                    onValueChange={(newGlowIntensity) => {
                      setScrollerConfig((config) => ({
                        ...config,
                        glowIntensity: newGlowIntensity as GlowIntensity,
                      }));
                    }}
                  >
                    <TabsList>
                      <TabsTrigger
                        value={GlowIntensity.Weak}
                        disabled={!scrollerConfig.glow}
                      >
                        Weak
                      </TabsTrigger>
                      <TabsTrigger
                        value={GlowIntensity.Medium}
                        disabled={!scrollerConfig.glow}
                      >
                        Medium
                      </TabsTrigger>
                      <TabsTrigger
                        value={GlowIntensity.Strong}
                        disabled={!scrollerConfig.glow}
                      >
                        Strong
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                  <span>闪烁</span>
                  <Switch
                    checked={scrollerConfig.blink}
                    onCheckedChange={(newBlink) =>
                      setScrollerConfig((config) => ({
                        ...config,
                        blink: newBlink,
                      }))
                    }
                  />
                </div>
                <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                  <span>闪烁模式</span>
                  <Tabs
                    value={scrollerConfig.blinkMode}
                    onValueChange={(newBlinkMode) =>
                      setScrollerConfig((config) => ({
                        ...config,
                        blinkMode: newBlinkMode as BlinkMode,
                      }))
                    }
                  >
                    <TabsList>
                      <TabsTrigger
                        value={BlinkMode.Linear}
                        disabled={!scrollerConfig.blink}
                      >
                        Linear
                      </TabsTrigger>
                      <TabsTrigger
                        value={BlinkMode.Step}
                        disabled={!scrollerConfig.blink}
                      >
                        Step
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                  <span>闪烁频率</span>
                  <Tabs
                    value={scrollerConfig.blinkFrequency}
                    onValueChange={(newBlinkFrequency) =>
                      setScrollerConfig((config) => ({
                        ...config,
                        blinkFrequency: newBlinkFrequency as BlinkFrequency,
                      }))
                    }
                  >
                    <TabsList>
                      <TabsTrigger
                        value={BlinkFrequency.Slow}
                        disabled={!scrollerConfig.blink}
                      >
                        Slow
                      </TabsTrigger>
                      <TabsTrigger
                        value={BlinkFrequency.Medium}
                        disabled={!scrollerConfig.blink}
                      >
                        Medium
                      </TabsTrigger>
                      <TabsTrigger
                        value={BlinkFrequency.Slow}
                        disabled={!scrollerConfig.blink}
                      >
                        Fast
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              <Separator className="w-full my-1" />
              <div className="flex flex-col gap-2">
                <div className="font-bold">Scroll Setting</div>
                {/* <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                      <span>滚动轴</span>
                      <Tabs
                        value={scrollerConfig.scrollerAxis}
                        onValueChange={(newScrollerAxis) =>
                          setScrollerConfig((config) => ({
                            ...config,
                            scrollerAxis: newScrollerAxis as ScrollerAxis,
                          }))
                        }
                      >
                        <TabsList>
                          <TabsTrigger value={ScrollerAxis.X}>
                            <ArrowLeftRight className="w-4 h-4 mr-2" />
                            Horizontal
                          </TabsTrigger>
                          <TabsTrigger value={ScrollerAxis.Y}>
                            <ArrowUpDown className="w-4 h-4 mr-2" />
                            Vertical
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div> */}
                <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                  <span>滚动方向</span>
                  <Tabs
                    value={scrollerConfig.scrollDirection}
                    onValueChange={(newScrollDirection) =>
                      setScrollerConfig((config) => ({
                        ...config,
                        scrollDirection: newScrollDirection as Direction,
                      }))
                    }
                  >
                    <TabsList>
                      <TabsTrigger value={Direction.Up}>
                        <ArrowUp className="w-4 h-4 mr-2" />
                        Up
                      </TabsTrigger>
                      <TabsTrigger value={Direction.Down}>
                        <ArrowDown className="w-4 h-4 mr-2" />
                        Down
                      </TabsTrigger>
                      <TabsTrigger value={Direction.Left}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Left{" "}
                      </TabsTrigger>
                      <TabsTrigger value={Direction.Right}>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Right
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                  <span>文字方向</span>
                  <Tabs
                    value={scrollerConfig.textDirection}
                    onValueChange={(newTextDirection) =>
                      setScrollerConfig((config) => ({
                        ...config,
                        textDirection: newTextDirection as Direction,
                      }))
                    }
                  >
                    <TabsList>
                      <TabsTrigger value={Direction.Up}>
                        <Type className="w-4 h-4 mr-2 rotate-180" />
                        Up
                      </TabsTrigger>
                      <TabsTrigger value={Direction.Down}>
                        <Type className="w-4 h-4 mr-2" />
                        Down
                      </TabsTrigger>
                      <TabsTrigger value={Direction.Left}>
                        <Type className="w-4 h-4 mr-2 rotate-90" />
                        Left{" "}
                      </TabsTrigger>
                      <TabsTrigger value={Direction.Right}>
                        <Type className="w-4 h-4 mr-2 -rotate-90" />
                        Right
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
                  <span>滚动速度</span>
                  <Tabs
                    value={scrollerConfig.scrollSpeed}
                    onValueChange={(newScrollSpeed) =>
                      setScrollerConfig((config) => ({
                        ...config,
                        scrollSpeed: newScrollSpeed as ScrollSpeed,
                      }))
                    }
                  >
                    <TabsList>
                      <TabsTrigger value={ScrollSpeed.Slow}>Slow</TabsTrigger>
                      <TabsTrigger value={ScrollSpeed.Medium}>
                        Medium
                      </TabsTrigger>
                      <TabsTrigger value={ScrollSpeed.Fast}>Fast</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col">
            <Button onClick={() => setIsScrollerVisible(true)}>
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
