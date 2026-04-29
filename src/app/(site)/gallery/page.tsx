import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { getGalleryItems } from "@/lib/content";

export default async function GalleryPage() {
  const items = await getGalleryItems(true);

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Campus Life"
        title="Gallery"
        body="Photos from the campus, academic programs, ceremonies, and university events."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item._id || item.title} className="group overflow-hidden rounded-lg border border-university-line bg-white shadow-sm">
            {item.image?.url ? (
              <img src={item.image.url} alt={item.image.altText || item.title} className="h-72 w-full object-cover transition duration-300 group-hover:scale-105" />
            ) : (
              <div className="h-72 bg-university-mist" />
            )}
            <div className="p-4">
              <p className="text-sm font-semibold text-university-green">{item.category}</p>
              <h2 className="mt-1 text-lg font-bold text-university-navy">{item.title}</h2>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
