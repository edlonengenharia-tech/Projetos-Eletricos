import { useState } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import LoadPanel from './components/LoadPanel';
import BudgetPanel from './components/BudgetPanel';
import { ProjectState, ElectricalElement } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<'editor' | 'loadPanel' | 'budget'>('editor');
  const [selectedElement, setSelectedElement] = useState<ElectricalElement | null>(null);
  const [activeTool, setActiveTool] = useState<string>('select');
  const [project, setProject] = useState<ProjectState>({
    name: 'Projeto Residencial - Casa Térrea',
    client: 'João Silva',
    address: 'Rua das Flores, 123 - São Paulo/SP',
    phases: 2,
    voltage: 127,
    utility: 'ENEL',
    rooms: [
      { id: '1', name: 'Sala', x: 20, y: 20, width: 200, height: 150, color: '#f0f9ff' },
      { id: '2', name: 'Cozinha', x: 220, y: 20, width: 180, height: 150, color: '#fff7ed' },
      { id: '3', name: 'Quarto 1', x: 20, y: 170, width: 150, height: 130, color: '#f0fdf4' },
      { id: '4', name: 'Quarto 2', x: 170, y: 170, width: 150, height: 130, color: '#fdf4ff' },
      { id: '5', name: 'Banheiro', x: 320, y: 170, width: 80, height: 130, color: '#eff6ff' },
    ],
    elements: [
      { id: 'e1', type: 'light', roomId: '1', x: 120, y: 80, circuit: 1, power: 100, label: 'L1' },
      { id: 'e2', type: 'switch', roomId: '1', x: 40, y: 150, circuit: 1, power: 0, label: 'S1' },
      { id: 'e3', type: 'outlet_tug', roomId: '1', x: 80, y: 155, circuit: 2, power: 100, label: 'TUG1' },
      { id: 'e4', type: 'outlet_tug', roomId: '1', x: 160, y: 155, circuit: 2, power: 100, label: 'TUG2' },
      { id: 'e5', type: 'light', roomId: '2', x: 310, y: 80, circuit: 1, power: 100, label: 'L2' },
      { id: 'e6', type: 'switch', roomId: '2', x: 240, y: 150, circuit: 1, power: 0, label: 'S2' },
      { id: 'e7', type: 'outlet_tue', roomId: '2', x: 280, y: 155, circuit: 5, power: 1200, label: 'Micro-ondas' },
      { id: 'e8', type: 'outlet_tue', roomId: '2', x: 340, y: 155, circuit: 5, power: 600, label: 'Geladeira' },
      { id: 'e9', type: 'outlet_tug', roomId: '2', x: 370, y: 155, circuit: 2, power: 100, label: 'TUG3' },
      { id: 'e10', type: 'light', roomId: '3', x: 95, y: 230, circuit: 1, power: 100, label: 'L3' },
      { id: 'e11', type: 'switch', roomId: '3', x: 40, y: 280, circuit: 1, power: 0, label: 'S3' },
      { id: 'e12', type: 'outlet_tug', roomId: '3', x: 80, y: 285, circuit: 2, power: 100, label: 'TUG4' },
      { id: 'e13', type: 'outlet_tue', roomId: '3', x: 130, y: 285, circuit: 4, power: 1500, label: 'Ar-Cond.' },
      { id: 'e14', type: 'light', roomId: '4', x: 245, y: 230, circuit: 1, power: 100, label: 'L4' },
      { id: 'e15', type: 'switch', roomId: '4', x: 190, y: 280, circuit: 1, power: 0, label: 'S4' },
      { id: 'e16', type: 'outlet_tug', roomId: '4', x: 230, y: 285, circuit: 2, power: 100, label: 'TUG5' },
      { id: 'e17', type: 'outlet_tue', roomId: '5', x: 360, y: 220, circuit: 3, power: 5500, label: 'Chuveiro' },
      { id: 'e18', type: 'light', roomId: '5', x: 360, y: 260, circuit: 1, power: 60, label: 'L5' },
      { id: 'e19', type: 'panel', roomId: '1', x: 195, y: 40, circuit: 0, power: 0, label: 'QDC' },
    ],
    circuits: [
      { id: 1, name: 'Iluminação', type: 'lighting', color: '#ef4444' },
      { id: 2, name: 'TUG - Tomadas Uso Geral', type: 'tug', color: '#3b82f6' },
      { id: 3, name: 'Chuveiro', type: 'tue', color: '#22c55e' },
      { id: 4, name: 'Ar-Condicionado', type: 'tue', color: '#a855f7' },
      { id: 5, name: 'Micro-ondas/Geladeira', type: 'tue', color: '#f59e0b' },
    ],
  });

  const handleElementSelect = (element: ElectricalElement | null) => {
    setSelectedElement(element);
  };

  const handleElementUpdate = (updated: ElectricalElement) => {
    setProject(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === updated.id ? updated : el)
    }));
    setSelectedElement(updated);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <Header projectName={project.name} />
      <Toolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <div className="flex-1 flex overflow-hidden">
        {activeView === 'editor' && (
          <>
            <Canvas
              project={project}
              activeTool={activeTool}
              onElementSelect={handleElementSelect}
              selectedElement={selectedElement}
            />
            <PropertiesPanel
              element={selectedElement}
              onUpdate={handleElementUpdate}
              circuits={project.circuits}
            />
          </>
        )}
        {activeView === 'loadPanel' && (
          <LoadPanel project={project} />
        )}
        {activeView === 'budget' && (
          <BudgetPanel project={project} />
        )}
      </div>
    </div>
  );
}
