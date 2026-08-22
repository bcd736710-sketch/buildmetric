"use client";

import { FormEvent, useMemo, useRef, useState } from "react";

const WHATSAPP_NUMBER = "8618215529827";
const DEFAULT_MESSAGE = "Hi TROVANE,\n\nI am interested in your pet outdoor products.\nCould you share your catalog and wholesale pricing?";

const emojiCategories = [
  { id: "smileys", label: "Smileys", icon: "☺", emojis: [{ value: "😀", name: "grinning face" }, { value: "😁", name: "beaming face" }, { value: "😂", name: "tears of joy" }, { value: "😊", name: "smiling face" }, { value: "😍", name: "heart eyes" }, { value: "😘", name: "kiss" }, { value: "🤗", name: "hug" }, { value: "🤝", name: "handshake" }, { value: "👍", name: "thumbs up" }, { value: "👋", name: "wave" }, { value: "🙏", name: "thank you" }, { value: "✨", name: "sparkles" }] },
  { id: "pets", label: "Pets & nature", icon: "🐾", emojis: [{ value: "🐶", name: "dog" }, { value: "🐱", name: "cat" }, { value: "🐾", name: "paw prints" }, { value: "🦮", name: "guide dog" }, { value: "🐕", name: "dog" }, { value: "🐈", name: "cat" }, { value: "🌿", name: "herb leaf" }, { value: "🌲", name: "evergreen tree" }, { value: "☀️", name: "sun" }, { value: "🏕️", name: "camping" }, { value: "🏔️", name: "mountain" }, { value: "🌎", name: "globe" }] },
  { id: "objects", label: "Objects", icon: "💡", emojis: [{ value: "💡", name: "idea light bulb" }, { value: "📦", name: "package box" }, { value: "🛍️", name: "shopping bags" }, { value: "🎒", name: "backpack" }, { value: "🚗", name: "car" }, { value: "✈️", name: "airplane travel" }, { value: "📷", name: "camera" }, { value: "📋", name: "clipboard" }, { value: "💬", name: "speech bubble" }, { value: "📩", name: "message" }, { value: "✅", name: "check mark" }, { value: "⭐", name: "star" }] },
  { id: "symbols", label: "Symbols", icon: "♥", emojis: [{ value: "❤️", name: "red heart" }, { value: "💚", name: "green heart" }, { value: "💯", name: "hundred points" }, { value: "‼️", name: "double exclamation" }, { value: "❓", name: "question mark" }, { value: "✅", name: "check" }, { value: "☑️", name: "checkbox" }, { value: "🔔", name: "bell" }, { value: "🔗", name: "link" }, { value: "♻️", name: "recycle" }, { value: "➕", name: "plus" }, { value: "➡️", name: "right arrow" }] },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24"><path d="M19.1 4.9A9.8 9.8 0 0 0 3.5 16.7L2.3 21.7l5.1-1.2A9.8 9.8 0 1 0 19.1 4.9Z" fill="currentColor" /><path d="M16.8 14.7c-.2.6-1.1 1.1-1.6 1.2-.4.1-1 .2-2.9-.6-2.4-1-4-3.5-4.1-3.7-.1-.2-1-1.3-1-2.5 0-1.1.6-1.7.8-2 .2-.2.4-.2.6-.2h.4c.1 0 .3 0 .4.3l.6 1.5c.1.3.1.4 0 .6l-.3.5c-.1.2-.2.3 0 .5.2.3.8 1.3 1.8 2.1 1.2 1.1 2.2 1.4 2.5 1.6.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l1.4.7c.2.1.4.2.4.3 0 .1 0 .6-.2 1.2Z" fill="#25D366" /></svg>;
}

function CloseIcon({ className }: { className?: string }) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg>;
}

function SmileIcon({ className }: { className?: string }) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" /><path d="M8.5 14.1c.8 1.3 2.1 2 3.5 2s2.7-.7 3.5-2M9 9.6h.01M15 9.6h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>;
}

