export default function SubscribeBox() {
  return (
    <div className="bg-[#F0F0EC] p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h3 className="font-[family-name:var(--font-Plus_Jakarta_Sans)] text-[22px] font-bold">
            Don&apos;t miss a thing
          </h3>
          <p className="text-sm text-[#555555]">
            Subscribe to get updates straight to your inbox.
          </p>
        </div>

        {/* Stamp decoration */}
        <div className="border-2 border-[#1A1A1A] p-2 text-center rotate-[-8deg] opacity-60">
          <p className="text-[8px] font-bold tracking-wider">CAIRO</p>
          <p className="text-[10px] font-semibold leading-tight">
            27 APR
            <br />
            1950
          </p>
          <p className="text-[8px] font-bold tracking-wider">EGYPT</p>
        </div>
      </div>

      <div className="flex gap-0">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 border border-[#CCCCCC] bg-white px-4 py-3 text-sm placeholder:text-[#AAAAAA] focus:outline-none focus:border-[#1A1A1A]"
        />
        <button className="bg-[#1A1A1A] text-white px-6 py-3 text-xs font-bold tracking-wider hover:bg-[#333] transition-colors">
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
}
