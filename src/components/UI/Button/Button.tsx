import { clsx } from "clsx";
import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import Counter from "../Counter/Counter";
import styles from "./Button.module.css";
import { TypeButton } from "./Button.type";

const ButtonContext = createContext<TypeButton>({});
const useButtonContext = () => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error("useButtonContext must be used within a Button component");
  }
  return context;
};

type ButtonProps = TypeButton & ButtonHTMLAttributes<HTMLButtonElement>;

const counterSize: Record<number, 16 | 20 | 24> = {
  28: 16,
  36: 20,
  56: 24,
};

const counterBg = {
  primary: "rgba(255,255,255,0.12)",
  secondary: "rgba(131,102,86,0.12)",
};

const Button = ({
  focused = false,
  variant = "primary",
  size = 36,
  state = "enabled",
  data_testid_content,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const [pulseStyle, setPulseStyle] = useState({});
  const [isLoading, setIsLoading] = useState(state === "loading");
  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    setPulseStyle({
      top: `${y}px`,
      left: `${x}px`,
      width: `${size}px`,
      height: `${size}px`,
    });
  };

  const handleClick = () => {
    setIsLoading(true);
  };
  return (
    <ButtonContext.Provider value={{ size, variant }}>
      <button
        className={clsx(
          styles.btn,
          styles[variant],
          styles[`size-${size}`],
          styles[`loader-${size}`],
          {
            [styles.loading]: isLoading,
            [styles["disabled"]]: state === "disabled",
            [styles["focused"]]: focused,
          }
        )}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        {...rest}
      >
        <span className={clsx(styles.pulse)} style={pulseStyle}></span>
        <span
          className={clsx(styles.content, { [styles.hidden]: isLoading })}
        ></span>
        <div className={clsx(styles.content)} data-testid={data_testid_content}>
          {children}
        </div>
        {isLoading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className={styles.progressIndicator}
          >
            <radialGradient
              id="a12"
              cx=".66"
              fx=".66"
              cy=".3125"
              fy=".3125"
              gradientTransform="scale(1.5)"
            >
              <stop offset="0" stop-color="#FF156D"></stop>
              <stop offset=".3" stop-color="#FF156D" stop-opacity=".9"></stop>
              <stop offset=".6" stop-color="#FF156D" stop-opacity=".6"></stop>
              <stop offset=".8" stop-color="#FF156D" stop-opacity=".3"></stop>
              <stop offset="1" stop-color="#FF156D" stop-opacity="0"></stop>
            </radialGradient>
            <circle
              transform-origin="center"
              fill="none"
              stroke="url(#a12)"
              stroke-width="15"
              stroke-linecap="round"
              stroke-dasharray="200 1000"
              stroke-dashoffset="0"
              cx="100"
              cy="100"
              r="70"
            >
              <animateTransform
                type="rotate"
                attributeName="transform"
                calcMode="spline"
                dur="2"
                values="360;0"
                keyTimes="0;1"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
            <circle
              transform-origin="center"
              fill="none"
              opacity=".2"
              stroke="#FF156D"
              stroke-width="15"
              stroke-linecap="round"
              cx="100"
              cy="100"
              r="70"
            ></circle>
          </svg>
        )}
        <div className={styles.shimmer}></div>
      </button>
    </ButtonContext.Provider>
  );
};

Button.Counter = ({ quantity = 0 }: { quantity?: string | number }) => {
  const { variant = "primary", size = 36 } = useButtonContext();
  return (
    <Counter
      quantity={quantity}
      size={counterSize[size]}
      variant={variant}
      style={{
        backgroundColor: counterBg[variant],
      }}
    />
  );
};

Button.Text = ({ text }: { text: string | number }) => {
  return <div className={styles["truncate"]}>{text}</div>;
};

export default Button;
