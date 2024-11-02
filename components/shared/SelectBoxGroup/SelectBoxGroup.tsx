import { Key, ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

interface Item<T> {
  key: Key;
  label: ReactNode;
  value: T;
}

interface SelectBoxGroupProps<T> {
  items: Item<T>[];

  /** The current value of the input */
  value?: T;

  /** The label text */
  label?: string;

  /** For root class name */
  className?: string;

  /** For label class name */
  labelClassName?: string;

  /** For item class name */
  itemClassName?: string;

  /** For item wrapper class name */
  itemWrapperClassName?: string;

  /**
   * Callback function that is called when the value of the input changes.
   * @param value - The new value of the input.
   */
  onChange?: (value: T) => void;
}

function SelectBoxGroup<T = string>({
  items,
  value,
  label,
  className,
  labelClassName,
  itemClassName,
  itemWrapperClassName,
  onChange,
}: Readonly<SelectBoxGroupProps<T>>) {
  const reactId = useId();
  const selectBoxId = `select_box_${reactId}`;

  return (
    <div className={className}>
      {label && (
        <label
          className={cn(
            "block mb-1 font-medium text-primary-200",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <ul className={cn("inline-flex gap-2.5", itemWrapperClassName)}>
        {items.map((item) => (
          <li key={item.key} className={itemClassName}>
            <label
              className={cn(
                "block box-border leading-tight text-primary-200 bg-primary-200/20",
                "border-2 border-transparent rounded-lg cursor-pointer",
                value === item.value && "border-primary-200 text-primary-50"
              )}
              htmlFor={`${selectBoxId}_${item.key}`}
              aria-checked={value === item.value}
            >
              {item.label}
            </label>
            <input
              type="checkbox"
              id={`${selectBoxId}_${item.key}`}
              checked={value === item.value}
              className="absolute w-0 h-0 pointer-events-none"
              onChange={() => onChange?.(item.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectBoxGroup;
