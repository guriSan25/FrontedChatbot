import MainContent from "./MainContend";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex h-screen bg-[#121417] text-white">
      <Navbar />
      <MainContent />
    </div>
  );
}
