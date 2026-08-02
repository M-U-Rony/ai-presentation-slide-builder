import SlideCard from "@/components/slidecard";
import { allThemes } from "@/lib/theme";

export default function Slideshow() {
  return (
    <div className="p-8">
      <SlideCard
        theme={allThemes[0]}
        title="Sample Presentation Slide"
        subtitle="This is a preview slide using your selected theme."
      />
    </div>
  );
}