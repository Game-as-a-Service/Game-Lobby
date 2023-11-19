import { PropsWithChildren } from "react";
import Icon from "@/components/shared/Icon";
import SearchDrawer from "./SearchDrawer";

interface TagProps extends React.ComponentPropsWithoutRef<"div"> {}

const SearchBarDumb = ({}: PropsWithChildren<TagProps>) => {
  return (
    <div
      className={
        "flex items-start justify-center w-[484px] p-1 pl-4 rounded-[40px] bg-white bg-opacity-[.08] backdrop-blur-[20px]"
      }
    >
      <button
        className={
          "flex flex-grow flex-shrink-0 flex-basis-0 items-center justify-center px-3 py-2.5 rounded-[100px] text-primary-300 hover:bg-white hover:bg-opacity-[.08] active:bg-[#CEBFEF] active:bg-opacity-20"
        }
      >
        類型
      </button>
      <div
        id={"search-bar"}
        className={
          "flex flex-grow flex-shrink-0 flex-basis-0 items-center h-11 pl-4 pr-1 ml-4 rounded-[28px] text-gray-500 bg-white bg-opacity-[.08] backdrop-blur-[60px]"
        }
      >
        <input
          type={"text"}
          className={"w-[324px] bg-transparent"}
          placeholder={"在此輸入今天想玩的遊戲"}
        />
        <div className={"w-11 h-11 p-2.5 ml-1"}>
          <Icon name="search" className="w-6 h-6 [&_*]:stroke-white" />
        </div>
      </div>
    </div>
  );
};

export default SearchBarDumb;
