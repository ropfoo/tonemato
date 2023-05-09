import { TeaserRequestParams } from 'tonemato-types';
import url from '~/constants/url';

export async function getTeasers(params: TeaserRequestParams) {
  const { instrument, category, zipCode } = params;
  const query = `instrument=${instrument}&category=${category}&zipCode=${zipCode}`;

  try {
    const response = await fetch(`${url.ralts}/?${query}`);

    return await response.json();
  } catch (e) {
    throw new Error('fetch failed');
  }
}
