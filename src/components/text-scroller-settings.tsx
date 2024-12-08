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
  WifiLow,
  WifiHigh,
  Wifi,
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
  Direction,
  GlowIntensity,
  Speed,
  TextScrollerConfig,
} from "@/types/text-scroller";
import { useTranslation } from "react-i18next";

export default function TextScrollerSettings(props: {
  scrollerConfig: TextScrollerConfig;
  onScrollerConfigChange: (
    newScrollerConfig: Partial<TextScrollerConfig>
  ) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex-1 h-0 overflow-y-auto rounded-lg shadow-sm border p-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="font-bold">{t("editor.background.name")}</div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>{t("editor.background.color")}</span>
            <input
              type="color"
              value={props.scrollerConfig.backgroundColor}
              onChange={(e) =>
                props.onScrollerConfigChange({
                  backgroundColor: e.target.value,
                })
              }
              className="appearance-none h-[22px] w-[50px] p-0 rounded shadow-sm"
              title={t("editor.background.color")}
              aria-label={t("editor.background.color")}
            />
          </div>
        </div>
        <Separator className="w-full my-1" />
        <div className="flex flex-col gap-2">
          <div className="font-bold">{t("editor.font.name")}</div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>{t("editor.font.color")}</span>
            <input
              type="color"
              value={props.scrollerConfig.textColor}
              onChange={(e) =>
                props.onScrollerConfigChange({
                  textColor: e.target.value,
                })
              }
              className="appearance-none h-[22px] w-[50px] p-0 rounded shadow-sm"
              title={t("editor.font.color")}
              aria-label={t("editor.font.color")}
            />
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>{t("editor.font.italic")}</span>
            <Switch
              checked={props.scrollerConfig.italic}
              onCheckedChange={(italicEnabled) =>
                props.onScrollerConfigChange({
                  italic: italicEnabled,
                })
              }
              title={t("editor.font.italic")}
              aria-label={t("editor.font.italic")}
            />
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>{t("editor.font.weight")}</span>
            <Select
              value={props.scrollerConfig.fontWeight as string}
              onValueChange={(newFontWeight) =>
                props.onScrollerConfigChange({
                  fontWeight: newFontWeight,
                })
              }
            >
              <SelectTrigger
                className="w-[200px]"
                title={t("editor.font.weight")}
                aria-label={t("editor.font.weight")}
              >
                <SelectValue placeholder="Font Weight" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(9)].map((_, i) => (
                  <SelectItem
                    value={`${(i + 1) * 100}`}
                    key={`fontWeight-${i}`}
                    style={{ fontWeight: (i + 1) * 100 }}
                    title={`${(i + 1) * 100}`}
                    aria-label={`${(i + 1) * 100}`}
                  >
                    {(i + 1) * 100}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>{t("editor.font.size")}</span>
            <Select
              value={props.scrollerConfig.fontSizePercentage}
              onValueChange={(newFontSizePercentage) => {
                props.onScrollerConfigChange({
                  fontSizePercentage: newFontSizePercentage,
                });
              }}
            >
              <SelectTrigger
                className="w-[200px]"
                title={t("editor.font.size")}
                aria-label={t("editor.font.size")}
              >
                <SelectValue placeholder="Font Size" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem
                    value={`${(i + 1) * 10}`}
                    key={`fontSize-${i}`}
                    title={`${(i + 1) * 10}%`}
                    aria-label={`${(i + 1) * 10}%`}
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
          <div className="font-bold">{t("editor.effect.name")}</div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>{t("editor.effect.glow")}</span>
            <Switch
              checked={props.scrollerConfig.glow}
              onCheckedChange={(newGlow) =>
                props.onScrollerConfigChange({
                  glow: newGlow,
                })
              }
              title={t("editor.effect.glow")}
              aria-label={t("editor.effect.glow")}
            />
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>{t("editor.effect.glowIntensity")}</span>
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
                  title={t("intensity.weak")}
                  aria-label={t("intensity.weak")}
                >
                  <WifiLow className="w-4 h-4 mr-2" />
                  {t("intensity.weak")}
                </TabsTrigger>
                <TabsTrigger
                  value={GlowIntensity.Medium}
                  disabled={!props.scrollerConfig.glow}
                  title={t("intensity.medium")}
                  aria-label={t("intensity.medium")}
                >
                  <WifiHigh className="w-4 h-4 mr-2" />
                  {t("intensity.medium")}
                </TabsTrigger>
                <TabsTrigger
                  value={GlowIntensity.Strong}
                  disabled={!props.scrollerConfig.glow}
                  title={t("intensity.strong")}
                  aria-label={t("intensity.strong")}
                >
                  <Wifi className="w-4 h-4 mr-2" />
                  {t("intensity.strong")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>{t("editor.effect.blink")}</span>
            <Switch
              checked={props.scrollerConfig.blink}
              onCheckedChange={(newBlink) =>
                props.onScrollerConfigChange({
                  blink: newBlink,
                })
              }
              title={t("editor.effect.blink")}
              aria-label={t("editor.effect.blink")}
            />
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>{t("editor.effect.blinkFrequency")}</span>
            <Tabs
              value={props.scrollerConfig.blinkFrequency}
              onValueChange={(newBlinkFrequency) =>
                props.onScrollerConfigChange({
                  blinkFrequency: newBlinkFrequency as Speed,
                })
              }
              className="overflow-x-auto"
            >
              <TabsList>
                <TabsTrigger
                  value={Speed.Slow}
                  disabled={!props.scrollerConfig.blink}
                  title={t("speed.slow")}
                  aria-label={t("speed.slow")}
                >
                  <Snail className="w-4 h-4 mr-2" />
                  {t("speed.slow")}
                </TabsTrigger>
                <TabsTrigger
                  value={Speed.Medium}
                  disabled={!props.scrollerConfig.blink}
                  title={t("speed.medium")}
                  aria-label={t("speed.medium")}
                >
                  <Turtle className="w-4 h-4 mr-2" />
                  {t("speed.medium")}
                </TabsTrigger>
                <TabsTrigger
                  value={Speed.Fast}
                  disabled={!props.scrollerConfig.blink}
                  title={t("speed.fast")}
                  aria-label={t("speed.fast")}
                >
                  <Rabbit className="w-4 h-4 mr-2" />
                  {t("speed.fast")}
                </TabsTrigger>
                <TabsTrigger
                  value={Speed.UltraFast}
                  disabled={!props.scrollerConfig.blink}
                  title={t("speed.ultraFast")}
                  aria-label={t("speed.ultraFast")}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  {t("speed.ultraFast")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <Separator className="w-full my-1" />
        <div className="flex flex-col gap-2">
          <div className="font-bold">{t("editor.scroll.name")}</div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>{t("editor.scroll.scrollDirection")}</span>
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
                <TabsTrigger
                  value={Direction.Up}
                  title={t("direction.up")}
                  aria-label={t("direction.up")}
                >
                  <ArrowUp className="w-4 h-4 mr-2" />
                  {t("direction.up")}
                </TabsTrigger>
                <TabsTrigger
                  value={Direction.Down}
                  title={t("direction.down")}
                  aria-label={t("direction.down")}
                >
                  <ArrowDown className="w-4 h-4 mr-2" />
                  {t("direction.down")}
                </TabsTrigger>
                <TabsTrigger
                  value={Direction.Left}
                  title={t("direction.left")}
                  aria-label={t("direction.left")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("direction.left")}
                </TabsTrigger>
                <TabsTrigger
                  value={Direction.Right}
                  title={t("direction.right")}
                  aria-label={t("direction.right")}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {t("direction.right")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>{t("editor.scroll.textDirection")}</span>
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
                <TabsTrigger
                  value={Direction.Up}
                  title={t("direction.up")}
                  aria-label={t("direction.up")}
                >
                  <Type className="w-4 h-4 mr-2 rotate-180" />
                  {t("direction.up")}
                </TabsTrigger>
                <TabsTrigger
                  value={Direction.Down}
                  title={t("direction.down")}
                  aria-label={t("direction.down")}
                >
                  <Type className="w-4 h-4 mr-2" />
                  {t("direction.down")}
                </TabsTrigger>
                <TabsTrigger
                  value={Direction.Left}
                  title={t("direction.left")}
                  aria-label={t("direction.left")}
                >
                  <Type className="w-4 h-4 mr-2 rotate-90" />
                  {t("direction.left")}
                </TabsTrigger>
                <TabsTrigger
                  value={Direction.Right}
                  title={t("direction.right")}
                  aria-label={t("direction.right")}
                >
                  <Type className="w-4 h-4 mr-2 -rotate-90" />
                  {t("direction.right")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex justify-between items-center min-h-9 flex-wrap gap-2">
            <span>{t("editor.scroll.scrollSpeed")}</span>
            <Tabs
              value={props.scrollerConfig.scrollSpeed}
              onValueChange={(newScrollSpeed) =>
                props.onScrollerConfigChange({
                  scrollSpeed: newScrollSpeed as Speed,
                })
              }
              className="overflow-x-auto"
            >
              <TabsList>
                <TabsTrigger
                  value={Speed.Slow}
                  title={t("speed.slow")}
                  aria-label={t("speed.slow")}
                >
                  <Snail className="w-4 h-4 mr-2" />
                  {t("speed.slow")}
                </TabsTrigger>
                <TabsTrigger
                  value={Speed.Medium}
                  title={t("speed.medium")}
                  aria-label={t("speed.medium")}
                >
                  <Turtle className="w-4 h-4 mr-2" />
                  {t("speed.medium")}
                </TabsTrigger>
                <TabsTrigger
                  value={Speed.Fast}
                  title={t("speed.fast")}
                  aria-label={t("speed.fast")}
                >
                  <Rabbit className="w-4 h-4 mr-2" />
                  {t("speed.fast")}
                </TabsTrigger>
                <TabsTrigger
                  value={Speed.UltraFast}
                  title={t("speed.ultraFast")}
                  aria-label={t("speed.ultraFast")}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  {t("speed.ultraFast")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
