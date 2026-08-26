import { SlideLayout } from "./slideLayouts";
import { ThemeColors } from "./theme";

export interface Presentation {
  id: string;
  title: string;
  totalSlides: number;
  slides: Slide[];
  themeColors: ThemeColors | string;
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