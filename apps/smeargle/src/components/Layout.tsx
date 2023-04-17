import { JSX } from 'solid-js';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: LayoutProps) {
  return (
    <div class="text-whinehouse dark:text-snow px-4 pt-[140px] sm:px-8 lg:px-16">
      {props.children}
    </div>
  );
}
