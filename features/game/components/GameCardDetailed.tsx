import { PropsWithChildren } from "react";

import gameDefaultCoverImg from "@/public/images/game-default-cover.png";
import { GameType } from "@/requests/games";
import Icon from "@/components/shared/Icon";
import Image from "@/components/shared/Image";

function GameCardDetailed({
  children,
  img,
  name,
  createdOn,
  maxPlayers,
  minPlayers,
}: PropsWithChildren<GameType>) {
  return (
    <div className="flex text-white mx-10 px-11 gap-4">
      <div className="relative flex items-end justify-end flex-[60%]">
        <Image
          src={img || gameDefaultCoverImg.src}
          alt={name}
          className="object-cover"
          fill
        />
        {children}
      </div>
      <div className="flex-[40%] p-4 rounded-lg bg-primary-50/8">
        <div className="text-xs text-primary-300">Game Name</div>
        <div className="text-xl text-primary-100">{name}</div>
        <div className="flex gap-6 mb-2 text-xs text-primary-300">
          <div className="flex-1 flex items-center gap-1.5">
            <span>4.8</span>
            <Icon name="Star" className="w-3 h-3 fill-yellow-400" />
            <Icon name="Star" className="w-3 h-3 fill-yellow-400" />
            <Icon name="Star" className="w-3 h-3 fill-yellow-400" />
            <Icon name="Star" className="w-3 h-3 fill-yellow-400" />
            <Icon name="Star" className="w-3 h-3 fill-yellow-400" />
            <span>(66)</span>
          </div>
          <time className="flex-1 flex items-center gap-1">
            <Icon name="Calendar" className="w-3 h-3" />
            {createdOn.slice(0, 10).replace(/-/g, ".")}
          </time>
        </div>
        <div className="mb-3">
          <ul className="flex gap-3">
            <li className="relative w-16 h-10">
              {img && (
                <Image src={img} alt={name} className="object-cover" fill />
              )}
            </li>
          </ul>
        </div>
        <div className="mb-3 text-xs text-primary-50 h-12">暫無描述</div>
        <div>
          <ul className="flex flex-wrap gap-2 text-xs h-12">
            {maxPlayers === 1 && (
              <li className="bg-primary-800 text-primary-300 rounded-full px-2 py-0.5 h-fit">
                單人遊戲
              </li>
            )}
            {maxPlayers === minPlayers && maxPlayers > 1 && (
              <li className="bg-primary-800 text-primary-300 rounded-full px-2 py-0.5 h-fit">
                {maxPlayers} 人遊戲
              </li>
            )}
            {maxPlayers !== minPlayers && maxPlayers > 1 && (
              <li className="bg-primary-800 text-primary-300 rounded-full px-2 py-0.5 h-fit">
                {minPlayers} - {maxPlayers} 玩家
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GameCardDetailed;
