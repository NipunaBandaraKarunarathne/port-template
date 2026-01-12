import type { PortNode } from "../types/PortNode";

export const initialTree: PortNode = {
  id: "root",
  value: "",
  children: [
    { id: "A", value: "A", children: [] },
    {
      id: "B",
      value: "B",
      children: [
        {
          id: "D",
          value: "D",
          children: [
            {
              id: "E",
              value: "E",
              children: [{ id: "F", value: "F", children: [] }],
            },
          ],
        },
      ],
    },
    { id: "G", value: "G", children: [] },
    { id: "C", value: "C", children: [] },
  ],
};
