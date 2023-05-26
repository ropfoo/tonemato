import { createEffect, createSignal, For, Show } from 'solid-js';

import { Teaser as TeaserType } from '~/generated/tygo';
import Teaser from '~/components/Teaser';

const { VITE_RALTS_PORT, VITE_RALTS_DOMAIN, VITE_IS_DOCKER } = import.meta.env;

async function fetchRalts() {
  const response = await fetch(
    'http://localhost:3005/'
    // `${VITE_RALTS_DOMAIN}:${VITE_RALTS_PORT || 3005}/`
  );
  return await response.json();
}

export default function Home() {
  const [data, setData] = createSignal<any>();

  const error = <div>something went wrong</div>;

  // just temporary bug fix in this branch
  createEffect(async () => {
    const teasers = await fetchRalts();
    setData(teasers);
    console.log(teasers);
  });

  return (
    <main>
      <Show when={!data()?.error} fallback={error}>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:gap-11 lg:gap-y-16 xl:grid-cols-4">
          <For each={data()}>
            {(teaser: TeaserType) => <Teaser teaser={teaser} />}
          </For>
        </div>
      </Show>
    </main>
  );
}
