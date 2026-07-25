export default function SectionSeparator() {
  return (
    <div className="flex items-center gap-3 my-8">
      <div className="w-2 h-2 border border-[#1A1A1A] rotate-45" />
      <div className="flex-1 h-px bg-[#1A1A1A]" />
      <div className="w-2 h-2 border border-[#1A1A1A] rotate-45" />
    </div>
  );
}
