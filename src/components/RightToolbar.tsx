import { useEffect } from "react";
import { useToolStore } from "../context/ToolStore";
import { Tool } from "../types/Tools";
import "../css/RightToolbar.css";
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
  } = useToolStore();
  useEffect(() => {
    document.addEventListener("keydown", keyboardShortcuts);
    return () => {
      document.removeEventListener("keydown", keyboardShortcuts);
    };
  }, []);

  const keyboardShortcuts = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "r") {
      return;
    }
    event.preventDefault();
    if (event.ctrlKey && event.key === "z") {
      undo();
    }
    if (event.ctrlKey && event.key === "y") {
      redo();
    }
    if (event.key === "r") {
      rotateCW();
    }
    if (event.key === "l") {
      rotateCCW();
    }
    if (event.key === "b") {
      setSelectedTool(Tool.BucketFill);
    }
    if (event.key === "p") {
      setSelectedTool(Tool.Pencil);
    }
    if (event.key === "e") {
      setSelectedTool(Tool.Eraser);
    }
  };
  return (
    <div className="bg-[#d9bda5] w-[200px]  flex justify-center items-center p-2">
      <div
        id="toolbar-right"
        className="flex flex-col justify-center items-center bg-[#e8cbb1] p-2 w-full"
      >
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="p-0"
        />
        <input
          type="number"
          value={pixelCount}
          style={{
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
          onChange={(e) => setPixelCount(parseInt(e.target.value))}
          className="p-0"
        />
        <button onClick={()=>{setSelectedTool(Tool.Pencil)}}>Pencil</button>
        <button onClick={()=>{setSelectedTool(Tool.Eraser)}}>Eraser</button>
        <button onClick={()=>{setSelectedTool(Tool.BucketFill)}}>BucketFill</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={rotateCW}>Rotate CW</button>
        <button onClick={rotateCCW}>Rotate CCW</button>
      </div>
    </div>
  );
}

export default RightToolbar;
