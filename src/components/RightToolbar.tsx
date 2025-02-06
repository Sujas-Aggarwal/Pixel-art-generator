import { useEffect } from "react";
import { useToolStore } from "../context/ToolStore";
import { Tool } from "../types/Tools";
import pencil from "../assets/icons/pencil.svg";
import symPencil from "../assets/icons/sympencil.svg";
import eraser from "../assets/icons/eraser.svg";
import bucket from "../assets/icons/bucket.svg";
import undoImg from "../assets/icons/undo.svg";
import redoImg from "../assets/icons/redo.svg";
import rotateImg from "../assets/icons/rotate.svg";
import antirotateImg from "../assets/icons/antirotate.svg";
import reset from "../assets/icons/refresh.svg";
import { tools } from "../types/Tools";

import "../css/RightToolbar.css";
function RightToolbar() {
  const {
    color,
    setColor,
    pixelCount,
    setPixelCount,
    pixels,
    setSelectedTool,
    toolVarient,
    setToolVarient,
    undo,
    selectedTool,
    exportImage,
    clearPixels,
    redo,
    rotateCW,
    rotateCCW,
  } = useToolStore();
  useEffect(() => {
    setToolVarient((x: boolean[]) => new Array(tools[selectedTool].variant?.length).fill(false));
  }, [selectedTool]);
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
    <div className="bg-[#d9bda5] w-[200px] select-none  flex flex-col justify-center items-center p-2">
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
        <div className="flex gap-1 items-center justify-center text-center">
          <label className="whitespace-nowrap">Pixel Number:</label>
          <input
            type="number"
            className="min-w-[35px] bg-transparent outline-none"
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
        </div>
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
              boxShadow: selectedTool === Tool.SymPencil ? "0 0 0 1px #000" : "",
            }}
            onClick={() => {
              setSelectedTool(Tool.SymPencil);
            }}
          >
            <img src={symPencil} alt="Pencil" title="Pencil" />
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
      <hr/>      <hr/>
      <div id = "toolbar-right" className="flex flex-col flex-wrap gap-1 justify-center items-center bg-[#e8cbb1] p-2 w-full ">
        {Tool[selectedTool]} :
        <div className="flex flex-row flex-wrap gap-1 justify-center items-center bg-[#e8cbb1] p-2 w-full ">
        {tools[selectedTool].variant?.map((variant, index) =>           
        <button key={index}
        style={{
          boxShadow: toolVarient[index] ? "0 0 0 1px #000" : "",
        }}
        onClick={() => {
          setToolVarient((x: boolean[]) => [...x.slice(0, index), !x[index], ...x.slice(index + 1)]);
        }}
      >
        <img src={"/assets/icons/"+variant.value+ ".svg"} alt= {variant.name} title={variant.name} />
    </button>
        )}</div>
      </div>
    </div>
  );
}

export default RightToolbar;
