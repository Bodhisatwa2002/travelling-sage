export default function ContactForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name*</label>
        <input
          type="text"
          className="w-full border border-[#CCCCCC] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email*</label>
        <input
          type="email"
          className="w-full border border-[#CCCCCC] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#1A1A1A]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          rows={4}
          placeholder="Enter your message"
          className="w-full border border-[#CCCCCC] bg-white px-4 py-3 text-sm placeholder:text-[#999999] focus:outline-none focus:border-[#1A1A1A] resize-none"
        />
      </div>
      <button
        type="submit"
        className="bg-[#1A1A1A] text-white px-8 py-3 text-xs font-bold tracking-wider hover:bg-[#333] transition-colors"
      >
        SUBMIT
      </button>
    </form>
  );
}
