import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Type,
  Snail,
  Turtle,
  Rabbit,
  Rocket,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BlinkFrequency,
  Direction,
  GlowIntensity,
  ScrollSpeed,
  TextScrollerConfig,
} from "@/types/text-scroller";

export default function TextScrollerSettings(props: {
  scrollerConfig: TextScrollerConfig;
  onScrollerConfigChange: (
    newScrollerConfig: Partial<TextScrollerConfig>
  ) => void;
}) {
  return (
    <div className="flex-1 h-0 overflow-y-auto rounded-lg shadow-sm border p-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="font-bold">Background Setting</div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>背景颜色</span>
            <input
              type="color"
              value={props.scrollerConfig.backgroundColor}
              onChange={(e) =>
                props.onScrollerConfigChange({
                  backgroundColor: e.target.value,
                })
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
              value={props.scrollerConfig.textColor}
              onChange={(e) =>
                props.onScrollerConfigChange({
                  textColor: e.target.value,
                })
              }
              className="appearance-none h-[22px] w-[50px] p-0 rounded shadow-sm"
            />
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>斜体</span>
            <Switch
              checked={props.scrollerConfig.italic}
              onCheckedChange={(italicEnabled) =>
                props.onScrollerConfigChange({
                  italic: italicEnabled,
                })
              }
            />
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>文字粗细</span>
            <Select
              value={props.scrollerConfig.fontWeight as string}
              onValueChange={(newFontWeight) =>
                props.onScrollerConfigChange({
                  fontWeight: newFontWeight,
                })
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
              value={props.scrollerConfig.fontSizePercentage}
              onValueChange={(newFontSizePercentage) => {
                props.onScrollerConfigChange({
                  fontSizePercentage: newFontSizePercentage,
                });
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Font Size" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem value={`${(i + 1) * 10}`} key={`fontSize-${i}`}>
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
              checked={props.scrollerConfig.glow}
              onCheckedChange={(newGlow) =>
                props.onScrollerConfigChange({
                  glow: newGlow,
                })
              }
            />
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>发光强度</span>
            <Tabs
              value={props.scrollerConfig.glowIntensity}
              onValueChange={(newGlowIntensity) => {
                props.onScrollerConfigChange({
                  glowIntensity: newGlowIntensity as GlowIntensity,
                });
              }}
              className="overflow-x-auto"
            >
              <TabsList>
                <TabsTrigger
                  value={GlowIntensity.Weak}
                  disabled={!props.scrollerConfig.glow}
                >
                  Weak
                </TabsTrigger>
                <TabsTrigger
                  value={GlowIntensity.Medium}
                  disabled={!props.scrollerConfig.glow}
                >
                  Medium
                </TabsTrigger>
                <TabsTrigger
                  value={GlowIntensity.Strong}
                  disabled={!props.scrollerConfig.glow}
                >
                  Strong
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>闪烁</span>
            <Switch
              checked={props.scrollerConfig.blink}
              onCheckedChange={(newBlink) =>
                props.onScrollerConfigChange({
                  blink: newBlink,
                })
              }
            />
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>闪烁频率</span>
            <Tabs
              value={props.scrollerConfig.blinkFrequency}
              onValueChange={(newBlinkFrequency) =>
                props.onScrollerConfigChange({
                  blinkFrequency: newBlinkFrequency as BlinkFrequency,
                })
              }
              className="overflow-x-auto"
            >
              <TabsList>
                <TabsTrigger
                  value={BlinkFrequency.Slow}
                  disabled={!props.scrollerConfig.blink}
                >
                  <Snail className="w-4 h-4 mr-2" />
                  Slow
                </TabsTrigger>
                <TabsTrigger
                  value={BlinkFrequency.Medium}
                  disabled={!props.scrollerConfig.blink}
                >
                  <Turtle className="w-4 h-4 mr-2" />
                  Medium
                </TabsTrigger>
                <TabsTrigger
                  value={BlinkFrequency.Fast}
                  disabled={!props.scrollerConfig.blink}
                >
                  <Rabbit className="w-4 h-4 mr-2" />
                  Fast
                </TabsTrigger>
                <TabsTrigger
                  value={BlinkFrequency.UltraFast}
                  disabled={!props.scrollerConfig.blink}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Ultra Fast
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <Separator className="w-full my-1" />
        <div className="flex flex-col gap-2">
          <div className="font-bold">Scroll Setting</div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>滚动方向</span>
            <Tabs
              value={props.scrollerConfig.scrollDirection}
              onValueChange={(newScrollDirection) =>
                props.onScrollerConfigChange({
                  scrollDirection: newScrollDirection as Direction,
                })
              }
              className="overflow-x-auto"
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
              value={props.scrollerConfig.textDirection}
              onValueChange={(newTextDirection) =>
                props.onScrollerConfigChange({
                  textDirection: newTextDirection as Direction,
                })
              }
              className="overflow-x-auto"
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
              value={props.scrollerConfig.scrollSpeed}
              onValueChange={(newScrollSpeed) =>
                props.onScrollerConfigChange({
                  scrollSpeed: newScrollSpeed as ScrollSpeed,
                })
              }
              className="overflow-x-auto"
            >
              <TabsList>
                <TabsTrigger value={ScrollSpeed.Slow}>
                  <Snail className="w-4 h-4 mr-2" />
                  Slow
                </TabsTrigger>
                <TabsTrigger value={ScrollSpeed.Medium}>
                  <Turtle className="w-4 h-4 mr-2" />
                  Medium
                </TabsTrigger>
                <TabsTrigger value={ScrollSpeed.Fast}>
                  <Rabbit className="w-4 h-4 mr-2" />
                  Fast
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
