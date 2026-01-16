import React from 'react';
import { MaterialityTopic } from '../types';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, ReferenceLine, CartesianGrid } from 'recharts';

interface MaterialityMatrixProps {
  topics: MaterialityTopic[];
}

const MaterialityMatrix: React.FC<MaterialityMatrixProps> = ({ topics }) => {
  const getColor = (category: string) => {
    switch (category) {
      case 'Environment': return '#10b981'; // emerald-500
      case 'Social': return '#f59e0b'; // amber-500
      case 'Governance': return '#6366f1'; // indigo-500
      default: return '#64748b';
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700 max-w-xs z-50">
          <p className="font-bold text-amber-400 mb-1">{data.topic}</p>
          <div className="text-xs text-slate-300 mb-2">{data.reasoning}</div>
          <div className="flex justify-between text-xs font-mono">
            <span>Financial: {data.financialScore}</span>
            <span>Impact: {data.impactScore}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Double Materiality Matrix</h3>
          <p className="text-slate-500 text-sm">Strategic assessment of Financial vs. Impact materiality.</p>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Env</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div>Soc</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div>Gov</div>
        </div>
      </div>

      <div className="flex-1 min-h-[400px] relative">
        {/* Quadrant Labels */}
        <div className="absolute top-2 right-2 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100 z-10">
          CRITICAL STRATEGIC
        </div>
        <div className="absolute top-2 left-2 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100 z-10">
          IMPACT FOCUSED
        </div>
        <div className="absolute bottom-2 right-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 z-10">
          FINANCIAL FOCUSED
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            
            {/* Quadrant Lines */}
            <ReferenceLine x={5} stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={1} label={{ value: 'Financial Threshold', position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10 }} />
            <ReferenceLine y={5} stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={1} label={{ value: 'Impact Threshold', position: 'insideTopLeft', fill: '#94a3b8', fontSize: 10 }} />

            <XAxis 
              type="number" 
              dataKey="financialScore" 
              name="Financial Materiality" 
              domain={[0, 10]} 
              tickCount={11}
              label={{ value: 'Financial Materiality (Risk to Enterprise Value)', position: 'bottom', offset: 0, fill: '#64748b', fontSize: 12 }}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
            />
            <YAxis 
              type="number" 
              dataKey="impactScore" 
              name="Impact Materiality" 
              domain={[0, 10]} 
              tickCount={11}
              label={{ value: 'Impact Materiality (Impact on People/Planet)', angle: -90, position: 'left', fill: '#64748b', fontSize: 12 }}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Topics" data={topics} fill="#8884d8">
              {topics.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.category)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MaterialityMatrix;