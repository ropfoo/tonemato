import { createResource } from 'solid-js';
import { isServer } from 'solid-js/web';
import { useRouteData } from 'solid-start';
import Teaser, { EntryTeaser } from '~/components/Teaser';

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

  return (
    <main class='mx-auto  p-4 font-montserrat'>
      <div class='grid grid-cols-2 gap-6'>
        {data()?.cache.backstagepro.data.pages[0].map((teaser: EntryTeaser) => (
          <Teaser teaser={teaser} />
        ))}
      </div>
    </main>
  );
}
