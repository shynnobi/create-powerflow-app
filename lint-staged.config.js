export default {
  '*.{ts,tsx}': () => 'tsc --noEmit',
  '*.{js,jsx,ts,tsx,json,md,yml,yaml,css,scss,html}': ['prettier --write'],
};
