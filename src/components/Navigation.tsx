import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="max-w-4xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
            TotalGlow
          </Link>
          <div className="flex space-x-6">
            <Link href="/mind" className="text-purple-700 hover:text-purple-900 font-medium">
              Mind
            </Link>
            <Link href="/body" className="text-green-700 hover:text-green-900 font-medium">
              Body
            </Link>
            <Link href="/soul" className="text-amber-700 hover:text-amber-900 font-medium">
              Soul
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}