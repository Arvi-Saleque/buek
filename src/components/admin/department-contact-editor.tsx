"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { DepartmentContact } from "@/lib/types";

const emptyDepartment: DepartmentContact = {
  title: "",
  body: "",
  email: "",
  phone: "",
};

export function DepartmentContactEditor({
  departments,
}: {
  departments: DepartmentContact[];
}) {
  const [items, setItems] = useState<DepartmentContact[]>(
    departments.length ? departments : [emptyDepartment],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((department, index) => (
        <div key={index} className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-slate-800">Office {index + 1}</h3>
            <button
              type="button"
              onClick={() =>
                setItems((current) =>
                  current.filter((_, itemIndex) => itemIndex !== index),
                )
              }
              disabled={items.length === 1}
              className="btn-danger"
              aria-label={`Delete office ${index + 1}`}
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
          <input
            name="departmentTitle"
            value={department.title}
            onChange={(event) =>
              setItems((current) =>
                current.map((item, itemIndex) =>
                  itemIndex === index
                    ? { ...item, title: event.target.value }
                    : item,
                ),
              )
            }
            placeholder="Office name"
            className="field bg-white"
          />
          <textarea
            name="departmentBody"
            value={department.body}
            onChange={(event) =>
              setItems((current) =>
                current.map((item, itemIndex) =>
                  itemIndex === index
                    ? { ...item, body: event.target.value }
                    : item,
                ),
              )
            }
            placeholder="Office responsibility"
            rows={3}
            className="field bg-white"
          />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              name="departmentEmail"
              value={department.email}
              onChange={(event) =>
                setItems((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, email: event.target.value }
                      : item,
                  ),
                )
              }
              placeholder="Email"
              className="field bg-white"
            />
            <input
              name="departmentPhone"
              value={department.phone}
              onChange={(event) =>
                setItems((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, phone: event.target.value }
                      : item,
                  ),
                )
              }
              placeholder="Phone"
              className="field bg-white"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setItems((current) => [...current, emptyDepartment])}
        className="btn-secondary w-fit lg:col-span-2"
      >
        <Plus size={16} />
        Add Office
      </button>
    </div>
  );
}
