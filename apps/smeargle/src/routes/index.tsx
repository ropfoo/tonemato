import { Show } from 'solid-js';
import { isServer } from 'solid-js/web';
import TeaserList from '~/components/TeaserList';

export default function Home() {
  return (
    <main>
      <Show when={!isServer} fallback={<p>ssr fallback</p>}>
        <TeaserList />
      </Show>
    </main>
  );
}
