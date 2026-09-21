import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText, SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

/**
 * Component for "Gallery" Slices.
 */
const Gallery: FC<GalleryProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.heading.length > 0 && (
        <SlideIn>
          <Heading as="h2" size="lg" className="mb-8 text-center">
            <PrismicText field={slice.primary.heading} />
          </Heading>
        </SlideIn>
      )}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {slice.primary.images.map((item, index) => (
          <SlideIn key={index}>
            <figure className="flex flex-col gap-2">
              <PrismicNextImage
                field={item.image}
                className="aspect-square w-full rounded-lg object-cover"
              />
              {item.caption && (
                <figcaption className="text-sm text-zinc-500">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          </SlideIn>
        ))}
      </div>
    </Bounded>
  );
};

export default Gallery;
