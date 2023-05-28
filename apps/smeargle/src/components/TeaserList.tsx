import { For, Match, Switch } from 'solid-js';
import { useTeasers } from '~/hooks/useTeasers';
import { Teaser as TeaserType } from '~/generated/tygo';
import Teaser from '~/components/Teaser';
import { TeaserSkeletonList } from './Teaser/TeaserSkeletonLoader';

export default function TeaserList() {
  const [teasers, { isLoading }] = useTeasers();

  return (
    <Switch>
      <Match when={isLoading()}>
        <TeaserSkeletonList />
      </Match>
      <Match when={teasers.isError}>
        <div>something went wrong</div>
      </Match>
      <Match when={teasers.status === 'success'}>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:gap-11 lg:gap-y-16 xl:grid-cols-4">
          <For each={teasers.data}>
            {(teaser: TeaserType) => <Teaser teaser={teaser} />}
          </For>
        </div>
      </Match>
    </Switch>
  );
}
