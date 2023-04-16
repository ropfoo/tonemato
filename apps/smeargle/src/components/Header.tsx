import logoLarge from '../../public/assets/logo-large.svg';
import logoSmall from '../../public/assets/logo-small.svg';

export default function Header() {
  return (
    <header class="border-b-1 dark:border-whinehouse border-snow fixed z-10 flex min-h-[80px] w-full items-center bg-white px-4 dark:bg-black sm:px-8 lg:px-16">
      <img
        class="hidden w-[155px] md:flex"
        src={logoLarge}
        alt="tonemato logo"
      />
      <img class="w-[33px] md:hidden" src={logoSmall} alt="tonemato logo" />
    </header>
  );
}
