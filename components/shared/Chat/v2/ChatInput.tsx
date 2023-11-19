import { FormEventHandler, useState } from "react";
import { cn } from "@/lib/utils";
import Icon from "../../Icon";
import type { MessageType } from "./ChatMessages";

type ChatInputProps = {
  userId: string;
  disabled: boolean;
  onSubmit: (message: MessageType) => void;
};

export default function ChatInput({
  userId,
  disabled,
  onSubmit,
}: Readonly<ChatInputProps>) {
  const [value, setValue] = useState("");

  const sendMessage: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (disabled) return;
    const content = value.trim();
    if (!content) return;
    setValue("");
    onSubmit({
      from: userId,
      target: "",
      content,
    });
  };

  return (
    <div className="bg-primary-50/4 p-2">
      <div className="gradient-purple rounded-full">
        <div className="body-bg border border-transparent bg-clip-padding rounded-full overflow-hidden">
          <div className="bg-primary-50/8">
            <form
              onSubmit={sendMessage}
              className={cn("p-2 flex", disabled && "pointer-events-none")}
            >
              <input
                type="text"
                className="text-primary-100 bg-transparent grow outline-none placeholder:text-grey-500"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="請輸入文字"
                disabled={disabled}
              />
              <button type="submit" aria-label="send message">
                <Icon
                  name="sent"
                  className={cn(
                    "w-6 h-6 stroke-grey-500 fill-grey-700",
                    value.trim() && "stroke-primary-100 fill-grey-700"
                  )}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
