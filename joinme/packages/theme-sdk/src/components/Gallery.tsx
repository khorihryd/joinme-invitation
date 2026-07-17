import React, { useState } from "react";
import { useGallery } from "../hooks/useGallery";

export interface GalleryProps {
  images?: string[];
  className?: string;
  imageClassName?: string;
}

export function Gallery({ images, className = "", imageClassName = "" }: GalleryProps) {
  const { images: sdkImages } = useGallery();
  const displayImages = images || sdkImages;
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!displayImages || displayImages.length === 0) {
    return (
      <div id="gallery-empty" className="text-center py-8 text-gray-500 text-xs font-mono">
        Belum ada foto galeri.
      </div>
    );
  }

  return (
    <div id="gallery-wrapper" className="space-y-4">
      {/* Photo Grid */}
      <div 
        id="gallery-grid" 
        className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}
      >
        {displayImages.map((imgSrc, idx) => (
          <div 
            key={idx}
            id={`gallery-item-${idx}`}
            onClick={() => setActiveImage(imgSrc)}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.08] cursor-pointer"
          >
            <img 
              id={`gallery-img-${idx}`}
              src={imgSrc} 
              alt={`Gallery image ${idx + 1}`} 
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageClassName}`}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-xs font-medium tracking-wide font-mono px-3 py-1.5 bg-black/40 rounded-full border border-white/10 backdrop-blur-sm">
                🔍 Perbesar
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          id="gallery-lightbox" 
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in cursor-zoom-out"
        >
          <button 
            id="gallery-lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(null);
            }}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white text-sm transition-all duration-200 cursor-pointer"
            aria-label="Tutup galeri"
          >
            ✕
          </button>
          
          <div 
            id="gallery-lightbox-content"
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
          >
            <img 
              id="gallery-lightbox-img"
              src={activeImage} 
              alt="Expanded gallery view" 
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain select-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
