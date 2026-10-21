interface ToolbarProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  activeView: string;
  onViewChange: (view: 'editor' | 'loadPanel' | 'budget') => void;
}

const tools = [
  { id: 'select', label: 'Selecionar', icon: 'cursor' },
  { id: 'room', label: 'Cômodo', icon: 'room' },
  { id: 'light', label: 'Lâmpada', icon: 'light' },
  { id: 'switch', label: 'Interruptor', icon: 'switch' },
  { id: 'outlet_tug', label: 'TUG', icon: 'tug' },
  { id: 'outlet_tue', label: 'TUE', icon: 'tue' },
  { id: 'conduit', label: 'Eletroduto', icon: 'conduit' },
  { id: 'panel', label: 'Quadro', icon: 'panel' },
  { id: 'meter', label: 'Medidor', icon: 'meter' },
];

function ToolIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'cursor':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      );
    case 'room':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
        </svg>
      );
    case 'light':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
          <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="2"/>
          <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    case 'switch':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'tug':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5v14" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="8"/>
        </svg>
      );
    case 'tue':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5v14" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="8"/>
          <path d="M8 8l8 8" strokeLinecap="round"/>
        </svg>
      );
    case 'conduit':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    case 'panel':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2}/>
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeWidth={1.5}/>
        </svg>
      );
    case 'meter':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" strokeWidth={2}/>
          <path d="M12 7v5l3 3" strokeLinecap="round" strokeWidth={2}/>
        </svg>
      );
    default:
      return null;
  }
}

export default function Toolbar({ activeTool, onToolChange, activeView, onViewChange }: ToolbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-1.5 flex items-center gap-1">
      {/* View Tabs */}
      <div className="flex items-center gap-1 mr-4 border-r border-gray-200 pr-4">
        <button
          onClick={() => onViewChange('editor')}
          className={`text-xs px-3 py-1.5 rounded-md transition-colors font-medium ${
            activeView === 'editor'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
            </svg>
            Editor
          </span>
        </button>
        <button
          onClick={() => onViewChange('loadPanel')}
          className={`text-xs px-3 py-1.5 rounded-md transition-colors font-medium ${
            activeView === 'loadPanel'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
            </svg>
            Quadro de Cargas
          </span>
        </button>
        <button
          onClick={() => onViewChange('budget')}
          className={`text-xs px-3 py-1.5 rounded-md transition-colors font-medium ${
            activeView === 'budget'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Orçamento
          </span>
        </button>
      </div>

      {/* Tools */}
      <div className="flex items-center gap-0.5">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            title={tool.label}
            className={`p-2 rounded-md transition-colors relative group ${
              activeTool === tool.id
                ? 'bg-red-100 text-red-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            <ToolIcon icon={tool.icon} />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              {tool.label}
            </span>
          </button>
        ))}
      </div>

      {/* Auto actions */}
      <div className="ml-4 border-l border-gray-200 pl-4 flex items-center gap-1">
        <button className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 py-1.5 rounded-md transition-colors border border-blue-200">
          Auto Posicionar Cargas
        </button>
        <button className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-2.5 py-1.5 rounded-md transition-colors border border-green-200">
          Dividir Circuitos
        </button>
        <button className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-2.5 py-1.5 rounded-md transition-colors border border-purple-200">
          Auto Eletrodutos
        </button>
        <button className="text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 px-2.5 py-1.5 rounded-md transition-colors border border-orange-200">
          Auto Fiação
        </button>
      </div>
    </div>
  );
}
