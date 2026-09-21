/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { SliceComponentProps, SliceZone } from "@prismicio/react";

import { getAllSkateboards, getHomepageSlices } from "@/webflow";
import { components } from "@/slices";

export default async function Page() {
  const slices = bundleTextAndImageSlices(await getHomepageSlices());
  const skateboards = await getAllSkateboards();

  return (
    <SliceZone
      slices={slices}
      context={{ skateboards }}
      components={{
        ...components,
        text_and_image_bundle: ({
          slice,
        }: SliceComponentProps<TextAndImageBundleSlice>) => (
          <div>
            <SliceZone
              slices={slice.slices}
              components={components}
              context={{ skateboards }}
            />
          </div>
        ),
      }}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Suburbia Skateboards",
    description: "The best skateboards",
  };
}

type TextAndImageBundleSlice = {
  id: string;
  slice_type: "text_and_image_bundle";
  slices: any[];
};

function bundleTextAndImageSlices(slices: any[]) {
  const res: (any | TextAndImageBundleSlice)[] = [];

  for (const slice of slices) {
    if (slice.slice_type !== "text_and_image") {
      res.push(slice);
      continue;
    }

    const bundle = res.at(-1);
    if (bundle?.slice_type === "text_and_image_bundle") {
      bundle.slices.push(slice);
    } else {
      res.push({
        id: `${slice.id}-bundle`,
        slice_type: "text_and_image_bundle",
        slices: [slice],
      });
    }
  }
  return res;
}
