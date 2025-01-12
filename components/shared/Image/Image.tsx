import { ReactEventHandler } from "react";
import gameDefaultCoverImg from "@/public/images/game-default-cover.png";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
  fill?: boolean;
}

function Image({
  alt,
  onError,
  priority,
  fill,
  className,
  ...restProps
}: ImageProps) {
  const handleError: ReactEventHandler<HTMLImageElement> = (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.target.src = gameDefaultCoverImg.src;
    }
    onError?.(e);
  };
  return (
    <picture>
      <img
        alt={alt}
        className={cn(className, fill && "absolute inset-0 w-full h-full")}
        draggable={false}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={handleError}
        // @ts-ignore https://github.com/vercel/next.js/issues/65161
        fetchpriority={priority ? "high" : "auto"}
        {...restProps}
      />
    </picture>
  );
}

export default Image;
