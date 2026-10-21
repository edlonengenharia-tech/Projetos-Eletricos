import { ProjectState } from '../types';

interface LoadPanelProps {
  project: ProjectState;
}

export default function LoadPanel({ project }: LoadPanelProps) {
  // Calculate loads per circuit
  const circuitLoads = project.circuits.map(circuit => {
    const elements = project.elements.filter(el => el.circuit === circuit.id);
    const totalPower = elements.reduce((sum, el) => sum + el.power, 0);
    const current = totalPower / project.voltage;
    const breakerSize = current <= 10 ? 10 : current <= 16 ? 16 : current <= 20 ? 20 : current <= 25 ? 25 : 32;
    const wireSection = current <= 10 ? '1,5' : current <= 17 ? '2,5' : current <= 24 ? '4' : '6';
    const numWires = circuit.type === 'lighting' ? 2 : circuit.id === 3 ? 3 : 2;

    return {
      ...circuit,
      elements,
      totalPower,
      current,
      breakerSize,
      wireSection,
      numWires,
      fp: totalPower / (breakerSize * project.voltage),
    };
  });

  const totalPower = circuitLoads.reduce((sum, c) => sum + c.totalPower, 0);
  const totalCurrent = totalPower / project.voltage;
  const demandFactor = 0.8;
  const demandCurrent = totalCurrent * demandFactor;

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
              </svg>
              Quadro de Cargas
            </h2>
            <div className="flex gap-2">
              <button className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md border border-blue-200">
                Exportar Excel
              </button>
              <button className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md">
                Imprimir
              </button>
            </div>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-500">Projeto:</span>
              <p className="font-medium text-gray-800">{project.name}</p>
            </div>
            <div>
              <span className="text-gray-500">Concessionária:</span>
              <p className="font-medium text-gray-800">{project.utility}</p>
            </div>
            <div>
              <span className="text-gray-500">Sistema:</span>
              <p className="font-medium text-gray-800">{project.phases === 1 ? 'Monofásico' : project.phases === 2 ? 'Bifásico' : 'Trifásico'} - {project.voltage}V</p>
            </div>
            <div>
              <span className="text-gray-500">Norma:</span>
              <p className="font-medium text-gray-800">NBR 5410</p>
            </div>
          </div>
        </div>

        {/* Ramal de Entrada */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">Ramal de Entrada</h3>
          <div className="grid grid-cols-5 gap-3 text-xs">
            <div className="bg-gray-50 rounded p-2">
              <span className="text-gray-500 block">Potência Total</span>
              <span className="font-bold text-gray-800">{totalPower.toLocaleString()} VA</span>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <span className="text-gray-500 block">Corrente Total</span>
              <span className="font-bold text-gray-800">{totalCurrent.toFixed(1)} A</span>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <span className="text-gray-500 block">Fator Demanda</span>
              <span className="font-bold text-gray-800">{(demandFactor * 100).toFixed(0)}%</span>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <span className="text-gray-500 block">Corrente Demanda</span>
              <span className="font-bold text-gray-800">{demandCurrent.toFixed(1)} A</span>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <span className="text-gray-500 block">Disjuntor Geral</span>
              <span className="font-bold text-gray-800">{demandCurrent <= 25 ? 25 : demandCurrent <= 32 ? 32 : demandCurrent <= 40 ? 40 : 50}A</span>
            </div>
          </div>
        </div>

        {/* Circuit Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-700">Circuitos Terminais</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Circuito</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Descrição</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Tipo</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-600">Qtd. Pontos</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-600">Potência (VA)</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-600">Corrente (A)</th>
                  <th className="text-center px-3 py-2 font-semibold text-gray-600">Fio</th>
                  <th className="text-center px-3 py-2 font-semibold text-gray-600">Disjuntor</th>
                  <th className="text-center px-3 py-2 font-semibold text-gray-600">FP</th>
                </tr>
              </thead>
              <tbody>
                {circuitLoads.map((circuit, idx) => (
                  <tr key={circuit.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: circuit.color }}></div>
                        <span className="font-medium text-gray-800">{circuit.id}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-gray-700">{circuit.name}</td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        circuit.type === 'lighting' ? 'bg-red-50 text-red-700' :
                        circuit.type === 'tug' ? 'bg-blue-50 text-blue-700' :
                        'bg-green-50 text-green-700'
                      }`}>
                        {circuit.type === 'lighting' ? 'Ilum.' : circuit.type === 'tug' ? 'TUG' : 'TUE'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right text-gray-700">{circuit.elements.length}</td>
                    <td className="px-3 py-2 text-right font-medium text-gray-800">{circuit.totalPower.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right text-gray-700">{circuit.current.toFixed(1)}</td>
                    <td className="px-3 py-2 text-center text-gray-700">{circuit.numWires}x{circuit.wireSection}mm²</td>
                    <td className="px-3 py-2 text-center font-medium text-gray-800">{circuit.breakerSize}A</td>
                    <td className="px-3 py-2 text-center text-gray-600">{circuit.fp.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-red-50 border-t-2 border-red-200 font-bold">
                  <td className="px-3 py-2 text-red-800" colSpan={3}>TOTAL</td>
                  <td className="px-3 py-2 text-right text-red-800">
                    {project.elements.filter(e => e.type !== 'panel').length}
                  </td>
                  <td className="px-3 py-2 text-right text-red-800">{totalPower.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-red-800">{totalCurrent.toFixed(1)}</td>
                  <td className="px-3 py-2" colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Phase Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">Distribuição por Fase</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-yellow-800">Fase A</span>
                <span className="text-xs font-bold text-yellow-800">{(totalPower * 0.35).toFixed(0)} VA</span>
              </div>
              <div className="w-full bg-yellow-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <p className="text-[10px] text-yellow-700 mt-1">Corrente: {(totalCurrent * 0.35).toFixed(1)} A</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-blue-800">Fase B</span>
                <span className="text-xs font-bold text-blue-800">{(totalPower * 0.35).toFixed(0)} VA</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <p className="text-[10px] text-blue-700 mt-1">Corrente: {(totalCurrent * 0.35).toFixed(1)} A</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-green-800">Neutro</span>
                <span className="text-xs font-bold text-green-800">{(totalPower * 0.30).toFixed(0)} VA</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <p className="text-[10px] text-green-700 mt-1">Corrente: {(totalCurrent * 0.30).toFixed(1)} A</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
