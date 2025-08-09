// Types
export type Step = 'intro' | 'conditions' | 'form' | 'documents' | 'summary' | 'confirmation';

export interface FormData {
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  montant: string;
  duree: string;
  typeEntreprise: string;
  chiffreAffaires: string;
  effectif: string;
  dateCreation: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface Document {
  file: File;
  name: string;
  size: number;
  type: string;
}

// Constantes
export const LOCAL_STORAGE_KEY = 'creditEntrepriseData';
export const MAX_FILE_SIZE_MB = 5;
export const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
export const MIN_AMOUNT = 10000;
export const MAX_AMOUNT = 500000;
export const MIN_DURATION = 12;
export const MAX_DURATION = 60;
