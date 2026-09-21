import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type AboutDocumentDataSlicesSlice = PageHeaderSlice | TextAndImageSlice | StatsSlice | TeamGridSlice | GallerySlice

/**
 * Content for About documents
 */
interface AboutDocumentData {
	/**
	 * Slice Zone field in *About*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<AboutDocumentDataSlicesSlice>;/**
	 * Meta Title field in *About*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: about.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *About*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: about.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *About*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * About document from Prismic
 *
 * - **API ID**: `about`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AboutDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<AboutDocumentData>, "about", Lang>;

/**
 * Item in *Board Customizer → Wheels*
 */
export interface BoardCustomizerDocumentDataWheelsItem {
	/**
	 * Texture field in *Board Customizer → Wheels*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: board_customizer.wheels[].texture
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	texture: prismic.ImageField<never>;
	
	/**
	 * UID field in *Board Customizer → Wheels*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: board_customizer.wheels[].uid
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	uid: prismic.KeyTextField;
}

/**
 * Item in *Board Customizer → Decks*
 */
export interface BoardCustomizerDocumentDataDecksItem {
	/**
	 * Texture field in *Board Customizer → Decks*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: board_customizer.decks[].texture
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	texture: prismic.ImageField<never>;
	
	/**
	 * UID field in *Board Customizer → Decks*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: board_customizer.decks[].uid
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	uid: prismic.KeyTextField;
}

/**
 * Item in *Board Customizer → Metals*
 */
export interface BoardCustomizerDocumentDataMetalsItem {
	/**
	 * Color field in *Board Customizer → Metals*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: board_customizer.metals[].color
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	color: prismic.ColorField;
	
	/**
	 * UID field in *Board Customizer → Metals*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: board_customizer.metals[].uid
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	uid: prismic.KeyTextField;
}

/**
 * Content for Board Customizer documents
 */
interface BoardCustomizerDocumentData {
	/**
	 * Wheels field in *Board Customizer*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: board_customizer.wheels[]
	 * - **Tab**: Wheels
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	wheels: prismic.GroupField<Simplify<BoardCustomizerDocumentDataWheelsItem>>;/**
	 * Decks field in *Board Customizer*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: board_customizer.decks[]
	 * - **Tab**: Decks
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	decks: prismic.GroupField<Simplify<BoardCustomizerDocumentDataDecksItem>>;/**
	 * Metals field in *Board Customizer*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: board_customizer.metals[]
	 * - **Tab**: Metals
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	metals: prismic.GroupField<Simplify<BoardCustomizerDocumentDataMetalsItem>>;
}

/**
 * Board Customizer document from Prismic
 *
 * - **API ID**: `board_customizer`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BoardCustomizerDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<BoardCustomizerDocumentData>, "board_customizer", Lang>;

type HomepageDocumentDataSlicesSlice = TeamGridSlice | VideoBlockSlice | TextAndImageSlice | ProductGridSlice | HeroSlice

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
	/**
	 * Slice Zone field in *Homepage*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: homepage.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: homepage.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Homepage*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomepageDocumentData>, "homepage", Lang>;

/**
 * Item in *Settings → Navigation*
 */
export interface SettingsDocumentDataNavigationItem {
	/**
	 * Link field in *Settings → Navigation*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.navigation[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *Settings → Footer Skateboards*
 */
export interface SettingsDocumentDataFooterSkateboardsItem {
	/**
	 * Skateboard field in *Settings → Footer Skateboards*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.footer_skateboards[].skateboard
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	skateboard: prismic.ImageField<never>;
}

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
	/**
	 * Site Title field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.site_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	site_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.meta_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Fallback OG Image field in *Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.fallback_og_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	fallback_og_image: prismic.ImageField<never>;
	
	/**
	 * Navigation field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.navigation[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	navigation: prismic.GroupField<Simplify<SettingsDocumentDataNavigationItem>>;
	
	/**
	 * Footer Image field in *Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.footer_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	footer_image: prismic.ImageField<never>;
	
	/**
	 * Footer Skateboards field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.footer_skateboards[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	footer_skateboards: prismic.GroupField<Simplify<SettingsDocumentDataFooterSkateboardsItem>>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SettingsDocumentData>, "settings", Lang>;

/**
 * Content for Skateboard documents
 */
interface SkateboardDocumentData {
	/**
	 * Name field in *Skateboard*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: skateboard.name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Image field in *Skateboard*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: skateboard.image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Price (cents) field in *Skateboard*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: skateboard.price
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	price: prismic.NumberField;
	
	/**
	 * Customizer Link field in *Skateboard*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: skateboard.customizer_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	customizer_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Skateboard document from Prismic
 *
 * - **API ID**: `skateboard`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SkateboardDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<SkateboardDocumentData>, "skateboard", Lang>;

/**
 * Content for Skater documents
 */
interface SkaterDocumentData {
	/**
	 * First Name field in *Skater*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: skater.first_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	first_name: prismic.KeyTextField;
	
	/**
	 * Last Name field in *Skater*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: skater.last_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	last_name: prismic.KeyTextField;
	
	/**
	 * Photo Background field in *Skater*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: skater.photo_background
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo_background: prismic.ImageField<never>;
	
	/**
	 * Photo Foreground field in *Skater*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: skater.photo_foreground
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo_foreground: prismic.ImageField<never>;
	
	/**
	 * Customizer Link field in *Skater*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: skater.customizer_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	customizer_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Skater document from Prismic
 *
 * - **API ID**: `skater`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SkaterDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<SkaterDocumentData>, "skater", Lang>;

export type AllDocumentTypes = AboutDocument | BoardCustomizerDocument | HomepageDocument | SettingsDocument | SkateboardDocument | SkaterDocument;

/**
 * Item in *Gallery → Default → Primary → Images*
 */
export interface GallerySliceDefaultPrimaryImagesItem {
	/**
	 * Image field in *Gallery → Default → Primary → Images*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gallery.default.primary.images[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Caption field in *Gallery → Default → Primary → Images*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Optional caption
	 * - **API ID Path**: gallery.default.primary.images[].caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
}

/**
 * Primary content in *Gallery → Default → Primary*
 */
export interface GallerySliceDefaultPrimary {
	/**
	 * Heading field in *Gallery → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gallery.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Images field in *Gallery → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gallery.default.primary.images[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	images: prismic.GroupField<Simplify<GallerySliceDefaultPrimaryImagesItem>>;
}

/**
 * Default variation for Gallery Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GallerySliceDefault = prismic.SharedSliceVariation<"default", Simplify<GallerySliceDefaultPrimary>, never>;

/**
 * Slice variation for *Gallery*
 */
type GallerySliceVariation = GallerySliceDefault

/**
 * Gallery Shared Slice
 *
 * - **API ID**: `gallery`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GallerySlice = prismic.SharedSlice<"gallery", GallerySliceVariation>;

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Heading field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Button field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Skateboard Deck Texture field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.skateboard_deck_texture
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	skateboard_deck_texture: prismic.ImageField<never>;
	
	/**
	 * Skateboard Wheel Texture field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.skateboard_wheel_texture
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	skateboard_wheel_texture: prismic.ImageField<never>;
	
	/**
	 * Skateboard Truck Color field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.skateboard_truck_color
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	skateboard_truck_color: prismic.ColorField;
	
	/**
	 * Skateboard Bolt Color field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.skateboard_bolt_color
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	skateboard_bolt_color: prismic.ColorField;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Primary content in *PageHeader → Default → Primary*
 */
export interface PageHeaderSliceDefaultPrimary {
	/**
	 * Heading field in *PageHeader → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page_header.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *PageHeader → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page_header.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Image field in *PageHeader → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page_header.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Default variation for PageHeader Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PageHeaderSliceDefault = prismic.SharedSliceVariation<"default", Simplify<PageHeaderSliceDefaultPrimary>, never>;

/**
 * Slice variation for *PageHeader*
 */
type PageHeaderSliceVariation = PageHeaderSliceDefault

/**
 * PageHeader Shared Slice
 *
 * - **API ID**: `page_header`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PageHeaderSlice = prismic.SharedSlice<"page_header", PageHeaderSliceVariation>;

/**
 * Item in *ProductGrid → Default → Primary → Product*
 */
export interface ProductGridSliceDefaultPrimaryProductItem {
	/**
	 * Skateboard field in *ProductGrid → Default → Primary → Product*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: product_grid.default.primary.product[].skateboard
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	skateboard: prismic.ContentRelationshipField<"skateboard">;
}

/**
 * Primary content in *ProductGrid → Default → Primary*
 */
export interface ProductGridSliceDefaultPrimary {
	/**
	 * Heading field in *ProductGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: product_grid.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *ProductGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: product_grid.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Product field in *ProductGrid → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: product_grid.default.primary.product[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	product: prismic.GroupField<Simplify<ProductGridSliceDefaultPrimaryProductItem>>;
}

/**
 * Default variation for ProductGrid Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ProductGridSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ProductGridSliceDefaultPrimary>, never>;

/**
 * Slice variation for *ProductGrid*
 */
type ProductGridSliceVariation = ProductGridSliceDefault

/**
 * ProductGrid Shared Slice
 *
 * - **API ID**: `product_grid`
 * - **Description**: ProductGrid
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ProductGridSlice = prismic.SharedSlice<"product_grid", ProductGridSliceVariation>;

/**
 * Item in *Stats → Default → Primary → Stats*
 */
export interface StatsSliceDefaultPrimaryItemsItem {
	/**
	 * Value field in *Stats → Default → Primary → Stats*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats.default.primary.items[].value
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	value: prismic.KeyTextField;
	
	/**
	 * Label field in *Stats → Default → Primary → Stats*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats.default.primary.items[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
}

/**
 * Primary content in *Stats → Default → Primary*
 */
export interface StatsSliceDefaultPrimary {
	/**
	 * Heading field in *Stats → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Stats field in *Stats → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats.default.primary.items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	items: prismic.GroupField<Simplify<StatsSliceDefaultPrimaryItemsItem>>;
}

/**
 * Default variation for Stats Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type StatsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<StatsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Stats*
 */
type StatsSliceVariation = StatsSliceDefault

/**
 * Stats Shared Slice
 *
 * - **API ID**: `stats`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type StatsSlice = prismic.SharedSlice<"stats", StatsSliceVariation>;

/**
 * Primary content in *TeamGrid → Default → Primary*
 */
export interface TeamGridSliceDefaultPrimary {
	/**
	 * Heading field in *TeamGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team_grid.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
}

/**
 * Default variation for TeamGrid Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TeamGridSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TeamGridSliceDefaultPrimary>, never>;

/**
 * Slice variation for *TeamGrid*
 */
type TeamGridSliceVariation = TeamGridSliceDefault

/**
 * TeamGrid Shared Slice
 *
 * - **API ID**: `team_grid`
 * - **Description**: TeamGrid
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TeamGridSlice = prismic.SharedSlice<"team_grid", TeamGridSliceVariation>;

/**
 * Primary content in *TextAndImage → Default → Primary*
 */
export interface TextAndImageSliceDefaultPrimary {
	/**
	 * Theme field in *TextAndImage → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_and_image.default.primary.theme
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	theme: prismic.SelectField<"Blue" | "Orange" | "Navy" | "Lime">;
	
	/**
	 * Heading field in *TextAndImage → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_and_image.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *TextAndImage → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_and_image.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Button field in *TextAndImage → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_and_image.default.primary.button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Background Image field in *TextAndImage → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_and_image.default.primary.background_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	background_image: prismic.ImageField<never>;
	
	/**
	 * Foreground Image field in *TextAndImage → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_and_image.default.primary.foreground_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	foreground_image: prismic.ImageField<never>;
}

/**
 * Default variation for TextAndImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextAndImageSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TextAndImageSliceDefaultPrimary>, never>;

/**
 * Primary content in *TextAndImage → Image on Left → Primary*
 */
export interface TextAndImageSliceImageOnLeftPrimary {
	/**
	 * Theme field in *TextAndImage → Image on Left → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_and_image.imageOnLeft.primary.theme
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	theme: prismic.SelectField<"Blue" | "Orange" | "Navy" | "Lime">;
	
	/**
	 * Heading field in *TextAndImage → Image on Left → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_and_image.imageOnLeft.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *TextAndImage → Image on Left → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_and_image.imageOnLeft.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Button field in *TextAndImage → Image on Left → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_and_image.imageOnLeft.primary.button
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Background Image field in *TextAndImage → Image on Left → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_and_image.imageOnLeft.primary.background_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	background_image: prismic.ImageField<never>;
	
	/**
	 * Foreground Image field in *TextAndImage → Image on Left → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_and_image.imageOnLeft.primary.foreground_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	foreground_image: prismic.ImageField<never>;
}

/**
 * Image on Left variation for TextAndImage Slice
 *
 * - **API ID**: `imageOnLeft`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextAndImageSliceImageOnLeft = prismic.SharedSliceVariation<"imageOnLeft", Simplify<TextAndImageSliceImageOnLeftPrimary>, never>;

/**
 * Slice variation for *TextAndImage*
 */
type TextAndImageSliceVariation = TextAndImageSliceDefault | TextAndImageSliceImageOnLeft

/**
 * TextAndImage Shared Slice
 *
 * - **API ID**: `text_and_image`
 * - **Description**: TextAndImage
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextAndImageSlice = prismic.SharedSlice<"text_and_image", TextAndImageSliceVariation>;

/**
 * Primary content in *VideoBlock → Default → Primary*
 */
export interface VideoBlockSliceDefaultPrimary {
	/**
	 * YouTube Video ID field in *VideoBlock → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: video_block.default.primary.youtube_video_id
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	youtube_video_id: prismic.KeyTextField;
}

/**
 * Default variation for VideoBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type VideoBlockSliceDefault = prismic.SharedSliceVariation<"default", Simplify<VideoBlockSliceDefaultPrimary>, never>;

/**
 * Slice variation for *VideoBlock*
 */
type VideoBlockSliceVariation = VideoBlockSliceDefault

/**
 * VideoBlock Shared Slice
 *
 * - **API ID**: `video_block`
 * - **Description**: VideoBlock
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type VideoBlockSlice = prismic.SharedSlice<"video_block", VideoBlockSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			AboutDocument,
			AboutDocumentData,
			AboutDocumentDataSlicesSlice,
			BoardCustomizerDocument,
			BoardCustomizerDocumentData,
			BoardCustomizerDocumentDataWheelsItem,
			BoardCustomizerDocumentDataDecksItem,
			BoardCustomizerDocumentDataMetalsItem,
			HomepageDocument,
			HomepageDocumentData,
			HomepageDocumentDataSlicesSlice,
			SettingsDocument,
			SettingsDocumentData,
			SettingsDocumentDataNavigationItem,
			SettingsDocumentDataFooterSkateboardsItem,
			SkateboardDocument,
			SkateboardDocumentData,
			SkaterDocument,
			SkaterDocumentData,
			AllDocumentTypes,
			GallerySlice,
			GallerySliceDefaultPrimaryImagesItem,
			GallerySliceDefaultPrimary,
			GallerySliceVariation,
			GallerySliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			PageHeaderSlice,
			PageHeaderSliceDefaultPrimary,
			PageHeaderSliceVariation,
			PageHeaderSliceDefault,
			ProductGridSlice,
			ProductGridSliceDefaultPrimaryProductItem,
			ProductGridSliceDefaultPrimary,
			ProductGridSliceVariation,
			ProductGridSliceDefault,
			StatsSlice,
			StatsSliceDefaultPrimaryItemsItem,
			StatsSliceDefaultPrimary,
			StatsSliceVariation,
			StatsSliceDefault,
			TeamGridSlice,
			TeamGridSliceDefaultPrimary,
			TeamGridSliceVariation,
			TeamGridSliceDefault,
			TextAndImageSlice,
			TextAndImageSliceDefaultPrimary,
			TextAndImageSliceImageOnLeftPrimary,
			TextAndImageSliceVariation,
			TextAndImageSliceDefault,
			TextAndImageSliceImageOnLeft,
			VideoBlockSlice,
			VideoBlockSliceDefaultPrimary,
			VideoBlockSliceVariation,
			VideoBlockSliceDefault
		}
	}
}