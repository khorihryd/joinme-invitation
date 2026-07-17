import { InvitationData } from "@joinme/theme-sdk";

export interface InvitationDataWithTheme extends InvitationData {
  theme?: string;
}

export async function fetchInvitation(inviteId: string): Promise<InvitationDataWithTheme> {
  // Simulate network latency of 800ms
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Try to find the invitation in localStorage first
  const localInvitesRaw = localStorage.getItem("joinme-invitations");
  if (localInvitesRaw) {
    try {
      const localInvites = JSON.parse(localInvitesRaw);
      const found = localInvites.find((inv: any) => inv.id === inviteId);
      if (found) {
        return {
          eventName: found.eventName,
          date: found.date,
          location: found.location,
          hostName: found.hostName,
          theme: found.theme || "sample-theme"
        };
      }
    } catch (e) {
      console.error("Failed to parse local invitations:", e);
    }
  }

  if (inviteId === "abc123") {
    return {
      eventName: "Pernikahan Budi & Ani",
      date: "2026-10-10T10:00:00Z",
      location: "Gedung Serbaguna, Jakarta",
      hostName: "Keluarga Besar Budi & Ani",
      theme: "sample-theme",
      guestId: "guest-budi-ani",
      gallery: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519225495810-7517c520a700?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=600&auto=format&fit=crop"
      ],
      story: {
        title: "Kisah Cinta Kami",
        content: "Pertemuan pertama kami dimulai dari bangku kuliah, tumbuh dalam persahabatan, dan akhirnya kami memutuskan untuk menyatukan janji suci pernikahan ini selamanya."
      },
      timeline: [
        { time: "08:00 - 09:30", activity: "Akad Nikah / Pemberkatan" },
        { time: "11:00 - 13:00", activity: "Resepsi Sesi 1" },
        { time: "13:30 - 15:30", activity: "Resepsi Sesi 2" }
      ],
      gift: [
        { bank: "BCA", number: "1234567890", name: "Budi Santoso" },
        { bank: "Mandiri", number: "0987654321", name: "Ani Wijaya" }
      ]
    };
  }

  if (inviteId === "xyz789") {
    return {
      eventName: "Sweet 17th Clara Olivia",
      date: "2026-11-20T18:00:00Z",
      location: "Sky Lounge & Bar, Hotel Mulia, Jakarta",
      hostName: "Keluarga Handoko & Clara Olivia",
      theme: "premium-theme",
      guestId: "guest-clara",
      gallery: [
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop"
      ],
      story: {
        title: "Menuju Kedewasaan",
        content: "Tujuh belas tahun penuh tawa, cinta, dan petualangan. Saya sangat bersyukur atas setiap momen indah dan siap menyambut lembaran baru dalam hidup ini."
      },
      timeline: [
        { time: "18:00 - 18:30", activity: "Registrasi & Welcoming Guest" },
        { time: "18:30 - 19:30", activity: "Opening, Birthday Wish & Cake Cutting" },
        { time: "19:30 - 21:00", activity: "Dinner, Music & Games" }
      ],
      gift: [
        { bank: "BCA", number: "5678901234", name: "Clara Olivia" }
      ]
    };
  }

  if (inviteId === "demo") {
    return {
      eventName: "Demo Pernikahan Kevin & Clarissa",
      date: "2026-10-12T10:00:00Z",
      location: "Gedung Pertemuan Utama",
      hostName: "Keluarga Bpk. Kusuma & Ibu Shinta",
      theme: "reels-story",
      guestId: "guest-demo",
      gallery: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519225495810-7517c520a700?q=80&w=600&auto=format&fit=crop"
      ],
      story: {
        title: "Kisah Cinta Kami",
        content: "Pertemuan pertama kami dimulai dari bangku kuliah, tumbuh dalam persahabatan, dan akhirnya kami memutuskan untuk menyatukan janji suci pernikahan ini selamanya."
      },
      timeline: [
        { time: "08:00 - 09:30", activity: "Akad Nikah / Pemberkatan" },
        { time: "11:00 - 13:00", activity: "Resepsi" }
      ],
      gift: [
        { bank: "BCA", number: "1234567890", name: "Kevin Kusuma" }
      ],
      groomName: "Kevin Kusuma",
      brideName: "Clarissa Wijaya",
      parentsName: "Putra dari Bpk. Kusuma & Ibu Shinta",
      eventStartTime: "10:00 WIB",
      eventEndTime: "16:00 WIB",
      mapLink: "https://maps.google.com",
      storyTitle: "Perjalanan Cinta",
      storyContent: "Kisah asmara indah yang bermula dari pertemuan tak terduga.",
      musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      gifts: [
        { bank: "BCA", number: "1234567890", name: "Kevin Kusuma" }
      ],
      rsvpDeadline: "2026-10-01",
      streamingLink: "https://zoom.us",
      guestBookActive: true
    };
  }

  throw new Error(`Undangan dengan ID "${inviteId}" tidak ditemukan.`);
}

