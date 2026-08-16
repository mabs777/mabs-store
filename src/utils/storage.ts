import { AppItem } from '../types';

const STORAGE_KEY = 'mabs_store_custom_apps_v1';

export function getStoredCustomApps(): AppItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Failed to load custom apps from localStorage:', error);
    return [];
  }
}

export function saveCustomApp(newApp: AppItem): AppItem[] {
  try {
    const existing = getStoredCustomApps();
    // Filter out if duplicate id exists
    const updated = [newApp, ...existing.filter(a => a.id !== newApp.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save custom app to localStorage:', error);
    return [];
  }
}

export function updateStoredApp(updatedApp: AppItem): AppItem[] {
  try {
    const existing = getStoredCustomApps();
    const index = existing.findIndex(a => a.id === updatedApp.id);
    if (index >= 0) {
      existing[index] = updatedApp;
    } else {
      existing.unshift(updatedApp);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return existing;
  } catch (error) {
    console.error('Failed to update app in localStorage:', error);
    return [];
  }
}

export function deleteStoredApp(id: string): AppItem[] {
  try {
    const existing = getStoredCustomApps();
    const updated = existing.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to delete custom app from localStorage:', error);
    return [];
  }
}
