import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { DRONE_CLASSES } from '../constants';
import { Location, ComplianceResult } from '../types';
import { MapPin, AlertTriangle, CheckCircle, Info } from './icons';

// Component for loading spinner
const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const ComplianceChecker: React.FC = () => {
    const [selectedClass, setSelectedClass] = useState<string>('C0');
    const [location, setLocation] = useState<Location | null>(null);
    const [result, setResult] = useState<ComplianceResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleLocation = () => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        if (!navigator.geolocation) {
            setError("La géolocalisation n'est pas supportée par votre navigateur.");
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                checkCompliance({ latitude, longitude });
            },
            (err) => {
                setError(`Erreur de géolocalisation : ${err.message}`);
                setIsLoading(false);
            }
        );
    };

    const checkCompliance = async (currentLocation: Location) => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const droneInfo = DRONE_CLASSES[selectedClass];
            const prompt = `
                Analyse this drone flight request in France based on my location and drone class.
                - My location: latitude ${currentLocation.latitude}, longitude ${currentLocation.longitude}.
                - Drone class: ${selectedClass} (${droneInfo.name} - ${droneInfo.details}).

                Based on French DGAC/EASA regulations and public geographical data (like airports, national parks, military zones, hospitals, nuclear plants, sensitive areas), determine the flight compliance.
                
                Respond ONLY with a JSON object with the following structure:
                {
                  "status": "ALLOWED" | "PROHIBITED" | "CAUTION",
                  "areaType": "A short description of the area type (e.g., 'Urban area', 'Near international airport', 'National park')",
                  "explanation": "A concise explanation in French for the status. Explain the key restrictions or permissions.",
                  "hazards": "A concise summary of nearby hazards or points of interest in French. If none, say 'Aucun danger majeur identifié'."
                }
            `;
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            status: { type: Type.STRING },
                            areaType: { type: Type.STRING },
                            explanation: { type: Type.STRING },
                            hazards: { type: Type.STRING },
                        },
                        required: ["status", "areaType", "explanation", "hazards"],
                    },
                },
            });

            const jsonString = response.text.trim();
            const parsedResult = JSON.parse(jsonString) as ComplianceResult;
            setResult(parsedResult);

        } catch (e) {
            console.error(e);
            setError("Une erreur est survenue lors de la vérification avec l'IA. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    const ResultDisplay = () => {
        if (!result) return null;

        const baseClasses = "p-4 rounded-lg flex items-start gap-4";
        let config = {
            icon: <Info className="w-8 h-8 text-slate-500 flex-shrink-0" />,
            classes: "bg-slate-100 border-l-4 border-slate-500 text-slate-800",
        };

        switch (result.status) {
            case 'ALLOWED':
                config = {
                    icon: <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />,
                    classes: "bg-green-50 border-l-4 border-green-500 text-green-800",
                };
                break;
            case 'PROHIBITED':
                config = {
                    icon: <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />,
                    classes: "bg-red-50 border-l-4 border-red-500 text-red-800",
                };
                break;
            case 'CAUTION':
                config = {
                    icon: <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0" />,
                    classes: "bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800",
                };
                break;
        }

        return (
            <div className={`${baseClasses} ${config.classes} mt-6`}>
                {config.icon}
                <div>
                    <h4 className="font-bold text-lg">
                        {result.status === 'ALLOWED' && 'Vol autorisé'}
                        {result.status === 'PROHIBITED' && 'Vol interdit'}
                        {result.status === 'CAUTION' && 'Vol avec restrictions'}
                    </h4>
                    <p className="text-sm font-semibold">{result.areaType}</p>
                    <p className="text-sm mt-2">{result.explanation}</p>
                    <p className="text-sm mt-2"><span className="font-bold">Dangers / A noter :</span> {result.hazards}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vérificateur de Zone de Vol (BETA)</h3>
            <p className="text-sm text-gray-600 mb-4">
                Sélectionnez une classe de drone et utilisez votre position actuelle pour obtenir une analyse de conformité basée sur l'IA.
                <br/>
                <strong className="text-red-600">Attention :</strong> Cet outil est expérimental et ne remplace pas une vérification sur les cartes officielles (Geoportail).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-full sm:w-1/2">
                    <label htmlFor="drone-class" className="block text-sm font-medium text-gray-700 mb-1">Classe du drone</label>
                    <select
                        id="drone-class"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {Object.entries(DRONE_CLASSES).map(([key, value]) => (
                            <option key={key} value={key}>{value.name}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full sm:w-1/2">
                     <label className="block text-sm font-medium text-gray-700 mb-1 opacity-0">Action</label>
                    <button
                        onClick={handleLocation}
                        disabled={isLoading}
                        className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-all"
                    >
                        {isLoading ? <Spinner /> : <MapPin className="w-5 h-5" />}
                        {isLoading ? 'Localisation...' : 'Vérifier ma position'}
                    </button>
                </div>
            </div>

            {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
            
            <ResultDisplay />
        </div>
    );
};
