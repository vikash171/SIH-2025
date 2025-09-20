import { useDrag } from 'react-dnd';

// ✅ Remove "type" definitions (not supported in JS)
const CircuitComponent = ({ type }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'component', // Must match the 'accept' type in your drop zone
        item: { type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={dragRef}
            className={`p-3 rounded border shadow-md cursor-move transition-opacity duration-200 ${isDragging ? 'opacity-40' : 'opacity-100'
                }`}
        >
            <span className="font-semibold text-gray-700">{type}</span>
        </div>
    );
};

export default CircuitComponent;