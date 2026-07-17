export interface StoryData {
  title: string;
  content: string;
}

export interface TimelineItem {
  time: string;
  activity: string;
}

export interface GiftItem {
  bank: string;
  number: string;
  name: string;
}

export interface InvitationData {
  eventName: string;
  date: string;
  location: string;
  hostName: string;
  guestId?: string;
  gallery?: string[];
  story?: StoryData;
  timeline?: TimelineItem[];
  gift?: GiftItem[];
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
