"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ImageIcon,
  Loader2,
  Search,
  Upload,
  X,
} from "lucide-react";
import type { ImageAsset } from "@/lib/types";

type LibraryAsset = ImageAsset & {
  bytes?: number;
  createdAt?: string;
  folder?: string;
};

type LibraryResponse = {
  assets: LibraryAsset[];
  nextCursor?: string;
  totalCount?: number;
  error?: string;
};

function assetKey(asset: ImageAsset) {
  return asset.publicId || asset.url;
}

function compactName(asset: ImageAsset) {
  const name = asset.publicId || asset.altText || asset.url.split("/").pop() || "Cloudinary asset";
  return name.length > 48 ? `${name.slice(0, 45)}...` : name;
}

function formatDate(value?: string) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function MediaLibraryModal({
  open,
  multiple,
  selected,
  onClose,
  onSelect,
}: {
  open: boolean;
  multiple?: boolean;
  selected: ImageAsset[];
  onClose: () => void;
  onSelect: (assets: ImageAsset[]) => void;
}) {
  const [assets, setAssets] = useState<LibraryAsset[]>([]);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState<string | undefined>();
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [draftSelected, setDraftSelected] = useState<ImageAsset[]>([]);

  const selectedKeys = useMemo(
    () => new Set(draftSelected.map(assetKey)),
    [draftSelected],
  );

  useEffect(() => {
    if (!open) return;
    setDraftSelected(selected);
  }, [open, selected]);

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      setCursor(undefined);

      try {
        const params = new URLSearchParams();
        if (query.trim()) params.set("query", query.trim());
        const response = await fetch(`/api/admin/media-library?${params}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as LibraryResponse;

        if (!response.ok) {
          throw new Error(data.error || "Unable to load media library.");
        }

        setAssets(data.assets || []);
        setNextCursor(data.nextCursor);
      } catch (requestError) {
        if (controller.signal.aborted) return;
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load media library.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [open, query]);

  const loadMore = async () => {
    if (!nextCursor || loading) return;

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({ cursor: nextCursor });
      if (query.trim()) params.set("query", query.trim());
      const response = await fetch(`/api/admin/media-library?${params}`);
      const data = (await response.json()) as LibraryResponse;

      if (!response.ok) {
        throw new Error(data.error || "Unable to load more assets.");
      }

      setAssets((current) => [...current, ...(data.assets || [])]);
      setCursor(nextCursor);
      setNextCursor(data.nextCursor);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load more assets.",
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleAsset = (asset: LibraryAsset) => {
    if (!multiple) {
      onSelect([asset]);
      onClose();
      return;
    }

    setDraftSelected((current) => {
      const key = assetKey(asset);
      if (current.some((item) => assetKey(item) === key)) {
        return current.filter((item) => assetKey(item) !== key);
      }
      return [...current, asset];
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-h-[920px] max-w-6xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-university-gold">
              Media Library
            </p>
            <h2 className="text-xl font-bold text-university-navy">
              Choose from Cloudinary
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-600 transition hover:border-university-gold hover:text-university-navy"
            aria-label="Close media library"
          >
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-slate-200 p-4">
          <label className="relative block">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by public id, filename, folder, or tag..."
              className="field bg-white pl-10"
            />
          </label>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          {!error && loading && assets.length === 0 ? (
            <div className="grid min-h-60 place-items-center text-slate-500">
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                <Loader2 size={18} className="animate-spin" />
                Loading Cloudinary assets...
              </span>
            </div>
          ) : null}

          {!loading && !error && assets.length === 0 ? (
            <div className="grid min-h-60 place-items-center rounded-lg border border-dashed border-slate-300 text-center">
              <div>
                <ImageIcon size={38} className="mx-auto text-slate-300" />
                <p className="mt-3 text-sm font-semibold text-slate-600">
                  No Cloudinary images found.
                </p>
              </div>
            </div>
          ) : null}

          {assets.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {assets.map((asset) => {
                const isSelected = selectedKeys.has(assetKey(asset));

                return (
                  <button
                    key={assetKey(asset)}
                    type="button"
                    onClick={() => toggleAsset(asset)}
                    className={[
                      "group overflow-hidden rounded-lg border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft",
                      isSelected
                        ? "border-university-gold ring-2 ring-university-gold/30"
                        : "border-slate-200",
                    ].join(" ")}
                  >
                    <div className="relative aspect-[4/3] bg-slate-100">
                      <Image
                        src={asset.url}
                        alt={asset.altText || asset.publicId || "Cloudinary asset"}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <span
                        className={[
                          "absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-md border text-xs font-bold shadow-sm",
                          isSelected
                            ? "border-university-gold bg-university-gold text-university-navy"
                            : "border-white/80 bg-white/90 text-transparent",
                        ].join(" ")}
                      >
                        <Check size={15} />
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="truncate text-sm font-bold text-university-navy">
                        {compactName(asset)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {[asset.format?.toUpperCase(), formatDate(asset.createdAt)]
                          .filter(Boolean)
                          .join(" - ")}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : null}

          {nextCursor ? (
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={loading || cursor === nextCursor}
                className="btn-secondary"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                Load More
              </button>
            </div>
          ) : null}
        </div>

        {multiple ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4">
            <p className="text-sm font-semibold text-slate-600">
              {draftSelected.length} selected
            </p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelect(draftSelected);
                  onClose();
                }}
                className="btn-primary"
              >
                Save Selection
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function SingleMediaPicker({
  name,
  label,
  image,
}: {
  name: string;
  label: string;
  image?: ImageAsset;
}) {
  const [selected, setSelected] = useState<ImageAsset | undefined>(image);
  const [altText, setAltText] = useState(image?.altText || "");
  const [modalOpen, setModalOpen] = useState(false);

  const handleLibrarySelect = (assets: ImageAsset[]) => {
    const asset = assets[0];
    setSelected(asset);
    setAltText(asset?.altText || "");
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <span className="label">{label}</span>
      {selected?.url ? (
        <div className="relative mb-3 h-36 w-full overflow-hidden rounded-md bg-slate-100">
          <Image
            src={selected.url}
            alt={altText || selected.altText || label}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="mb-3 grid h-36 place-items-center rounded-md border border-dashed border-slate-300 bg-white text-slate-400">
          <ImageIcon size={30} />
        </div>
      )}

      <input type="hidden" name={`${name}Url`} value={selected?.url || ""} />
      <input
        type="hidden"
        name={`${name}SecureUrl`}
        value={selected?.secureUrl || selected?.url || ""}
      />
      <input type="hidden" name={`${name}PublicId`} value={selected?.publicId || ""} />
      <input type="hidden" name={`${name}Width`} value={selected?.width || ""} />
      <input type="hidden" name={`${name}Height`} value={selected?.height || ""} />
      <input type="hidden" name={`${name}Format`} value={selected?.format || ""} />

      <div className="grid gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-secondary"
          >
            <ImageIcon size={16} />
            Choose Photo
          </button>
          {selected?.url ? (
            <button
              type="button"
              onClick={() => {
                setSelected(undefined);
                setAltText("");
              }}
              className="btn-secondary"
            >
              <X size={16} />
              Clear
            </button>
          ) : null}
        </div>

        <label className="block">
          <span className="label">Upload new manually</span>
          <input
            name={name}
            type="file"
            accept="image/*"
            className="field bg-white"
          />
        </label>

        <input
          name={`${name}AltText`}
          value={altText}
          onChange={(event) => setAltText(event.target.value)}
          placeholder="Alt text"
          className="field bg-white"
        />
      </div>

      <MediaLibraryModal
        open={modalOpen}
        selected={selected ? [selected] : []}
        onClose={() => setModalOpen(false)}
        onSelect={handleLibrarySelect}
      />
    </div>
  );
}

export function MultiMediaPicker({
  inputName,
  titleName,
  captionName,
}: {
  inputName: string;
  titleName: string;
  captionName: string;
}) {
  const [selected, setSelected] = useState<ImageAsset[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setSelected([]);
    }
  };

  return (
    <div className="mt-4 grid gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="btn-secondary"
        >
          <ImageIcon size={16} />
          Choose From Cloudinary
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn-secondary"
        >
          <Upload size={16} />
          Upload New
        </button>
      </div>

      <input
        ref={fileInputRef}
        name={inputName}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="field bg-white"
      />

      {selected.length ? (
        <div className="grid gap-3 rounded-md border border-slate-200 bg-white p-3 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((asset) => (
            <div key={assetKey(asset)} className="overflow-hidden rounded-md border border-slate-200">
              <div className="relative h-28 bg-slate-100">
                <Image
                  src={asset.url}
                  alt={asset.altText || asset.publicId || "Selected image"}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-2">
                <p className="truncate text-xs font-semibold text-slate-600">
                  {compactName(asset)}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setSelected((current) =>
                      current.filter((item) => assetKey(item) !== assetKey(asset)),
                    )
                  }
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-red-600"
                  aria-label="Remove selected image"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {selected.map((asset, index) => (
        <span key={`${assetKey(asset)}-inputs`}>
          <input type="hidden" name="newLibraryImageUrl" value={asset.url} />
          <input
            type="hidden"
            name="newLibraryImageSecureUrl"
            value={asset.secureUrl || asset.url}
          />
          <input
            type="hidden"
            name="newLibraryImagePublicId"
            value={asset.publicId || ""}
          />
          <input type="hidden" name="newLibraryImageWidth" value={asset.width || ""} />
          <input type="hidden" name="newLibraryImageHeight" value={asset.height || ""} />
          <input type="hidden" name="newLibraryImageFormat" value={asset.format || ""} />
          <input
            type="hidden"
            name="newLibraryImageAltText"
            value={asset.altText || asset.publicId || ""}
          />
          <input type="hidden" name="newLibraryImageOrder" value={index + 1} />
        </span>
      ))}

      <input name={titleName} placeholder="Optional title for new photos" className="field bg-white" />
      <input name={captionName} placeholder="Optional caption for new photos" className="field bg-white" />

      <MediaLibraryModal
        open={modalOpen}
        multiple
        selected={selected}
        onClose={() => setModalOpen(false)}
        onSelect={setSelected}
      />
    </div>
  );
}
