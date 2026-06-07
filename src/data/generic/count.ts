import type { Count } from "./count-types";

export const newCountComponent = (count: number): Count => ({
  count,
  name: `${count}x`,
  type: "count",
});
