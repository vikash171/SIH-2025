import { useState } from 'react';

const ChemistryLab = () => {
    // State management for reactants, product, and UI animations
    const [firstReactant, setFirstReactant] = useState('');
    const [secondReactant, setSecondReactant] = useState('');
    const [product, setProduct] = useState(null);
    const [reactionAnimation, setReactionAnimation] = useState(false);

    // List of available chemicals for the dropdowns
    const chemicals = [
        { id: 1, name: 'HCl', type: 'acid', color: 'colorless', state: 'liquid' },
        { id: 2, name: 'NaOH', type: 'base', color: 'white', state: 'solid' },
        { id: 3, name: 'H2SO4', type: 'acid', color: 'colorless', state: 'liquid' },
        { id: 4, name: 'KOH', type: 'base', color: 'white', state: 'solid' },
        { id: 5, name: 'CaCO3', type: 'base', color: 'white', state: 'solid' },
        { id: 6, name: 'Na', type: 'metal', color: 'silvery', state: 'solid' },
        { id: 7, name: 'H2O', type: 'neutral', color: 'colorless', state: 'liquid' },
        { id: 8, name: 'Cu', type: 'metal', color: 'reddish-brown', state: 'solid' },
        { id: 9, name: 'AgNO3', type: 'salt', color: 'colorless', state: 'solution' },
        { id: 10, name: 'NaCl', type: 'salt', color: 'white', state: 'solid' }
    ];

    // --- INTERNAL REACTION DATABASE (NO API NEEDED) ---
    const reactions = {
        'HCl,NaOH': {
            product: 'NaCl + H₂O',
            description: 'Neutralization reaction',
            observation: 'Salt and water are formed.'
        },
        'H2SO4,KOH': {
            product: 'K₂SO₄ + 2H₂O',
            description: 'Acid-base reaction',
            observation: 'Formation of potassium sulfate salt.'
        },
        'Na,H2O': {
            product: '2NaOH + H₂',
            description: 'Metal-water reaction',
            observation: 'Vigorous reaction with hydrogen gas evolution.'
        },
        'AgNO3,NaCl': {
            product: 'AgCl(s) + NaNO₃',
            description: 'Double displacement reaction',
            observation: 'A white precipitate of silver chloride forms.'
        }
    };
    // --- END OF DATABASE ---

    /**
     * Handles the reaction by looking up the result in the internal 'reactions' object.
     */
    const handleReaction = () => {
        if (!firstReactant || !secondReactant) return;

        setReactionAnimation(true);
        setProduct(null);

        // Sort reactants to create a consistent key (e.g., 'HCl,NaOH' is same as 'NaOH,HCl')
        const reactionKey = [firstReactant, secondReactant].sort().join(',');
        
        // Look up the result in our internal database
        const result = reactions[reactionKey];

        // Use a timeout to simulate the reaction time
        setTimeout(() => {
            if (result) {
                setProduct(result);
            } else {
                // If the reaction is not found in our database
                setProduct({
                    product: 'No Reaction',
                    description: 'These chemicals do not react under these conditions.',
                    observation: 'No visible changes occurred.'
                });
            }
            setReactionAnimation(false);
        }, 1500); // 1.5 second delay
    };
    
    /**
     * Resets the experiment to its initial state.
     */
    const resetExperiment = () => {
        setFirstReactant('');
        setSecondReactant('');
        setProduct(null);
        setReactionAnimation(false);
    };

    // JSX for rendering the component UI
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Virtual Chemistry Lab 🧪</h2>
            
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">1. Select Reactants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReactantDropdown 
                        value={firstReactant}
                        onChange={setFirstReactant}
                        chemicals={chemicals}
                        disabledReactant={secondReactant}
                        isAnimating={reactionAnimation}
                        label="First Reactant"
                    />
                    <ReactantDropdown 
                        value={secondReactant}
                        onChange={setSecondReactant}
                        chemicals={chemicals}
                        disabledReactant={firstReactant}
                        isAnimating={reactionAnimation}
                        label="Second Reactant"
                    />
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">2. Reaction Chamber</h3>
                <div className="bg-gray-100 p-6 rounded-lg border-2 border-dashed border-gray-300 min-h-[300px]">
                    <div className="flex flex-col md:flex-row items-center justify-around gap-4">
                        <div className="flex items-center justify-center gap-4">
                            <ReactantCard chemicalName={firstReactant} chemicals={chemicals} />
                            <div className="text-4xl font-bold text-gray-500 mx-4">+</div>
                            <ReactantCard chemicalName={secondReactant} chemicals={chemicals} />
                        </div>
                    </div>

                     <div className="flex justify-center mt-8 space-x-4">
                        <button
                            onClick={handleReaction}
                            disabled={!firstReactant || !secondReactant || reactionAnimation}
                            className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                        >
                            {reactionAnimation ? 'Reacting...' : 'Start Reaction'}
                        </button>
                        <button
                            onClick={resetExperiment}
                            className="px-6 py-3 text-lg font-semibold bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md"
                        >
                            Reset
                        </button>
                    </div>

                    {product && (
                        <div className="mt-8">
                            <div className="flex justify-center items-center my-4">
                                <div className="text-5xl text-gray-400">⟶</div>
                            </div>
                            <ProductCard product={product} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper components to keep the main component clean

const ReactantDropdown = ({ value, onChange, chemicals, disabledReactant, isAnimating, label }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
        <label className="block mb-2 font-medium text-gray-600">{label}</label>
        <select 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
            disabled={isAnimating}
        >
            <option value="">Select chemical</option>
            {chemicals.map(chemical => (
                <option 
                    key={chemical.id} 
                    value={chemical.name}
                    disabled={chemical.name === disabledReactant}
                >
                    {chemical.name} ({chemical.type})
                </option>
            ))}
        </select>
    </div>
);

const ReactantCard = ({ chemicalName, chemicals }) => {
    if (!chemicalName) {
        return <div className="w-48 h-48 rounded-lg bg-white border flex items-center justify-center text-gray-400 p-4 text-center">Select a reactant</div>;
    }
    const chemical = chemicals.find(c => c.name === chemicalName);
    return (
        <div className="w-48 h-48 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center transform hover:scale-105 transition-transform p-2 shadow-md">
            <div className="text-center text-blue-900">
                <div className="text-3xl font-bold mb-2">{chemical.name}</div>
                <div className="text-lg mb-2 capitalize">{chemical.type}</div>
                <div className="text-sm">
                    State: {chemical.state}<br/>
                    Color: {chemical.color}
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product }) => (
    <div className="bg-green-100 border border-green-300 p-6 rounded-lg text-center shadow-inner">
        <p className="text-2xl font-bold text-green-800 mb-2">{product.product}</p>
        <p className="text-lg text-green-700 mb-3">{product.description}</p>
        <div className="text-md p-3 bg-white rounded-lg border border-green-200">
            <strong>Observation:</strong> {product.observation}
        </div>
    </div>
);

export default ChemistryLab;