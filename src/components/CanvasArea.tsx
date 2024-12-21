import { useEffect, useRef } from "react";
import { useToolStore } from "../context/ToolStore";
import { Tool } from "../types/Tools";

function CanvasArea() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setPixels, pixels, pixelCount, color, gridRef, selectedTool } =
    useToolStore();
  useEffect(() => {
    const gridDiv = gridRef.current;
    //disabling right click
    gridDiv?.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    // to get the grid effect, I just need to get height and width multiplied by pixelCount and place spans
    if (gridDiv) {
      gridDiv.innerHTML = "";
      gridDiv.style.gridTemplateRows = `repeat(${pixelCount}, minmax(0, 1fr))`;
      gridDiv.style.gridTemplateColumns = `repeat(${pixelCount}, minmax(0, 1fr))`;
      const gridWidth = gridDiv.scrollWidth;
      const gridHeight = gridDiv.scrollHeight;
      const fragment = document.createDocumentFragment();
      function paintGrid(targetSpan: HTMLSpanElement) {
        if (selectedTool == Tool.Eraser) {
          targetSpan.style.background = "none";
          targetSpan.style.outline = `#f6eee3 1px solid`;
          const row = parseInt(targetSpan.dataset.row!);
          const col = parseInt(targetSpan.dataset.col!);
          if (row < 1 || col < 1) return;
          if (row > pixelCount || col > pixelCount) return;
          if (isNaN(row) || isNaN(col)) return;
          const newPixels = [...pixels];
          newPixels[row - 1][col - 1] = "#f6eee3";
          setPixels(newPixels);
          return;
        } else if (selectedTool == Tool.Pencil) {
          if (targetSpan.style.background === color) return;
          targetSpan.style.background = color;
          targetSpan.style.outline = `${color} 1px solid`;
          const row = parseInt(targetSpan.dataset.row!);
          const col = parseInt(targetSpan.dataset.col!);
          if (row < 1 || col < 1) return;
          if (row > pixelCount || col > pixelCount) return;
          if (isNaN(row) || isNaN(col)) return;
          const newPixels = [...pixels];
          newPixels[row - 1][col - 1] = color;
          setPixels(newPixels);
        }
      }
      //drawing horizontal lines
      for (let row = 1; row < pixelCount + 1; row++) {
        for (let col = 1; col < pixelCount + 1; col++) {
          const span = document.createElement("span");
          span.style.height = gridHeight / pixelCount + "px";
          span.style.width = gridWidth / pixelCount + "px";
          span.setAttribute("ondragstart", "return false");
          span.style.outline = "rgba(0,0,0,0.2) 1px solid";
          span.style.display = "block";
          span.setAttribute("data-row", row.toString());
          span.setAttribute("data-col", col.toString());
          span.addEventListener("mouseover", (e) => {
            //check if mouse is pressing right click
            if (e.buttons !== 1) return;
            paintGrid(e.target as HTMLSpanElement);
          });
          span.addEventListener("mousedown", (e) => {
            paintGrid(e.target as HTMLSpanElement);
          });
          fragment.appendChild(span);
        }
      }
      gridDiv.appendChild(fragment);
    }
  }, [selectedTool,color, pixelCount]);
  return (
    <div className="bg-[#f6eee3] w-full h-full flex justify-center items-center">
      <div className=" aspect-square h-[90%] flex justify-stretch items-stretch relative border-solid border-[#d9bda5] border-[10px]">
        <canvas
          className=" aspect-square h-full pointer-events-none"
          ref={canvasRef}
          id="canvas"
        ></canvas>
        <div
          ref={gridRef}
          className="grid-lines grid absolute w-full h-full top-0 left-0 z-10 "
        ></div>
      </div>
    </div>
  );
}

export default CanvasArea;
