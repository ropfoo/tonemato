import { Show, createSignal, onMount } from 'solid-js';
import clsx from 'clsx';
import logoLarge from '/assets/logo-large.svg';
import logoSmall from '/assets/logo-small.svg';
import Filter from './Filter';

export const headerOpen = createSignal(false);

export default function Header() {
  const [isHeaderOpen, setIsHeaderOpen] = headerOpen;

  onMount(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setIsHeaderOpen(false);
      }

      if (e.metaKey && e.key === 'k') {
        setIsHeaderOpen(true);
      }
    });
  });

  return (
    <>
      <header
        class={clsx(
          'border-b-1 dark:border-whinehouse border-snow fixed z-20 w-full items-center bg-white px-4 pt-4 transition-all duration-300 dark:bg-black sm:px-8 lg:px-16',
          {
            'min-h-[80px]': !isHeaderOpen(),
            'min-h-[160px]': isHeaderOpen(),
          }
        )}
      >
        <div class="grid sm:grid-cols-[160px_1fr_160px]">
          <div>
            <img
              class="hidden w-[155px] md:flex"
              src={logoLarge}
              alt="tonemato logo"
            />
            <img
              class="w-[33px] md:hidden"
              src={logoSmall}
              alt="tonemato logo"
            />
          </div>
          <Filter />
        </div>
      </header>
      <Show when={isHeaderOpen()}>
        <div
          onClick={() => setIsHeaderOpen(false)}
          class="fixed top-0 z-10 h-full w-full bg-black opacity-30 dark:opacity-80"
        />
      </Show>
    </>
  );
}
