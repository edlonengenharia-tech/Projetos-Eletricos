export interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface ElectricalElement {
  id: string;
  type: 'light' | 'switch' | 'outlet_tug' | 'outlet_tue' | 'panel' | 'conduit' | 'meter';
  roomId: string;
  x: number;
  y: number;
  circuit: number;
  power: number;
  label: string;
}

export interface Circuit {
  id: number;
  name: string;
  type: 'lighting' | 'tug' | 'tue';
  color: string;
}

export interface ProjectState {
  name: string;
  client: string;
  address: string;
  phases: number;
  voltage: number;
  utility: string;
  rooms: Room[];
  elements: ElectricalElement[];
  circuits: Circuit[];
}
