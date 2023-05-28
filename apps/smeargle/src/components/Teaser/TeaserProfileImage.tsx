import { Show } from 'solid-js';

interface TeaserProfileImageProps {
  imageUrl?: string;
  alt: string;
}

export default function TeaserProfileImage(props: TeaserProfileImageProps) {
  return (
    <div class="border-1 dark:border-janis border-snow dark:bg-janis/20 bg-snow/50 overflow-hidden rounded-2xl object-cover outline-none">
      <Show when={props.imageUrl} fallback={<div class="h-20 w-20 " />}>
        <img
          class=" h-20 w-20 object-cover transition-transform duration-700 group-hover:scale-110"
          src={props.imageUrl}
          alt={props.alt}
        />
      </Show>
    </div>
  );
}
