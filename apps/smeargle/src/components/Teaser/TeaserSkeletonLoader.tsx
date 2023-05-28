import { For } from 'solid-js';

export function TeaserSkeletonLoader() {
  return (
    <div>
      <div class="bg-teaser-ghost dark:bg-teaser-ghost-dark border-1 dark:border-onyx border-wolf/50 flex h-[300px] animate-pulse flex-col overflow-hidden rounded-2xl p-5  opacity-60  md:p-8 lg:p-5 ">
        <div class="flex justify-between">
          <div class="bg-wolf/50 h-20 w-20 rounded-2xl" />

          <div class="text-wolf bg-wolf/50 flex h-5 w-16 items-center rounded-full px-2 text-right">
            {/* <p class="text-xs">{props.teaser.domain}</p> */}
          </div>
        </div>

        <div class="mt-4" />
        <div class="flex flex-col justify-between">
          <div>
            <h3 class="font-montserrat mb-2 font-bold">
              {/* {props.teaser.title} */}
              <div class="bg-wolf/50 h-5 w-full rounded-full" />
              <div class="mt-3" />
              <div class="bg-wolf/50 h-5 w-8/12 rounded-full" />
            </h3>
            <div class="mt-4" />

            <div class="h-16 overflow-hidden text-clip text-sm">
              {/* {props.teaser.description} */}
              <div class="bg-wolf/50 h-3 w-full rounded-full" />
              <div class="mt-2" />
              <div class="bg-wolf/50 h-3 w-8/12 rounded-full" />
              <div class="mt-2" />
              <div class="bg-wolf/50 h-3 w-10/12 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <div class="text-wolf mt-2  flex justify-between text-xs text-gray-400">
        <div class="flex items-center">
          <div class="bg-presley mr-2 h-2 w-2 rounded-full" />
          <span class="mr-2 font-bold text-black dark:text-white">
            {/* {props.teaser.city} */}
            <div class="bg-wolf/30 h-3 w-20 rounded-full" />
          </span>
          {/* <span>{props.teaser.zipCode}</span> */}
        </div>
        <div class="font-montserrat">
          <div class="bg-wolf/30 h-3 w-20 rounded-full" />

          {/* {dayjs(props.teaser.date).format('DD.MM.YYYY')} */}
        </div>
      </div>
    </div>
  );
}

export function TeaserSkeletonList() {
  return (
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:gap-11 lg:gap-y-16 xl:grid-cols-4">
      <TeaserSkeletonLoader />
      <For each={Array(10)}>{() => <TeaserSkeletonLoader />}</For>
    </div>
  );
}
