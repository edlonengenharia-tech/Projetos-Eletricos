import { ProjectState } from '../types';

interface BudgetPanelProps {
  project: ProjectState;
}

export default function BudgetPanel({ project }: BudgetPanelProps) {
  // Calculate budget items
  const lights = project.elements.filter(e => e.type === 'light');
  const switches = project.elements.filter(e => e.type === 'switch');
  const tugs = project.elements.filter(e => e.type === 'outlet_tug');
  const tues = project.elements.filter(e => e.type === 'outlet_tue');

  const budgetItems = [
    {
      category: 'Condutores (Fios/Cabos)',
      items: [
        { description: 'Cabo 1,5mm² (Iluminação)', unit: 'm', qty: 45, price: 2.50 },
        { description: 'Cabo 2,5mm² (TUG)', unit: 'm', qty: 60, price: 3.80 },
        { description: 'Cabo 4mm² (TUE - Ar-Cond.)', unit: 'm', qty: 15, price: 6.20 },
        { description: 'Cabo 6mm² (Chuveiro)', unit: 'm', qty: 12, price: 8.50 },
      ]
    },
    {
      category: 'Eletrodutos',
      items: [
        { description: 'Eletroduto corrugado 3/4"', unit: 'm', qty: 35, price: 3.20 },
        { description: 'Eletroduto corrugado 1/2"', unit: 'm', qty: 15, price: 2.40 },
        { description: 'Luva para eletroduto 3/4"', unit: 'un', qty: 12, price: 1.50 },
        { description: 'Caixa de passagem 4x2"', unit: 'un', qty: 8, price: 4.80 },
      ]
    },
    {
      category: 'Dispositivos Embutidos',
      items: [
        { description: `Tomada TUG (2P+T) 10A - ${tugs.length} un`, unit: 'un', qty: tugs.length, price: 8.90 },
        { description: `Tomada TUE (2P+T) 20A - ${tues.length} un`, unit: 'un', qty: tues.length, price: 12.50 },
        { description: `Interruptor simples - ${switches.length} un`, unit: 'un', qty: switches.length, price: 7.50 },
        { description: `Placa 4x2" - ${lights.length + switches.length + tugs.length + tues.length} un`, unit: 'un', qty: lights.length + switches.length + tugs.length + tues.length, price: 3.20 },
      ]
    },
    {
      category: 'Iluminação',
      items: [
        { description: `Lâmpada LED 9W - ${lights.length} un`, unit: 'un', qty: lights.length, price: 15.90 },
        { description: 'Soquete E27 com suporte', unit: 'un', qty: lights.length, price: 4.50 },
      ]
    },
    {
      category: 'Proteção (Disjuntores)',
      items: [
        { description: 'Disjuntor monopolar 10A', unit: 'un', qty: 1, price: 18.90 },
        { description: 'Disjuntor monopolar 16A', unit: 'un', qty: 1, price: 19.90 },
        { description: 'Disjuntor monopolar 20A', unit: 'un', qty: 1, price: 22.50 },
        { description: 'Disjuntor bipolar 32A (Chuveiro)', unit: 'un', qty: 1, price: 35.90 },
        { description: 'Disjuntor geral 40A', unit: 'un', qty: 1, price: 45.90 },
        { description: 'DR 40A 30mA', unit: 'un', qty: 1, price: 89.90 },
        { description: 'DPS Tipo 2', unit: 'un', qty: 1, price: 65.00 },
      ]
    },
    {
      category: 'Quadro de Distribuição',
      items: [
        { description: 'Quadro de distribuição 12 módulos', unit: 'un', qty: 1, price: 85.00 },
        { description: 'Barramento de neutro', unit: 'un', qty: 1, price: 12.00 },
        { description: 'Barramento de terra', unit: 'un', qty: 1, price: 12.00 },
        { description: 'Etiqueta para identificação', unit: 'un', qty: 1, price: 5.00 },
      ]
    },
  ];

  const calculateCategoryTotal = (items: { qty: number; price: number }[]) => {
    return items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  };

  const grandTotal = budgetItems.reduce((sum, cat) => sum + calculateCategoryTotal(cat.items), 0);

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Orçamento de Materiais
            </h2>
            <div className="flex gap-2">
              <button className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md border border-blue-200">
                Exportar PDF
              </button>
              <button className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md">
                Imprimir
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-gray-500">Projeto:</span>
              <p className="font-medium text-gray-800">{project.name}</p>
            </div>
            <div>
              <span className="text-gray-500">Cliente:</span>
              <p className="font-medium text-gray-800">{project.client}</p>
            </div>
            <div>
              <span className="text-gray-500">Data:</span>
              <p className="font-medium text-gray-800">{new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </div>

        {/* Budget Categories */}
        {budgetItems.map((category, catIdx) => {
          const categoryTotal = calculateCategoryTotal(category.items);
          return (
            <div key={catIdx} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-3">
              <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-700">{category.category}</h3>
                <span className="text-sm font-bold text-gray-800">
                  R$ {categoryTotal.toFixed(2)}
                </span>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-4 py-1.5 font-medium text-gray-500">Descrição</th>
                    <th className="text-center px-3 py-1.5 font-medium text-gray-500 w-16">Un.</th>
                    <th className="text-right px-3 py-1.5 font-medium text-gray-500 w-16">Qtd.</th>
                    <th className="text-right px-3 py-1.5 font-medium text-gray-500 w-24">Preço Unit.</th>
                    <th className="text-right px-4 py-1.5 font-medium text-gray-500 w-28">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item, idx) => (
                    <tr key={idx} className={`border-b border-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <td className="px-4 py-1.5 text-gray-700">{item.description}</td>
                      <td className="px-3 py-1.5 text-center text-gray-600">{item.unit}</td>
                      <td className="px-3 py-1.5 text-right text-gray-700">{item.qty}</td>
                      <td className="px-3 py-1.5 text-right text-gray-700">R$ {item.price.toFixed(2)}</td>
                      <td className="px-4 py-1.5 text-right font-medium text-gray-800">R$ {(item.qty * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}

        {/* Grand Total */}
        <div className="bg-red-600 rounded-lg shadow-sm p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Geral do Projeto</p>
              <p className="text-xs opacity-75 mt-0.5">Materiais elétricos para instalação completa</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">R$ {grandTotal.toFixed(2)}</p>
              <p className="text-xs opacity-75">
                {budgetItems.reduce((sum, cat) => sum + cat.items.reduce((s, i) => s + i.qty, 0), 0)} itens no total
              </p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-2">Observações</h3>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Preços referenciais - sujeitos a alteração conforme fornecedor</li>
            <li>Não inclui mão de obra de instalação</li>
            <li>Quantidades calculadas conforme projeto elétrico dimensionado</li>
            <li>Recomenda-se adquirir 10% adicional de condutores para margem de segurança</li>
            <li>Verificar compatibilidade dos materiais com a concessionária local</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
