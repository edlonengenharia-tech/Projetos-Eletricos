import { ProjectState, ElectricalElement } from '../types';

interface CanvasProps {
  project: ProjectState;
  activeTool: string;
  onElementSelect: (element: ElectricalElement | null) => void;
  selectedElement: ElectricalElement | null;
}

function ElementSymbol({ element, isSelected, onClick }: { element: ElectricalElement; isSelected: boolean; onClick: () => void }) {
  const circuitColors: Record<number, string> = {
    1: '#ef4444',
    2: '#3b82f6',
    3: '#22c55e',
    4: '#a855f7',
    5: '#f59e0b',
  };
  const color = circuitColors[element.circuit] || '#6b7280';

  switch (element.type) {
    case 'light':
      return (
        <g onClick={onClick} className="cursor-pointer">
          {isSelected && <circle cx={element.x} cy={element.y} r="14" fill={color} opacity={0.15} />}
          <circle cx={element.x} cy={element.y} r="8" fill="white" stroke={color} strokeWidth="1.5" />
          <line x1={element.x - 5} y1={element.y - 5} x2={element.x + 5} y2={element.y + 5} stroke={color} strokeWidth="1.5" />
          <line x1={element.x + 5} y1={element.y - 5} x2={element.x - 5} y2={element.y + 5} stroke={color} strokeWidth="1.5" />
          <text x={element.x} y={element.y - 12} textAnchor="middle" fontSize="8" fill={color} fontWeight="bold">{element.label}</text>
        </g>
      );
    case 'switch':
      return (
        <g onClick={onClick} className="cursor-pointer">
          {isSelected && <circle cx={element.x} cy={element.y} r="12" fill={color} opacity={0.15} />}
          <circle cx={element.x} cy={element.y} r="5" fill="white" stroke={color} strokeWidth="1.5" />
          <line x1={element.x} y1={element.y - 5} x2={element.x + 7} y2={element.y - 10} stroke={color} strokeWidth="1.5" />
          <text x={element.x} y={element.y + 14} textAnchor="middle" fontSize="8" fill={color} fontWeight="bold">{element.label}</text>
        </g>
      );
    case 'outlet_tug':
      return (
        <g onClick={onClick} className="cursor-pointer">
          {isSelected && <circle cx={element.x} cy={element.y} r="12" fill={color} opacity={0.15} />}
          <circle cx={element.x} cy={element.y} r="6" fill="white" stroke={color} strokeWidth="1.5" />
          <line x1={element.x - 4} y1={element.y} x2={element.x + 4} y2={element.y} stroke={color} strokeWidth="1.5" />
          <line x1={element.x} y1={element.y - 4} x2={element.x} y2={element.y + 4} stroke={color} strokeWidth="1.5" />
          <text x={element.x} y={element.y + 14} textAnchor="middle" fontSize="7" fill={color} fontWeight="bold">{element.label}</text>
        </g>
      );
    case 'outlet_tue':
      return (
        <g onClick={onClick} className="cursor-pointer">
          {isSelected && <circle cx={element.x} cy={element.y} r="12" fill={color} opacity={0.15} />}
          <circle cx={element.x} cy={element.y} r="6" fill="white" stroke={color} strokeWidth="1.5" />
          <line x1={element.x - 4} y1={element.y} x2={element.x + 4} y2={element.y} stroke={color} strokeWidth="1.5" />
          <line x1={element.x} y1={element.y - 4} x2={element.x} y2={element.y + 4} stroke={color} strokeWidth="1.5" />
          <line x1={element.x - 3} y1={element.y - 3} x2={element.x + 3} y2={element.y + 3} stroke={color} strokeWidth="1.5" />
          <text x={element.x} y={element.y + 14} textAnchor="middle" fontSize="7" fill={color} fontWeight="bold">{element.label}</text>
        </g>
      );
    case 'panel':
      return (
        <g onClick={onClick} className="cursor-pointer">
          {isSelected && <rect x={element.x - 16} y={element.y - 12} width="32" height="24" fill={color} opacity={0.15} rx="2" />}
          <rect x={element.x - 12} y={element.y - 8} width="24" height="16" fill="white" stroke={color} strokeWidth="1.5" rx="1" />
          <line x1={element.x - 4} y1={element.y - 8} x2={element.x - 4} y2={element.y + 8} stroke={color} strokeWidth="1" />
          <line x1={element.x + 4} y1={element.y - 8} x2={element.x + 4} y2={element.y + 8} stroke={color} strokeWidth="1" />
          <text x={element.x} y={element.y + 18} textAnchor="middle" fontSize="8" fill={color} fontWeight="bold">{element.label}</text>
        </g>
      );
    default:
      return null;
  }
}

