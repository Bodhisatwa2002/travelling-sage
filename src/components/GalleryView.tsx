"use client";

import { useState } from "react";
import Image from "next/image";
import { LayoutGrid, FolderOpen } from "lucide-react";

interface GalleryImage {
  number: string;
  caption: string;
  location: string;
  image: string;
  height: string;
}

function buildRows(images: GalleryImage[]) {
  const rows: GalleryImage[][] = [];
  if (images.length > 0) {
    rows.push(images.slice(0, 2));
  }
  for (let i = 2; i < images.length; i += 3) {
    rows.push(images.slice(i, i + 3));
  }
  return rows;
}

function groupByLocation(images: GalleryImage[]) {
  const groups: Record<string, GalleryImage[]> = {};
  for (const img of images) {
    const loc = img.location;
    if (!groups[loc]) groups[loc] = [];
    groups[loc].push(img);
  }
  return groups;
}

function GalleryCard({ item }: { item: GalleryImage }) {
  return (
    <div className="group border border-[#CCCCCC] cursor-pointer flex-1">
      {/* Card Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
          <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
          <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#999999]" />
        </div>
        <div className="flex-1 h-px border-t border-dashed border-[#AAAAAA] mx-4" />
        <span className="text-[11px] font-medium tracking-wide">
          [{item.number}]
        </span>
      </div>

      {/* Image */}
      <div className="px-3">
        <div className={`relative w-full ${item.height} overflow-hidden`}>
          <Image
            src={item.image}
            alt={item.caption}
            fill
            className="object-cover group-hover:grayscale transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      </div>

      {/* Caption Row */}
      <div className="flex items-center justify-between px-3.5 py-2.5">
        <span className="font-[family-name:var(--font-moret)] text-[16px] font-semibold">
          <span className="group-hover:bg-[#E8D5A3] transition-colors duration-300 box-decoration-clone">
            {item.caption}
          </span>
        </span>
        <span className="text-[12px] text-[#555555] italic">
          {item.location}
        </span>
      </div>
    </div>
  );
}

function FolderCard({
  location,
  images,
  onClick,
}: {
  location: string;
  images: GalleryImage[];
  onClick: () => void;
}) {
  const coverImage = images[0];
  return (
    <button onClick={onClick} className="group text-left flex-1">
      <div className="border border-[#CCCCCC] overflow-hidden h-[300px] sm:h-[400px] flex flex-col">
        {/* Folder Header */}
        <div className="flex items-center justify-between px-3.5 py-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <FolderOpen size={14} className="text-[#555555]" />
            <span className="font-[family-name:var(--font-moret)] text-[14px] font-semibold">
              {location}
            </span>
          </div>
          <span className="text-[11px] text-[#555555]">
            {images.length} {images.length === 1 ? "photo" : "photos"}
          </span>
        </div>

        {/* Cover Image */}
        <div className="px-3 flex-1 min-h-0">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={coverImage.image}
              alt={location}
              fill
              className="object-cover group-hover:grayscale transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-1.5 px-3 pt-2 h-[56px] shrink-0">
          {images.length > 1 &&
            images.slice(1, 4).map((img) => (
              <div
                key={img.number}
                className="relative w-12 h-12 overflow-hidden shrink-0"
              >
                <Image
                  src={img.image}
                  alt={img.caption}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            ))}
          {images.length > 4 && (
            <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center shrink-0">
              <span className="text-white text-[11px] font-semibold">
                +{images.length - 4}
              </span>
            </div>
          )}
        </div>

        <div className="px-3.5 py-2.5 shrink-0">
          <span className="text-[12px] text-[#555555] group-hover:text-[#1A1A1A] transition-colors">
            View all →
          </span>
        </div>
      </div>
    </button>
  );
}

export default function GalleryView({
  images,
}: {
  images: GalleryImage[];
}) {
  const [viewMode, setViewMode] = useState<"all" | "folders">("all");
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  const isAllView = viewMode === "all";
  const rows = buildRows(images);
  const groups = groupByLocation(images);
  const locationNames = Object.keys(groups);

  return (
    <>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3 pb-5">
        <button
          onClick={() => {
            setViewMode("all");
            setOpenFolder(null);
          }}
          className={`flex items-center gap-2 px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
            isAllView
              ? "bg-[#1A1A1A] text-white"
              : "border border-[#CCCCCC] text-[#555555] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
          }`}
        >
          <LayoutGrid size={14} />
          ALL PHOTOS
        </button>
        <button
          onClick={() => {
            setViewMode("folders");
            setOpenFolder(null);
          }}
          className={`flex items-center gap-2 px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
            !isAllView
              ? "bg-[#1A1A1A] text-white"
              : "border border-[#CCCCCC] text-[#555555] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
          }`}
        >
          <FolderOpen size={14} />
          BY LOCATION
        </button>
      </div>

      {/* Separator */}
      <div className="flex items-center gap-3 px-9">
        <div className="w-2 h-2 border-[1.5px] border-[#1A1A1A] rotate-45" />
        <div className="flex-1 h-px bg-[#1A1A1A]" />
        <div className="w-2 h-2 border-[1.5px] border-[#1A1A1A] rotate-45" />
      </div>

      {/* Content */}
      <div className="px-5 pt-6 pb-12 space-y-5">
        {isAllView ? (
          /* All Photos Grid */
          rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col sm:flex-row gap-5">
              {row.map((item) => (
                <GalleryCard key={item.number} item={item} />
              ))}
            </div>
          ))
        ) : openFolder === null ? (
          /* Folder Grid */
          <>
            {(() => {
              const folderRows: string[][] = [];
              for (let i = 0; i < locationNames.length; i += 3) {
                folderRows.push(locationNames.slice(i, i + 3));
              }
              return folderRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-col sm:flex-row gap-5">
                  {row.map((loc) => (
                    <FolderCard
                      key={loc}
                      location={loc}
                      images={groups[loc]}
                      onClick={() => setOpenFolder(loc)}
                    />
                  ))}
                  {row.length < 3 &&
                    Array.from({ length: 3 - row.length }).map((_, i) => (
                      <div key={`empty-${i}`} className="flex-1" />
                    ))}
                </div>
              ));
            })()}
          </>
        ) : (
          /* Open Folder - show images from that location */
          <>
            <button
              onClick={() => setOpenFolder(null)}
              className="flex items-center gap-2 text-[13px] font-semibold text-[#555555] hover:text-[#1A1A1A] transition-colors mb-2"
            >
              ← Back to folders
            </button>
            <h2 className="font-[family-name:var(--font-moret)] text-[32px] font-bold mb-4">
              {openFolder}
            </h2>
            {buildRows(groups[openFolder]).map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-col sm:flex-row gap-5">
                {row.map((item) => (
                  <GalleryCard key={item.number} item={item} />
                ))}
                {row.length < 3 &&
                  Array.from({ length: 3 - row.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="flex-1" />
                  ))}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
