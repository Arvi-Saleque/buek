"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export function StringListEditor({
  fieldName,
  items,
  itemLabel,
  addLabel,
  placeholder,
}: {
  fieldName: string;
  items?: string[];
  itemLabel: string;
  addLabel?: string;
  placeholder?: string;
}) {
  const [rows, setRows] = useState<string[]>(
    items?.length ? items : [""],
  );

  return (
    <div className="grid gap-3">
      {rows.map((item, index) => (
        <div key={index} className="flex gap-3">
          <label className="min-w-0 flex-1">
            <span className="label">
              {itemLabel} {index + 1}
            </span>
            <input
              name={fieldName}
              value={item}
              onChange={(event) =>
                setRows((current) =>
                  current.map((row, itemIndex) =>
                    itemIndex === index ? event.target.value : row,
                  ),
                )
              }
              placeholder={placeholder || itemLabel}
              className="field bg-white"
            />
          </label>
          <button
            type="button"
            onClick={() =>
              setRows((current) =>
                current.filter((_, itemIndex) => itemIndex !== index),
              )
            }
            disabled={rows.length === 1}
            className="btn-danger mt-7 h-10 w-10 px-0"
            aria-label={`Delete ${itemLabel.toLowerCase()} ${index + 1}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setRows((current) => [...current, ""])}
        className="btn-secondary w-fit"
      >
        <Plus size={16} />
        {addLabel || `Add ${itemLabel}`}
      </button>
    </div>
  );
}
