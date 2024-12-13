import { cn } from "@/lib/utils";
import { Direction, TextScrollerConfig } from "@/types/text-scroller";
import { hexColorToRGB } from "@/utils/color";
import {
  BlinkFrequencySettings,
  GlowShadowBlurBaseValues,
  ScrollSpeedSettings,
} from "@/utils/constants";
import { KeyboardEvent, useEffect, useRef } from "react";

export default function TextScrollerCanvas(props: {
  scrollerConfig: TextScrollerConfig;
  className?: string;
  onClick?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLCanvasElement>) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let animationFrameId: number;
    let textX = canvas.width;
    let textY = canvas.height;

    const text = props.scrollerConfig.scrollerText;
    const scrollSpeed = ScrollSpeedSettings[props.scrollerConfig.scrollSpeed];

    let blinkOpacity = 1;
    let blinkDirection =
      BlinkFrequencySettings[props.scrollerConfig.blinkFrequency];

    const onCanvasResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      textX = canvas.width;
      textY = canvas.height;
    };

    const draw = () => {
      if (!ctx) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = props.scrollerConfig.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fontSizePercentage =
        parseInt(props.scrollerConfig.fontSizePercentage) / 100;

      const fontSize =
        fontSizePercentage *
        (props.scrollerConfig.scrollDirection === Direction.Up ||
        props.scrollerConfig.scrollDirection === Direction.Down
          ? canvas.width
          : canvas.height);

      ctx.font = `${props.scrollerConfig.italic ? "italic" : "normal"} ${
        props.scrollerConfig.fontWeight
      } ${fontSize}px sans-serif`;
      ctx.fillStyle = props.scrollerConfig.textColor;

      ctx.textBaseline =
        props.scrollerConfig.scrollDirection === Direction.Up ||
        props.scrollerConfig.scrollDirection === Direction.Down
          ? "top"
          : "middle";

      if (props.scrollerConfig.blink) {
        blinkOpacity += blinkDirection;
        if (blinkOpacity <= 0 || blinkOpacity >= 1) {
          blinkDirection *= -1;
        }
        const textColorRGB = hexColorToRGB(props.scrollerConfig.textColor)
        if (textColorRGB !== null) {
          ctx.fillStyle = `rgba(${textColorRGB.r},${textColorRGB.g},${textColorRGB.b},${blinkOpacity})`;
        }
      }

      if (props.scrollerConfig.glow) {
        ctx.shadowColor = props.scrollerConfig.textColor;
        ctx.shadowBlur =
          GlowShadowBlurBaseValues[props.scrollerConfig.glowIntensity] *
          fontSizePercentage;
      }

      const textMetrics = ctx.measureText(text);

      // textHeight is the text height with line height
      const textHeight =
        textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent;

      const textWidth = ctx.measureText(text).width;

      ctx.save();
      switch (props.scrollerConfig.textDirection) {
        case Direction.Left:
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(Math.PI / 2);
          break;
        case Direction.Right:
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(-Math.PI / 2);
          break;
        case Direction.Up:
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(Math.PI);
          break;
      }

      if (
        props.scrollerConfig.scrollDirection === Direction.Up ||
        props.scrollerConfig.scrollDirection === Direction.Down
      ) {
        if (
          props.scrollerConfig.textDirection === Direction.Left ||
          props.scrollerConfig.textDirection === Direction.Right
        ) {
          ctx.fillText(text, textX, -canvas.width / 2);
        } else {
          const x =
            props.scrollerConfig.textDirection === Direction.Up
              ? 0
              : canvas.width / 2;
          ctx.textAlign = "center";
          for (let i = 0; i < text.length; i++) {
            ctx.fillText(text[i], x, textY + i * textHeight);
          }
        }
      } else {
        if (
          props.scrollerConfig.textDirection === Direction.Left ||
          props.scrollerConfig.textDirection === Direction.Right
        ) {
          ctx.textAlign = "center";
          for (let i = 0; i < text.length; i++) {
            ctx.fillText(text[i], 0, textY + i * textHeight);
          }
        } else {
          const y =
            props.scrollerConfig.textDirection === Direction.Up
              ? 0
              : canvas.height / 2;
          ctx.fillText(text, textX, y);
        }
      }
      ctx.restore();

      switch (props.scrollerConfig.scrollDirection) {
        case Direction.Left:
          switch (props.scrollerConfig.textDirection) {
            case Direction.Up:
              textX += scrollSpeed;
              if (textX > canvas.width) {
                textX = -textWidth - canvas.width / 2;
              }
              break;
            case Direction.Left:
              textY += scrollSpeed;
              if (textY - canvas.width / 2 > canvas.height) {
                textY = -textHeight * text.length - canvas.width / 2;
              }
              break;
            case Direction.Right:
              textY -= scrollSpeed;
              if (textY + textHeight * text.length + canvas.width / 2 < 0) {
                textY = canvas.height + canvas.width / 2;
              }
              break;
            case Direction.Down:
              textX -= scrollSpeed;
              if (textX + textWidth < 0) {
                textX = canvas.width;
              }
              break;
          }
          break;
        case Direction.Right:
          switch (props.scrollerConfig.textDirection) {
            case Direction.Up:
              textX -= scrollSpeed;
              if (textX + textWidth + canvas.width / 2 < 0) {
                textX = canvas.width - canvas.width / 2;
              }
              break;
            case Direction.Left:
              textY -= scrollSpeed;
              if (textY + textHeight * text.length + canvas.width / 2 < 0) {
                textY = canvas.height + canvas.width / 2;
              }
              break;
            case Direction.Right:
              textY += scrollSpeed;
              if (textY > canvas.height + canvas.width / 2) {
                textY = -textHeight * text.length - canvas.width / 2;
              }
              break;
            case Direction.Down:
              textX += scrollSpeed;
              if (textX > canvas.width) {
                textX = -textWidth;
              }
              break;
          }
          break;
        case Direction.Up:
          switch (props.scrollerConfig.textDirection) {
            case Direction.Up:
              textY += scrollSpeed;
              if (textY > canvas.height) {
                textY = -textHeight * text.length - canvas.height / 2;
              }
              break;
            case Direction.Left:
              textX -= scrollSpeed;
              if (textX + textWidth + canvas.height / 2 < 0) {
                textX = canvas.width + canvas.height / 2;
              }
              break;
            case Direction.Right:
              textX += scrollSpeed;
              if (textX > canvas.width + canvas.height / 2) {
                textX = -textWidth - canvas.height / 2;
              }
              break;
            case Direction.Down:
              textY -= scrollSpeed;
              if (textY + textHeight * text.length < 0) {
                textY = canvas.height;
              }
              break;
          }
          break;
        case Direction.Down:
          switch (props.scrollerConfig.textDirection) {
            case Direction.Up:
              textY -= scrollSpeed;
              if (textY + textHeight * text.length + canvas.height / 2 < 0) {
                textY = canvas.height - canvas.height / 2;
              }
              break;
            case Direction.Left:
              textX += scrollSpeed;
              if (textX > canvas.width + canvas.height / 2) {
                textX = -textWidth - canvas.height / 2;
              }
              break;
            case Direction.Right:
              textX -= scrollSpeed;
              if (textX + textWidth + canvas.height / 2 < 0) {
                textX = canvas.width + canvas.height / 2;
              }
              break;
            case Direction.Down:
              textY += scrollSpeed;
              if (textY > canvas.height) {
                textY = -textHeight * text.length;
              }
              break;
          }
          break;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    onCanvasResize();
    draw();

    window.addEventListener("resize", onCanvasResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onCanvasResize);
    };
  }, [props.scrollerConfig]);

  return (
    <canvas
      className={cn("w-full h-full", props.className)}
      style={{
        transform: "translate3d(0,0,0)",
      }}
      ref={canvasRef}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
    />
  );
}
