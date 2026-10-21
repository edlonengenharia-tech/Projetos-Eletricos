interface HeaderProps {
  projectName: string;
}

export default function Header({ projectName }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-800 leading-tight">WOCA</h1>
            <p className="text-[10px] text-gray-500 leading-tight">Instalação Elétrica Online</p>
          </div>
        </div>
        <div className="h-6 w-px bg-gray-200 mx-2"></div>
        <div>
          <p className="text-xs text-gray-500">Projeto:</p>
          <p className="text-sm font-semibold text-gray-800">{projectName}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Salvar
        </button>
        <button className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Imprimir
        </button>
        <div className="h-6 w-px bg-gray-200 mx-1"></div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-700 text-xs font-bold">JS</span>
          </div>
        </div>
      </div>
    </header>
  );
}
