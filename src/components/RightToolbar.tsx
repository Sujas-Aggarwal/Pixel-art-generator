import { useEffect } from "react";
import { useToolStore } from "../context/ToolStore";
import { Tool } from "../types/Tools";
import pencil from "../assets/icons/pencil.svg";
import eraser from "../assets/icons/eraser.svg";
import bucket from "../assets/icons/bucket.svg";
import undoImg from "../assets/icons/undo.svg";
import redoImg from "../assets/icons/redo.svg";
import rotateImg from "../assets/icons/rotate.svg";
import antirotateImg from "../assets/icons/antirotate.svg";
import reset from "../assets/icons/refresh.svg";
import "../css/RightToolbar.css";
function RightToolbar() {
  const {
    color,
    setColor,
    pixelCount,
    setPixelCount,
    pixels,
    setSelectedTool,
    undo,
    selectedTool,
    exportImage,
    clearPixels,
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
    event.preventDefault();
    if (event.ctrlKey && event.key === "z") {
      undo();
    }
    if (event.ctrlKey && event.key === "y") {
      redo();
    }
    if (event.ctrlKey && event.key === "s") {
      exportImage();
    }
    if (event.key === ";") {
      rotateCW();
    }
    if (event.key === "'") {
      rotateCCW();
    }
    if (event.key === "1") {
      setSelectedTool(Tool.Pencil);
    }
    if (event.key === "2") {
      setSelectedTool(Tool.Eraser);
    }
    if (event.key === "3") {
      setSelectedTool(Tool.BucketFill);
    }
    if (event.ctrlKey && event.key === "r") {
      clearPixels(pixels);
    }
  };
  return (
    <div className="bg-[#d9bda5] w-[200px] select-none  flex justify-center items-center p-2">
      <div
        id="toolbar-right"
        className="flex flex-col justify-center items-center bg-[#e8cbb1] p-2 w-full"
      >
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="p-0 m-2"
        />
        <label htmlFor="">Pixel Number</label>
        <input
          type="number"
          className="!w-full"
          min={8}
          max={64}
          value={pixelCount}
          onChange={(e) => {
            if (pixels.some((row) => row.some((col) => col !== ""))) {
              const confirm = window.confirm(
                "Changing the pixel count will clear the canvas. Are you sure?"
              );
              if (!confirm) return;
            }
            setPixelCount(parseInt(e.target.value));
          }}
        />
        <div className="w-full flex flex-wrap gap-2 p-4 justify-center mx-auto">
          <button
            style={{
              boxShadow: selectedTool === Tool.Pencil ? "0 0 0 1px #000" : "",
            }}
            onClick={() => {
              setSelectedTool(Tool.Pencil);
            }}
          >
            <img src={pencil} alt="Pencil" title="Pencil" />
          </button>
          <button
            style={{
              boxShadow: selectedTool === Tool.Eraser ? "0 0 0 1px #000" : "",
            }}
            onClick={() => {
              setSelectedTool(Tool.Eraser);
            }}
          >
            <img src={eraser} alt="eraser" title="eraser" />
          </button>
          <button
            style={{
              boxShadow:
                selectedTool === Tool.BucketFill ? "0 0 0 1px #000" : "",
            }}
            onClick={() => {
              setSelectedTool(Tool.BucketFill);
            }}
          >
            <img src={bucket} alt="bucket" title="bucket" />
          </button>
          <button
            className="active:shadow-inner active:shadow-black/30"
            onClick={undo}
          >
            <img src={undoImg} alt="undo" title="undo" />
          </button>
          <button
            className="active:shadow-inner active:shadow-black/30"
            onClick={redo}
          >
            <img src={redoImg} alt="redo" title="redo" />
          </button>
          <button
            className="active:shadow-inner active:shadow-black/30"
            onClick={rotateCW}
          >
            <img src={rotateImg} alt="rotate" title="rotate" />
          </button>
          <button
            className="active:shadow-inner active:shadow-black/30"
            onClick={rotateCCW}
          >
            <img src={antirotateImg} alt="antirotate" title="antirotate" />
          </button>
          <button
            className="active:shadow-inner active:shadow-black/30"
            onClick={() => {
              clearPixels(pixels);
            }}
          >
            <img src={reset} alt="reset" title="reset" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RightToolbar;
