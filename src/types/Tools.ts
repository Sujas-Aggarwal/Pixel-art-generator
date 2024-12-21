export enum Tool {
  Pencil,
  Eraser,
  Line,
  Rectangle,
  Circle,
  Triangle,
  Fill,
}
export type ToolType = {
  name: string;
  icon: string;
  tool: Tool;
};

export const tools: ToolType[] = [
    {
        name: "Pencil",
        icon: "✏️",
        tool: Tool.Pencil,
    },
    {
        name: "Eraser",
        icon: "🧽",
        tool: Tool.Eraser,
    },
    {
        name: "Line",
        icon: "📏",
        tool: Tool.Line,
    },
    {
        name: "Rectangle",
        icon: "🔲",
        tool: Tool.Rectangle,
    },
    {
        name: "Circle",
        icon: "🔵",
        tool: Tool.Circle,
    },
    {
        name: "Triangle",
        icon: "🔺",
        tool: Tool.Triangle,
    },
    {
        name: "Fill",
        icon: "🎨",
        tool: Tool.Fill,
    }
]