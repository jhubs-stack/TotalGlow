export default function MindPage() {
  return (
    <main className="min-h-screen p-8 bg-purple-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">Mind</h1>
        <p className="text-gray-600 mb-8">Track your mental wellness and mindfulness practice</p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Your Mind Score</h2>
          <p className="text-6xl font-bold text-purple-700">78</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Today's Activities</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>10-minute meditation</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>Journal entry</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>Breathing exercise</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Recent Progress</h3>
            <p className="text-gray-600">7-day streak! 🔥</p>
            <p className="text-gray-600 mt-2">Total meditation time: 85 minutes</p>
          </div>
        </div>
      </div>
    </main>
  )
}