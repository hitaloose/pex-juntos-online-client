import type { Provider } from "./provider";

export type User = {
  id: number;
  email: string;
  provider: Provider;
};
