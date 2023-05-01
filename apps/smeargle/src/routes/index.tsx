import { Show } from 'solid-js';
import { isServer } from 'solid-js/web';
import { TeaserSkeletonList } from '~/components/Teaser/TeaserSkeletonLoader';
import TeaserList from '~/components/TeaserList';

export default function Home() {
  return (
    <main>
      <Show when={!isServer} fallback={<TeaserSkeletonList />}>
        <TeaserList />
      </Show>
    </main>
  );
}
