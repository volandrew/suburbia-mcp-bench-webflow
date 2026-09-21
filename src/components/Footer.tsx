import Link from "next/link";
import React from "react";

import { getAllSkateboards, toSkateboardDocument } from "@/webflow";
import { Logo } from "@/components/Logo";
import { Bounded } from "./Bounded";
import { FooterPhysics } from "./FooterPhysics";

// Same fixed nav as the Header — the reference site's footer mirrors the header.
const NAV = [
  { text: "Team", href: "/#team" },
  { text: "Customizer", href: "/build" },
  { text: "About", href: "/about" },
];

export async function Footer() {
  const skateboards = await getAllSkateboards();
  const boardTextureURLs = skateboards
    .map((item) => toSkateboardDocument(item).data.image?.url)
    .filter((url): url is string => Boolean(url));

  return (
    <footer className="bg-texture bg-zinc-900 text-white overflow-hidden">
      <div className="relative h-[75vh] ~p-10/16 md:aspect-auto">
        <FooterPhysics
          boardTextureURLs={boardTextureURLs}
          className="absolute inset-0 overflow-hidden"
        />
        <Logo className="pointer-events-none relative h-20 mix-blend-exclusion md:h-28" />
      </div>
      <Bounded as="nav">
        <ul className="flex flex-wrap justify-center gap-8 ~text-lg/xl">
          {NAV.map((item) => (
            <li key={item.text} className="hover:underline">
              <Link href={item.href}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </Bounded>
    </footer>
  );
}
