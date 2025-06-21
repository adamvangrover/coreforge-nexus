import React, { useState, useEffect, useRef } from 'react';
// Ensure function-plot is installed or use a different plotting library
// import functionPlot from 'function-plot'; // CommonJS import might need configuring for ES6/TS
declare var functionPlot: any; // Temporary fix if function-plot types are not available

interface ExplorationZoneProps {
  // Props if any, e.g., navigateTo
}

export const ExplorationZone: React.FC<ExplorationZoneProps> = () => {
  const [equation, setEquation] = useState('x^2');
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (plotRef.current) {
      try {
        functionPlot({
          target: plotRef.current,
          width: plotRef.current.clientWidth > 0 ? plotRef.current.clientWidth : 600, // Ensure width is positive
          height: 400,
          grid: true,
          data: [{
            fn: equation,
            sampler: 'builtIn', // Use built-in sampler
            graphType: 'polyline'
          }]
        });
      } catch (e) {
        console.error("Error plotting function:", e);
        if (plotRef.current) {
            plotRef.current.innerHTML = `<p class="text-red-500">Error plotting function: ${equation}. Please check the syntax.</p>`;
        }
      }
    }
  }, [equation]);

  // Ensure plot resizes if container size changes (simplified example)
  useEffect(() => {
    const handleResize = () => {
        if (plotRef.current) {
            try {
                functionPlot({
                    target: plotRef.current,
                    width: plotRef.current.clientWidth > 0 ? plotRef.current.clientWidth : 600,
                    height: 400,
                    grid: true,
                    data: [{ fn: equation, sampler: 'builtIn', graphType: 'polyline'}]
                });
            } catch (e) { /* ignore errors on resize plotting */ }
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [equation]);


  const handleEquationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEquation(event.target.value);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <h1 className="text-3xl font-bold text-gray-800">Math Exploration Zone</h1>
      <p className="text-gray-600">
        Enter a mathematical function (e.g., <code className="bg-gray-200 p-1 rounded">sin(x)</code>,
        <code className="bg-gray-200 p-1 rounded">x^3 - 2*x</code>, or <code className="bg-gray-200 p-1 rounded">exp(x)</code>)
        and see it plotted below. This is a place to experiment and visualize math!
      </p>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="equationInput" className="block text-sm font-medium text-gray-700 mb-1">
            Enter function f(x):
          </label>
          <input
            type="text"
            id="equationInput"
            value={equation}
            onChange={handleEquationChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="e.g., x^2, sin(x), log(x)"
          />
        </div>

        <div ref={plotRef} id="plot-target" style={{ width: '100%', minHeight: '400px' }}>
          {/* Graph will be rendered here by function-plot */}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Tips for plotting:</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Use <code className="bg-gray-200 p-0.5 rounded">^</code> for powers (e.g., <code className="bg-gray-200 p-0.5 rounded">x^2</code>).</li>
          <li>Common functions: <code className="bg-gray-200 p-0.5 rounded">sin(x)</code>, <code className="bg-gray-200 p-0.5 rounded">cos(x)</code>, <code className="bg-gray-200 p-0.5 rounded">tan(x)</code>, <code className="bg-gray-200 p-0.5 rounded">log(x)</code>, <code className="bg-gray-200 p-0.5 rounded">exp(x)</code>.</li>
          <li>Multiplication requires <code className="bg-gray-200 p-0.5 rounded">*</code> (e.g., <code className="bg-gray-200 p-0.5 rounded">2*x</code>).</li>
          <li>Constants like <code className="bg-gray-200 p-0.5 rounded">pi</code> and <code className="bg-gray-200 p-0.5 rounded">e</code> are available.</li>
        </ul>
      </div>
    </div>
  );
};
