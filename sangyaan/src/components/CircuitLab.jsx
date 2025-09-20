/**
 * Circuit Lab Component
 * 
 * Purpose: Virtual electronics lab for building and testing circuits
 * Parent Component: VirtualLab.jsx
 * 
 * Features:
 * - Drag and drop circuit components
 * - Interactive circuit building
 * - Circuit simulation and testing
 * - Educational feedback and measurements
 */

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CircuitComponent from './Circuit';

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
            id: Date.now(),
            x: Math.random() * 300,
            y: Math.random() * 200
        };
        setCircuitComponents([...circuitComponents, newComponent]);
    };

    const handleSimulate = () => {
        setIsSimulating(true);

        // Simulate circuit analysis
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
        <DndProvider backend={HTML5Backend}>
            <div className="min-h-screen transition-all duration-300" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
                <div className="max-w-6xl mx-auto p-6">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 theme-primary animate-pulse-slow">
                            <span className="text-3xl">⚡</span>
                        </div>
                        <h2 className="text-3xl font-bold theme-text">Virtual Circuit Lab</h2>
                        <p className="text-gray-600 mt-2">Build and test electronic circuits safely</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Component Palette */}
                        <div className="lg:col-span-1">
                            <h3 className="text-xl font-semibold mb-4 theme-text">Components</h3>
                            <div className="space-y-3">
                                {availableComponents.map(component => (
                                    <div
                                        key={component.id}
                                        onClick={() => handleComponentAdd(component)}
                                        className="theme-card p-4 rounded-lg cursor-pointer hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">{component.icon}</span>
                                            <div>
                                                <div className="font-semibold theme-text">{component.type}</div>
                                                <div className="text-xs text-gray-600">{component.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Circuit Workspace */}
                        <div className="lg:col-span-2">
                            <h3 className="text-xl font-semibold mb-4 theme-text">Circuit Workspace</h3>
                            <div className="theme-card p-6 rounded-lg border-2 border-dashed border-gray-300 min-h-[400px] relative bg-gray-50">
                                {circuitComponents.length === 0 ? (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        <div className="text-center">
                                            <span className="text-4xl mb-4 block">🔧</span>
                                            <p>Click components to add them to your circuit</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        {circuitComponents.map((component, index) => (
                                            <div
                                                key={component.id}
                                                className="absolute bg-white p-3 rounded-lg shadow-md border-2 border-blue-200"
                                                style={{
                                                    left: `${component.x}px`,
                                                    top: `${component.y}px`
                                                }}
                                            >
                                                <div className="text-center">
                                                    <span className="text-2xl block">{component.icon}</span>
                                                    <span className="text-xs font-semibold">{component.type}</span>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Connection lines (simplified) */}
                                        {circuitComponents.length > 1 && (
                                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                                {circuitComponents.slice(0, -1).map((component, index) => {
                                                    const nextComponent = circuitComponents[index + 1];
                                                    return (
                                                        <line
                                                            key={`line-${index}`}
                                                            x1={component.x + 25}
                                                            y1={component.y + 25}
                                                            x2={nextComponent.x + 25}
                                                            y2={nextComponent.y + 25}
                                                            stroke="#3b82f6"
                                                            strokeWidth="2"
                                                            strokeDasharray="5,5"
                                                        />
                                                    );
                                                })}
                                            </svg>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Controls */}
                            <div className="flex justify-center mt-6 space-x-4">
                                <button
                                    onClick={handleSimulate}
                                    disabled={circuitComponents.length === 0 || isSimulating}
                                    className="px-6 py-3 text-lg font-semibold theme-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                                >
                                    {isSimulating ? 'Simulating...' : 'Test Circuit'}
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="px-6 py-3 text-lg font-semibold bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        {/* Measurements Panel */}
                        <div className="lg:col-span-1">
                            <h3 className="text-xl font-semibold mb-4 theme-text">Measurements</h3>
                            <div className="theme-card p-4 rounded-lg">
                                {measurements ? (
                                    <div className="space-y-4">
                                        <div className="text-center mb-4">
                                            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${measurements.status === 'Circuit Complete'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {measurements.status}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Voltage:</span>
                                                <span className="font-semibold">{measurements.voltage}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Current:</span>
                                                <span className="font-semibold">{measurements.current}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Power:</span>
                                                <span className="font-semibold">{measurements.power}</span>
                                            </div>
                                        </div>

                                        {measurements.status === 'Circuit Complete' && (
                                            <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                                <p className="text-sm text-green-800">
                                                    ✅ Great! Your circuit is working properly. The LED should be glowing!
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500">
                                        <span className="text-3xl block mb-2">📊</span>
                                        <p className="text-sm">Build a circuit and test it to see measurements</p>
                                    </div>
                                )}
                            </div>

                            {/* Circuit Tips */}
                            <div className="mt-6 theme-card p-4 rounded-lg">
                                <h4 className="font-semibold theme-text mb-2">💡 Tips</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Start with a battery for power</li>
                                    <li>• Add an LED to see the result</li>
                                    <li>• Use a resistor to control current</li>
                                    <li>• Connect components in series</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default CircuitLab;