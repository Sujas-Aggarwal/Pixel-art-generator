import { useEffect } from "react";
import { useToolStore } from "../context/ToolStore";
import { Tool } from "../types/Tools";

function RightToolbar() {
  const {
    color,
    setColor,
    pixelCount,
    setPixelCount,
    selectedTool,
    setSelectedTool,
    undo,
    redo,
    rotateCW,
    rotateCCW,
    bucketFill,
  } = useToolStore();
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "z") {
        undo();
      }
      if (event.ctrlKey && event.key === "y") {
        redo();
      }
    });
    return () => {
      document.removeEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "z") {
          undo();
        }
        if (event.ctrlKey && event.key === "y") {
          redo();
        }
      });
    };
  }, []);
  return (
    <div className="toolbar bg-[#d9bda5] w-[200px]  flex justify-center items-center">
      <h1 className="text-center">Toolbar Space</h1>
      <div className="flex flex-col items-center">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-[100px] h-[50px] rounded-lg"
        />
        <input
          type="number"
          value={pixelCount}
          onChange={(e) => setPixelCount(parseInt(e.target.value))}
          className="w-[100px] h-[50px] rounded-lg"
        />
        <select
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value as any)}
          className="w-[100px] h-[50px] rounded-lg"
        >
          <option value={Tool.Pencil}>Pencil</option>
          <option value={Tool.Eraser}>Eraser</option>
          <option value={Tool.BucketFill}>Bucket Fill</option>
        </select>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={rotateCW}>Rotate CW</button>
        <button onClick={rotateCCW}>Rotate CCW</button>
      </div>
    </div>
  );
}

export default RightToolbar;
