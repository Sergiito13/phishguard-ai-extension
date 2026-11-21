import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons'],

  autoIcons: {
    baseIconPath: 'public/brand/phishguard-app-icon.svg',

    sizes: [16, 32, 48, 96, 128],

    developmentIndicator: false,
  },

  manifest: {
    name: 'PhishGuard AI',

    description:
      'Extensión para detectar posibles señales de phishing mediante inteligencia artificial.',

    permissions: ['activeTab'],
  },
});