function SendIcon({ className }: { className?: string }) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24"><path d="m3.5 11.3 16.1-7.2-6.3 15.8-2.6-6.1-7.2-2.5Z" fill="currentColor" /><path d="m10.7 13.8 3.7-3.5" stroke="#128C7E" strokeLinecap="round" strokeWidth="1.5" /></svg>;
}

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(emojiCategories[0].id);
  const inputRef = useRef<HTMLInputElement>(null);

  const visibleEmojis = useMemo(() => {
    const term = search.trim().toLowerCase();
    const categories = term ? emojiCategories : emojiCategories.filter((category) => category.id === activeCategory);
    return categories.flatMap((category) => category.emojis.filter((emoji) => !term || emoji.name.includes(term)));
  }, [activeCategory, search]);

  function addEmoji(emoji: string) {
    setMessage((current) => `${current}${emoji}`);
    inputRef.current?.focus();
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = message.trim() || DEFAULT_MESSAGE;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return <aside aria-label="WhatsApp chat" className={`fixed z-[9999] ${isOpen ? "bottom-[max(16px,env(safe-area-inset-bottom))] left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6" : "bottom-[max(16px,env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6"}`}>
    {isOpen ? <section aria-labelledby="whatsapp-widget-title" className="ml-auto flex h-[min(60dvh,360px)] max-h-[60vh] w-full max-w-[360px] flex-col overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-[0_16px_48px_rgba(20,37,31,0.24)] sm:h-[480px] sm:w-[360px]" id="whatsapp-widget">
      <header className="flex shrink-0 items-center justify-between bg-[#128C7E] px-3 py-3 text-white sm:px-4">
        <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"><WhatsAppIcon className="h-6 w-6" /></span><div><p className="text-[11px] font-medium text-white/75">TROVANE</p><h2 className="font-semibold leading-5" id="whatsapp-widget-title">Chat with TROVANE</h2></div></div>
        <button aria-label="Close WhatsApp chat" className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-white text-[#128C7E] shadow-sm transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white sm:bg-transparent sm:text-white sm:shadow-none sm:hover:bg-white/15" onClick={() => { setIsOpen(false); setIsPickerOpen(false); }} type="button"><CloseIcon className="h-5 w-5" /></button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto bg-[#efeae2] px-4 py-5" style={{ backgroundImage: "radial-gradient(rgba(65, 70, 66, 0.08) 0.7px, transparent 0.7px)", backgroundSize: "8px 8px" }}>
        <div className="max-w-[272px] rounded-lg rounded-tl-sm bg-white px-3 py-2.5 text-sm leading-5 text-[#182a24] shadow-sm">
          <p className="mb-1 text-xs font-bold tracking-[0.08em] text-[#128C7E]">TROVANE</p>
          <p>Hi <span aria-hidden="true">👋</span><span className="sr-only"> there</span><br />Welcome to TROVANE.</p>
          <p className="mt-3">Looking for pet outdoor products,<br />OEM solutions or wholesale pricing?</p>
        </div>
      </div>

      <form className="relative shrink-0 bg-[#f0f2f5] px-2.5 py-2.5" onSubmit={sendMessage}>
        {isPickerOpen ? <section aria-label="Emoji picker" className="absolute bottom-[calc(100%+4px)] left-2 right-2 overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_12px_30px_rgba(20,37,31,0.2)]" id="whatsapp-emoji-picker">
          <div className="border-b border-black/8 p-2"><label className="sr-only" htmlFor="whatsapp-emoji-search">Search emoji</label><input className="h-9 w-full rounded-lg bg-[#f0f2f5] px-3 text-sm text-[#182a24] outline-none placeholder:text-slate/70 focus:ring-2 focus:ring-[#25D366]" id="whatsapp-emoji-search" onChange={(event) => setSearch(event.target.value)} placeholder="Search emoji" type="search" value={search} /></div>
          <div aria-label="Emoji categories" className="flex items-center justify-between border-b border-black/8 px-2 py-1.5">{emojiCategories.map((category) => <button aria-label={category.label} aria-pressed={!search && activeCategory === category.id} className={`flex h-8 w-8 items-center justify-center rounded-md text-base transition focus:outline-none focus:ring-2 focus:ring-[#25D366] ${!search && activeCategory === category.id ? "bg-[#d9fdd3]" : "hover:bg-[#f0f2f5]"}`} key={category.id} onClick={() => { setActiveCategory(category.id); setSearch(""); }} type="button">{category.icon}</button>)}</div>
          <div className="grid max-h-[176px] grid-cols-8 gap-0.5 overflow-y-auto px-2 py-2">{visibleEmojis.length ? visibleEmojis.map((emoji) => <button aria-label={emoji.name} className="flex h-9 items-center justify-center rounded text-xl transition hover:bg-[#f0f2f5] focus:outline-none focus:ring-2 focus:ring-[#25D366]" key={`${emoji.value}-${emoji.name}`} onClick={() => addEmoji(emoji.value)} type="button">{emoji.value}</button>) : <p className="col-span-8 px-2 py-5 text-center text-sm text-slate">No emoji found</p>}</div>
        </section> : null}
        <div className="flex items-center gap-2"><button aria-controls="whatsapp-emoji-picker" aria-expanded={isPickerOpen} aria-label="Open emoji picker" className="flex h-12 w-12 shrink-0 touch-manipulation items-center justify-center rounded-full bg-white text-[#54656f] shadow-sm transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#25D366] sm:bg-transparent sm:shadow-none" onClick={() => setIsPickerOpen((open) => !open)} type="button"><SmileIcon className="h-5 w-5" /></button><label className="sr-only" htmlFor="whatsapp-message">Write your message</label><input className="h-12 min-w-0 flex-1 rounded-full bg-white px-4 text-sm text-[#182a24] outline-none placeholder:text-[#667781] focus:ring-2 focus:ring-[#25D366]" id="whatsapp-message" onChange={(event) => setMessage(event.target.value)} placeholder="Write your message..." ref={inputRef} type="text" value={message} /><button aria-label="Send WhatsApp message" className="flex h-12 w-12 shrink-0 touch-manipulation items-center justify-center rounded-full bg-[#25D366] text-white transition hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E] focus:ring-offset-2" type="submit"><SendIcon className="h-5 w-5" /></button></div>
      </form>
    </section> : <div className="group relative"><span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-lg bg-[#182a24] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-[0_6px_16px_rgba(20,37,31,0.22)] transition-all duration-200 ease-out group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 sm:block">Chat with us on WhatsApp<span aria-hidden="true" className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-[#182a24]" /></span><button aria-controls="whatsapp-widget" aria-expanded="false" aria-label="Open WhatsApp chat" className="flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_18px_rgba(18,140,126,0.25)] transition-transform duration-200 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#128C7E] focus:ring-offset-2 animate-widget-enter sm:h-14 sm:w-14" onClick={() => setIsOpen(true)} type="button"><WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" /></button></div>}
  </aside>;
}
