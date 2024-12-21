import { useEffect, useState } from "react";
import CanvasArea from "../components/CanvasArea";
import LeftToolbar from "../components/LeftToolbar";
import RightToolbar from "../components/RightToolbar";
import { Tool } from "../types/Tools";

function Home() {
  const [pixelCount, setPixelCount] = useState<number>(16);
  const [selectedTool, setSelectedTool] = useState<Tool>(Tool.Pencil);
  const [pixels, setPixels] = useState<string[][]>([[]]);
  const [color, setColor] = useState<string>("#d9bda5");
  useEffect(() => {
    setPixels(() => {
      const newPixels = new Array(pixelCount)
        .fill("")
        .map(() => new Array(pixelCount).fill(""));
      return newPixels;
    });
  }, [pixelCount]);
  return (
    <div className="w-full h-screen overflow-hidden bg-white flex justify-stretch items-stretch">
      <LeftToolbar />
      <CanvasArea />
      <RightToolbar />
    </div>
  );
}

export default Home;
