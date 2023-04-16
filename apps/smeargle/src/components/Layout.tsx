import { JSX } from 'solid-js';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  return <div class="px-4 pt-[140px] sm:px-8 lg:px-16">{children}</div>;
}
