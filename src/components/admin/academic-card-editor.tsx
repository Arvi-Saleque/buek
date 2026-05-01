"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { quickAccessIconOptions } from "@/lib/quick-access";
import type { HomeAcademicCard } from "@/lib/types";

const emptyCard: HomeAcademicCard = {
  icon: "BookOpen",
  title: "",
};

export function AcademicCardEditor({ cards }: { cards: HomeAcademicCard[] }) {
  const [items, setItems] = useState<HomeAcademicCard[]>(
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
                Academic Card {index + 1}
              </h3>
              <p className="text-xs text-slate-500">
                Public homepage card with icon and title only.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))
              }
              className="btn-danger"
              disabled={items.length === 1}
              aria-label={`Delete academic card ${index + 1}`}
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
            <label>
              <span className="label">Icon</span>
              <select
                name="academicCardIcon"
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
              <span className="label">Title</span>
              <input
                name="academicCardTitle"
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
                placeholder="Engineering"
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
        Add Academic Card
      </button>
    </div>
  );
}