export default function Canvas({ project, activeTool, onElementSelect, selectedElement }: CanvasProps) {
  const getCursorClass = () => {
    switch (activeTool) {
      case 'select': return 'cursor-default';
      case 'room': return 'cursor-crosshair';
      default: return 'cursor-crosshair';
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Canvas Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Planta Baixa</span>
          <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">Escala 1:50</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs text-gray-500 hover:text-gray-700 px-2 py-0.5 rounded hover:bg-gray-200">
            <svg className="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            Zoom +
          </button>
          <button className="text-xs text-gray-500 hover:text-gray-700 px-2 py-0.5 rounded hover:bg-gray-200">
            <svg className="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
            Zoom -
          </button>
          <button className="text-xs text-gray-500 hover:text-gray-700 px-2 py-0.5 rounded hover:bg-gray-200">
            Centralizar
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className={`flex-1 bg-white overflow-auto ${getCursorClass()} relative`} style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        <svg width="600" height="400" className="min-w-full min-h-full" style={{ minWidth: '600px', minHeight: '400px' }}>
          {/* Rooms */}
          {project.rooms.map(room => (
            <g key={room.id}>
              <rect
                x={room.x}
                y={room.y}
                width={room.width}
                height={room.height}
                fill={room.color}
                stroke="#374151"
                strokeWidth="2"
                rx="0"
              />
              <text
                x={room.x + room.width / 2}
                y={room.y + 14}
                textAnchor="middle"
                fontSize="10"
                fill="#6b7280"
                fontWeight="500"
              >
                {room.name}
              </text>
              <text
                x={room.x + room.width / 2}
                y={room.y + 25}
                textAnchor="middle"
                fontSize="8"
                fill="#9ca3af"
              >
                {((room.width * room.height) / 100).toFixed(1)} m²
              </text>
            </g>
          ))}

          {/* Conduit lines (simplified) */}
          <path d="M 195 48 L 195 80 L 120 80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" fill="none" />
          <path d="M 195 48 L 195 150 L 310 150 L 310 80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" fill="none" />
          <path d="M 195 48 L 195 200 L 95 200 L 95 230" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" fill="none" />
          <path d="M 195 48 L 195 200 L 245 200 L 245 230" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" fill="none" />
          <path d="M 195 48 L 350 48 L 350 200 L 360 200 L 360 220" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" fill="none" />

          {/* Wiring labels */}
          <text x="155" y="75" fontSize="6" fill="#64748b">2x1,5mm²</text>
          <text x="250" y="145" fontSize="6" fill="#64748b">2x1,5mm²</text>
          <text x="130" y="195" fontSize="6" fill="#64748b">2x1,5mm²</text>
          <text x="280" y="195" fontSize="6" fill="#64748b">2x2,5mm²</text>
          <text x="360" y="150" fontSize="6" fill="#64748b">3x4mm²</text>

          {/* Elements */}
          {project.elements.map(element => (
            <ElementSymbol
              key={element.id}
              element={element}
              isSelected={selectedElement?.id === element.id}
              onClick={() => onElementSelect(element)}
            />
          ))}

          {/* Dimension lines */}
          <line x1="20" y1="320" x2="400" y2="320" stroke="#9ca3af" strokeWidth="0.5" markerStart="url(#arrowStart)" markerEnd="url(#arrowEnd)" />
          <text x="210" y="335" textAnchor="middle" fontSize="8" fill="#9ca3af">7.60 m</text>
          
          <line x1="420" y1="20" x2="420" y2="300" stroke="#9ca3af" strokeWidth="0.5" />
          <text x="435" y="160" textAnchor="middle" fontSize="8" fill="#9ca3af" transform="rotate(90, 435, 160)">5.40 m</text>

          {/* Arrow markers */}
          <defs>
            <marker id="arrowStart" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto">
              <path d="M6,0 L0,3 L6,6" fill="none" stroke="#9ca3af" strokeWidth="1" />
            </marker>
            <marker id="arrowEnd" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6" fill="none" stroke="#9ca3af" strokeWidth="1" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 border-t border-gray-200 px-3 py-1.5 flex items-center gap-4">
        <span className="text-[10px] text-gray-500 font-medium">Circuitos:</span>
        {project.circuits.map(circuit => (
          <div key={circuit.id} className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: circuit.color }}></div>
            <span className="text-[10px] text-gray-600">{circuit.id} - {circuit.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
