import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/hotelData';
import { GalleryPhoto } from '../types/hotel';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const categories = ['All', 'Chambers', 'Architecture', 'Gastronomy', 'Wellness'];

  const filteredPhotos =
    activeCategory === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full flex flex-col bg-[#fcf9f3]">
      {/* Editorial Header */}
      <section className="relative -mt-20 pt-36 pb-20 w-full bg-[#0d3320] text-[#ffffff] overflow-hidden">
        <div className="relative w-full px-5 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff]/10 backdrop-blur-md rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5]"></span>
            <span className="font-label-caps text-[11px] text-[#ffdea5] uppercase tracking-widest">
              Visual Dossier
            </span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-6xl text-[#ffffff] tracking-tight max-w-3xl mb-4 font-normal">
            Visual Gallery
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#c3ecd0] max-w-2xl font-normal opacity-90 mb-4">
            “A photographic study in tactile stones, verdant foliage, and quiet architectural harmony.”
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-40 w-full bg-[#ffffff] border-b border-[#e5e2dc] shadow-sm">
        <div className="max-w-7xl mx-auto px-5 lg:px-16 flex items-center justify-start gap-3 py-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 font-label-caps text-xs uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#001d0e] text-[#ffffff]'
                  : 'bg-[#f0eee8] text-[#414843] hover:bg-[#e5e2dc]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="w-full py-16 px-5 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer bg-[#ffffff] border border-[#e5e2dc] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f0eee8]">
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-[#001d0e]/80 text-[#ffffff] font-label-caps text-[9px] uppercase px-2.5 py-1 tracking-widest">
                  {photo.category}
                </div>
                <div className="absolute inset-0 bg-[#001d0e]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="w-10 h-10 rounded-full bg-[#ffffff] text-[#001d0e] flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined">zoom_in</span>
                  </span>
                </div>
              </div>

              <div className="p-4 bg-[#ffffff]">
                <h4 className="font-serif text-base text-[#001d0e] group-hover:text-[#775a19] transition-colors">
                  {photo.title}
                </h4>
                <p className="font-sans text-xs text-[#727972] mt-1 line-clamp-1">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-[#001d0e]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-4xl w-full bg-[#fcf9f3] border border-[#e5e2dc] shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#001d0e] text-[#ffffff] flex items-center justify-center cursor-pointer hover:bg-[#775a19] transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="aspect-[16/10] bg-[#000000] overflow-hidden">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#fcf9f3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-label-caps text-[10px] text-[#775a19] uppercase tracking-widest block mb-1">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-serif text-2xl text-[#001d0e]">
                  {selectedPhoto.title}
                </h3>
                <p className="font-sans text-xs text-[#414843] mt-1">
                  {selectedPhoto.caption}
                </p>
              </div>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-6 py-2 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#775a19] transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
