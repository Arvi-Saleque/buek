export function StatusNote({
  saved,
  deleted,
}: {
  saved?: string;
  deleted?: string;
}) {
  if (!saved && !deleted) return null;

  return (
    <div className="mb-5 rounded-md border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-800">
      {deleted ? "Item deleted successfully." : "Changes saved successfully."}
    </div>
  );
}
