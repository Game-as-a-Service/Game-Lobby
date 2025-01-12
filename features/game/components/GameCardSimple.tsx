import { PropsWithChildren } from "react";

import gameDefaultCoverImg from "@/public/images/game-default-cover.png";
import { GameType } from "@/requests/games";
import Image from "@/components/shared/Image";

function GameCardSimple({ children, img, name }: PropsWithChildren<GameType>) {
  return (
    <div className="group">
      <div className="relative aspect-game-cover flex items-end justify-end">
        <picture className="overflow-hidden">
          <Image
            src={img || gameDefaultCoverImg.src}
            alt={name}
            className="object-cover"
            fill
          />
        </picture>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          {children}
        </div>
      </div>
      <h2>{name}</h2>
    </div>
  );
}

export default GameCardSimple;
