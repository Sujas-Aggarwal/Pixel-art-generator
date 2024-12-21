import { useEffect, useRef, useState } from "react";

function CanvasArea() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);
  const [pixelCount, setPixelCount] = useState<number>(16);
  useEffect(() => {
    const gridDiv = gridLinesRef.current;
    // to get the grid effect, I just need to get height and width multiplied by pixelCount and place spans
    if (gridDiv) {
      gridDiv.innerHTML = "";
      gridDiv.style.gridTemplateRows = `repeat(${pixelCount}, minmax(0, 1fr))`;
      gridDiv.style.gridTemplateColumns = `repeat(${pixelCount}, minmax(0, 1fr))`;
      const gridWidth = gridDiv.scrollWidth;
      const gridHeight = gridDiv.scrollHeight;
      const fragment = document.createDocumentFragment();
      //drawing horizontal lines
      for (let i = 0; i < pixelCount*pixelCount; i++) {
        const span = document.createElement("span");
        span.style.height = (gridHeight / pixelCount) + "px";
        span.style.width = (gridWidth / pixelCount) + "px";
        // span.style.border = "white 0.02px solid"
        span.style.outline = "black 1px solid";
        span.style.display = "block";
        span.addEventListener("click",(e)=>{
            const thisSpan = e.target as HTMLSpanElement;
            thisSpan.style.background = "black";
        })
        // span.style.background= "black";
        fragment.appendChild(span);
      }
      gridDiv.appendChild(fragment);
    }
  }, [pixelCount]);
  return (
    <div className="bg-gray-200 w-full h-full flex justify-center items-center">
      <div className="bg-slate-200 aspect-square h-[90%] flex justify-stretch items-stretch relative border-solid border-purple-500 border-4">
        <canvas
          className=" aspect-square h-full"
          ref={canvasRef}
          id="canvas"
        ></canvas>
        <div ref={gridLinesRef} className="grid-lines grid absolute w-full h-full top-0 left-0 z-10 "></div>
      </div>
    </div>
  );
}

export default CanvasArea;
