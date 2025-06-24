import HistoryCard from "./HistoryCard"

const mockHistory = [
  { title: "Problema con Docker", date: "24 jun. 2025" },
  { title: "Ideas para proyecto con IA", date: "23 jun. 2025" },
  { title: "¿Qué es SQL Server?", date: "21 jun. 2025" },
]

export default function HistoryPanel() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🕓 Historial de conversaciones</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockHistory.map((chat, idx) => (
          <HistoryCard key={idx} title={chat.title} date={chat.date} />
        ))}
      </div>
    </div>
  )
}
