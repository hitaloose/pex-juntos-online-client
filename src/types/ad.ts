import type { Provider } from "./provider";

export type Ad = {
  id: number;
  title: string;
  description: string;
  category: string;
  provider: Provider;
  status: string;
};
