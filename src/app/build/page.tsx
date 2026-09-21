/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonLink } from "@/components/ButtonLink";
import { Heading } from "@/components/Heading";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";

import { CustomizerControlsProvider } from "./context";
import { asImageSrc } from "@prismicio/client";
import Controls from "./Controls";
import Loading from "./Loading";

// react-three-fiber's WebGL Canvas has no safe SSR path on Cloudflare Workers
// (the edge runtime lacks the APIs it touches during server render, unlike
// Node.js on Vercel) — force this to client-only rendering.
const Preview = dynamic(() => import("./Preview"), { ssr: false });

type SearchParams = {
  wheel?: string;
  deck?: string;
  truck?: string;
  bolt?: string;
};

function localImage(url: string): any {
  return { id: url, url, alt: "", dimensions: { width: 1200, height: 1200 } };
}

// The reference site models a full catalog of deck/wheel/metal options as
// `board_customizer` singleton content. Modeling that catalog as its own Webflow
// CMS collection was out of scope for this pass — this uses the same local
// texture assets the reference site ships with (public/skateboard/*), just as a
// fixed option set rather than CMS-editable ones. Flagged as a known gap.
const decks = [{ uid: "classic-deck", texture: localImage("/skateboard/Deck.webp") }];
const wheels = [
  { uid: "classic-wheel", texture: localImage("/skateboard/SkateWheel1.png") },
];
const metals = [
  { uid: "steel", color: "#8a8d91" },
  { uid: "black", color: "#1a1a1a" },
];

export default async function Page(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;

  const defaultWheel =
    wheels.find((wheel) => wheel.uid === searchParams.wheel) ?? wheels[0];
  const defaultDeck =
    decks.find((deck) => deck.uid === searchParams.deck) ?? decks[0];
  const defaultTruck =
    metals.find((metal) => metal.uid === searchParams.truck) ?? metals[0];
  const defaultBolt =
    metals.find((metal) => metal.uid === searchParams.bolt) ?? metals[0];

  const wheelTextureURLs = wheels
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));
  const deckTextureURLs = decks
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <CustomizerControlsProvider
        defaultWheel={defaultWheel}
        defaultDeck={defaultDeck}
        defaultTruck={defaultTruck}
        defaultBolt={defaultBolt}
      >
        <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
          <div className="absolute inset-0">
            <Preview
              deckTextureURLs={deckTextureURLs}
              wheelTextureURLs={wheelTextureURLs}
            />
          </div>

          <Link href="/" className="absolute left-6 top-6">
            <Logo className="h-12 text-white" />
          </Link>
        </div>
        <div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
          <Heading as="h1" size="sm" className="mb-6 mt-0">
            Build your board
          </Heading>
          <Controls
            wheels={wheels}
            decks={decks}
            metals={metals}
            className="mb-6"
          />
          <ButtonLink href="" color="lime" icon="plus">
            Add to cart
          </ButtonLink>
        </div>
      </CustomizerControlsProvider>
      <Loading />
    </div>
  );
}
