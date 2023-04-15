import dayjs from 'dayjs';
import type { Teaser } from 'tonemato-types';

interface TeaserProps {
  teaser: Teaser;
}

export default function Teaser({ teaser }: TeaserProps) {
  return (
    <div>
      <div class='p-5 flex flex-col h-96 text-gray-600 bg-gray-100 rounded-xl overflow-hidden'>
        <div class='flex justify-between'>
          <img
            class='w-24 h-24 object-cover rounded-full'
            src={teaser.previewImageUrl}
            alt=''
          />
          <div class='text-right'>
            <p class='font-bold'>{teaser.city}</p>
            <p>{teaser.zipCode}</p>
          </div>
        </div>

        <div class='mt-6' />
        <div class='flex flex-col justify-between'>
          <div>
            <h3 class='font-bold text-2xl mb-2'>{teaser.title}</h3>
            <div class='mt-5' />

            <p class='overflow-hidden h-16 text-clip'>{teaser.description}</p>
          </div>
        </div>
      </div>
      <div class='flex justify-between mt-2'>
        <p class='font-bold'>{dayjs(teaser.date).format('DD.MM.YYYY')}</p>
        <p>{teaser.domain}</p>
      </div>
    </div>
  );
}
