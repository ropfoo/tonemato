import { createResource } from 'solid-js';
import { isServer } from 'solid-js/web';
import { useRouteData } from 'solid-start';

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
    <main class='text-center mx-auto text-gray-700 p-4'>
      <h1 class='max-6-xs text-6xl text-sky-700 font-thin uppercase my-16'>
        Hello world test 2!
      </h1>

      {data()?.cache.backstagepro.data.pages[0].map((entry: any) => (
        <div>
          <p>{entry.title}</p>
        </div>
      ))}
    </main>
  );
}
