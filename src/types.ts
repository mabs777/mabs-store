export interface AppItem {
  id: string;
  name: string;
  developer: string;
  shortDescription: string;
  fullDescription?: string;
  version: string;
  category: string;
  iconUrl?: string;
  screenshotUrls?: string[];
  apkDownloadUrl?: string;
  appSize?: string;
  releaseDate?: string;
  rating?: number;
  downloads?: string;
  isCustom?: boolean;
  createdAt?: string;
}

export interface NewAppFormData {
  name: string;
  developer: string;
  shortDescription: string;
  fullDescription: string;
  version: string;
  category: string;
  iconUrl: string;
  screenshotUrls: string;
  apkDownloadUrl: string;
  appSize: string;
  releaseDate: string;
}

export type CategoryType = 
  | 'All'
  | 'Biography & History'
  | 'Tools'
  | 'Productivity'
  | 'Media'
  | 'Utilities'
  | 'Games'
  | string;
