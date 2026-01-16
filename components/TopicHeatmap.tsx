import React from 'react';
import { EsrsTopic } from '../types';
import { Info } from 'lucide-react';

interface TopicHeatmapProps {
  topics: EsrsTopic[];
}

const TopicHeatmap: React.FC<TopicHeatmapProps> = ({ topics }) => {
  const getStatusColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500 border-emerald-600';
    if (score >= 50) return 'bg-amber-400 border-amber-500';
    return 'bg-red-400 border-red-500';
  };

  const envTopics = topics.filter(t => t.code.startsWith('E'));
  const socTopics = topics.filter(t => t.code.startsWith('S'));
  const govTopics = topics.filter(t => t.code.startsWith('G'));

  const renderGrid = (items: EsrsTopic[], title: string) => (
    <div className="flex-1">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1">
        {title}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {items.map((topic) => (
          <div 
            key={topic.code} 
            className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div 
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm border-b-2 ${getStatusColor(topic.score)}`}
              >
                {topic.code}
              </div>
              <div>
                <div className="font-semibold text-slate-800 text-sm">{topic.name}</div>
                <div className="text-xs text-slate-500 font-medium">
                  Score: <span className={topic.score >= 50 ? 'text-emerald-600' : 'text-red-500'}>{topic.score}/100</span>
                </div>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Info size={16} className="text-slate-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {renderGrid(envTopics, "Environmental")}
        {renderGrid(socTopics, "Social")}
        {renderGrid(govTopics, "Governance")}
      </div>
    </div>
  );
};

export default TopicHeatmap;