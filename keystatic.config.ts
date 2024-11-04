import { config } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'commercequest/cq-astro',
  },
  ui: {
    brand: {
      name: 'CommerceQuest Admin',      
    },
  },
  collections: {
    // Collections can be added here when needed
  },
});
