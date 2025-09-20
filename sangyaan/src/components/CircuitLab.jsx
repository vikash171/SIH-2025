/**
 * Circuit Lab Component - Simplified Version
 * 
 * Purpose: Simple virtual electronics lab
 * Parent Component: VirtualLab.jsx
 */

import { useState } from 'react';

const CircuitLab = () => {
    const [circuitComponents, setCircuitComponents] = useState([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [measurements, setMeasurements] = useState(null);

    const availableComponents = [
        { id: 1, type: 'Battery', icon: '🔋', description: 'Power source (9V)' },
        { id: 2, type: 'Resistor', icon: '⚡', description: 'Electrical resistance (100Ω)' },
        { id: 3, type: 'LED', icon: '💡', description: 'Light emitting diode' },
        { id: 4, type: 'Switch', icon: '🔘', description: 'On/Off control' },
        { id: 5, type: 'Capacitor', icon: '⚡', description: 'Energy storage (100μF)' },
        { id: 6, type: 'Wire', icon: '➖', description: 'Electrical connection' }
    ];

    const handleComponentAdd = (component) => {
        const newComponent = {
            ...component,
            id: Date.now()
        };
        setCircuitComponents([...circuitComponents, newComponent]);
    };

    const handleSimulate = () => {
        setIsSimulating(true);

        setTimeout(() => {
            const hasComplete = circuitComponents.some(c => c.type === 'Battery') &&
                circuitComponents.some(c => c.type === 'LED') &&
                circuitComponents.length >= 3;

            setMeasurements({
                voltage: hasComplete ? '9.0V' : '0.0V',
                current: hasComplete ? '90mA' : '0.0mA',
                power: hasComplete ? '0.81W' : '0.00W',
                status: hasComplete ? 'Circuit Complete' : 'Incomplete Circuit'
            });
            setIsSimulating(false);
        }, 2000);
    };

    const handleReset = () => {
        setCircuitComponents([]);
        setMeasurements(null);
        setIsSimulating(false);
    };

    return (
        <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">⚡</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Virtual Circuit Lab</h2>
                    <p className="text-gray-600">Build and test electronic circuits safely</p>
                </div>

                {/* Simple Circuit Interface */}
                <div className="bg-white rounded-xl p-8 shadow-sm border">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Component Selection */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Available Components</h3>
                            <div className="space-y-3">
                                {availableComponents.map(component => (
                                    <div
                                        key={component.id}
                                        onClick={() => handleComponentAdd(component)}
                                        className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">{component.icon}</span>
                                            <div>
                                                <div className="font-semibold">{component.type}</div>
                                                <div className="text-sm text-gray-600">{component.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Circuit Workspace */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Circuit Workspace</h3>
                            <div className="bg-gray-50 rounded-lg p-6 min-h-[300px] border-2 border-dashed border-gray-300">
                                {circuitComponents.length === 0 ? (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        <div className="text-center">
                                            <span className="text-4xl block mb-2">🔧</span>
                                            <p>Click components to add them</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-600 mb-4">Added Components:</p>
                                        {circuitComponents.map((component) => (
                                            <div key={component.id} className="flex items-center space-x-2 bg-white p-2 rounded border">
                                                <span className="text-xl">{component.icon}</span>
                                                <span className="font-medium">{component.type}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center mt-8 space-x-4">
                        <button
                            onClick={handleSimulate}
                            disabled={circuitComponents.length === 0 || isSimulating}
                            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 transition"
                        >
                            {isSimulating ? 'Testing...' : 'Test Circuit'}
                        </button>
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
                        >
                            Reset
                        </button>
                    </div>

                    {/* Results */}
                    {measurements && (
                        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold mb-3">Circuit Analysis Results</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>Status: <span className="font-semibold">{measurements.status}</span></div>
                                <div>Voltage: <span className="font-semibold">{measurements.voltage}</span></div>
                                <div>Current: <span className="font-semibold">{measurements.current}</span></div>
                                <div>Power: <span className="font-semibold">{measurements.power}</span></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-orange-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 text-orange-800">How to Build Circuits</h3>
                    <ul className="text-orange-700 space-y-2">
                        <li>• Click on components to add them to your circuit</li>
                        <li>• Start with a battery for power source</li>
                        <li>• Add an LED to see the circuit working</li>
                        <li>• Use resistors to control current flow</li>
                        <li>• Test your circuit to see measurements</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CircuitLab;