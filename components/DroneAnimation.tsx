import React from 'react';
import { User, Users, Eye, EyeOff, AlertTriangle } from './icons';

interface DroneAnimationProps {
  category: string;
  subcategory: string | null;
  animationProgress: number;
}

const Drone = () => (
    <svg width="50" height="50" viewBox="0 0 50 50" className="drop-shadow-lg">
      <circle cx="25" cy="25" r="6" fill="#1e40af" />
      <rect x="22" y="23" width="6" height="4" fill="#3b82f6" />
      <line x1="12" y1="12" x2="25" y2="25" stroke="#1e40af" strokeWidth="3" />
      <line x1="38" y1="12" x2="25" y2="25" stroke="#1e40af" strokeWidth="3" />
      <line x1="12" y1="38" x2="25" y2="25" stroke="#1e40af" strokeWidth="3" />
      <line x1="38" y1="38" x2="25" y2="25" stroke="#1e40af" strokeWidth="3" />
      <circle cx="12" cy="12" r="4" fill="#9ca3af" className="animate-spin" style={{ animationDuration: '0.4s', transformOrigin: 'center' }} />
      <circle cx="38" cy="12" r="4" fill="#9ca3af" className="animate-spin" style={{ animationDuration: '0.4s', transformOrigin: 'center' }} />
      <circle cx="12" cy="38" r="4" fill="#9ca3af" className="animate-spin" style={{ animationDuration: '0.4s', transformOrigin: 'center' }} />
      <circle cx="38" cy="38" r="4" fill="#9ca3af" className="animate-spin" style={{ animationDuration: '0.4s', transformOrigin: 'center' }} />
    </svg>
);

const Building = ({ style, type = 1 }: { style: React.CSSProperties, type?: number }) => (
    <div style={style} className="absolute bottom-10">
        {type === 1 ? (
            <svg width="80" height="120" viewBox="0 0 80 120" className="opacity-70 drop-shadow-md">
                <rect x="0" y="0" width="80" height="120" fill="#64748b" />
                <rect x="10" y="10" width="20" height="20" fill="#94a3b8" />
                <rect x="50" y="10" width="20" height="20" fill="#94a3b8" />
                <rect x="10" y="45" width="20" height="20" fill="#94a3b8" />
                <rect x="50" y="45" width="20" height="20" fill="#94a3b8" />
                <rect x="10" y="80" width="60" height="30" fill="#94a3b8" />
            </svg>
        ) : (
             <svg width="60" height="160" viewBox="0 0 60 160" className="opacity-70 drop-shadow-md">
                <rect x="0" y="0" width="60" height="160" fill="#475569" />
                 <rect x="10" y="10" width="15" height="15" fill="#94a3b8" />
                 <rect x="35" y="10" width="15" height="15" fill="#94a3b8" />
                 <rect x="10" y="35" width="15" height="15" fill="#94a3b8" />
                 <rect x="35" y="35" width="15" height="15" fill="#94a3b8" />
                 <rect x="10" y="60" width="15" height="15" fill="#94a3b8" />
                 <rect x="35" y="60" width="15" height="15" fill="#94a3b8" />
                 <rect x="10" y="85" width="15" height="15" fill="#94a3b8" />
                 <rect x="35" y="85" width="15" height="15" fill="#94a3b8" />
            </svg>
        )}
    </div>
);

