const CUSTOM_PLUGIN_ID = process.env.CUSTOM_PLUGIN_ID;
let customConfig = JSON.parse(localStorage.getItem(`data-form-list-secondary-${CUSTOM_PLUGIN_ID}`))?.customConfig || {};
export let mockCustomConfig = customConfig;

export const mockChangeCustomConfig = (customConfig) => {
  const mockData = JSON.parse(localStorage.getItem(`data-form-list-secondary-${CUSTOM_PLUGIN_ID}`)) || {};
  mockData.customConfig = customConfig;
  localStorage.setItem(`data-form-list-secondary-${CUSTOM_PLUGIN_ID}`, JSON.stringify(mockData));
};

