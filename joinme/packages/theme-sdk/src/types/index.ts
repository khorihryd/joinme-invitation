export interface InvitationData {
  eventName: string;
  date: string;
  location: string;
  hostName: string;
  guestId?: string;
}

export interface Guest {
  id: string;
  name: string;
  isAttending: boolean;
  plusOne: boolean;
}

export interface RsvpPayload {
  guestId: string;
  isAttending: boolean;
  plusOneCount: number;
  message?: string;
}
