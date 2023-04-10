import { createResource, Show } from 'solid-js';
import { isServer } from 'solid-js/web';
import { useRouteData } from 'solid-start';
import { Teaser as TeaserType } from 'tonemato-types';
import Teaser from '~/components/Teaser';

async function fetchRalts() {
  console.log('server: ', isServer);
  const response = await fetch(
    isServer ? 'http://ralts:3005/' : 'http://localhost:3005/'
  );
  return await response.json();
}

export function routeData() {
  return createResource(fetchRalts);
}

export default function Home() {
  const [data] = useRouteData<typeof routeData>();

  const error = <div>something wen wrong</div>;

  return (
    <main class='mx-auto  p-4 font-montserrat'>
      <p>Hello test</p>
      <Show when={!data.error} fallback={error}>
        <div class='grid grid-cols-2 gap-6'>
          {data()?.cache?.backstagepro?.data?.pages[0]?.map(
            (teaser: TeaserType) => (
              <Teaser teaser={teaser} />
            )
          )}
        </div>
      </Show>
    </main>
  );
}
