/**
 * Chemistry Lab Component - Simplified Version
 * 
 * Purpose: Simple virtual chemistry lab
 * Parent Component: VirtualLab.jsx
 */

const ChemistryLab = () => {
    return (
        <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🧪</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Virtual Chemistry Lab</h2>
                    <p className="text-gray-600">Explore chemical reactions safely</p>
                </div>

                {/* Simple Lab Interface */}
                <div className="bg-white rounded-xl p-8 shadow-sm border">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Chemical Selection */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Select Chemicals</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">First Chemical</label>
                                    <select className="w-full p-3 border rounded-lg bg-gray-50">
                                        <option value="">Choose chemical...</option>
                                        <option value="HCl">HCl (Hydrochloric Acid)</option>
                                        <option value="NaOH">NaOH (Sodium Hydroxide)</option>
                                        <option value="H2O">H2O (Water)</option>
                                        <option value="NaCl">NaCl (Salt)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Second Chemical</label>
                                    <select className="w-full p-3 border rounded-lg bg-gray-50">
                                        <option value="">Choose chemical...</option>
                                        <option value="HCl">HCl (Hydrochloric Acid)</option>
                                        <option value="NaOH">NaOH (Sodium Hydroxide)</option>
                                        <option value="H2O">H2O (Water)</option>
                                        <option value="NaCl">NaCl (Salt)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Reaction Area */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Reaction Chamber</h3>
                            <div className="bg-gray-50 rounded-lg p-6 min-h-[200px] flex items-center justify-center border-2 border-dashed border-gray-300">
                                <div className="text-center text-gray-500">
                                    <span className="text-4xl block mb-2">⚗️</span>
                                    <p>Select chemicals to start reaction</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center mt-8 space-x-4">
                        <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
                            Start Reaction
                        </button>
                        <button className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition">
                            Reset Lab
                        </button>
                    </div>
                </div>

                {/* Lab Instructions */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 text-blue-800">How to Use the Lab</h3>
                    <ul className="text-blue-700 space-y-2">
                        <li>• Select two chemicals from the dropdown menus</li>
                        <li>• Click "Start Reaction" to see what happens</li>
                        <li>• Observe the results in the reaction chamber</li>
                        <li>• Use "Reset Lab" to try new combinations</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChemistryLab;