import type { EditableListItem } from "@/lib/types";

export function editableRows(items?: EditableListItem[]) {
  return (items || [])
    .map((item) => `${item.title} | ${item.body}`)
    .join("\n");
}
