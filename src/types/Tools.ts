export enum Tool {
  Pencil,
  SymPencil,
  Eraser,
  Line,
  Rectangle,
  Circle,
  Triangle,
  Fill,
  BucketFill
}
export type ToolType = {
  name: string;
  icon: string;
  tool: Tool;
  variant?: ToolVariant[];
};
interface ToolVariant {
    name: string;
    value: string;
}
export const tools: ToolType[] = [
    
    {
        name: "Pencil",
        icon: "✏️",
        tool: Tool.Pencil,
    },
    {
        name: "SymPencil",
        icon: "✏️✏️",
        tool: Tool.SymPencil,
        variant: [{name: "Self", value: "xnyp"}, {name: "Y axis", value: "xnyn"}, {name: "X axis", value: "xpyp"}, {name: "XY axis", value: "xpyn"}],
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
    },
    {
        name: "Bucket Fill",
        icon: "💧",
        tool: Tool.BucketFill,
    },
]