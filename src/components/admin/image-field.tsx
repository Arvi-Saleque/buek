import { SingleMediaPicker } from "@/components/admin/media-library-picker";
import type { ImageAsset } from "@/lib/types";

export function ImageField({
  name,
  label,
  image,
}: {
  name: string;
  label: string;
  image?: ImageAsset;
}) {
  return <SingleMediaPicker name={name} label={label} image={image} />;
}
