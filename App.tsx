import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle, CheckCircle, Info } from './components/icons';
import { DroneAnimation } from './components/DroneAnimation';
import { ComplianceChecker } from './components/ComplianceChecker';
import { CATEGORIES } from './constants';
import { SubcategoryDetails } from './types';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES>('ouverte');
  const [selectedSubcategoryKey, setSelectedSubcategoryKey] = useState<string | null>('a1');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isAnimating) {
      interval = window.setInterval(() => {
        setAnimationProgress(prev => {
          if (prev >= 100) {
            setIsAnimating(false);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);
  
  useEffect(() => {
    // Auto-start animation on subcategory change
    if (selectedSubcategoryKey && selectedCategory !== 'certifiee') {
        setAnimationProgress(0);
        setIsAnimating(true);
    }
  }, [selectedSubcategoryKey, selectedCategory])


  const handleSelectCategory = (categoryKey: keyof typeof CATEGORIES) => {
    setSelectedCategory(categoryKey);
    const firstSubcategory = Object.keys(CATEGORIES[categoryKey].subcategories)[0];
    setSelectedSubcategoryKey(firstSubcategory);
    setIsAnimating(false);
    setAnimationProgress(0);
  };

  const handleSelectSubcategory = (subcategoryKey: string) => {
    setSelectedSubcategoryKey(subcategoryKey);
    setIsAnimating(false);
    setAnimationProgress(0);
  };

  const currentCategory = CATEGORIES[selectedCategory];
  const currentSubcategory: SubcategoryDetails | null = selectedSubcategoryKey ? currentCategory.subcategories[selectedSubcategoryKey] : null;

  const detailItems = [
      { key: "classes", label: "Classes autorisees", value: currentSubcategory?.classes, color: "purple" },
      { key: "maxWeight", label: "Masse maximale", value: currentSubcategory?.maxWeight, color: "blue" },
      { key: "minDistance", label: "Distance minimale", value: currentSubcategory?.minDistance, color: "green" },
      { key: "maxHeight", label: "Hauteur maximale", value: currentSubcategory?.maxHeight, color: "indigo" },
      { key: "visualContact", label: "Contact visuel", value: currentSubcategory?.visualContact, color: "teal" },
      { key: "remoteId", label: "Remote ID", value: currentSubcategory?.remoteId, color: "pink" }
  ];

  const colorMap = {
      purple: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-900' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-900' },
      green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-900' },
      indigo: { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-900' },
      teal: { bg: 'bg-teal-50', border: 'border-teal-500', text: 'text-teal-900' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-900' }
  } as const;

  return (
    <div className="min-h-screen p-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Telepilote Drone
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-2">Reglementation DGAC EASA - France 2025</p>
          <p className="text-sm text-gray-500">Reglements UE 2019/947 et 2019/945</p>
          <p className="text-sm text-gray-600 mt-4 italic">Créé par Rezzak Brahim</p>
        </header>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => handleSelectCategory('ouverte')}
            className={`p-6 rounded-xl shadow-lg transition-all transform hover:scale-105 ${
              selectedCategory === 'ouverte'
                ? 'bg-blue-600 text-white scale-105 ring-4 ring-blue-300'
                : 'bg-white text-blue-900 hover:bg-blue-50 border'
            }`}
          >
            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold mb-2">{CATEGORIES.ouverte.name}</h3>
            <p className="text-sm opacity-90">{CATEGORIES.ouverte.description}</p>
          </button>
          
          <button
            onClick={() => handleSelectCategory('specifique')}
            className={`p-6 rounded-xl shadow-lg transition-all transform hover:scale-105 ${
              selectedCategory === 'specifique'
                ? 'bg-orange-600 text-white scale-105 ring-4 ring-orange-300'
                : 'bg-white text-orange-900 hover:bg-orange-50 border'
            }`}
          >
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold mb-2">{CATEGORIES.specifique.name}</h3>
            <p className="text-sm opacity-90">{CATEGORIES.specifique.description}</p>
          </button>

          <button
            onClick={() => handleSelectCategory('certifiee')}
            className={`p-6 rounded-xl shadow-lg transition-all transform hover:scale-105 ${
              selectedCategory === 'certifiee'
                ? 'bg-red-600 text-white scale-105 ring-4 ring-red-300'
                : 'bg-white text-red-900 hover:bg-red-50 border'
            }`}
          >
            <Info className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-2xl font-bold mb-2">{CATEGORIES.certifiee.name}</h3>
            <p className="text-sm opacity-90">{CATEGORIES.certifiee.description}</p>
          </button>
        </div>

        {selectedCategory !== 'certifiee' && (
          <div className={`grid ${selectedCategory === 'ouverte' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 mb-6`}>
            {Object.entries(currentCategory.subcategories).map(([key, sub]) => (
              <button
                key={key}
                onClick={() => handleSelectSubcategory(key)}
                className={`p-5 rounded-lg shadow-md transition-all transform hover:scale-105 text-left border ${
                  selectedSubcategoryKey === key
                    ? selectedCategory === 'ouverte' 
                      ? 'bg-blue-500 text-white ring-2 ring-blue-300 border-blue-500'
                      : 'bg-orange-500 text-white ring-2 ring-orange-300 border-orange-500'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <h4 className="font-bold text-lg mb-1">{sub.name}</h4>
                <p className="text-xs opacity-90">{sub.description || sub.zones}</p>
                {sub.classes && <p className="text-xs mt-2 font-semibold">Classes: {sub.classes}</p>}
              </button>
            ))}
          </div>
        )}

        {currentSubcategory && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            {/* ANIMATION PANEL */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-xl p-6 border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                  <h3 className="text-2xl font-bold text-gray-800">{currentSubcategory.name} - Scénario de vol</h3>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setIsAnimating(!isAnimating)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-all"
                    >
                      {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      {isAnimating ? 'Pause' : 'Jouer'}
                    </button>
                    <button
                      onClick={() => {
                        setIsAnimating(false);
                        setAnimationProgress(0);
                      }}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2 transition-all"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Reset
                    </button>
                  </div>
                </div>
                { selectedCategory !== 'certifiee' && <DroneAnimation category={selectedCategory} subcategory={selectedSubcategoryKey} animationProgress={animationProgress} /> }
                 { selectedCategory === 'certifiee' && (
                    <div className="h-96 flex flex-col items-center justify-center bg-slate-100 rounded-lg text-center p-4">
                        <Info className="w-16 h-16 text-slate-500 mb-4" />
                        <h4 className="text-xl font-bold text-slate-700">Cas par cas</h4>
                        <p className="text-slate-600">Les opérations en catégorie Certifiée sont complexes et ne peuvent être représentées par une animation standard. Elles requièrent des autorisations spécifiques de l'EASA/DGAC.</p>
                    </div>
                )}
            </div>
            
            {/* DETAILS PANEL */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-xl p-6 border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                  <h3 className="text-2xl font-bold text-gray-800">Réglementation</h3>
                </div>
    
                <div className="space-y-3">
                   {detailItems.map((item) => {
                      if (!item.value) return null;
                      const colors = colorMap[item.color as keyof typeof colorMap];
                      return (
                          <div key={item.key} className={`p-3 rounded-lg border-l-4 ${colors.bg} ${colors.border}`}>
                              <p className="text-sm text-gray-600 font-semibold">{item.label}</p>
                              <p className={`text-base font-bold ${colors.text}`}>{item.value}</p>
                          </div>
                      );
                  })}
                  
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Zones autorisées</p>
                    <p className="text-sm font-bold text-yellow-900">{currentSubcategory.zones}</p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Formation requise</p>
                    <p className="text-sm font-bold text-orange-900">{currentSubcategory.requirements}</p>
                  </div>
                </div>

                <details className="mt-4">
                    <summary className="cursor-pointer text-indigo-600 hover:text-indigo-800 font-semibold">Détails complémentaires</summary>
                     <div className="mt-3 pt-3 border-t">
                        <p className="text-gray-700 mb-4 text-sm">{currentSubcategory.details}</p>
                        
                        {Object.entries({
                            pilotDistance: {label: "Distance pilote-drone", value: currentSubcategory.pilotDistance},
                            observerDistance: {label: "Distance observateur", value: currentSubcategory.observerDistance},
                            safetyDistance: {label: "Distance securite", value: currentSubcategory.safetyDistance},
                            flightZone: {label: "Zone de vol", value: currentSubcategory.flightZone}
                        }).map(([key, item]) => item.value ? (
                            <div key={key} className="mb-2 text-xs">
                                <span className="font-semibold text-gray-700">{item.label} : </span>
                                <span className="text-gray-600">{item.value}</span>
                            </div>
                        ) : null)}
                      </div>
                </details>
            </div>
          </div>
        )}

        <ComplianceChecker />

        <footer className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl shadow-xl p-6 text-white mb-6">
          <h3 className="text-2xl font-bold mb-4">Ressources officielles</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="https://alphatango.aviation-civile.gouv.fr/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-lg block">
              <h4 className="font-bold mb-2">AlphaTango</h4>
              <p className="text-sm opacity-90">Enregistrement exploitant UAS</p>
            </a>
            <a href="https://fox-alphatango.aviation-civile.gouv.fr/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-lg block">
              <h4 className="font-bold mb-2">Fox AlphaTango</h4>
              <p className="text-sm opacity-90">Formation et examens en ligne</p>
            </a>
            <a href="https://www.geoportail.gouv.fr/donnees/restrictions-uas-categorie-ouverte-et-aeromodelisme" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-lg block">
              <h4 className="font-bold mb-2">Geoportail</h4>
              <p className="text-sm opacity-90">Carte officielle des geozones</p>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;