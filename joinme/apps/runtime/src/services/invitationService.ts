import { InvitationData } from "@joinme/theme-sdk";

export async function fetchInvitation(inviteId: string): Promise<InvitationData> {
  // Simulate network latency of 800ms
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (inviteId === "abc123") {
    return {
      eventName: "Pernikahan Budi & Ani",
      date: "2026-10-10T10:00:00Z",
      location: "Gedung Serbaguna, Jakarta",
      hostName: "Keluarga Besar Budi & Ani"
    };
  }

  if (inviteId === "xyz789") {
    return {
      eventName: "Sweet 17th Clara Olivia",
      date: "2026-11-20T18:00:00Z",
      location: "Sky Lounge & Bar, Hotel Mulia, Jakarta",
      hostName: "Keluarga Handoko & Clara Olivia"
    };
  }

  throw new Error(`Undangan dengan ID "${inviteId}" tidak ditemukan.`);
}
