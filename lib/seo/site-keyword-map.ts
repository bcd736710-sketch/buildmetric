export const siteUrl = "https://buildmetriccalc.com";

export type RelatedGuide = {
  href: string;
  label: string;
};

export type CategorySeoProfile = {
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  description: string;
  h1: string;
  introduction: string;
  cardDescription: string;
  imageAlt: string;
  relatedGuide: RelatedGuide;
};

export type ProductSeoProfile = {
  primaryKeyword: string;
  secondaryKeywords: string[];
  scenarioKeywords: string[];
  b2bKeywords: string[];
  title: string;
  description: string;
  h1: string;
  shortDescription: string;
  overview: string[];
  commercialCopy: string[];
  imageAlt: string;
  relatedGuide: RelatedGuide;
};

export const homeSeo = {
  primaryKeyword: "pet outdoor and travel products supplier",
  secondaryKeywords: [
    "pet travel accessories",
    "pet outdoor accessories",
    "wholesale pet travel products",
    "custom pet products",
  ],
  title: "Pet Outdoor & Travel Products for B2B Buyers | TROVANE",
  description:
    "Source pet outdoor and travel products for brands, retailers, distributors and importers. Explore wholesale supply and verified customization options.",
} as const;

export const categorySeoBySlug: Record<string, CategorySeoProfile> = {
  "travel-car": {
    primaryKeyword: "pet travel and car accessories",
    secondaryKeywords: [
      "pet travel products",
      "dog car travel accessories",
      "cat travel accessories",
    ],
    title: "Pet Travel & Car Accessories for B2B Buyers | TROVANE",
    description:
      "Explore pet travel and car accessories for retailers, brands and distributors, including carriers, restraints and portable cat care products. Request a quote.",
    h1: "Pet Travel & Car Products",
    introduction:
      "This collection brings together products for road trips, daily vehicle travel and temporary stays away from home. The current range includes a pet carrier backpack, car seat tether, dog car window guard and foldable cat litter box. It is intended for overseas pet retailers, brands, distributors and importers building practical travel assortments. Product dimensions, materials and available options are shown on each detail page. Branding, packaging and order requirements should be confirmed against the exact model before sampling or quotation.",
    cardDescription:
      "Carriers, restraints, car-safety accessories and portable cat care products for travel assortments.",
    imageAlt: "Pet travel and car accessories for road trips",
    relatedGuide: {
      href: "/blog/pet-travel-accessories-wholesale-buying-guide",
      label: "pet travel accessories buying guide",
    },
  },
  "outdoor-feeding": {
    primaryKeyword: "outdoor pet feeding products",
    secondaryKeywords: [
      "pet travel water bottles",
      "portable pet hydration products",
      "dog travel feeding accessories",
    ],
    title: "Outdoor Pet Feeding Products for B2B Buyers | TROVANE",
    description:
      "Compare outdoor pet feeding products for travel, walks and hiking. Review portable hydration designs and sourcing options for retail pet ranges.",
    h1: "Outdoor Pet Feeding Products",
    introduction:
      "Outdoor feeding products need to be easy to carry, simple to clean and clear about how the pet drinks or feeds from them. TROVANE’s published range currently focuses on portable pet water bottles with foldable bowl designs for walking, hiking and travel. Retailers, distributors and brand teams can compare the two models by material, dimensions, bowl structure and colour options. Any branding, packaging or bulk-order requirement should be checked for the selected model rather than assumed across the whole category.",
    cardDescription:
      "Portable hydration products with foldable bowl formats for pet walks, hiking and travel.",
    imageAlt: "Portable pet hydration products for walking and travel",
    relatedGuide: {
      href: "/blog/pet-travel-water-bottle-retail-selection",
      label: "pet travel water bottle retail guide",
    },
  },
  "walking-hiking": {
    primaryKeyword: "dog walking accessories",
    secondaryKeywords: [
      "dog hiking accessories",
      "outdoor dog walking products",
      "retractable dog leashes",
    ],
    title: "Dog Walking & Hiking Accessories for B2B Buyers | TROVANE",
    description:
      "Review dog walking and hiking accessories for retail ranges, including retractable leash controls, materials and model-specific sourcing details.",
    h1: "Dog Walking & Hiking Accessories",
    introduction:
      "Walking products should be evaluated around control, handling comfort and the environment in which customers will use them. The currently published range in this category centres on an automatic retractable dog leash for daily walks, parks and outdoor activity. Buyers can review the casing material, nylon webbing, hardware, dimensions, brake-and-lock control and available colours on the product page. Confirm the exact leash length, intended pet-size range and any branding or packaging requirement before creating retail claims or placing an order.",
    cardDescription:
      "Walking accessories selected around control, handling comfort and practical outdoor use.",
    imageAlt: "Dog walking and hiking accessories for outdoor use",
    relatedGuide: {
      href: "/blog/retractable-dog-leash-buyer-checklist",
      label: "retractable dog leash buyer checklist",
    },
  },
};

