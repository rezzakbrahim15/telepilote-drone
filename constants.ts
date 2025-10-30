import { Categories, DroneClasses } from './types';

export const CATEGORIES: Categories = {
  ouverte: {
    name: 'Categorie Ouverte',
    description: 'Vols a faible risque sans autorisation prealable',
    subcategories: {
      a1: {
        name: 'A1 - Survol de personnes',
        classes: 'C0 (moins de 250g), C1 (moins de 900g)',
        maxWeight: '900g',
        minDistance: 'Pas de survol intentionnel C1',
        maxHeight: '120m AGL',
        requirements: 'C0 aucune formation - C1 Formation A1 A3 en ligne Fox AlphaTango',
        zones: 'Zone peuplee autorisee eviter les rassemblements',
        remoteId: 'C0 non - C1 oui',
        details: 'C0 peut survoler mais doit eviter - C1 pas de survol intentionnel'
      },
      a2: {
        name: 'A2 - Proximite de personnes',
        classes: 'C2 (moins de 4kg)',
        maxWeight: '4kg',
        minDistance: '30m ou 5m en mode vitesse lente',
        maxHeight: '120m AGL',
        requirements: 'Certificat A2 theorie en centre DGAC plus auto-formation pratique',
        zones: 'Zone peuplee avec distance de securite',
        remoteId: 'Oui obligatoire',
        details: 'Mode vitesse lente 3 m par s pour distance reduite a 5m'
      },
      a3: {
        name: 'A3 - Loin des personnes',
        classes: 'C2, C3, C4 (moins de 25kg)',
        maxWeight: '25kg',
        minDistance: '150m des zones residentielles commerciales',
        maxHeight: '120m AGL',
        requirements: 'Formation A1 A3 en ligne Fox AlphaTango',
        zones: 'Zone non peuplee uniquement',
        remoteId: 'C2 C3 oui - C4 non',
        details: 'Drones legacy 250g-25kg A3 uniquement - Loin de toute personne non impliquee'
      }
    }
  },
  specifique: {
    name: 'Categorie Specifique',
    description: 'Vols a risque moyen autorisation declaration requise',
    subcategories: {
      sts01: {
        name: 'STS-01 PDRA S01',
        classes: 'C5 base sur C3',
        description: 'Vol en vue VLOS dans une zone peuplee ou non',
        maxHeight: '120m',
        visualContact: 'A vue VLOS',
        zones: 'Zone controlee au sol dans un environnement peuple ou non',
        requirements: 'Formation A1 A3 plus Examen theorique categorie Ouverture Fox Alpha Tango',
        remoteId: 'Oui obligatoire',
        pilotDistance: '1m min entre le telepilote et appareil',
        observerDistance: 'Distance de 1m entre la personne localisee et le drone',
        flightZone: 'Zone de vol moins de 1km',
        details: 'Surveiller un risque pour les tiers - Vol a distance visuelle dans une zone controlee de 5km'
      },
      sts02: {
        name: 'STS-02 PDRA S02',
        classes: 'C6 base sur C3',
        description: 'Vol hors vue BVLOS dans une zone de faible densite de population',
        maxHeight: '120m',
        visualContact: 'Hors vue BVLOS',
        zones: 'Zone controlee au sol avec faible densite de population',
        requirements: 'Formation obligatoire plus Examen theorique categorie Ouverture sur Fox Alpha Tango',
        remoteId: 'Oui obligatoire',
        pilotDistance: 'Distance de 2km entre le telepilote et le drone',
        observerDistance: 'Distance de 1m entre la personne localisee et le drone',
        safetyDistance: 'Distance de 1km entre observateurs et telepilote',
        flightZone: 'Zone de vol moins de 2km',
        details: 'Drone hors vue - Validite du pilote dans une zone de 5km - Necessite observateurs'
      }
    }
  },
  certifiee: {
    name: 'Categorie Certifiee',
    description: 'Vols a haut risque certification complete requise',
    subcategories: {
      certified: {
        name: 'Certified',
        description: 'Transport de personnes survol assemblees operations complexes',
        maxHeight: 'N/A',
        requirements: 'Aeronef organisation et equipages certifies',
        zones: 'Definies au cas par cas',
        details: 'Drones lourds transport de personnes cargo survol de foules denses - Agrement complet DGAC EASA requis'
      }
    }
  }
};

export const DRONE_CLASSES: DroneClasses = {
  'C0': { name: 'C0 (<250g)', details: 'Peut survoler des personnes non impliquées (mais pas des rassemblements).' },
  'C1': { name: 'C1 (<900g)', details: 'Pas de survol intentionnel de personnes non impliquées.' },
  'C2': { name: 'C2 (<4kg)', details: 'Distance de sécurité de 30m des personnes (ou 5m en mode basse vitesse).' },
  'C3': { name: 'C3 (<25kg)', details: 'Doit voler loin des personnes et à 150m des zones résidentielles/commerciales.' },
  'C4': { name: 'C4 (<25kg)', details: 'Aéromodèles, loin des personnes.' },
  'C5': { name: 'C5', details: 'Utilisé pour les scénarios STS-01.' },
  'C6': { name: 'C6', details: 'Utilisé pour les scénarios STS-02.' },
};