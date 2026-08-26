import { SlideLayout } from "./slideLayouts";
import { ThemeColors } from "./theme";

export interface Presentation {
    id: number | string;
    title: string;
    totalSlides: number;
    slides: Slide[];
    themeColors: ThemeColors | string;
}

export interface Slide {
    id?: number;
    title: string;
    subtitle?: string;
    slideNumber?: number;
    slidenumber?: number;
    slideLayout?: string | SlideLayout;
    imgUrl?: string;
    presentationId?: number;
    content: string[];
}