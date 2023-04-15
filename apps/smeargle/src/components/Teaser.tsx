import { A } from '@solidjs/router';
import dayjs from 'dayjs';
import type { Teaser } from 'tonemato-types';

interface TeaserProps {
  teaser: Teaser;
}

export default function Teaser({ teaser }: TeaserProps) {
  return (
    <A href={teaser.url} target="_blank" class="group relative">
      <div class="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 scale-0 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-all ease-in-out group-hover:first:scale-100 group-hover:first:opacity-100">
        {'=>'}
      </div>
      <div class="flex h-[300px] flex-col overflow-hidden rounded-2xl bg-gray-100 p-5 text-gray-700">
        <div class="flex justify-between">
          <img
            class="h-20 w-20 rounded-2xl object-cover "
            src={teaser.previewImageUrl}
            alt=""
          />
          <div class="text-right">
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
      <div class="mt-2 flex justify-between text-xs text-gray-400">
        <div class="flex items-center">
          <div class="mr-2 h-2 w-2 rounded-full bg-purple-700" />
          <span class="font-montserrat mr-2 font-bold text-black">
            {teaser.city}
          </span>
          <span>{teaser.zipCode}</span>
        </div>
        <p class="font-montserrat">{dayjs(teaser.date).format('DD.MM.YYYY')}</p>
      </div>
    </A>
  );
}
