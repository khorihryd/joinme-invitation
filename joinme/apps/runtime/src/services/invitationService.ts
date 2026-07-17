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
      theme: "sample-theme"
    };
  }

  if (inviteId === "xyz789") {
    return {
      eventName: "Sweet 17th Clara Olivia",
      date: "2026-11-20T18:00:00Z",
      location: "Sky Lounge & Bar, Hotel Mulia, Jakarta",
      hostName: "Keluarga Handoko & Clara Olivia",
      theme: "premium-theme"
    };
  }

  throw new Error(`Undangan dengan ID "${inviteId}" tidak ditemukan.`);
}

