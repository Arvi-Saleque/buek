"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { quickAccessIconOptions } from "@/lib/quick-access";
import type { EditableListItem } from "@/lib/types";

type EditableListEditorProps = {
  fieldName: string;
  items?: EditableListItem[];
  itemLabel: string;
  addLabel?: string;
  titleLabel?: string;
  bodyLabel?: string;
  titlePlaceholder?: string;
  bodyPlaceholder?: string;
  bodyRows?: number;
  bodyAsInput?: boolean;
  withIcon?: boolean;
  defaultIcon?: string;
};

const emptyItem: EditableListItem = {
  icon: "BookOpen",
  title: "",
  body: "",
};

function normalizeItems(items: EditableListItem[] | undefined, defaultIcon: string) {
  const normalized = (items || []).map((item) => ({
    icon: item.icon || defaultIcon,
    title: item.title || "",
    body: item.body || "",
  }));

  return normalized.length ? normalized : [{ ...emptyItem, icon: defaultIcon }];
}

export function EditableListEditor({
  fieldName,
  items,
  itemLabel,
  addLabel,
  titleLabel = "Title",
  bodyLabel = "Description",
  titlePlaceholder = "Title",
  bodyPlaceholder = "Description",
  bodyRows = 3,
  bodyAsInput = false,
  withIcon = false,
  defaultIcon = "BookOpen",
}: EditableListEditorProps) {
  const [rows, setRows] = useState<EditableListItem[]>(
    normalizeItems(items, defaultIcon),
  );

  return (
    <div className="grid gap-4">
      {rows.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-slate-200 bg-slate-50 p-4"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-university-navy">
              {itemLabel} {index + 1}
            </h3>
            <button
              type="button"
              onClick={() =>
                setRows((current) =>
                  current.filter((_, itemIndex) => itemIndex !== index),
                )
              }
              disabled={rows.length === 1}
              className="btn-danger"
              aria-label={`Delete ${itemLabel.toLowerCase()} ${index + 1}`}
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
          <div
            className={[
              "grid gap-4",
              withIcon ? "md:grid-cols-[0.7fr_1.3fr]" : "md:grid-cols-2",
            ].join(" ")}
          >
            {withIcon ? (
              <label>
                <span className="label">Icon</span>
                <select
                  name={`${fieldName}Icon`}
                  value={item.icon || defaultIcon}
                  onChange={(event) =>
                    setRows((current) =>
                      current.map((row, itemIndex) =>
                        itemIndex === index
                          ? { ...row, icon: event.target.value }
                          : row,
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
            ) : null}
            <label>
              <span className="label">{titleLabel}</span>
              <input
                name={`${fieldName}Title`}
                value={item.title}
                onChange={(event) =>
                  setRows((current) =>
                    current.map((row, itemIndex) =>
                      itemIndex === index
                        ? { ...row, title: event.target.value }
                        : row,
                    ),
                  )
                }
                placeholder={titlePlaceholder}
                className="field bg-white"
              />
            </label>
            <label className={withIcon ? "md:col-span-2" : ""}>
              <span className="label">{bodyLabel}</span>
              {bodyAsInput ? (
                <input
                  name={`${fieldName}Body`}
                  value={item.body}
                  onChange={(event) =>
                    setRows((current) =>
                      current.map((row, itemIndex) =>
                        itemIndex === index
                          ? { ...row, body: event.target.value }
                          : row,
                      ),
                    )
                  }
                  placeholder={bodyPlaceholder}
                  className="field bg-white"
                />
              ) : (
                <textarea
                  name={`${fieldName}Body`}
                  value={item.body}
                  onChange={(event) =>
                    setRows((current) =>
                      current.map((row, itemIndex) =>
                        itemIndex === index
                          ? { ...row, body: event.target.value }
                          : row,
                      ),
                    )
                  }
                  rows={bodyRows}
                  placeholder={bodyPlaceholder}
                  className="field bg-white"
                />
              )}
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setRows((current) => [...current, { ...emptyItem, icon: defaultIcon }])
        }
        className="btn-secondary w-fit"
      >
        <Plus size={16} />
        {addLabel || `Add ${itemLabel}`}
      </button>
    </div>
  );
}
