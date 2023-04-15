export default function HoverIndicator() {
  return (
    <div class="bg-hendrix absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 scale-0 items-center justify-center rounded-full opacity-0 shadow-md transition-all ease-in-out group-hover:first:scale-100 group-hover:first:opacity-100">
      {'=>'}
    </div>
  );
}
