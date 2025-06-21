import React, { useEffect, useRef, useState, FormEvent } from 'react';
import { Card } from '../components/Card';
import { BrainCircuit, HelpCircle, Play } from 'lucide-react'; // HelpCircle for example list
import functionPlot from 'function-plot';
// Note: Ensure '@types/function-plot' is installed for type safety if available,
// or use 'any' type for plot options if types are not available/sufficient.

// Define the structure for plot options, aligning with function-plot's API
// This is a simplified version; function-plot has many more options.
interface FunctionPlotOptions {
    target: string | HTMLElement;
    width?: number;
    height?: number;
    xAxis?: { domain?: [number, number]; label?: string };
    yAxis?: { domain?: [number, number]; label?: string };
    grid?: boolean;
    data: Array<{
        fn: string;
        graphType?: 'polyline' | 'scatter' | 'line'; // Added 'line' as it's common
        color?: string;
        // Add other data properties as needed, e.g., derivative, secants etc.
    }>;
    // Add other top-level options like tip, plugins etc.
}

export const ExplorationZone: React.FC = () => {
    const plotRef = useRef<HTMLDivElement>(null);
    const [equation, setEquation] = useState<string>('x^2');
    const [plotError, setPlotError] = useState<string | null>(null);
    const [plotInstance, setPlotInstance] = useState<any>(null); // To store the functionPlot instance

    const exampleFunctions = ['x', 'x^2', 'x^3', 'sin(x)', 'cos(x)', 'tan(x)', '1/x', 'sqrt(x)', 'e^x', 'log(x)'];

    useEffect(() => {
        if (plotRef.current) {
            // Ensure the container is visible and has dimensions before plotting
            if (plotRef.current.clientWidth === 0 || plotRef.current.clientHeight === 0) {
                // If dimensions are zero, wait for a repaint or use ResizeObserver
                // For simplicity, we'll assume it becomes visible. A ResizeObserver would be more robust.
                console.warn("Plot target might not be visible or have dimensions yet.");
            }

            try {
                setPlotError(null);
                const options: FunctionPlotOptions = {
                    target: plotRef.current,
                    // Make width responsive by using clientWidth, or a fixed value
                    width: plotRef.current.clientWidth > 0 ? plotRef.current.clientWidth : 500,
                    height: 400,
                    xAxis: { domain: [-10, 10], label: 'x-axis' },
                    yAxis: { domain: [-10, 10], label: 'y-axis' },
                    grid: true,
                    data: [{
                        fn: equation,
                        graphType: 'polyline', // 'line' or 'polyline'
                        color: '#6366f1' // indigo-500
                    }]
                };
                const instance = functionPlot(options);
                setPlotInstance(instance); // Save instance if needed for dynamic updates
            } catch (e: any) {
                console.error("Error plotting function:", e);
                setPlotError(e.message || "Invalid function or plotting error. Try an example like 'x^2' or 'sin(x)'.");
                // Clear previous plot if error
                if (plotRef.current) plotRef.current.innerHTML = '';
            }
        }
        // Cleanup function for when component unmounts or equation changes
        return () => {
            if (plotInstance && typeof plotInstance.destroy === 'function') { // Check if destroy method exists
                 // function-plot instances might not have a standard destroy method.
                 // Typically, re-rendering with new options replaces the plot.
                 // If you need to explicitly clear, you might just empty the target div.
            }
            if (plotRef.current) { // Clear previous plot before re-rendering
                plotRef.current.innerHTML = '';
            }
        };
    }, [equation]); // Re-plot when equation changes

    const handlePlotSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formEquation = (e.currentTarget.elements.namedItem('equationInput') as HTMLInputElement)?.value;
        if (formEquation) {
            setEquation(formEquation.trim());
        }
    };

    const handleExampleClick = (exFn: string) => {
        setEquation(exFn);
        // Optionally, update the input field as well
        const inputElement = document.getElementsByName('equationInput')[0] as HTMLInputElement;
        if (inputElement) {
            inputElement.value = exFn;
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Exploration Zone</h2>
            <Card title="Interactive Graphing Calculator" icon={BrainCircuit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Plot Area */}
                    <div className="md:col-span-2 bg-white p-2 border border-gray-200 rounded-lg shadow-sm min-h-[420px]">
                        <div ref={plotRef} className="w-full h-[400px]">
                            {/* function-plot will target this div */}
                        </div>
                        {plotError && (
                            <div className="mt-2 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
                                <strong>Error:</strong> {plotError}
                            </div>
                        )}
                    </div>

                    {/* Controls and Examples */}
                    <div className="md:col-span-1 space-y-4">
                        <form onSubmit={handlePlotSubmit} className="space-y-3">
                            <label htmlFor="equationInput" className="block font-semibold text-gray-700 text-sm">Enter function <span className="font-mono text-indigo-600">y = f(x)</span></label>
                            <input
                                type="text"
                                id="equationInput"
                                name="equationInput" // Name for form submission
                                defaultValue={equation}
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                placeholder="e.g., x^2, sin(x)"
                            />
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center text-sm"
                            >
                                <Play className="w-5 h-5 mr-2"/> Plot Function
                            </button>
                        </form>

                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2 text-sm flex items-center">
                                <HelpCircle className="w-5 h-5 mr-2 text-blue-500"/> Try these examples:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {exampleFunctions.map(ex => (
                                    <button
                                        key={ex}
                                        onClick={() => handleExampleClick(ex)}
                                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-indigo-100 hover:text-indigo-700 text-xs font-medium transition-colors"
                                        title={`Plot y = ${ex}`}
                                    >
                                        {ex}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Uses <a href="https://mauriciopoppe.github.io/function-plot/" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">function-plot</a> library.
                            Supports standard mathematical expressions.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};