export const DroneAnimation: React.FC<DroneAnimationProps> = ({ category, subcategory, animationProgress }) => {
    const progress = animationProgress / 100;

    const getDronePosition = () => {
        let x = 10 + progress * 75; 
        let y = 50; 

        if (category === 'ouverte') {
            if (subcategory === 'a1') y = 65;
            if (subcategory === 'a2') y = 55;
            if (subcategory === 'a3') y = 40;
        } else if (category === 'specifique') {
            if (subcategory === 'sts01') y = 50;
            if (subcategory === 'sts02') y = 35;
        }
        return { x: `${x}%`, y: `${y}%` };
    };

    const pos = getDronePosition();
    
    const showPopulatedArea = ['a1', 'a2', 'sts01'].includes(subcategory || '');
    const showDistantPopulatedArea = subcategory === 'a3';
    const showPublic = ['a1', 'a2'].includes(subcategory || '');
    const showObservers = subcategory === 'sts02';

    return (
        <div className="relative w-full h-96 bg-gradient-to-b from-sky-300 to-sky-100 rounded-lg overflow-hidden border-2 border-sky-400 font-sans">
            <div className="absolute bottom-0 w-full h-10 bg-green-500 z-0" />
            <div className="absolute bottom-10 w-full h-10 bg-green-400 z-0" />

            <div className="absolute top-8 right-16 w-16 h-16 bg-yellow-300 rounded-full opacity-80"></div>

            <div className="absolute w-full h-full z-10">
                <div className="absolute bottom-8 left-[5%] text-center">
                    <User className="w-10 h-10 text-blue-900 drop-shadow-md" />
                    <div className="text-xs font-bold text-blue-900">Pilote</div>
                </div>

                {showPopulatedArea && (
                    <>
                        <Building style={{ right: '22%' }} type={1}/>
                        <Building style={{ right: '8%' }} type={2}/>
                    </>
                )}
                 {showDistantPopulatedArea && (
                     <>
                        <Building style={{ right: '5%', transform: 'scale(0.8)' }} type={1}/>
                        <div className="absolute top-[30%] bottom-8 right-[30%] text-center">
                            <div className="h-full w-0.5 bg-red-500/70 border-r-2 border-dashed border-red-500 mx-auto"></div>
                            <div className="absolute -top-8 w-full text-red-700 font-bold text-sm">
                                150m min.
                                <br/>
                                des zones habitées
                            </div>
                        </div>
                     </>
                 )}

                {showPublic && (
                    <div className="absolute bottom-8 right-[15%] text-center">
                        {subcategory === 'a2' && (
                            <div className="absolute -top-28 -left-[70px] pointer-events-none">
                                <svg width="200" height="150" >
                                    <circle cx="100" cy="110" r="60" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                                    <text x="100" y="40" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Rayon de sécurité 30m</text>
                                    
                                    <circle cx="100" cy="110" r="15" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1" />
                                    <text x="100" y="90" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">5m (lent)</text>
                                </svg>
                            </div>
                        )}
                        <Users className="w-14 h-14 text-slate-700 drop-shadow-md" />
                        <div className="text-xs font-bold text-slate-700">Public</div>
                    </div>
                )}
                
                {subcategory === 'sts01' && (
                    <div className="absolute bottom-0 left-[2%] right-[5%] h-10 bg-blue-500/20 rounded-t-lg">
                         <p className="text-center text-blue-800 text-xs font-bold pt-1">Zone contrôlée au sol</p>
                    </div>
                )}


                {showObservers && (
                    <>
                        <div className="absolute bottom-8 left-[40%] text-center">
                            <User className="w-8 h-8 text-indigo-700 drop-shadow-md" />
                            <div className="text-xs font-bold text-indigo-700">Observateur 1</div>
                        </div>
                        <div className="absolute bottom-8 left-[75%] text-center">
                            <User className="w-8 h-8 text-indigo-700 drop-shadow-md" />
                            <div className="text-xs font-bold text-indigo-700">Observateur 2</div>
                        </div>
                        <div className="absolute bottom-16 left-[45%] right-[25%]">
                            <div className="relative text-center">
                                <svg width="100%" height="20" className="absolute top-2 left-0 pointer-events-none">
                                    <line x1="0" y1="10" x2="100%" y2="10" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 4" />
                                    <line x1="0" y1="5" x2="0" y2="15" stroke="#4f46e5" strokeWidth="2" />
                                    <line x1="100%" y1="5" x2="100%" y2="15" stroke="#4f46e5" strokeWidth="2" />
                                </svg>
                                <span className="bg-sky-100 px-1 text-indigo-700 font-bold text-sm">Distance > 1km</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
            
            <div className="absolute transition-all duration-100 ease-linear z-20" style={{ left: pos.x, top: pos.y, transform: `translate(-50%, -50%)` }}>
                <Drone />
            </div>

            <div className="absolute inset-0 z-30 pointer-events-none">
                {category === 'specifique' && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
                        {subcategory === 'sts01' ? (
                            <><Eye className="w-5 h-5 text-green-600" /><span className="text-sm font-bold text-green-600">À VUE (VLOS)</span></>
                        ) : (
                            <><EyeOff className="w-5 h-5 text-orange-600" /><span className="text-sm font-bold text-orange-600">HORS VUE (BVLOS)</span></>
                        )}
                    </div>
                )}
                
                {category === 'specifique' && subcategory === 'sts01' && (
                    <div className="absolute top-16 left-4 text-sm font-bold text-blue-800 bg-white/50 rounded px-2 py-1">Zone de vol &lt; 1km</div>
                )}
                {category === 'specifique' && subcategory === 'sts02' && (
                     <div className="absolute top-16 left-4 text-sm font-bold text-orange-800 bg-white/50 rounded px-2 py-1">Zone de vol &lt; 2km</div>
                )}

                {category === 'specifique' && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-50/70 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md border border-red-200">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span className="text-xs font-bold text-red-600">Risque tiers</span>
                    </div>
                )}

                <div className="absolute right-2 top-4 bottom-4 w-1 bg-sky-600/50 rounded-full">
                    <div className="absolute -left-8 -top-1 text-xs font-bold text-sky-800">120m</div>
                    <div className="absolute h-0.5 w-6 bg-sky-600/50 -left-6 top-px"></div>
                    <div className="absolute -left-4 -bottom-1 text-xs font-bold text-sky-800">0m</div>
                    <div className="absolute h-0.5 w-4 bg-sky-600/50 -left-4 bottom-px"></div>
                </div>
            </div>
        </div>
    );
};
