import { clsx } from "clsx";
import { FC, HTMLAttributes } from "react";
import styles from "./Counter.module.css";
import { TypeCounter } from "./Counter.type";

type TypeProps = TypeCounter & HTMLAttributes<HTMLDivElement>;

const getQuantity = (q: number | string) => {
  if (typeof q === "string") {
    return q.length > 3 ? q.slice(0, 3) : q;
  }
  return q > 99 ? "99+" : q;
};

const Counter: FC<TypeProps> = ({
  pulse = false,
  quantity = 0,
  size = 16,
  stroke = false,
  variant = "primary",
  stroke_color = "white",
  ...rest
}) => {
  return (
    <div
      className={clsx(
        styles[`size-${size}`],
        styles[variant],
        styles.counter,
        quantity.toString().length === 1 && styles["border_full"],
        size > 12 ? styles["with-content"] : styles["without-content"],
        stroke && styles[`border-${size}`]
      )}
      style={{ outlineColor: stroke_color }}
      {...rest}
    >
      {size > 12 && getQuantity(quantity)}

      {size <= 12 && pulse && (
        <>
          <div
            className={clsx(
              styles.pulse,
              styles[`pulse-size-${size}`],
              styles[`pulse-bg-${variant}`]
            )}
          ></div>
          <div
            className={clsx(
              styles.pulse,
              styles.two,
              styles[`pulse-size-${size}`],
              styles[`pulse-bg-${variant}`]
            )}
          ></div>
        </>
      )}
    </div>
  );
};

export default Counter;
