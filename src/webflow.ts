/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Data layer for the Webflow-CMS-backed variant of this app.
 *
 * This intentionally keeps using @prismicio/client / @prismicio/react's field-shape
 * types and renderers (RichTextField, LinkField, ImageField, PrismicText,
 * PrismicRichText, PrismicNextImage, PrismicNextLink, SliceZone, isFilled, asImageSrc)
 * as a generic "structured content" renderer layer — they don't require a live
 * connection to Prismic, they just render a well-defined JSON shape. Every function
 * below builds plain objects matching those shapes from data fetched out of Webflow's
 * own CMS (Data API v2), so the slice components under src/slices/* work completely
 * unmodified.
 */

const WEBFLOW_API = "https://api.webflow.com/v2";

const PAGE_SECTIONS_COLLECTION_ID =
  process.env.WEBFLOW_PAGE_SECTIONS_COLLECTION_ID || "6ab126f77424deb85b1615a1";
const SKATEBOARDS_COLLECTION_ID =
  process.env.WEBFLOW_SKATEBOARDS_COLLECTION_ID || "6ab1153ec9b7b1d2579bb333";
const SKATERS_COLLECTION_ID =
  process.env.WEBFLOW_SKATERS_COLLECTION_ID || "6ab1153fc61cb35b552ac7d8";

// Option field id -> display name maps, recorded at field-creation time
// (the write API echoes option ids, not names, in item responses).
const PAGE_OPTIONS: Record<string, string> = {
  a02c772d4f6a6d7bcf1e50f49d383a67: "home",
  "43e19a05cd5fb7ed4bf8970b9fb1a886": "about",
};
const SECTION_TYPE_OPTIONS: Record<string, string> = {
  "82629af6d5ae0f624d9d4a4e6fb21233": "hero",
  "8e5a728cc8d9f1131bbb118eced95f35": "product_grid",
  "6ad7c5772f3da09355ddbb0aef12a2a3": "text_image",
  "461eb4880e15302ae5ff26ca5d81e18e": "video",
  ff18baff64c7d4b9ff70caeb1bb96043: "team",
  "0a591b01ba0c9f3d454f46e0ab2ce7aa": "page_header",
  e6db4159e9ee224ae746dbc38191757e: "stats",
  ec7dc499379db4ab40fdd320fd829793: "gallery",
};
const THEME_OPTIONS: Record<string, string> = {
  "5ef6aff40e2fdd200fa1f6278e1730f7": "Blue",
  "9e031007806781e47548f52c89d5d4dc": "Orange",
  f1841ed0782e67a3f2fbbc19b3d1c986: "Navy",
  "8b85379306cca92110b2088c69b89413": "Lime",
  "7049adb7bd3138eaf18785d58c63af21": "None",
};
const VARIATION_OPTIONS: Record<string, string> = {
  ea688239fbe98fc3448b12f736ffe2a1: "default",
  "00e6946363babb2cdbb9e6cbd682e469": "imageOnLeft",
};

type WebflowImage = { fileId?: string; url: string; alt?: string | null } | null;

type PageSectionItem = {
  id: string;
  fieldData: {
    page: string;
    "section-type": string;
    theme: string | null;
    variation: string | null;
    order: number;
    heading: string | null;
    body: string | null;
    "button-text": string | null;
    "button-link": string | null;
    "image-1": WebflowImage;
    "image-2": WebflowImage;
    "youtube-id": string | null;
  };
};

type SkateboardItem = {
  id: string;
  fieldData: {
    name: string;
    price: number | null;
    "product-image": WebflowImage;
    "customizer-link": string | null;
  };
};

type SkaterItem = {
  id: string;
  fieldData: {
    name: string;
    photo: WebflowImage;
    "customizer-link": string | null;
  };
};

async function webflowFetch<T>(path: string): Promise<T> {
  const token = process.env.WEBFLOW_API_TOKEN;
  if (!token) {
    throw new Error(
      "WEBFLOW_API_TOKEN is not set. This app reads its content from Webflow's CMS Data API and needs a Site API token with cms:read access."
    );
  }

  const res = await fetch(`${WEBFLOW_API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "accept-version": "2.0.0",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Webflow API ${path} failed: ${res.status} ${await res.text()}`);
  }

  return res.json() as Promise<T>;
}

function richText(text: string | null): any {
  if (!text) return [];
  // Body text can hold multiple paragraphs separated by a blank line; a
  // single string field has no other way to express paragraph breaks.
  return text
    .split(/\n\s*\n/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => ({ type: "paragraph", text: t, spans: [] }));
}

function heading1(text: string | null): any {
  if (!text) return [];
  return [{ type: "heading1", text, spans: [] }];
}

function heading2(text: string | null): any {
  if (!text) return [];
  return [{ type: "heading2", text, spans: [] }];
}

function link(url: string | null, text?: string | null): any {
  return {
    link_type: "Web",
    url: url || "#",
    text: text || undefined,
  };
}

function image(img: WebflowImage, alt = ""): any {
  if (!img?.url) return { id: null, url: "", alt, dimensions: null };
  return {
    id: img.fileId || img.url,
    url: img.url,
    alt,
    dimensions: { width: 1200, height: 1200 },
    edit: { zoom: 1, crop: { x: 0, y: 0 }, background: "transparent" },
  };
}

async function getPageSections(page: "home" | "about") {
  const data = await webflowFetch<{ items: PageSectionItem[] }>(
    `/collections/${PAGE_SECTIONS_COLLECTION_ID}/items?limit=100`
  );
  return data.items
    .filter((item) => PAGE_OPTIONS[item.fieldData.page] === page)
    .sort((a, b) => a.fieldData.order - b.fieldData.order);
}

