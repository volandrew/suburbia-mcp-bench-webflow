import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { SlideIn } from "@/components/SlideIn";

/**
 * Props for `Stats`.
 */
export type StatsProps = SliceComponentProps<Content.StatsSlice>;

/**
 * Component for "Stats" Slices.
 */
const Stats: FC<StatsProps> = ({ slice }) => {
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
      <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        {slice.primary.items.map((item, index) => (
          <SlideIn key={index}>
            <div className="flex flex-col gap-2">
              <span className="font-sans ~text-4xl/6xl text-brand-lime">
                {item.value}
              </span>
              <span className="text-sm uppercase tracking-wide text-zinc-500">
                {item.label}
              </span>
            </div>
          </SlideIn>
        ))}
      </div>
    </Bounded>
  );
};

export default Stats;
