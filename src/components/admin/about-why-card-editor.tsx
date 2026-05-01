"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { quickAccessIconOptions } from "@/lib/quick-access";
import type { IconTitleItem } from "@/lib/types";

const fallbackIcons = [
  "GraduationCap",
  "LayoutGrid",
  "Microscope",
  "Building2",
  "Shield",
  "Landmark",
];

const emptyCard: IconTitleItem = {
  icon: "GraduationCap",
  title: "",
};

function normalizeCard(item: IconTitleItem, index: number): IconTitleItem {
  return {
    icon: item.icon || fallbackIcons[index % fallbackIcons.length],
    title: item.body || item.title || "",
  };
}

export function AboutWhyCardEditor({ cards }: { cards: IconTitleItem[] }) {
  const [items, setItems] = useState<IconTitleItem[]>(
    cards.length ? cards.map(normalizeCard) : [emptyCard],
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
                Why Choose Us Card {index + 1}
              </h3>
              <p className="text-xs text-slate-500">
                Public About page card with selected icon and one visible title.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setItems((current) =>
                  current.filter((_, itemIndex) => itemIndex !== index),
                )
              }
              className="btn-danger"
              disabled={items.length === 1}
              aria-label={`Delete why choose us card ${index + 1}`}
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
            <label>
              <span className="label">Icon</span>
              <select
                name="aboutWhyItemIcon"
                value={item.icon || emptyCard.icon}
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
              <span className="label">Title</span>
              <input
                name="aboutWhyItemTitle"
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
                placeholder="Experienced and dedicated faculty members"
                className="field bg-white"
              />
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setItems((current) => [
            ...current,
            {
              ...emptyCard,
              icon: fallbackIcons[current.length % fallbackIcons.length],
            },
          ])
        }
        className="btn-secondary w-fit"
      >
        <Plus size={16} />
        Add Why Choose Us Card
      </button>
    </div>
  );
}
