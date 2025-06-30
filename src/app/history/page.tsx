import Navbar from "@/components/layout/Navbar"
import SettingsMenu from "@/components/layout/SettingsMenu"
// import HistoryPanel from "@/components/history/HistoryPanel"

export default function HistoryPage() {
  return (
    <div className="flex h-screen bg-[#1A1B1F]  text-white">
      <Navbar />
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4">
          <SettingsMenu />
        </div>
        {/* <HistoryPanel /> */}
      </div>
    </div>
  )
}
