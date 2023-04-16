import { A } from '@solidjs/router';
import dayjs from 'dayjs';
import type { Teaser } from 'tonemato-types';
import HoverIndicator from './HoverIndicator';

interface TeaserProps {
  teaser: Teaser;
}

export default function Teaser({ teaser }: TeaserProps) {
  return (
    <A href={teaser.url} target="_blank" class="group relative">
      <HoverIndicator />
      <div class="bg-teaser-presley flex h-[300px] flex-col overflow-hidden rounded-2xl  p-5 text-white md:p-8 lg:p-5 ">
        <div class="flex justify-between">
          <img
            class="h-20 w-20 rounded-2xl object-cover "
            src={teaser.previewImageUrl}
            alt=""
          />
          <div class="text-wolf flex h-5 items-center rounded-full bg-black px-2 text-right">
            <p class="text-xs">{teaser.domain}</p>
          </div>
        </div>

        <div class="mt-4" />
        <div class="flex flex-col justify-between">
          <div>
            <h3 class="font-montserrat mb-2 font-bold">{teaser.title}</h3>
            <div class="mt-4" />

            <p class="h-16 overflow-hidden text-clip text-sm">
              {teaser.description}
            </p>
          </div>
        </div>
      </div>
      <div class="text-wolf mt-2  flex justify-between text-xs text-gray-400">
        <div class="flex items-center">
          <div class="bg-presley mr-2 h-2 w-2 rounded-full" />
          <span class="mr-2 font-bold text-black dark:text-white">
            {teaser.city}
          </span>
          <span>{teaser.zipCode}</span>
        </div>
        <p class="font-montserrat">{dayjs(teaser.date).format('DD.MM.YYYY')}</p>
      </div>
    </A>
  );
}
