import { useToolStore } from "../context/ToolStore";

function LeftToolbar() {
    const {exportImage} = useToolStore();
  return (

    <div className="w-[100px] min-w-[100px] bg-[#d9bda5] flex flex-col justify-between py-4 items-center">
      <img src="/favicon2.png" alt="" className="p-2 max-w-[80px]"/>
      <h1 className="text-center">Online Free Pixel Art Generator</h1>
      <button  onClick={exportImage} className="bg-[#804816] text-white p-2 text-sm  font-bold uppercase">Save Art</button>
    </div>
  );
}

export default LeftToolbar;
