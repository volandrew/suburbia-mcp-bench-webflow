"use client";

import dynamic from "next/dynamic";

// react-three-fiber's WebGL Canvas has no safe SSR path on Cloudflare Workers
// (the edge runtime lacks the APIs it touches during server render, unlike
// Node.js on Vercel). next/dynamic's ssr:false is only valid from inside a
// Client Component, so this thin wrapper exists purely to host that call.
const Preview = dynamic(() => import("./Preview"), { ssr: false });

export default Preview;
