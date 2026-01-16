import React, { useState } from 'react';
import { Database, FileJson, CheckSquare, List } from 'lucide-react';

const SCHEMAS = {
  rubric: {
    title: "Scoring Rubric",
    icon: <List size={18} />,
    code: {
      "standardized_scoring_protocol": {
        "double_materiality": { "points": 25, "criteria": "Impact/Financial rigor" },
        "value_chain": { "points": 15, "criteria": "Upstream/Downstream data depth" },
        "data_granularity": { "points": 20, "criteria": "Metric specificity" },
        "strategy_governance": { "points": 20, "criteria": "Board oversight" },
        "framework_alignment": { "points": 20, "criteria": "Adherence to Big 5" }
      },
      "thresholds": {
        "ready": "> 85",
        "partially_ready": "40 - 85",
        "not_ready": "< 40"
      }
    }
  },
  framework_audit: {
    title: "Framework Audit Model",
    icon: <CheckSquare size={18} />,
    code: {
      "target_frameworks": [
        "ESRS (Mandatory)", 
        "GRI (Impact)", 
        "SASB (Financial)", 
        "TCFD (Climate)", 
        "ISSB (Global)"
      ],
      "analysis_schema": {
        "name": "string",
        "alignmentScore": "0-100",
        "status": "High | Medium | Low",
        "missingCriticals": ["list_of_gaps"]
      }
    }
  },
  extraction: {
    title: "PDF Extraction",
    icon: <FileJson size={18} />,
    code: {
      "document_metadata": {
        "file_name": "string",
        "file_hash": "sha256_string",
        "page_count": "integer"
      },
      "content_analysis": {
        "text_segments": "array<string>",
        "tables_detected": "boolean",
        "language": "ISO_639-1"
      }
    }
  },
  output: {
    title: "Final Report Schema",
    icon: <Database size={18} />,
    code: {
      "company_profile": { "name": "string" },
      "audit_result": {
        "score": "integer",
        "scoreBreakdown": "object<5_pillars>",
        "detailedFrameworks": "array<FrameworkAnalysis>",
        "peerBenchmarks": "array<PeerBenchmark>"
      }
    }
  }
};

const SchemaViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof SCHEMAS>('rubric');

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700 font-mono text-sm mt-8 animate-in fade-in slide-in-from-bottom-2">
      <div className="bg-slate-800 border-b border-slate-700 flex flex-wrap">
        {(Object.keys(SCHEMAS) as Array<keyof typeof SCHEMAS>).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-3 flex items-center gap-2 transition-colors ${
              activeTab === key 
                ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-400' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
            }`}
          >
            {SCHEMAS[key].icon}
            {SCHEMAS[key].title}
          </button>
        ))}
      </div>
      <div className="p-6 overflow-x-auto bg-slate-950">
        <pre className="text-emerald-400">
          <code>{JSON.stringify(SCHEMAS[activeTab].code, null, 2)}</code>
        </pre>
      </div>
      <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 text-slate-500 text-xs flex justify-between items-center">
        <span className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          JSON Schema v1.1.0
        </span>
        <span>Deterministic Mode: ENABLED (Temp: 0.0)</span>
      </div>
    </div>
  );
};

export default SchemaViewer;