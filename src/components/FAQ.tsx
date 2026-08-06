'use client';

import React, { useState } from "react";

const faqs = [
  {
    question: "What kind of ID is required to operate a terminal?",
    answer:
      "Valid government documentation is strictly required. For the initial MVP and regulatory hygiene, undocumented merchants are out of scope. We utilize standard SEP-12 KYC protocols through MoneyGram.",
    meta: "Compliance",
  },
  {
    question: "How does the PWA work offline?",
    answer:
      "The terminal uses a securely cached, last-known exchange rate. It surfaces a clear, visible staleness indicator to the merchant. An active connection is only required when pushing settled balances back to the halopay-api.",
    meta: "Connectivity",
  },
  {
    question: "Which countries are currently supported?",
    answer:
      "HaloPaye is designed to operate primarily in the major UNDP deployment zones (e.g., Haiti, Syria, Gambia), anchoring its settlement layer firmly to MoneyGram's globally compliant off-ramp network.",
    meta: "Coverage",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleQuestion = (index: number) => setActiveIndex((prev) => (prev === index ? -1 : index));

  const setCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--faq-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--faq-y", `${event.clientY - rect.top}px`);
  };

  const clearCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    target.style.removeProperty("--faq-x");
    target.style.removeProperty("--faq-y");
  };

  return (
    <div className="relative w-full overflow-hidden bg-transparent text-white">
      <section className="relative z-10 mx-auto flex max-w-4xl flex-col gap-8 md:gap-12 px-4 sm:px-6 py-16 md:py-24 lg:max-w-5xl lg:px-12">
        <header className="flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl tracking-tight text-white">
            Frequently Asked Questions
          </h1>
          <p className="max-w-xl mx-auto md:mx-0 text-base lg:text-lg text-blue-100/70">
            Everything you need to know about adopting HaloPaye and securing your settlement pipelines.
          </p>
        </header>

        <ul className="space-y-4">
          {faqs.map((item, index) => {
            const open = activeIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-trigger-${index}`;

            return (
              <li
                key={item.question}
                className="group relative overflow-hidden rounded-3xl border bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl shadow-blue-900/20 transition-all duration-500 hover:-translate-y-0.5 focus-within:-translate-y-0.5"
                onMouseMove={setCardGlow}
                onMouseLeave={clearCardGlow}
              >
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    background: `radial-gradient(240px circle at var(--faq-x, 50%) var(--faq-y, 50%), rgba(37, 99, 235, 0.05), transparent 70%)`,
                  }}
                />

                <button
                  type="button"
                  id={buttonId}
                  aria-controls={panelId}
                  aria-expanded={open}
                  onClick={() => toggleQuestion(index)}
                  className="relative flex w-full items-start gap-4 sm:gap-6 px-5 py-6 sm:px-8 sm:py-7 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-200"
                >
                  <span className="relative flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all duration-500 group-hover:scale-105 text-white">
                    <span
                      className={`pointer-events-none absolute inset-0 rounded-full border opacity-30 border-white/40 ${open ? "animate-ping" : ""}`}
                    />
                    <svg
                      className={`relative h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-500 text-white ${open ? "rotate-45" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>

                  <div className="flex flex-1 flex-col gap-3 sm:gap-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 mt-1 sm:mt-2">
                      <h2 className="text-lg font-semibold leading-tight sm:text-xl text-white">
                        {item.question}
                      </h2>
                      {item.meta && (
                        <span className="inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest transition-opacity duration-300 sm:ml-auto border-white/20 text-blue-200/90 bg-white/5">
                          {item.meta}
                        </span>
                      )}
                    </div>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`overflow-hidden text-base leading-relaxed transition-[max-height] duration-500 ease-out text-blue-50/80 ${
                        open ? "max-h-64" : "max-h-0"
                      }`}
                    >
                      <p className="pr-2 pb-2">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
