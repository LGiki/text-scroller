import { cn } from "@/lib/utils";
import { Direction, TextScrollerConfig } from "@/types/text-scroller";
import { BlinkFrequencySettings } from "@/utils/constants";
import { useEffect, useRef } from "react";

export default function TextScrollerCanvas(props: {
  onClick?: () => void;
  scrollerConfig: TextScrollerConfig;
  className?: string;
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
    const speed = 10;

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
      const globalAlphaBackup = ctx.globalAlpha;
      ctx.globalAlpha = 1;
      ctx.fillStyle = props.scrollerConfig.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = globalAlphaBackup;

      const fontSizePercentage = parseInt(
        props.scrollerConfig.fontSizePercentage
      );
      const fontSize =
        (fontSizePercentage / 100) *
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
        ctx.globalAlpha = blinkOpacity;
      }

      if (props.scrollerConfig.glow) {
        ctx.shadowColor = props.scrollerConfig.textColor;
        // 10%: 5 8 11
        // 20%: 7 10 13
        // 30%:
        // 40%:
        // 50%:
        // 60%:
        // 70%:
        // 80%:
        // 90%:
        //100%: 15 35 50
        ctx.shadowBlur = 50;
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
          if (props.scrollerConfig.textDirection === Direction.Up) {
            textX += speed;
            if (textX > canvas.width) {
              textX = -textWidth - canvas.width / 2;
            }
          } else if (props.scrollerConfig.textDirection === Direction.Left) {
            textY += speed;
            if (textY - canvas.width / 2 > canvas.height) {
              textY = -textHeight * text.length - canvas.width / 2;
            }
          } else if (props.scrollerConfig.textDirection === Direction.Right) {
            textY -= speed;
            if (textY + textHeight * text.length + canvas.width / 2 < 0) {
              textY = canvas.height + canvas.width / 2;
            }
          } else {
            textX -= speed;
            if (textX + textWidth < 0) {
              textX = canvas.width;
            }
          }
          break;
        case Direction.Right:
          if (props.scrollerConfig.textDirection === Direction.Up) {
            textX -= speed;
            if (textX + textWidth + canvas.width / 2 < 0) {
              textX = canvas.width - canvas.width / 2;
            }
          } else if (props.scrollerConfig.textDirection === Direction.Left) {
            textY -= speed;
            if (textY + textHeight * text.length + canvas.width / 2 < 0) {
              textY = canvas.height + canvas.width / 2;
            }
          } else if (props.scrollerConfig.textDirection === Direction.Right) {
            textY += speed;
            if (textY > canvas.height + canvas.width / 2) {
              textY = -textHeight * text.length - canvas.width / 2;
            }
          } else {
            textX += speed;
            if (textX > canvas.width) {
              textX = -textWidth;
            }
          }
          break;
        case Direction.Up:
          if (props.scrollerConfig.textDirection === Direction.Up) {
            textY += speed;
            if (textY > canvas.height) {
              textY = -textHeight * text.length - canvas.height / 2;
            }
          } else if (props.scrollerConfig.textDirection === Direction.Left) {
            textX -= speed;
            if (textX + textWidth + canvas.height / 2 < 0) {
              textX = canvas.width + canvas.height / 2;
            }
          } else if (props.scrollerConfig.textDirection === Direction.Right) {
            textX += speed;
            if (textX > canvas.width + canvas.height / 2) {
              textX = -textWidth - canvas.height / 2;
            }
          } else {
            textY -= speed;
            if (textY + textHeight * text.length < 0) {
              textY = canvas.height;
            }
          }
          break;
        case Direction.Down:
          if (props.scrollerConfig.textDirection === Direction.Up) {
            textY -= speed;
            if (textY + textHeight * text.length + canvas.height / 2 < 0) {
              textY = canvas.height - canvas.height / 2;
            }
          } else if (props.scrollerConfig.textDirection === Direction.Left) {
            textX += speed;
            if (textX > canvas.width + canvas.height / 2) {
              textX = -textWidth - canvas.height / 2;
            }
          } else if (props.scrollerConfig.textDirection === Direction.Right) {
            textX -= speed;
            if (textX + textWidth + canvas.height / 2 < 0) {
              textX = canvas.width + canvas.height / 2;
            }
          } else {
            textY += speed;
            if (textY > canvas.height) {
              textY = -textHeight * text.length;
            }
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
    />
  );
}