/** Builds a Prismic-shaped slices[] array for the homepage, consumed by <SliceZone>. */
export async function getHomepageSlices() {
  const sections = await getPageSections("home");
  return sections.map((item) => sectionToSlice(item));
}

export async function getAboutSlices() {
  const sections = await getPageSections("about");
  return sections.map((item) => sectionToSlice(item));
}

function sectionToSlice(item: PageSectionItem): any {
  const f = item.fieldData;
  const sectionType = SECTION_TYPE_OPTIONS[f["section-type"]] || f["section-type"];
  const theme = f.theme ? THEME_OPTIONS[f.theme] || f.theme : undefined;
  const variation = f.variation ? VARIATION_OPTIONS[f.variation] || f.variation : "default";

  const base = { id: item.id, slice_label: null };

  switch (sectionType) {
    case "hero":
      return {
        ...base,
        slice_type: "hero",
        variation: "default",
        primary: {
          heading: heading1(f.heading),
          body: richText(f.body),
          button: link(f["button-link"], f["button-text"]),
          skateboard_deck_texture: image(null),
          skateboard_wheel_texture: image(null),
          skateboard_truck_color: null,
          skateboard_bolt_color: null,
        },
        items: [],
      };
    case "product_grid":
      return {
        ...base,
        slice_type: "product_grid",
        variation: "default",
        primary: {
          heading: heading2(f.heading),
          body: richText(f.body),
          product: [], // populated separately from the Skateboards collection
        },
        items: [],
      };
    case "text_image":
      return {
        ...base,
        slice_type: "text_and_image",
        variation,
        primary: {
          theme,
          heading: heading2(f.heading),
          body: richText(f.body),
          button: link(f["button-link"], f["button-text"]),
          background_image: image(f["image-2"], "Paint splatter background"),
          foreground_image: image(f["image-1"], "Skater portrait"),
        },
        items: [],
      };
    case "video":
      return {
        ...base,
        slice_type: "video_block",
        variation: "default",
        primary: { youtube_video_id: f["youtube-id"] },
        items: [],
      };
    case "team":
      return {
        ...base,
        slice_type: "team_grid",
        variation: "default",
        primary: { heading: heading2(f.heading) },
        items: [],
      };
    case "page_header":
      return {
        ...base,
        slice_type: "page_header",
        variation: "default",
        primary: {
          heading: heading1(f.heading),
          body: richText(f.body),
          image: image(f["image-1"], f.heading || ""),
        },
        items: [],
      };
    case "stats": {
      // The flat Page Sections schema has no repeating-group field, so a stats
      // row's {value,label} list is JSON-encoded in the plain-text `body`
      // field instead of a real Webflow group/reference field.
      let items: { value: string; label: string }[] = [];
      try {
        items = f.body ? JSON.parse(f.body) : [];
      } catch {
        items = [];
      }
      return {
        ...base,
        slice_type: "stats",
        variation: "default",
        primary: { heading: heading2(f.heading), items },
        items: [],
      };
    }
    case "gallery": {
      // Same JSON-in-body trick as stats, for the {url,caption} image list.
      let rows: { url: string; caption?: string }[] = [];
      try {
        rows = f.body ? JSON.parse(f.body) : [];
      } catch {
        rows = [];
      }
      return {
        ...base,
        slice_type: "gallery",
        variation: "default",
        primary: {
          heading: heading2(f.heading),
          images: rows.map((row) => ({
            image: image({ url: row.url }, row.caption || ""),
            caption: row.caption || null,
          })),
        },
        items: [],
      };
    }
    default:
      return {
        ...base,
        slice_type: sectionType,
        variation: "default",
        primary: { heading: heading2(f.heading), body: richText(f.body) },
        items: [],
      };
  }
}

/** Fetch every skateboard, Prismic-document-shaped, for ProductGrid's product relationships. */
export async function getAllSkateboards() {
  const data = await webflowFetch<{ items: SkateboardItem[] }>(
    `/collections/${SKATEBOARDS_COLLECTION_ID}/items?limit=100`
  );
  return data.items;
}

export async function getSkateboardById(id: string) {
  const item = await webflowFetch<SkateboardItem>(
    `/collections/${SKATEBOARDS_COLLECTION_ID}/items/${id}`
  );
  return toSkateboardDocument(item);
}

export function toSkateboardDocument(item: SkateboardItem): any {
  const f = item.fieldData;
  return {
    id: item.id,
    data: {
      name: f.name,
      // Webflow's Price field is integer-only (a documented gotcha) — this app
      // divides by 100 to match Prismic's cents-based price field, so whole-dollar
      // Webflow prices render as e.g. $60.00 rather than the reference site's $59.99.
      price: f.price != null ? f.price * 100 : null,
      image: image(f["product-image"], f.name),
      customizer_link: link(f["customizer-link"] || "/build"),
    },
  };
}

/** Fetch every skater, Prismic-document-shaped, for TeamGrid. */
export async function getAllSkaters() {
  const data = await webflowFetch<{ items: SkaterItem[] }>(
    `/collections/${SKATERS_COLLECTION_ID}/items?limit=100`
  );
  return data.items.map((item) => {
    const f = item.fieldData;
    const [first_name, ...rest] = (f.name || "").split(" ");
    const last_name = rest.join(" ");
    return {
      id: item.id,
      data: {
        first_name,
        last_name,
        // The Skaters collection has a single photo field (no separate front/back
        // hover images like the reference site) — reused for both.
        photo_background: image(f.photo, f.name),
        photo_foreground: image(f.photo, f.name),
        customizer_link: link(f["customizer-link"] || "/build"),
      },
    };
  });
}
