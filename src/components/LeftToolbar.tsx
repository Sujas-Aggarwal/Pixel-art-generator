import { useToolStore } from "../context/ToolStore";

function LeftToolbar() {
    const {exportImage , exportVector } = useToolStore();
  return (

    <div className="w-[100px] min-w-[100px] bg-[#d9bda5] flex flex-col justify-between py-4 items-center">
      <img src="/favicon2.png" alt="" className="p-2 max-w-[80px]"/>
      <h1 className="text-center">Online Free Pixel Art Generator</h1>
      <div className="flex flex-col gap-2">
      <button  onClick={exportVector} className="bg-[#804816] text-white p-2 text-sm  font-bold uppercase">Save SVG</button>
      <button  onClick={exportImage} className="bg-[#804816] text-white p-2 text-sm  font-bold uppercase">Save PNG</button>
      </div>
    </div>
  );
}

export default LeftToolbar;
