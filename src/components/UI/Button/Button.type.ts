export type TypeButton = {
  variant?: "primary" | "secondary";
  size?: 28 | 36 | 56;
  state?: "enabled" | "loading" | "disabled";
  focused?: boolean;
  data_testid_content?: string | number;
};
