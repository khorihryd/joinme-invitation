import React, { useState, useEffect, useRef } from "react";
import { safeGetItem, safeSetItem, safeRemoveItem } from "../services/storage";

interface GiftItem {
  bank: string;
  number: string;
  name: string;
}

export default function CreateInvitation() {
  const [currentTab, setCurrentTab] = useState(0);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Core Fields
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [hostName, setHostName] = useState("");
  const [theme, setTheme] = useState("sample-theme");
  const [subTier, setSubTier] = useState<string>("free");

  // New Wedding Fields
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [parentsName, setParentsName] = useState("");
  const [eventStartTime, setEventStartTime] = useState("10:00 WIB");
  const [eventEndTime, setEventEndTime] = useState("16:00 WIB");
  const [mapLink, setMapLink] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [musicUrl, setMusicUrl] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  const [gifts, setGifts] = useState<GiftItem[]>([
    { bank: "BCA", number: "1234567890", name: "Kevin Kusuma" }
  ]);
  const [rsvpDeadline, setRsvpDeadline] = useState("");
  const [streamingLink, setStreamingLink] = useState("");
  const [guestBookActive, setGuestBookActive] = useState(true);

  // Gallery URLs (Input and list state)
  const [gallery, setGallery] = useState<string[]>([
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519225495810-7517c520a700?q=80&w=600&auto=format&fit=crop"
  ]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // Gift dynamic inputs
  const [giftBank, setGiftBank] = useState("");
  const [giftNumber, setGiftNumber] = useState("");
  const [giftName, setGiftName] = useState("");

  const [createdInviteId, setCreatedInviteId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const stored = safeGetItem("user-subscription") || safeGetItem("subscription") || "free";
    const normalizedTier = stored.toLowerCase();
    setSubTier(normalizedTier);

    const selectedTheme = safeGetItem("joinme-selected-theme");
    if (!selectedTheme) {
      // Default to "reels-story" if not chosen, but keep it graceful
      setTheme("reels-story");
    } else {
      setTheme(selectedTheme);
    }
  }, []);

  // Helper to send live data update via postMessage to preview iframe
  const sendPreviewData = () => {
    if (!iframeRef.current) return;
    const payload = {
      eventName: eventName || "Nama Undangan Anda",
      date: date || "2026-10-12T10:00:00Z",
      location: location || "Grand Ballroom Ritz Carlton, Jakarta",
      hostName: hostName || "Keluarga Bpk. Kusuma & Ibu Shinta",
      theme,
      groomName: groomName || "Kevin Kusuma",
      brideName: brideName || "Clarissa Wijaya",
      parentsName: parentsName || "Putra dari Bpk. Kusuma & Ibu Shinta",
      eventStartTime: eventStartTime || "10:00 WIB",
      eventEndTime: eventEndTime || "16:00 WIB",
      mapLink: mapLink || "https://maps.google.com",
      storyTitle: storyTitle || "Perjalanan Cinta Kami",
      storyContent: storyContent || "Kisah asmara indah yang bermula dari pertemuan tak terduga.",
      musicUrl: musicUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      gifts,
      gift: gifts, // duplicate for backward compatibility
      rsvpDeadline: rsvpDeadline || "2026-10-01",
      streamingLink: streamingLink || "https://zoom.us",
      guestBookActive,
      gallery,
      guestId: "guest-demo"
    };

    iframeRef.current.contentWindow?.postMessage(
      { type: "UPDATE_INVITATION_DATA", payload },
      "*"
    );
  };

  // Broadcast data dynamically on form modifications
  useEffect(() => {
    // Send data after a tiny debounced pause to ensure render
    const timer = setTimeout(() => {
      sendPreviewData();
    }, 100);
    return () => clearTimeout(timer);
  }, [
    eventName, date, location, hostName, theme,
    groomName, brideName, parentsName, eventStartTime, eventEndTime,
    mapLink, storyTitle, storyContent, musicUrl, gifts,
    rsvpDeadline, streamingLink, guestBookActive, gallery
  ]);

  const handleAddGift = () => {
    if (!giftBank || !giftNumber || !giftName) return;
    setGifts([...gifts, { bank: giftBank, number: giftNumber, name: giftName }]);
    setGiftBank("");
    setGiftNumber("");
    setGiftName("");
  };

  const handleRemoveGift = (index: number) => {
    setGifts(gifts.filter((_, idx) => idx !== index));
  };

  const handleAddImage = () => {
    if (!newImageUrl) return;
    setGallery([...gallery, newImageUrl]);
    setNewImageUrl("");
  };

  const handleRemoveImage = (index: number) => {
    setGallery(gallery.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !date || !location || !hostName) {
      alert("Harap lengkapi setidaknya Nama Acara, Tanggal, Lokasi, dan Host!");
      return;
    }

    const randStr = Math.random().toString(36).substring(2, 6);
    const uniqueId = `${Date.now()}-${randStr}`;

    const newInvitation = {
      id: uniqueId,
      eventName,
      date,
      location,
      hostName,
      theme,
      groomName,
      brideName,
      parentsName,
      eventStartTime,
      eventEndTime,
      mapLink,
      storyTitle,
      storyContent,
      musicUrl,
      gifts,
      rsvpDeadline,
      streamingLink,
      guestBookActive,
      gallery,
      createdAt: new Date().toISOString()
    };

    const existingInvitesRaw = safeGetItem("joinme-invitations");
    const existingInvites = existingInvitesRaw ? JSON.parse(existingInvitesRaw) : [];
    
    // Check Free tier limit (1 invitation)
    if (subTier !== "premium" && existingInvites.length >= 1) {
      alert("Batas Paket Gratis: Anda hanya diperbolehkan membuat maksimal 1 undangan. Silakan upgrade ke Premium untuk membuat undangan tanpa batas!");
      const params = new URLSearchParams(window.location.search);
      params.set("subpage", "pricing");
      window.location.href = `?${params.toString()}`;
      return;
    }

    existingInvites.push(newInvitation);
    safeSetItem("joinme-invitations", JSON.stringify(existingInvites));
    safeRemoveItem("joinme-selected-theme");

    setCreatedInviteId(uniqueId);
  };

  const handleCopyLink = () => {
    if (!createdInviteId) return;
    const link = `${window.location.origin}/?invite=${createdInviteId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBackToDashboard = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("subpage");
    window.location.href = `?${params.toString()}`;
  };

  const inviteLink = createdInviteId ? `${window.location.origin}/?invite=${createdInviteId}` : "";
  const previewIframeUrl = `/?invite=demo&theme=${theme}`;

  const tabs = [
    { title: "💑 Pasangan & Host", id: "couple" },
    { title: "📍 Acara & Lokasi", id: "event" },
    { title: "📖 Cerita & Galeri", id: "story" },
    { title: "🎁 Media & Hadiah", id: "media" },
    { title: "⚙️ Pengaturan", id: "settings" }
  ];

  return (
    <div id="create-invite-root" className="space-y-8 max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.04] pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono tracking-widest text-pink-400 uppercase font-semibold">ECOSYSTEM BUILDER</span>
          <h1 className="text-2xl font-extrabold text-white">Desain Undangan Premium Anda</h1>
          <p className="text-xs text-gray-400">Sesuaikan semua detail dengan form interaktif berjenjang & pratinjau instan.</p>
        </div>
        <button
          onClick={handleBackToDashboard}
          className="self-start sm:self-center px-4 py-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
        >
          Batal & Kembali
        </button>
      </div>

      {!createdInviteId ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: MULTI-STEP FORM (8 columns out of 12) */}
          <div className="lg:col-span-7 bg-white/[0.01] border border-white/[0.06] rounded-3xl p-6 sm:p-8 space-y-6">
            {/* Tab/Step Indicators */}
            <div className="flex overflow-x-auto pb-2 scrollbar-thin gap-1 border-b border-white/[0.04]">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCurrentTab(idx)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    currentTab === idx
                      ? "bg-pink-500/10 border border-pink-500/20 text-pink-400"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.02] border border-transparent"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Form Fields wrapped in single onSubmit */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* TAB 1: Pasangan & Host */}
              {currentTab === 0 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-1 pb-2">
                    <h3 className="text-sm font-extrabold text-white font-mono uppercase tracking-widest text-pink-500">Mempelai & Penyelenggara</h3>
                    <p className="text-xs text-gray-400">Masukkan nama pengantin pria, wanita, serta nama orang tua dan host acara.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Nama Mempelai Pria</label>
                      <input
                        type="text"
                        value={groomName}
                        onChange={(e) => setGroomName(e.target.value)}
                        placeholder="Contoh: Kevin Kusuma"
                        className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Nama Mempelai Wanita</label>
                      <input
                        type="text"
                        value={brideName}
                        onChange={(e) => setBrideName(e.target.value)}
                        placeholder="Contoh: Clarissa Wijaya"
                        className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Informasi Orang Tua</label>
                    <input
                      type="text"
                      value={parentsName}
                      onChange={(e) => setParentsName(e.target.value)}
                      placeholder="Contoh: Putra dari Bpk. Kusuma & Ibu Shinta"
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Nama Host / Pengundang (Wajib)</label>
                    <input
                      type="text"
                      required
                      value={hostName}
                      onChange={(e) => setHostName(e.target.value)}
                      placeholder="Contoh: Keluarga Bpk. Kusuma & Ibu Shinta"
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Acara & Lokasi */}
              {currentTab === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-1 pb-2">
                    <h3 className="text-sm font-extrabold text-white font-mono uppercase tracking-widest text-pink-500">Waktu & Tempat Pelaksanaan</h3>
                    <p className="text-xs text-gray-400">Tentukan kapan dan di mana perayaan pernikahan sakral dilangsungkan.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Nama Acara / Undangan (Wajib)</label>
                    <input
                      type="text"
                      required
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      placeholder="Contoh: Pernikahan Kevin & Clarissa"
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2 sm:col-span-1">
                      <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Tanggal (Wajib)</label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-1">
                      <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Waktu Mulai</label>
                      <input
                        type="text"
                        value={eventStartTime}
                        onChange={(e) => setEventStartTime(e.target.value)}
                        placeholder="Contoh: 10:00 WIB"
                        className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-1">
                      <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Waktu Selesai</label>
                      <input
                        type="text"
                        value={eventEndTime}
                        onChange={(e) => setEventEndTime(e.target.value)}
                        placeholder="Contoh: 16:00 WIB"
                        className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Lokasi Fisik (Wajib)</label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Contoh: Grand Ballroom Ritz Carlton, Jakarta"
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Tautan Google Maps</label>
                    <input
                      type="url"
                      value={mapLink}
                      onChange={(e) => setMapLink(e.target.value)}
                      placeholder="Contoh: https://maps.google.com/?q=..."
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: Cerita & Galeri */}
              {currentTab === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-1 pb-2">
                    <h3 className="text-sm font-extrabold text-white font-mono uppercase tracking-widest text-pink-500">Kisah Cinta & Galeri Momen</h3>
                    <p className="text-xs text-gray-400">Bagikan perjalanan romantis Anda beserta koleksi foto terbaik.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Judul Cerita</label>
                    <input
                      type="text"
                      value={storyTitle}
                      onChange={(e) => setStoryTitle(e.target.value)}
                      placeholder="Contoh: Awal Cerita Kami"
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Isi Kisah</label>
                    <textarea
                      value={storyContent}
                      onChange={(e) => setStoryContent(e.target.value)}
                      placeholder="Tulis kisah menarik tentang bagaimana Anda berdua saling bertemu..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all resize-none"
                    />
                  </div>

                  {/* Dynamic Gallery List */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Koleksi Foto Galeri</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="Tempel tautan gambar https://..."
                        className="flex-1 px-4 py-2.5 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="px-4 py-2.5 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 text-pink-400 text-xs font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Tambah Foto
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {gallery.map((imgUrl, index) => (
                        <div key={index} className="relative group rounded-xl overflow-hidden border border-white/[0.06] aspect-video bg-black/40">
                          <img src={imgUrl} alt="Gallery" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Media & Hadiah */}
              {currentTab === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-1 pb-2">
                    <h3 className="text-sm font-extrabold text-white font-mono uppercase tracking-widest text-pink-500">Musik Latar & Kado Digital</h3>
                    <p className="text-xs text-gray-400">Atur lagu pengiring romantis dan nomor rekening bank penerima hadiah.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Musik Latar Belakang (URL MP3)</label>
                    <input
                      type="url"
                      value={musicUrl}
                      onChange={(e) => setMusicUrl(e.target.value)}
                      placeholder="Link direct audio MP3"
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                    />
                  </div>

                  {/* Dynamic Gifts List */}
                  <div className="space-y-4 pt-2">
                    <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Daftar Rekening Hadiah</label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/[0.01] border border-white/[0.04] p-4 rounded-2xl">
                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-400 font-mono uppercase block">Nama Bank</span>
                        <input
                          type="text"
                          value={giftBank}
                          onChange={(e) => setGiftBank(e.target.value)}
                          placeholder="BCA, Mandiri, dll"
                          className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.08] rounded-lg text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-400 font-mono uppercase block">No. Rekening</span>
                        <input
                          type="text"
                          value={giftNumber}
                          onChange={(e) => setGiftNumber(e.target.value)}
                          placeholder="12345678"
                          className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.08] rounded-lg text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-400 font-mono uppercase block">Nama Pemilik</span>
                        <input
                          type="text"
                          value={giftName}
                          onChange={(e) => setGiftName(e.target.value)}
                          placeholder="Mempelai"
                          className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.08] rounded-lg text-xs text-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddGift}
                        className="sm:col-span-3 mt-1 py-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 text-xs font-bold rounded-lg transition-all border border-pink-500/10 cursor-pointer"
                      >
                        ➕ Tambah Informasi Rekening
                      </button>
                    </div>

                    <div className="space-y-2">
                      {gifts.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/[0.02] border border-white/[0.04] px-4 py-3 rounded-xl">
                          <div className="text-xs">
                            <span className="font-bold text-white font-mono block">{item.bank} - {item.number}</span>
                            <span className="text-[10px] text-gray-400">a.n. {item.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveGift(idx)}
                            className="text-[10px] font-bold text-red-400 hover:text-red-300 px-2 py-1 bg-red-500/5 rounded hover:bg-red-500/10 transition-all cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: Konfirmasi & Lainnya */}
              {currentTab === 4 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-1 pb-2">
                    <h3 className="text-sm font-extrabold text-white font-mono uppercase tracking-widest text-pink-500">Konfirmasi RSVP & Media Penunjang</h3>
                    <p className="text-xs text-gray-400">Atur tenggat RSVP kehadiran serta integrasi siaran virtual lainnya.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Tenggat Waktu RSVP</label>
                    <input
                      type="date"
                      value={rsvpDeadline}
                      onChange={(e) => setRsvpDeadline(e.target.value)}
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">Tautan Siaran Langsung (Streaming Link)</label>
                    <input
                      type="url"
                      value={streamingLink}
                      onChange={(e) => setStreamingLink(e.target.value)}
                      placeholder="Zoom link, YouTube streaming, dll"
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                    <div>
                      <span className="text-xs font-bold text-white block">Aktifkan Buku Tamu Digital</span>
                      <span className="text-[10px] text-gray-400">Izinkan para undangan untuk menuliskan doa & pesan ucapan selamat.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={guestBookActive}
                        onChange={(e) => setGuestBookActive(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/[0.08] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Controls inside Left Form */}
              <div className="flex justify-between items-center pt-6 border-t border-white/[0.04]">
                <button
                  type="button"
                  disabled={currentTab === 0}
                  onClick={() => setCurrentTab((prev) => prev - 1)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    currentTab === 0
                      ? "opacity-30 border-white/[0.04] text-gray-600 cursor-not-allowed"
                      : "bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.08] text-white"
                  }`}
                >
                  ← Sebelumnya
                </button>

                {currentTab < tabs.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentTab((prev) => prev + 1)}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Selanjutnya →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-pink-500/20 cursor-pointer"
                  >
                    🚀 Publikasikan Undangan
                  </button>
                )}
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN: DESKTOP LIVE PREVIEW (5 columns out of 12) */}
          <div className="lg:col-span-5 hidden lg:block sticky top-8 h-[80vh] flex flex-col space-y-3">
            <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
              <span className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Live Desktop View Simulator</span>
              <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-full uppercase font-bold">
                Tema: {theme}
              </span>
            </div>

            <div className="flex-1 bg-[#0d0714] rounded-[36px] border border-white/[0.08] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col">
              {/* Virtual Browser Top Bar */}
              <div className="h-10 bg-[#12071a] border-b border-white/[0.06] flex items-center px-4 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></div>
                </div>
                <div className="w-1/2 bg-black/40 border border-white/[0.04] text-[9px] text-gray-400 font-mono rounded px-2 text-center py-0.5 truncate">
                  joinme.com/preview?invite=demo
                </div>
                <div className="w-4"></div>
              </div>

              {/* The dynamic Live Frame */}
              <iframe
                ref={iframeRef}
                onLoad={sendPreviewData}
                src={previewIframeUrl}
                className="flex-1 w-full border-none h-full"
                title="Live Preview"
              />
            </div>
          </div>
        </div>
      ) : (
        /* SUCCESS OUTLET STATE */
        <div className="p-8 bg-white/[0.01] border border-emerald-500/30 rounded-3xl text-center space-y-6 animate-fade-in relative overflow-hidden max-w-xl mx-auto">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500"></div>

          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
            <span className="text-3xl">🎉</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Undangan Sukses Dibuat & Dipublikasikan!</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              Undangan Anda telah diterbitkan secara instan ke sistem runtime. Bagikan link eksklusif ini ke seluruh kerabat Anda.
            </p>
          </div>

          {/* Copyable Link Block */}
          <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl flex flex-col sm:flex-row items-center gap-4 justify-between max-w-xl mx-auto">
            <div className="text-left overflow-hidden w-full sm:w-auto flex-grow pr-4">
              <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase font-semibold block">LINK UNDANGAN AKTIF:</span>
              <span className="text-xs text-indigo-300 font-mono font-semibold block truncate select-all mt-1">{inviteLink}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                copied 
                  ? "bg-emerald-600 text-white" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {copied ? "✓ Tersalin" : "📋 Salin Link"}
            </button>
          </div>

          <div className="h-[1px] bg-white/[0.04] w-full max-w-md mx-auto"></div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                window.location.href = `/?invite=${createdInviteId}`;
              }}
              className="px-6 py-2.5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-white text-xs font-semibold rounded-xl transition-all"
            >
              Buka Preview Undangan ↗
            </button>
            <button
              onClick={handleBackToDashboard}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Floating View Preview trigger on Mobile screens */}
      {!createdInviteId && (
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setShowMobilePreview(true)}
            className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs rounded-full shadow-2xl shadow-pink-500/30 active:scale-95 cursor-pointer uppercase tracking-wider font-mono"
          >
            👁️ Lihat Pratinjau
          </button>
        </div>
      )}

      {/* Mobile Fullscreen Overlay Simulator */}
      {!createdInviteId && showMobilePreview && (
        <div className="lg:hidden fixed inset-0 bg-[#07030a] z-50 flex flex-col animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-[#12071a] border-b border-white/[0.06] flex items-center justify-between">
            <button
              onClick={() => setShowMobilePreview(false)}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              ✕ Kembali
            </button>
            <span className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">Interactive Mobile View</span>
            <div className="w-16"></div> {/* spacer */}
          </div>

          {/* Active mobile frame */}
          <div className="flex-1 bg-black relative">
            <iframe
              ref={iframeRef}
              onLoad={sendPreviewData}
              src={previewIframeUrl}
              className="w-full h-full border-none"
              title="Mobile Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}
