import { A } from '@solidjs/router';
import dayjs from 'dayjs';
import type { Teaser as TeaserType } from 'tonemato-types';
import HoverIndicator from './HoverIndicator';
import TeaserProfileImage from './TeaserProfileImage';

interface TeaserProps {
  teaser: TeaserType;
}

export default function Teaser(props: TeaserProps) {
  return (
    <A href={props.teaser.url} target="_blank" class="group relative">
      <HoverIndicator />
      <div class="bg-teaser-presley border-1 border-janis/50 group-hover:border-presley/80 flex h-[300px] flex-col overflow-hidden rounded-2xl p-5  text-white transition-colors md:p-8 lg:p-5 ">
        <div class="flex justify-between">
          <TeaserProfileImage imageUrl={props.teaser.previewImageUrl} alt="" />
          <div class="text-wolf flex h-5 items-center rounded-full bg-black px-2 text-right">
            <p class="text-xs">{props.teaser.domain}</p>
          </div>
        </div>

        <div class="mt-4" />
        <div class="flex flex-col justify-between">
          <div>
            <h3 class="font-montserrat mb-2 font-bold">{props.teaser.title}</h3>
            <div class="mt-4" />

            <p class="h-16 overflow-hidden text-clip text-sm">
              {props.teaser.description}
            </p>
          </div>
        </div>
      </div>
      <div class="text-wolf mt-2  flex justify-between text-xs text-gray-400">
        <div class="flex items-center">
          <div class="bg-presley mr-2 h-2 w-2 rounded-full" />
          <span class="mr-2 font-bold text-black dark:text-white">
            {props.teaser.city}
          </span>
          <span>{props.teaser.zipCode}</span>
        </div>
        <p class="font-montserrat">
          {dayjs(props.teaser.date).format('DD.MM.YYYY')}
        </p>
      </div>
    </A>
  );
}
