export default function HistoryCard({ title, date }: { title: string; date: string }) {
  return (
    <div className="bg-[#2E2F33] rounded-xl p-4 hover:bg-[#3B3C40] transition cursor-pointer">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-400">{date}</p>
    </div>
  )
}
