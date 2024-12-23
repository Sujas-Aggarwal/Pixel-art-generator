import CanvasArea from "../components/CanvasArea";
import LeftToolbar from "../components/LeftToolbar";
import RightToolbar from "../components/RightToolbar";

function Home() {
  return (
    <div className="w-full h-screen select-none overflow-hidden bg-white flex justify-stretch items-stretch">
      <LeftToolbar />
      <CanvasArea />
      <RightToolbar />
    </div>
  );
}

export default Home;
