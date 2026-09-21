import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";

/**
 * Props for `PageHeader`.
 */
export type PageHeaderProps = SliceComponentProps<Content.PageHeaderSlice>;

/**
 * Component for "PageHeader" Slices.
 */
const PageHeader: FC<PageHeaderProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy text-white"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <SlideIn>
          <Heading as="h1" size="xl">
            <PrismicText field={slice.primary.heading} />
          </Heading>
        </SlideIn>
        <SlideIn>
          <div className="max-w-2xl text-lg leading-relaxed text-zinc-300">
            <PrismicRichText field={slice.primary.body} />
          </div>
        </SlideIn>
      </div>
      {slice.primary.image.url && (
        <SlideIn>
          <PrismicNextImage
            field={slice.primary.image}
            className="mx-auto mt-12 w-full max-w-4xl rounded-lg object-cover"
          />
        </SlideIn>
      )}
    </Bounded>
  );
};

export default PageHeader;
