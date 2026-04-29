import Image from "next/image";
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
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <span className="label">{label}</span>
      {image?.url ? (
        <div className="relative mb-3 h-36 w-full overflow-hidden rounded-md">
          <Image
            src={image.url}
            alt={image.altText || label}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <input type="hidden" name={`${name}Url`} value={image?.url || ""} />
      <input type="hidden" name={`${name}SecureUrl`} value={image?.secureUrl || ""} />
      <input type="hidden" name={`${name}PublicId`} value={image?.publicId || ""} />
      <input type="hidden" name={`${name}Width`} value={image?.width || ""} />
      <input type="hidden" name={`${name}Height`} value={image?.height || ""} />
      <input type="hidden" name={`${name}Format`} value={image?.format || ""} />
      <div className="grid gap-3">
        <input name={name} type="file" accept="image/*" className="field bg-white" />
        <input
          name={`${name}AltText`}
          defaultValue={image?.altText || ""}
          placeholder="Alt text"
          className="field bg-white"
        />
      </div>
    </div>
  );
}
