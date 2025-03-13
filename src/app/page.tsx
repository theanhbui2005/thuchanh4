import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Chào mừng đến với hệ thống quản lý lịch hẹn</h1>
        <Link
          href="/pages/appointments"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Quản lý lịch hẹn
        </Link>
      </div>
    </div>
  )
} 