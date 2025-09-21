export const loadState = () => {
  try {
    const serialized = localStorage.getItem('creativeUpaayState');
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    console.warn('Failed to load state:', e);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem('creativeUpaayState', serialized);
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
};
