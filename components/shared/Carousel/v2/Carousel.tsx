import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import Icon from "../../Icon/v2/Icon";

interface CarouselProps<
  Item extends Record<string, unknown>,
  Key extends keyof Item = keyof Item,
> {
  items: (Item & Record<Key, string>)[];
  uniqueKey: Key;
  Component: FC<Item>;
}

export default function Carousel<Item extends Record<string, unknown>>({
  items,
  uniqueKey,
  Component,
}: Readonly<CarouselProps<Item>>) {
  const [showIndex, setShowIndex] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleChangePage = (action: "prev" | "next") => () => {
    const maxIndex = items.length - 1;

    switch (action) {
      case "prev":
        setShowIndex((preIndex) => {
          const newIndex = preIndex - 1;
          return newIndex > -1 ? newIndex : maxIndex;
        });
        break;
      case "next":
        setShowIndex((preIndex) => {
          const newIndex = preIndex + 1;
          return newIndex <= maxIndex ? newIndex : 0;
        });
        break;
      default:
    }
  };

  const buttonClassName =
    "p-2.5 shrink-0 bg-white/4 shadow-default rounded-2xl";
  const buttonIconClassName = "stroke-white w-6 h-6 pointer-events-none";

  useEffect(() => {
    setMaxWidth(carouselRef.current?.clientWidth || 0);
  }, []);

  return (
    <div className="flex items-center">
      <button
        type="button"
        className={buttonClassName}
        onClick={handleChangePage("prev")}
      >
        <Icon name="navArrowLeft" className={buttonIconClassName} />
      </button>
      <div ref={carouselRef} className="overflow-hidden w-full">
        <ul
          className="flex transition-transform translate-x-[var(--translate-x)]"
          style={
            {
              "--translate-x": `${showIndex * maxWidth * -1}px`,
            } as CSSProperties
          }
        >
          {Array.isArray(items) &&
            items.map((item) => (
              <li
                key={item[uniqueKey]}
                className="shrink-0 w-[var(--max-width)]"
                style={
                  {
                    "--max-width": `${maxWidth}px`,
                  } as CSSProperties
                }
              >
                <Component {...item} />
              </li>
            ))}
        </ul>
      </div>
      <button
        type="button"
        className={buttonClassName}
        onClick={handleChangePage("next")}
      >
        <Icon name="navArrowRight" className={buttonIconClassName} />
      </button>
    </div>
  );
}
