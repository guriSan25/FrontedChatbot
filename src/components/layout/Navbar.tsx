export default function Navbar() {
  const chats = [
    "Problema con Docker",
    "Utilizar Next JS",
    "Aprender Python",
    "Ideas proyectos",
    "¿Por qué no usar PHP?",
    "Python y Flask",
    "¿Qué es el modelo relacional?",
  ]

  return (
    <aside className="w-64 bg-[#111214] text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">🤖 CHAPI</h2>
        <button className="flex items-center gap-2 mb-6 px-4 py-2 bg-[#2E2F33] hover:bg-[#3A3B40] rounded">
          ✏️ Nuevo Chat
        </button>
        <div className="space-y-2">
          {chats.map((chat, idx) => (
            <button key={idx} className="w-full text-left flex items-center gap-2 hover:bg-[#2E2F33] p-2 rounded">
              💬 {chat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-gray-600 pt-4 text-sm text-gray-300">
        <div className="bg-[#1E3A8A] text-white p-2 rounded">
          🛡️ Accede al plan premium <br />
          ¡Usa la IA sin límite!
        </div>
      </div>
    </aside>
  )
}
