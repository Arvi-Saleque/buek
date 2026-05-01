"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { quickAccessIconOptions } from "@/lib/quick-access";
import type { HomeQuickAccessCard } from "@/lib/types";

const emptyCard: HomeQuickAccessCard = {
  icon: "ClipboardList",
  title: "",
  subtitle: "",
  href: "",
};

export function QuickAccessCardEditor({
  cards,
}: {
  cards: HomeQuickAccessCard[];
}) {
  const [items, setItems] = useState<HomeQuickAccessCard[]>(
    cards.length ? cards : [emptyCard],
  );

  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-slate-200 bg-slate-50 p-4"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-university-navy">
                Quick Access Card {index + 1}
              </h3>
              <p className="text-xs text-slate-500">
                This card opens the navigation link when selected on the homepage.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))
              }
              className="btn-danger"
              disabled={items.length === 1}
              aria-label={`Delete quick access card ${index + 1}`}
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label>
              <span className="label">Icon</span>
              <select
                name="quickAccessIcon"
                value={item.icon}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((card, itemIndex) =>
                      itemIndex === index
                        ? { ...card, icon: event.target.value }
                        : card,
                    ),
                  )
                }
                className="field bg-white"
              >
                {quickAccessIconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="label">Heading</span>
              <input
                name="quickAccessTitle"
                value={item.title}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((card, itemIndex) =>
                      itemIndex === index
                        ? { ...card, title: event.target.value }
                        : card,
                    ),
                  )
                }
                placeholder="Admissions"
                className="field bg-white"
              />
            </label>
            <label>
              <span className="label">Sub-heading</span>
              <input
                name="quickAccessSubtitle"
                value={item.subtitle}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((card, itemIndex) =>
                      itemIndex === index
                        ? { ...card, subtitle: event.target.value }
                        : card,
                    ),
                  )
                }
                placeholder="How to apply"
                className="field bg-white"
              />
            </label>
            <label>
              <span className="label">Navigation Link</span>
              <input
                name="quickAccessHref"
                value={item.href}
                onChange={(event) =>
                  setItems((current) =>
                    current.map((card, itemIndex) =>
                      itemIndex === index
                        ? { ...card, href: event.target.value }
                        : card,
                    ),
                  )
                }
                placeholder="/contact"
                className="field bg-white"
              />
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setItems((current) => [...current, emptyCard])}
        className="btn-secondary w-fit"
      >
        <Plus size={16} />
        Add Quick Access Card
      </button>
    </div>
  );
}
