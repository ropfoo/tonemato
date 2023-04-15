import logo from '../../public/assets/logo.svg';

export default function Header() {
  return (
    <header class="bg-snow dark:bg-night fixed z-10 flex min-h-[100px] w-full items-center px-10">
      <img src={logo} alt="" />
    </header>
  );
}
