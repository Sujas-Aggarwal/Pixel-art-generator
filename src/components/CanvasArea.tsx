import { useEffect, useRef, useState } from "react";
import { Tool } from "../types/Tools";

function CanvasArea({
    pixelCount,
    pixels,
    setPixels,
    color,
    }: {
    pixelCount: number;
    pixels: string[][];
    setPixels: React.Dispatch<React.SetStateAction<string[][]>>;
    color: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridDiv = gridLinesRef.current;
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
      function clearGrid() {
        const spans = gridDiv?.querySelectorAll("span");
        setPixels(() => {
          const newPixels = new Array(pixelCount).fill(
            new Array(pixelCount).fill("")
          );
          return newPixels;
        });
        spans?.forEach((span) => {
          span.style.background = "white";
          span.style.outline = "rgba(0,0,0,0.2) 1px solid";
        });
      }
      function paintGrid(targetSpan: HTMLSpanElement, color: string) {
        if (targetSpan.style.background === color) return;
        targetSpan.style.background = color;
        targetSpan.style.outline = `${color} 1px solid`;
        const row = parseInt(targetSpan.dataset.row!);
        const col = parseInt(targetSpan.dataset.col!);
        if (row < 1 || col < 1) return;
        if (row > pixelCount || col > pixelCount) return;
        if (isNaN(row) || isNaN(col)) return;
        setPixels((prevPixels) => {
          const newPixels = [...prevPixels];
          newPixels[row - 1][col - 1] = color;
          return newPixels;
        });
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
            paintGrid(e.target as HTMLSpanElement, color);
          });
          span.addEventListener("mousedown", (e) => {
            paintGrid(e.target as HTMLSpanElement, color);
          });
          fragment.appendChild(span);
        }
      }
      gridDiv.appendChild(fragment);
    }
  }, [pixelCount]);
  return (
    <div className="bg-[#f6eee3] w-full h-full flex justify-center items-center">
      <div className=" aspect-square h-[90%] flex justify-stretch items-stretch relative border-solid border-[#d9bda5] border-[10px]">
        <canvas
          className=" aspect-square h-full pointer-events-none"
          ref={canvasRef}
          id="canvas"
        ></canvas>
        <div
          ref={gridLinesRef}
          className="grid-lines grid absolute w-full h-full top-0 left-0 z-10 "
        ></div>
      </div>
    </div>
  );
}

export default CanvasArea;
