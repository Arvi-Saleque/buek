"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { quickAccessIconOptions } from "@/lib/quick-access";
import type { AcademicFaculty, AcademicSubject } from "@/lib/types";

const emptySubject: AcademicSubject = {
  icon: "BookOpen",
  title: "",
  body: "",
};

const emptyFaculty: AcademicFaculty = {
  icon: "GraduationCap",
  title: "",
  label: "",
  description: "",
  subjects: [{ ...emptySubject }],
};

function normalize(faculties?: AcademicFaculty[]): AcademicFaculty[] {
  if (!faculties || !faculties.length) return [{ ...emptyFaculty }];
  return faculties.map((faculty) => ({
    icon: faculty.icon || emptyFaculty.icon,
    title: faculty.title || "",
    label: faculty.label || "",
    description: faculty.description || "",
    subjects:
      faculty.subjects && faculty.subjects.length
        ? faculty.subjects.map((subject) => ({
            icon: subject.icon || emptySubject.icon,
            title: subject.title || "",
            body: subject.body || "",
          }))
        : [{ ...emptySubject }],
  }));
}

export function FacultyEditor({ faculties }: { faculties?: AcademicFaculty[] }) {
  const [items, setItems] = useState<AcademicFaculty[]>(normalize(faculties));

  const updateFaculty = (
    index: number,
    patch: Partial<AcademicFaculty>,
  ) =>
    setItems((current) =>
      current.map((faculty, idx) => (idx === index ? { ...faculty, ...patch } : faculty)),
    );

  const updateSubject = (
    facultyIndex: number,
    subjectIndex: number,
    patch: Partial<AcademicSubject>,
  ) =>
    setItems((current) =>
      current.map((faculty, idx) => {
        if (idx !== facultyIndex) return faculty;
        return {
          ...faculty,
          subjects: faculty.subjects.map((subject, sIdx) =>
            sIdx === subjectIndex ? { ...subject, ...patch } : subject,
          ),
        };
      }),
    );

  return (
    <div className="grid gap-5">
      {items.map((faculty, facultyIndex) => (
        <div
          key={facultyIndex}
          className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-university-navy">
                Faculty {facultyIndex + 1}
              </h3>
              <p className="text-xs text-slate-500">
                Configure faculty details and the subjects offered under it.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setItems((current) => current.filter((_, idx) => idx !== facultyIndex))
              }
              disabled={items.length === 1}
              className="btn-danger"
              aria-label={`Delete faculty ${facultyIndex + 1}`}
            >
              <Trash2 size={15} />
              Delete Faculty
            </button>
          </div>

          {/* Hidden inputs encoding the faculty fields by repeated name */}
          <input type="hidden" name="facultyIcon" value={faculty.icon || ""} />
          <input type="hidden" name="facultyTitle" value={faculty.title} />
          <input type="hidden" name="facultyLabel" value={faculty.label} />
          <input
            type="hidden"
            name="facultyDescription"
            value={faculty.description}
          />
          <input
            type="hidden"
            name="facultySubjects"
            value={JSON.stringify(faculty.subjects)}
          />

          <div className="grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
            <label>
              <span className="label">Icon</span>
              <select
                value={faculty.icon || emptyFaculty.icon}
                onChange={(event) =>
                  updateFaculty(facultyIndex, { icon: event.target.value })
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
              <span className="label">Faculty Title</span>
              <input
                value={faculty.title}
                onChange={(event) =>
                  updateFaculty(facultyIndex, { title: event.target.value })
                }
                placeholder="Faculty of Science, Engineering and Technology"
                className="field bg-white"
              />
            </label>
          </div>
          <div className="mt-4 grid gap-4">
            <label>
              <span className="label">Short Label</span>
              <input
                value={faculty.label}
                onChange={(event) =>
                  updateFaculty(facultyIndex, { label: event.target.value })
                }
                placeholder="Technology & Applied Science"
                className="field bg-white"
              />
            </label>
            <label>
              <span className="label">Description</span>
              <textarea
                value={faculty.description}
                onChange={(event) =>
                  updateFaculty(facultyIndex, { description: event.target.value })
                }
                rows={3}
                placeholder="A short summary of what the faculty focuses on."
                className="field bg-white"
              />
            </label>
          </div>

          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-university-navy">Subjects</h4>
              <button
                type="button"
                onClick={() =>
                  setItems((current) =>
                    current.map((row, idx) =>
                      idx === facultyIndex
                        ? { ...row, subjects: [...row.subjects, { ...emptySubject }] }
                        : row,
                    ),
                  )
                }
                className="btn-secondary"
              >
                <Plus size={15} />
                Add Subject
              </button>
            </div>

            <div className="grid gap-3">
              {faculty.subjects.map((subject, subjectIndex) => (
                <div
                  key={subjectIndex}
                  className="rounded-lg border border-slate-200 bg-white p-3"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Subject {subjectIndex + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setItems((current) =>
                          current.map((row, idx) =>
                            idx === facultyIndex
                              ? {
                                  ...row,
                                  subjects: row.subjects.filter(
                                    (_, sIdx) => sIdx !== subjectIndex,
                                  ),
                                }
                              : row,
                          ),
                        )
                      }
                      disabled={faculty.subjects.length === 1}
                      className="btn-danger"
                      aria-label={`Delete subject ${subjectIndex + 1}`}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-[0.7fr_1.3fr]">
                    <label>
                      <span className="label">Icon</span>
                      <select
                        value={subject.icon || emptySubject.icon}
                        onChange={(event) =>
                          updateSubject(facultyIndex, subjectIndex, {
                            icon: event.target.value,
                          })
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
                      <span className="label">Subject Title</span>
                      <input
                        value={subject.title}
                        onChange={(event) =>
                          updateSubject(facultyIndex, subjectIndex, {
                            title: event.target.value,
                          })
                        }
                        placeholder="Computer Science and Engineering"
                        className="field bg-white"
                      />
                    </label>
                  </div>
                  <label className="mt-3 block">
                    <span className="label">Description</span>
                    <textarea
                      value={subject.body}
                      onChange={(event) =>
                        updateSubject(facultyIndex, subjectIndex, {
                          body: event.target.value,
                        })
                      }
                      rows={3}
                      placeholder="A short description of what students learn in this subject."
                      className="field bg-white"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setItems((current) => [
            ...current,
            { ...emptyFaculty, subjects: [{ ...emptySubject }] },
          ])
        }
        className="btn-secondary w-fit"
      >
        <Plus size={16} />
        Add Faculty
      </button>
    </div>
  );
}
