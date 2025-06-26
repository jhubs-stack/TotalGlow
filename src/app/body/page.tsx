export default function BodyPage() {
  return (
    <main className="min-h-screen p-8 bg-green-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Body</h1>
        <p className="text-gray-600 mb-8">Track your physical health and fitness journey</p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Your Body Score</h2>
          <p className="text-6xl font-bold text-green-700">85</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Today's Activities</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>30-minute workout</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>10,000 steps</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>8 glasses of water</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Recent Stats</h3>
            <p className="text-gray-600">Steps today: 7,234</p>
            <p className="text-gray-600 mt-2">Active minutes: 45</p>
            <p className="text-gray-600 mt-2">Calories burned: 320</p>
          </div>
        </div>
      </div>
    </main>
  )
}