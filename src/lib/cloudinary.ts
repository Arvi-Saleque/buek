import "server-only";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import type { ImageAsset } from "@/lib/types";

export type CloudinaryLibraryAsset = ImageAsset & {
  bytes?: number;
  createdAt?: string;
  folder?: string;
};

type CloudinarySearchResource = {
  secure_url?: string;
  url?: string;
  public_id?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  created_at?: string;
  folder?: string;
  filename?: string;
};

type CloudinarySearchResponse = {
  resources?: CloudinarySearchResource[];
  next_cursor?: string;
  total_count?: number;
};

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary credentials are not configured.");
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

function uploadBuffer(buffer: Buffer, folder: string): Promise<UploadApiResponse> {
  configureCloudinary();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Cloudinary upload failed."));
          return;
        }
        resolve(result);
      },
    );

    stream.end(buffer);
  });
}

export async function uploadFormImage(
  file: File | null,
  folder: string,
  altText?: string,
): Promise<ImageAsset | undefined> {
  if (!file || file.size === 0) {
    return undefined;
  }

  const arrayBuffer = await file.arrayBuffer();
  const result = await uploadBuffer(Buffer.from(arrayBuffer), folder);

  return {
    url: result.secure_url,
    secureUrl: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    altText,
  };
}

export async function listCloudinaryImages({
  query,
  nextCursor,
  maxResults = 30,
}: {
  query?: string;
  nextCursor?: string;
  maxResults?: number;
}): Promise<{
  assets: CloudinaryLibraryAsset[];
  nextCursor?: string;
  totalCount?: number;
}> {
  configureCloudinary();

  const safeMax = Math.min(Math.max(maxResults, 1), 70);
  const search = cloudinary.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(safeMax);

  if (nextCursor) {
    search.next_cursor(nextCursor);
  }

  const result = (await search.execute()) as CloudinarySearchResponse;

  const normalizedQuery = query?.trim().toLowerCase();
  const assets = (result.resources || [])
      .filter((resource) => Boolean(resource.secure_url || resource.url))
      .map((resource) => ({
        url: resource.secure_url || resource.url || "",
        secureUrl: resource.secure_url || resource.url,
        publicId: resource.public_id,
        width: resource.width,
        height: resource.height,
        format: resource.format,
        altText: resource.filename || resource.public_id,
        bytes: resource.bytes,
        createdAt: resource.created_at,
        folder: resource.folder,
      }))
      .filter((asset) => {
        if (!normalizedQuery) return true;
        return [asset.publicId, asset.altText, asset.folder]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      });

  return {
    assets,
    nextCursor: result.next_cursor,
    totalCount: result.total_count,
  };
}
