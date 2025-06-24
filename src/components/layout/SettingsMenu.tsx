export default function SettingsMenu() {
  return (
    <div className="bg-[#2E2F33] p-3 rounded text-sm text-white space-y-2 shadow-md">
      <div className="flex items-center justify-between">
        ☀️ <span>Modo claro</span>
      </div>
      <div>❓ Help</div>
      <div className="text-red-400">🚪 Logout Account</div>
    </div>
  )
}
