import { ThemeColors } from "./theme";

export interface presentation{
    id:string;
    title: string;
    totalSlides: number;
    slides: Slide[];
    themeColors: ThemeColors
}

export interface Slide{
    id: number;
    title: string;
    subtitle: string;
    slidenumber: number;
    content: string[];
}