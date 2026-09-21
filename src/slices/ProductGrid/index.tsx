/* eslint-disable @typescript-eslint/no-explicit-any */
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { SkateboardProduct } from "./SkateboardProduct";
import { SlideIn } from "@/components/SlideIn";
import { toSkateboardDocument } from "@/webflow";

/**
 * Props for `ProductGrid`.
 */
export type ProductGridProps = SliceComponentProps<
  Content.ProductGridSlice,
  { skateboards?: any[] }
>;

/**
 * Component for "ProductGrid" Slices.
 *
 * The `product` relationship field is populated from Webflow's Skateboards
 * collection (passed in via SliceZone's `context`) rather than resolved from a
 * per-slice content-relationship field, since the Page Sections collection models
 * "which products" generically rather than per-homepage-document.
 */
const ProductGrid = ({ slice, context }: ProductGridProps): JSX.Element => {
  const skateboards = context?.skateboards ?? [];

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-gray"
    >
      <SlideIn>
        <Heading className="text-center ~mb-4/6" as="h2">
          <PrismicText field={slice.primary.heading} />
        </Heading>
      </SlideIn>
      <SlideIn>
        <div className="text-center ~mb-6/10">
          <PrismicRichText field={slice.primary.body} />
        </div>
      </SlideIn>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {skateboards.map((item) => (
          <SkateboardProduct
            key={item.id}
            product={toSkateboardDocument(item)}
          />
        ))}
      </div>
    </Bounded>
  );
};

export default ProductGrid;
