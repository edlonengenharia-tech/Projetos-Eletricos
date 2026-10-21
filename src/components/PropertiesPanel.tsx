import { ElectricalElement, Circuit } from '../types';

interface PropertiesPanelProps {
  element: ElectricalElement | null;
  onUpdate: (element: ElectricalElement) => void;
  circuits: Circuit[];
}

export default function PropertiesPanel({ element, onUpdate, circuits }: PropertiesPanelProps) {
  if (!element) {
    return (
      <div className="w-64 bg-white border-l border-gray-200 flex flex-col">
        <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xs font-semibold text-gray-700">Propriedades</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <svg className="w-10 h-10 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <p className="text-xs text-gray-400">Selecione um elemento para editar suas propriedades</p>
          </div>
        </div>

        {/* Project Info */}
        <div className="border-t border-gray-200 p-3">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Info do Projeto</h4>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[10px] text-gray-500">Tipo:</span>
              <span className="text-[10px] text-gray-700 font-medium">Residencial</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-gray-500">Tensão:</span>
              <span className="text-[10px] text-gray-700 font-medium">127V / 220V</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-gray-500">Fases:</span>
              <span className="text-[10px] text-gray-700 font-medium">Bifásico</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-gray-500">Norma:</span>
              <span className="text-[10px] text-gray-700 font-medium">NBR 5410</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-gray-500">Área Total:</span>
              <span className="text-[10px] text-gray-700 font-medium">41.2 m²</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const typeLabels: Record<string, string> = {
    light: 'Lâmpada / Ponto de Luz',
    switch: 'Interruptor',
    outlet_tug: 'Tomada TUG (Uso Geral)',
    outlet_tue: 'Tomada TUE (Uso Específico)',
    panel: 'Quadro de Distribuição',
    conduit: 'Eletroduto',
    meter: 'Medidor',
  };

  const handleChange = (field: string, value: string | number) => {
    onUpdate({ ...element, [field]: value });
  };

  return (
    <div className="w-64 bg-white border-l border-gray-200 flex flex-col overflow-y-auto">
      <div className="px-3 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-700">Propriedades</h3>
        <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded">{element.label}</span>
      </div>

      <div className="p-3 space-y-3">
        {/* Type */}
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Tipo</label>
          <p className="text-xs text-gray-800 font-medium mt-0.5">{typeLabels[element.type]}</p>
        </div>

        {/* Label */}
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Identificação</label>
          <input
            type="text"
            value={element.label}
            onChange={(e) => handleChange('label', e.target.value)}
            className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Circuit */}
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Circuito</label>
          <select
            value={element.circuit}
            onChange={(e) => handleChange('circuit', parseInt(e.target.value))}
            className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
          >
            {circuits.map(circuit => (
              <option key={circuit.id} value={circuit.id}>
                {circuit.id} - {circuit.name}
              </option>
            ))}
          </select>
        </div>

        {/* Power */}
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Potência (VA/W)</label>
          <input
            type="number"
            value={element.power}
            onChange={(e) => handleChange('power', parseFloat(e.target.value) || 0)}
            className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Position */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Posição X</label>
            <input
              type="number"
              value={element.x}
              onChange={(e) => handleChange('x', parseFloat(e.target.value) || 0)}
              className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Posição Y</label>
            <input
              type="number"
              value={element.y}
              onChange={(e) => handleChange('y', parseFloat(e.target.value) || 0)}
              className="mt-1 w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Voltage info */}
        <div className="bg-gray-50 rounded-md p-2">
          <h4 className="text-[10px] font-medium text-gray-600 mb-1">Dimensionamento</h4>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-[10px] text-gray-500">Corrente:</span>
              <span className="text-[10px] text-gray-700 font-medium">
                {(element.power / 127).toFixed(1)} A
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-gray-500">Disjuntor:</span>
              <span className="text-[10px] text-gray-700 font-medium">
                {element.power <= 1270 ? '10A' : element.power <= 2540 ? '16A' : element.power <= 3810 ? '20A' : '32A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-gray-500">Seção condutor:</span>
              <span className="text-[10px] text-gray-700 font-medium">
                {element.power <= 1270 ? '1,5 mm²' : element.power <= 2540 ? '2,5 mm²' : element.power <= 4000 ? '4 mm²' : '6 mm²'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button className="flex-1 text-xs bg-red-50 hover:bg-red-100 text-red-700 py-1.5 rounded-md border border-red-200 transition-colors">
            Duplicar
          </button>
          <button className="flex-1 text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 py-1.5 rounded-md border border-gray-200 transition-colors">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