export const productSeoByPath: Record<string, ProductSeoProfile> = {
  "travel-car/portable-pet-carrier-backpack": {
    primaryKeyword: "portable pet carrier backpack",
    secondaryKeywords: [
      "pet carrier backpack for cats",
      "small dog carrier backpack",
      "breathable pet travel carrier",
    ],
    scenarioKeywords: ["pet carrier for outdoor travel", "pet backpack for road trips"],
    b2bKeywords: ["pet carrier backpack wholesale", "custom pet carrier backpack"],
    title: "Portable Pet Carrier Backpack for B2B Buyers | TROVANE",
    description:
      "Source a portable pet carrier backpack for cats and small dogs, with breathable mesh and branding options for retailers and distributors. Request a quote.",
    h1: "Portable Pet Carrier Backpack for Cats & Small Dogs",
    shortDescription:
      "A portable pet carrier backpack for cats and small dogs, made with Oxford fabric, breathable mesh and a soft fleece pad. The reinforced structure, adjustable shoulder straps and foldable design suit outdoor travel ranges for pet retailers, brands and distributors.",
    overview: [
      "This portable pet carrier backpack provides a ventilated carrying format for cats and small dogs. Its published construction combines Oxford fabric, breathable mesh and a soft fleece pad, with reinforced stitching and durable hardware.",
      "The backpack is intended for outdoor travel and everyday carrying. Adjustable shoulder straps and a sturdy top handle support different carrying moments, while the foldable structure helps with storage when the carrier is not in use.",
      "Buyers should confirm the 40 × 25 × 36 cm dimensions and approximate 1.25 kg product weight against their intended pet-size range, retail positioning and packaging plan before approving a sample.",
    ],
    commercialCopy: [
      "This model is relevant to pet brands, retailers and distributors planning a portable carrier range. Published options include multiple colours, adjustable shoulder straps, a removable soft mat option, custom logo printing and custom packaging.",
      "Confirm the exact option set, branding method and pack specification for the quoted model. The sample should be reviewed for ventilation, structure, carrying comfort and pet fit before bulk ordering.",
    ],
    imageAlt: "portable pet carrier backpack for cats and small dogs",
    relatedGuide: {
      href: "/blog/pet-travel-carrier-buying-considerations",
      label: "pet travel carrier buying guide",
    },
  },
  "travel-car/dual-use-pet-car-seat-tether": {
    primaryKeyword: "pet car seat tether",
    secondaryKeywords: [
      "adjustable dog car tether",
      "dual-use dog seat belt tether",
      "pet car restraint tether",
    ],
    scenarioKeywords: ["dog tether for car travel", "pet restraint for road trips"],
    b2bKeywords: ["pet car seat tether wholesale", "custom dog car tether"],
    title: "Pet Car Seat Tether | Wholesale & Custom | TROVANE",
    description:
      "Source an adjustable pet car seat tether with headrest and seat-buckle attachment options. Branding and packaging support for B2B buyers. Request a quote.",
    h1: "Dual-Use Pet Car Seat Tether",
    shortDescription:
      "An adjustable pet car seat tether with headrest and seat-buckle attachment options for dog travel. Nylon webbing, reinforced stitching, a swivel hook and an elastic section support practical car-accessory programs for retailers, brands and distributors.",
    overview: [
      "This dual-use pet car seat tether is designed to help keep a dog positioned during vehicle travel while allowing a practical range of movement. It uses nylon webbing, reinforced stitching, an aluminum alloy hook and a plastic buckle.",
      "The dual-use version supports headrest and seat-buckle attachment, while a single seat-buckle version is also listed. Adjustable length and an elastic shock-absorbing section make the model relevant to daily driving and road-trip assortments.",
      "Buyers should match the attachment style and stated adjustment range to the exact sample, intended vehicle use and customer instructions before approving product claims.",
    ],
    commercialCopy: [
      "The published options cover dual-use and single-buckle configurations, black, pink or custom colours, custom logo printing and custom packaging. These options make the tether suitable for car-travel programs planned by pet brands, retailers and distributors.",
      "Confirm the selected attachment style, colour, branding and packaging in the quotation. Sample review should include buckle fit, adjustment, stitching, hook movement and the elastic section.",
    ],
    imageAlt: "adjustable dual-use pet car seat tether",
    relatedGuide: {
      href: "/blog/pet-car-seat-tether-buyer-checklist",
      label: "pet car seat tether buyer checklist",
    },
  },
  "walking-hiking/automatic-retractable-dog-leash": {
    primaryKeyword: "retractable dog leash",
    secondaryKeywords: [
      "automatic dog leash",
      "retractable leash with brake and lock",
      "outdoor dog walking leash",
    ],
    scenarioKeywords: ["retractable leash for daily walking", "dog leash for park walks"],
    b2bKeywords: ["retractable dog leash wholesale", "custom retractable dog leash"],
    title: "Retractable Dog Leash for B2B Buyers | TROVANE",
    description:
      "Source an automatic retractable dog leash with nylon webbing, alloy hardware and one-button brake-and-lock control. Discuss colour and order requirements.",
    h1: "Automatic Retractable Dog Leash",
    shortDescription:
      "An automatic retractable dog leash for daily walks, parks and outdoor use. The model combines an ABS casing, nylon webbing, alloy hardware, a one-button brake-and-lock control and a soft-touch ergonomic grip for practical retail walking ranges.",
    overview: [
      "This automatic retractable dog leash is designed for everyday walking and outdoor activity. Its published construction combines an ABS casing, nylon webbing and alloy hardware with a one-button brake-and-lock control.",
      "The compact body measures 13.5 × 9.9 × 3.9 cm and uses a soft-touch ergonomic grip. The public product data references both 3 m and 5 m length options, so the exact length must be confirmed for the selected model.",
      "Retailers, importers and distributors should also verify the intended pet-size range before listing the leash, because no weight rating is currently published.",
    ],
    commercialCopy: [
      "The published colour options include yellow-green, orange and green, with custom colours discussed for bulk orders. Buyers can also discuss branding and packaging requirements for the exact model.",
      "Before ordering, confirm leash length, intended pet-size range, colour and packaging in one specification. Repeated extension, retraction, braking and locking should form part of sample evaluation.",
    ],
    imageAlt: "automatic retractable dog leash for outdoor walking",
    relatedGuide: {
      href: "/blog/retractable-dog-leash-buyer-checklist",
      label: "retractable dog leash buyer checklist",
    },
  },
  "outdoor-feeding/portable-pet-water-bottle-foldable-silicone-bowl": {
    primaryKeyword: "pet water bottle with silicone bowl",
    secondaryKeywords: [
      "portable pet water bottle",
      "dog water bottle with foldable bowl",
      "pet travel hydration bottle",
    ],
    scenarioKeywords: ["pet water bottle for walks", "dog water bottle for travel"],
    b2bKeywords: ["pet water bottle wholesale", "custom pet travel water bottle"],
    title: "Pet Water Bottle with Silicone Bowl | TROVANE",
    description:
      "Source a compact pet water bottle with a foldable silicone drinking bowl for walks and travel. Compare colour and order options for retail pet ranges.",
    h1: "Portable Pet Water Bottle with Silicone Drinking Bowl",
    shortDescription:
      "A compact portable pet water bottle with a foldable silicone drinking bowl for dogs and cats. The 15.5 × 7.5 cm format is intended for walks, hiking, camping and travel, with green and pink listed as available colours.",
    overview: [
      "This portable pet water bottle combines a water container with a soft foldable silicone drinking bowl. The compact format gives dogs and cats a direct drinking surface during walks and travel.",
      "Its published use cases include walking, hiking, camping and pet travel. The product is listed at 15.5 × 7.5 cm, with a soft-touch silicone surface and green or pink colour options.",
      "Buyers should evaluate how the bowl opens, how the bottle is carried and how each part is cleaned and dried. Any branding, packaging or order option should be confirmed for this exact model.",
    ],
    commercialCopy: [
      "This compact model can support pet retailers and distributors building portable hydration ranges. The published colour options are green and pink; other commercial requirements should be checked against the quotation.",
      "Confirm colour, branding, packaging and sample configuration before bulk ordering. Product evaluation should cover portability, drinking access, cleaning and storage after use.",
    ],
    imageAlt: "portable pet water bottle with foldable silicone drinking bowl",
    relatedGuide: {
      href: "/blog/pet-travel-water-bottle-retail-selection",
      label: "pet travel water bottle retail guide",
    },
  },
  "outdoor-feeding/portable-pet-water-bottle-foldable-feeding-bowl": {
    primaryKeyword: "2-in-1 pet water bottle",
    secondaryKeywords: [
      "pet water bottle with feeding bowl",
      "portable dog water bottle",
      "foldable bowl water bottle",
    ],
    scenarioKeywords: ["2-in-1 pet bottle for hiking", "portable dog water bottle for travel"],
    b2bKeywords: ["2-in-1 pet water bottle wholesale", "custom pet water bottle"],
    title: "2-in-1 Pet Water Bottle | Wholesale & Custom | TROVANE",
    description:
      "Source a 2-in-1 pet water bottle with a foldable feeding bowl for walking, hiking and travel. Colour, packaging and private-label options are available.",
    h1: "2-in-1 Pet Water Bottle with Foldable Feeding Bowl",
    shortDescription:
      "A 2-in-1 pet water bottle with an integrated foldable feeding bowl for dogs and cats. The 28.5 × 7.5 cm plastic design supports hydration during walking, hiking, camping and travel, with colour and customization options for B2B programs.",
    overview: [
      "This 2-in-1 pet water bottle combines a water container and foldable feeding bowl in one portable design. The integrated bowl gives dogs and cats a practical drinking surface away from home.",
      "The product measures 28.5 × 7.5 cm and is made with durable plastic and a soft silicone bowl. It is intended for walking, hiking, camping and travel use.",
      "For retail selection, buyers should compare the larger format with the compact silicone-bowl model and confirm how customers will carry, clean and store it. The right choice depends on trip length and portability expectations.",
    ],
    commercialCopy: [
      "Published options include pink, green and customized colours. The product page also confirms OEM and ODM support for colour, packaging and private-label requirements for bulk programs.",
      "Confirm the colour, branding method, packaging and exact sample before ordering. Avoid applying these options to another water-bottle model without separate confirmation.",
    ],
    imageAlt: "2-in-1 pet water bottle with foldable feeding bowl",
    relatedGuide: {
      href: "/blog/pet-travel-water-bottle-retail-selection",
      label: "pet travel water bottle retail guide",
    },
  },
  "travel-car/foldable-travel-cat-litter-box": {
    primaryKeyword: "foldable travel cat litter box",
    secondaryKeywords: [
      "portable cat litter box",
      "cat litter box for road trips",
      "travel litter box for hotels",
    ],
    scenarioKeywords: ["cat litter box for travel", "temporary cat litter box"],
    b2bKeywords: ["travel cat litter box wholesale", "private label cat litter box"],
    title: "Foldable Travel Cat Litter Box for B2B Buyers | TROVANE",
    description:
      "Source a foldable travel cat litter box for road trips, hotels and temporary home use. Review waterproof PP construction and private-label options.",
    h1: "Foldable Travel Cat Litter Box",
    shortDescription:
      "A foldable travel cat litter box for road trips, hotel stays, camping and temporary home use. The 50 × 37 × 19 cm waterproof PP structure offers a portable cat-care format for pet brands, retailers and distributors.",
    overview: [
      "This foldable travel cat litter box provides a portable litter area for road trips, hotel stays, camping, picnics and temporary use at home. It is intended for situations where a cat is away from its normal litter setup or extra capacity is needed.",
      "The box is made from waterproof PP and measures 50 × 37 × 19 cm when open. Its foldable construction supports transport and storage, while the material is intended to simplify routine cleaning.",
      "Buyers should confirm folded dimensions, packed weight and sample stability before making portability claims, because those details are not currently published on the product page.",
    ],
    commercialCopy: [
      "The published options include a standard white version, custom packaging on request and OEM or private-label support. The model is relevant to pet travel, temporary-care and emergency-use assortments.",
      "Confirm packaging, branding and bulk-order requirements for the exact model. Sample review should cover open dimensions, folded storage, stability, containment and cleaning.",
    ],
    imageAlt: "foldable travel cat litter box for road trips and hotels",
    relatedGuide: {
      href: "/blog/travel-cat-litter-box-buyer-guide",
      label: "travel cat litter box buyer guide",
    },
  },
  "travel-car/dog-car-window-safety-guard": {
    primaryKeyword: "dog car window safety guard",
    secondaryKeywords: [
      "dog car window guard",
      "pet car window safety accessory",
      "EVA dog car window guard",
    ],
    scenarioKeywords: ["dog window guard for car travel", "pet car accessory for road trips"],
    b2bKeywords: ["dog car window guard wholesale", "custom pet car accessory"],
    title: "Dog Car Window Safety Guard for B2B Buyers | TROVANE",
    description:
      "Source a dog car window safety guard made from high-density EVA foam for vehicle travel. Blue and black options are listed for B2B pet ranges.",
    h1: "Dog Car Window Safety Guard",
    shortDescription:
      "A dog car window safety guard made from high-density EVA foam for vehicle travel. The 40.5 × 4.7 × 4.7 cm accessory is available in blue and black for pet brands, retailers and distributors building car-travel ranges.",
    overview: [
      "This dog car window safety guard is a high-density EVA foam accessory for vehicle travel with dogs. The soft barrier format is intended to support a more comfortable car-window area during daily drives and longer journeys.",
      "The published dimensions are 40.5 × 4.7 × 4.7 cm, with blue and black listed as finish options. No adjustment range or vehicle-compatibility specification is currently published.",
      "Buyers should therefore test fit, placement and removal on relevant vehicles before creating compatibility claims. Instructions should describe the intended setup for the exact model.",
    ],
    commercialCopy: [
      "This model can be evaluated by pet brands, retailers and distributors adding a compact car-travel accessory. Blue and black are the confirmed options on the public product page.",
      "Discuss branding, packaging and order requirements for the exact model, then verify fit and use through samples. Do not imply universal vehicle compatibility without supporting data.",
    ],
    imageAlt: "high-density EVA dog car window safety guard",
    relatedGuide: {
      href: "/blog/dog-car-window-guard-buyer-guide",
      label: "dog car window guard buyer guide",
    },
  },
};

export function getCategorySeo(slug: string) {
  return categorySeoBySlug[slug] ?? null;
}

export function getProductSeo(categorySlug: string, productSlug: string) {
  return productSeoByPath[`${categorySlug}/${productSlug}`] ?? null;
}

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, siteUrl).toString();
}
