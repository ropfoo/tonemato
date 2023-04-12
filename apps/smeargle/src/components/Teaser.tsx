import dayjs from 'dayjs';
import type { Teaser } from 'tonemato-types';

interface TeaserProps {
  teaser: Teaser;
}

export default function Teaser({ teaser }: TeaserProps) {
  return (
    <div>
      <div class="flex h-96 flex-col overflow-hidden rounded-xl bg-gray-100 p-5 text-gray-600">
        <div class="flex justify-between">
          <img
            class="h-24 w-24 rounded-full object-cover"
            src={teaser.previewImageUrl}
            alt=""
          />
          <div class="text-right">
            <p class="font-bold">{teaser.city}</p>
            <p>{teaser.zipCode}</p>
          </div>
        </div>

        <div class="mt-6" />
        <div class="flex flex-col justify-between">
          <div>
            <h3 class="mb-2 text-2xl font-bold">{teaser.title}</h3>
            <div class="mt-5" />

            <p class="h-16 overflow-hidden text-clip">{teaser.description}</p>
          </div>
        </div>
      </div>
      <div class="mt-2 flex justify-between">
        <p class="font-bold">{dayjs(teaser.date).format('DD.MM.YYYY')}</p>
        <p>{teaser.domain}</p>
      </div>
    </div>
  );
}
