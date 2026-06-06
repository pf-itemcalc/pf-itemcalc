import type { Count } from "./count-types";

export const newCountItem = (count: number): Count => ({
  count,
  name: `${count}x`,
  type: "count",
});
