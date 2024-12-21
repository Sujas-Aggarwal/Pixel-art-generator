import { useToolStore } from "../context/ToolStore";

function LeftToolbar() {
    const {exportImage} = useToolStore();
  return (

    <div className="w-[100px] bg-[#d9bda5] flex justify-center items-center">
      <h1 className="text-center">Main Menu</h1>
      <button  onClick={exportImage}>Save Button</button>
    </div>
  );
}

export default LeftToolbar;
