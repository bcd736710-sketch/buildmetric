"use client";

import { FormEvent, useState } from "react";

const defaultMessage = "Hi TROVANE,\n\nI am interested in your pet outdoor products.\nCould you share your catalog and wholesale pricing?";
const trovaneWhatsAppNumber = "8618215529827";

function WhatsAppIcon({ className }: { className?: string }) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24"><path d="M19.1 4.9A9.8 9.8 0 0 0 3.5 16.7L2.3 21.7l5.1-1.2A9.8 9.8 0 1 0 19.1 4.9Z" fill="currentColor" /><path d="M16.8 14.7c-.2.6-1.1 1.1-1.6 1.2-.4.1-1 .2-2.9-.6-2.4-1-4-3.5-4.1-3.7-.1-.2-1-1.3-1-2.5 0-1.1.6-1.7.8-2 .2-.2.4-.2.6-.2h.4c.1 0 .3 0 .4.3l.6 1.5c.1.3.1.4 0 .6l-.3.5c-.1.2-.2.3 0 .5.2.3.8 1.3 1.8 2.1 1.2 1.1 2.2 1.4 2.5 1.6.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l1.4.7c.2.1.4.2.4.3 0 .1 0 .6-.2 1.2Z" fill="#128C7E" /></svg>;
}

function SendIcon() {
  return <svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><path d="m3 11.5 17-8-6.5 17-2.5-6.5L3 11.5Z" fill="currentColor" /><path d="m11 14 3-3" stroke="white" strokeLinecap="round" strokeWidth="1.5" /></svg>;
}

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const number = (process.env.NEXT_PUBLIC_TROVANE_WHATSAPP_NUMBER || trovaneWhatsAppNumber).replace(/\D/g, "");
    if (!number) {
      setError("WhatsApp chat is not available yet. Please contact us by email.");
      return;
    }
    const text = message.trim() || defaultMessage;
    window.location.assign(`https://wa.me/${number}?text=${encodeURIComponent(text)}`);
  }

  return <aside className="fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6" aria-label="WhatsApp chat">
    {isOpen ? <section aria-labelledby="whatsapp-widget-title" className="w-[calc(100vw-2rem)] max-w-[360px] overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-[0_18px_50px_rgba(20,37,31,0.2)]" id="whatsapp-widget">
      <header className="flex items-center justify-between bg-[#128C7E] px-5 py-4 text-white">
        <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"><WhatsAppIcon className="h-6 w-6 text-white" /></span><div><p id="whatsapp-widget-title" className="font-semibold">Chat with TROVANE</p><p className="text-xs text-white/80">Typically replies within 1 business day</p></div></div>
        <button aria-label="Close WhatsApp chat" className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white" onClick={() => setIsOpen(false)} type="button">×</button>
      </header>
      <div className="bg-[#f3f6f4] px-5 py-6"><div className="max-w-[276px] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-6 text-navy shadow-sm">Hi <span aria-hidden="true">👋</span><span className="sr-only"> there</span><br />Welcome to TROVANE.<br /><br />Looking for pet outdoor products,<br />OEM solutions or wholesale pricing?</div></div>
      <form className="border-t border-navy/8 p-3" onSubmit={sendMessage}>
        <label className="sr-only" htmlFor="whatsapp-widget-message">Write your message</label>
        <div className="flex items-end gap-2"><textarea className="min-h-12 flex-1 resize-none rounded-xl border border-navy/14 bg-warm px-3 py-3 text-sm text-navy outline-none placeholder:text-slate/65 focus:border-[#128C7E]" id="whatsapp-widget-message" onChange={(event) => { setMessage(event.target.value); setError(""); }} placeholder="Write your message..." rows={1} value={message} /><button aria-label="Send WhatsApp message" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white transition hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E] focus:ring-offset-2" type="submit"><SendIcon /></button></div>
        {error ? <p className="px-1 pt-2 text-xs leading-5 text-red-700" role="alert">{error}</p> : null}
      </form>
    </section> : null}
    <button aria-controls="whatsapp-widget" aria-expanded={isOpen} aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"} className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.34)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E] focus:ring-offset-2" onClick={() => setIsOpen((open) => !open)} type="button"><WhatsAppIcon className="h-8 w-8" /></button>
  </aside>;
}
