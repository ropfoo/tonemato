import { createResource, For, Show } from 'solid-js';
import { isServer } from 'solid-js/web';
import { useRouteData } from 'solid-start';
import { Teaser as TeaserType } from 'tonemato-types';
import Teaser from '~/components/Teaser';

const { VITE_RALTS_PORT, VITE_RALTS_DOMAIN } = import.meta.env;

async function fetchRalts() {
  console.log('server: ', isServer);

  const response = await fetch(
    isServer
      ? `http://ralts:${VITE_RALTS_PORT || 3005}/`
      : `${VITE_RALTS_DOMAIN}:${VITE_RALTS_PORT || 3005}/`
  );
  return await response.json();
}

export function routeData() {
  return createResource(fetchRalts);
}

export default function Home() {
  const [data] = useRouteData<typeof routeData>();

  const error = <div>something went wrong</div>;

  return (
    <main>
      <Show when={!data.error} fallback={error}>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:gap-11 lg:gap-y-16 xl:grid-cols-4">
          <For each={data()}>
            {(teaser: TeaserType) => <Teaser teaser={teaser} />}
          </For>
        </div>
      </Show>
    </main>
  );
}
