export default function SoulPage() {
  return (
    <main className="min-h-screen p-8 bg-amber-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-800 mb-4">Soul</h1>
        <p className="text-gray-600 mb-8">Nurture your spiritual wellness and connections</p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Your Soul Score</h2>
          <p className="text-6xl font-bold text-amber-700">72</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Today's Activities</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>Write 3 gratitudes</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>Connect with a friend</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>15 minutes in nature</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Recent Reflections</h3>
            <p className="text-gray-600">Gratitude entries: 21</p>
            <p className="text-gray-600 mt-2">Connections made: 5</p>
            <p className="text-gray-600 mt-2">Mindful moments: 12</p>
          </div>
        </div>
      </div>
    </main>
  )
}