import { For, Show } from 'solid-js';
import { useTeasers } from '~/hooks/useTeasers';
import { Teaser as TeaserType } from 'tonemato-types';
import Teaser from '~/components/Teaser';

export default function TeaserList() {
  const teasers = useTeasers();

  const error = <div>something went wrong</div>;
  return (
    <Show when={!teasers.error} fallback={error}>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:gap-11 lg:gap-y-16 xl:grid-cols-4">
        <For each={teasers.data?.cache?.backstagepro?.pages[0]}>
          {(teaser: TeaserType) => <Teaser teaser={teaser} />}
        </For>
      </div>
    </Show>
  );
}
