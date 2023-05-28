const { VITE_RALTS_PORT, VITE_RALTS_DOMAIN } = import.meta.env;

export default {
  //   ralts: `${VITE_RALTS_DOMAIN}:${VITE_RALTS_PORT || 3005}`,
  ralts: `http://localhost:3005`,
} as const;
