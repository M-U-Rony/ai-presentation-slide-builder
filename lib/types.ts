import { SlideLayout } from "./slideLayouts";

export interface Presentation {
  id: string;
  title: string;
  totalSlides: number;
  slides: Slide[];
  /** Theme id (see lib/theme.ts). The column is named themeColors for historical reasons. */
  themeColors: string;
  userId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Slide {
  id?: string;
  title: string;
  subtitle?: string;
  slideNumber?: number;
  slidenumber?: number;
  slideLayout?: string | SlideLayout;
  imgUrl?: string;
  presentationId?: string;
  content: string[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}