import { common } from "./common";
import { home } from "./home";
import { meta } from "./meta";

export const en = { common, home, meta } as const;

export type Dictionary = typeof en;
