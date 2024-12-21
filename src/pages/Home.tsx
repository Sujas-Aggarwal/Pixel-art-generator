import CanvasArea from "../components/CanvasArea";

function Home() {
  return (
    <div className="w-full h-screen overflow-hidden bg-white flex justify-stretch items-stretch">
      <div className="w-[100px] bg-blue-200 flex justify-center items-center">
        <h1 className="text-center">Main Menu</h1>
      </div>
      <CanvasArea />
      <div className="toolbar bg-blue-200 w-[200px]  flex justify-center items-center">
        <h1 className="text-center">Toolbar Space</h1>
      </div>
    </div>
  );
}

export default Home;
