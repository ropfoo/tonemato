import { TeaserRequestParams } from 'tonemato-types';

const { VITE_RALTS_PORT, VITE_RALTS_DOMAIN } = import.meta.env;

export async function getTeasers(params: TeaserRequestParams) {
  const { instrument, category, zipCode } = params;
  const query = `instrument=${instrument}&category=${category}&zipCode=${zipCode}`;

  try {
    const response = await fetch(
      `${VITE_RALTS_DOMAIN}:${VITE_RALTS_PORT || 3005}/?${query}`
    );

    return await response.json();
  } catch (e) {
    throw new Error('fetch failed');
  }
}
