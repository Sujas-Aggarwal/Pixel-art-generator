import { useEffect } from "react";
import { useToolStore } from "../context/ToolStore";
function CanvasArea() {
  const {
    pixelCount,
    paintCanvas,
    gridRef,
    canvasRef,
  } = useToolStore();
  useEffect(() => {
    const canvas = canvasRef.current;
    const gridDiv = gridRef.current;
    if (!canvas || !gridDiv) return;
    //setting canvas width and height
    canvas.width = gridDiv.scrollWidth;
    canvas.height = gridDiv.scrollHeight;
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
            paintCanvas(row,col);
          });
          span.addEventListener("mousedown", (e) => {
            paintCanvas(row,col);
          });
          fragment.appendChild(span);
        }
      }
      gridDiv.appendChild(fragment);
    }
  }, [pixelCount]);
  return (
    <div className="bg-[#f6eee3] gap-1 w-full h-full flex justify-center items-center flex-col">
      <div className="aspect-square h-[90%] flex justify-stretch items-stretch relative border-solid border-[#d9bda5] border-[10px]">
        <canvas
          className=" aspect-square h-full pointer-events-none z-20"
          ref={canvasRef}
          id="canvas"
        ></canvas>
        <div
          ref={gridRef}
          className="grid-lines opacity-20  grid absolute w-full h-full top-0 left-0 z-10 "
        ></div>
      </div>
      <p>Made with ❤️ by <a className="font-bold hover:underline" href="https://github.com/Sujas-Aggarwal" target="_blank">Sujas Aggarwal</a></p>
    </div>
  );
}

export default CanvasArea;
