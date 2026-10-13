export type Category = "packs" | "bags" | "accessories" | "apparel";
export type Inventory = "In stock" | "Low stock" | "Sold out" | "Coming soon";
export interface Product {
  slug: string;
  model: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  features: string[];
  material: string;
  capacity: string;
  dimensions: string;
  weight: string;
  laptop: string;
  carryOn: boolean;
  weather: string;
  pockets: string;
  uses: string[];
  colors: string[];
  stock: Inventory;
  image: string;
  related: string[];
}
const make = (
  slug: string,
  model: string,
  name: string,
  category: Category,
  price: number,
  description: string,
  capacity: string,
  dimensions: string,
  weight: string,
  uses: string[],
  extra: Partial<Product> = {},
): Product => ({
  slug,
  model,
  name,
  category,
  price,
  description,
  capacity,
  dimensions,
  weight,
  uses,
  features: [
    "A place for everything, without the visual noise.",
    "Easy-access compartments that make sense on the move.",
    "Replaceable hardware and a considered construction.",
  ],
  material: "420D nylon / polyester lining",
  laptop: "—",
  carryOn: true,
  weather: "Water-resistant; not waterproof",
  pockets: "1 external",
  colors: ["Graphite", "Mineral", "Clay"],
  stock: "In stock",
  image: `/images/${slug}.webp`,
  related: ["p01-day-pack", "a02-tech-organizer", "a04-bottle"],
  ...extra,
});
export const products: Product[] = [
  make(
    "p01-day-pack",
    "P—01",
    "Day Pack",
    "packs",
    168,
    "A compact 18L pack for a laptop, a layer, and the long way home.",
    "18L",
    "43 × 28 × 14 cm",
    "690 g",
    ["Daily commute", "Day use"],
    {
      laptop: "14 inch",
      pockets: "2 external",
      features: [
        "Suspended 14-inch laptop sleeve.",
        "Two stretch bottle pockets.",
        "Soft back panel with a luggage pass-through.",
      ],
    },
  ),
  make(
    "p02-transit-pack",
    "P—02",
    "Transit Pack",
    "packs",
    228,
    "A 24L carry for workdays that turn into overnights. One considered home for everything you actually need.",
    "24L",
    "47 × 30 × 17 cm",
    "920 g",
    ["Daily commute", "Gym / training", "Weekend travel"],
    {
      laptop: "16 inch",
      pockets: "2 external",
      features: [
        "Separate, suspended 16-inch laptop compartment.",
        "Clamshell opening. Pack once. Find everything.",
        "Expandable bottle pockets and a luggage pass-through.",
      ],
      stock: "In stock",
    },
  ),
  make(
    "p03-travel-pack",
    "P—03",
    "Travel Pack",
    "packs",
    288,
    "Three days, one bag. A 35L travel system with a full opening and space that stays organized.",
    "35L",
    "53 × 33 × 20 cm",
    "1.28 kg",
    ["Weekend travel", "International travel"],
    {
      laptop: "16 inch",
      pockets: "2 external",
      features: [
        "Full clamshell access with internal compression.",
        "Stowable harness and a removable sternum strap.",
        "Dedicated laptop access at security.",
      ],
      colors: ["Graphite", "Petrol"],
      stock: "Low stock",
    },
  ),
  make(
    "b01-weekender",
    "B—01",
    "Weekender",
    "bags",
    218,
    "The 38L soft-sided bag for Friday departures and Sunday returns.",
    "38L",
    "50 × 30 × 25 cm",
    "1.1 kg",
    ["Weekend travel", "International travel"],
    {
      features: [
        "Wide opening and a structured base.",
        "Separate shoe compartment.",
        "Detachable, padded shoulder strap.",
      ],
    },
  ),
  make(
    "b02-utility-duffel",
    "B—02",
    "Utility Duffel",
    "bags",
    158,
    "A 28L duffel that keeps the work kit and the training kit on speaking terms.",
    "28L",
    "46 × 27 × 23 cm",
    "780 g",
    ["Gym / training", "Weekend travel"],
    {
      features: [
        "Ventilated shoe compartment.",
        "Internal pocket for keys and small essentials.",
        "Reinforced grab handles.",
      ],
      colors: ["Petrol", "Graphite"],
    },
  ),
  make(
    "a01-packing-set",
    "A—01",
    "Packing Set",
    "accessories",
    58,
    "Two compressible cubes. An easier way to pack, unpack, and find the clean shirt.",
    "2 + 5L",
    "28 × 20 × 9 cm / 20 × 14 × 7 cm",
    "160 g",
    ["Weekend travel", "International travel"],
    {
      material: "210D nylon / mesh panels",
      features: [
        "Two sizes, designed around the P—03.",
        "Compression zips reduce loose space.",
        "Mesh panels make the contents visible.",
      ],
    },
  ),
  make(
    "a02-tech-organizer",
    "A—02",
    "Tech Organizer",
    "accessories",
    68,
    "Cables, charger, earbuds. All of the small things, in one sensible place.",
    "1.5L",
    "23 × 15 × 6 cm",
    "190 g",
    ["Daily commute", "International travel"],
    {
      features: [
        "Lay-flat opening.",
        "Elastic loops for cables and pens.",
        "Padded pocket for a portable charger.",
      ],
    },
  ),
  make(
    "a03-utility-pouch",
    "A—03",
    "Utility Pouch",
    "accessories",
    38,
    "A small zip pouch for the things that always end up at the bottom of your bag.",
    "0.8L",
    "20 × 12 × 4 cm",
    "80 g",
    ["Daily commute", "Day use"],
    { colors: ["Clay", "Graphite"], stock: "Sold out" },
  ),
  make(
    "a04-bottle",
    "A—04",
    "Bottle",
    "accessories",
    42,
    "A 750ml stainless steel bottle with a simple grip and a lid you can replace.",
    "750ml",
    "26 × 7.5 cm",
    "310 g",
    ["Daily commute", "Gym / training", "Day use"],
    {
      material: "Stainless steel / silicone seal",
      weather: "Leak-resistant screw lid",
      features: [
        "Double-wall stainless steel.",
        "Replaceable lid and silicone seal.",
        "Fits the stretch pockets on P—01 and P—02.",
      ],
      colors: ["Graphite", "Mineral"],
    },
  ),
  make(
    "s01-overshirt",
    "S—01",
    "Overshirt",
    "apparel",
    138,
    "A light structured layer. Enough room to move, enough pockets to leave the extra bag at home.",
    "XS–XL",
    "Relaxed fit / 74 cm back length in M",
    "380 g",
    ["Daily commute", "Weekend travel"],
    {
      material: "Cotton / nylon woven blend",
      features: [
        "Two secure chest pockets.",
        "Snap front for quick layering.",
        "Straight hem and a relaxed fit.",
      ],
      colors: ["Mineral", "Graphite"],
    },
  ),
  make(
    "s02-light-shell",
    "S—02",
    "Light Shell",
    "apparel",
    198,
    "A packable layer for sudden showers and the exposed walk between stations.",
    "XS–XL",
    "Regular fit / 76 cm back length in M",
    "240 g",
    ["Daily commute", "Day use"],
    {
      material: "Lightweight nylon with water-repellent finish",
      features: [
        "Adjustable hood and hem.",
        "Packs into its own interior pocket.",
        "Covered front zip.",
      ],
      colors: ["Petrol", "Graphite"],
      stock: "Coming soon",
    },
  ),
  make(
    "s03-cap",
    "S—03",
    "Utility Cap",
    "apparel",
    36,
    "A low-profile five-panel cap that folds into a side pocket.",
    "Adjustable",
    "54–62 cm circumference",
    "65 g",
    ["Day use", "Gym / training"],
    {
      material: "Nylon / polyester mesh",
      features: [
        "Adjustable webbing closure.",
        "Soft brim that packs flat.",
        "Small woven VELT label.",
      ],
      colors: ["Clay", "Graphite", "Petrol"],
    },
  ),
];
export const categories: {
  slug: Category;
  title: string;
  description: string;
}[] = [
  {
    slug: "packs",
    title: "Packs",
    description: "A place for your day. And whatever comes after.",
  },
  {
    slug: "bags",
    title: "Bags",
    description: "Room to change plans. Built for short stays and full days.",
  },
  {
    slug: "accessories",
    title: "Accessories",
    description: "Small things that make the whole system work.",
  },
  {
    slug: "apparel",
    title: "Apparel",
    description: "Useful layers. Quiet details. More days of wear.",
  },
];
export const collections = [
  {
    slug: "the-commute",
    name: "The commute",
    line: "Leave prepared. Come home by a different route.",
    use: "Daily commute",
    image: "p02-transit-pack",
  },
  {
    slug: "the-weekend",
    name: "The weekend",
    line: "Less to carry. More room to change plans.",
    use: "Weekend travel",
    image: "b01-weekender",
  },
  {
    slug: "one-bag-travel",
    name: "One-bag travel",
    line: "Three days. Everything you need. Nothing you don’t.",
    use: "International travel",
    image: "p03-travel-pack",
  },
  {
    slug: "training",
    name: "Training, in between",
    line: "The hours between work and home belong to you.",
    use: "Gym / training",
    image: "b02-utility-duffel",
  },
  {
    slug: "daily-carry",
    name: "The daily edit",
    line: "Put the little things in their place.",
    use: "Day use",
    image: "p01-day-pack",
  },
];
export const colorValues: Record<string, string> = {
  Graphite: "#303332",
  Mineral: "#b3b0a4",
  Clay: "#a06047",
  Petrol: "#344b4d",
};
export const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
export const membership = {
  name: "VELT / In Use",
  annualPrice: 48,
  repairCredit: 40,
  benefits: [
    "$40 annual repair credit",
    "Early access to new releases",
    "Member-only color editions",
    "Priority care and product support",
    "An additional year of concept warranty coverage",
    "Packing notes and small local gatherings",
  ],
};
export interface Article {
  slug: string;
  category: string;
  title: string;
  intro: string;
  read: string;
  image: string;
  sections: { title: string; body: string }[];
}
export const articles: Article[] = [
  {
    slug: "three-days-one-bag",
    category: "Packing notes",
    title: "Three days. One bag. No compromises.",
    intro:
      "A practical packing list for the trip between Friday afternoon and Monday morning.",
    read: "6 min",
    image: "p03-travel-pack",
    sections: [
      {
        title: "Start with the days, not the bag.",
        body: "Write down what you will actually do. Two days walking around a city need a different setup from a weekend wedding. Choose clothes around the schedule, and repeat the layers that work across it.",
      },
      {
        title: "Pack a small wardrobe, not three outfits.",
        body: "Two tops, a spare pair of trousers, three sets of underwear, and one light layer cover most short trips. Wear your bulkiest shoes. A packing cube keeps clean clothes separate from the things you have worn.",
      },
      {
        title: "Give essentials a fixed place.",
        body: "Keep your passport, charger, and medication within reach. Put toiletries in a separate pouch. Leave enough space to close the bag without forcing the zip. Check your airline’s current size and weight rules before departure.",
      },
    ],
  },
  {
    slug: "commuter-pack-checklist",
    category: "Objects in use",
    title: "What earns a place in your everyday pack?",
    intro:
      "Forget the feature count. Look at the four things you touch every single day.",
    read: "4 min",
    image: "p02-transit-pack",
    sections: [
      {
        title: "The opening matters.",
        body: "You should be able to find a charger without unloading your lunch. Try the opening with the bag packed. A wider zip and clear internal organization usually matter more than a dozen small pockets.",
      },
      {
        title: "Keep the laptop off the floor.",
        body: "A suspended sleeve gives your computer a little separation from the bottom of the bag. Check the internal measurements against your device, especially if you use a case.",
      },
      {
        title: "Try it at your normal weight.",
        body: "An empty pack can feel comfortable when a full one does not. Load it with what you usually carry. Adjust the straps, walk around, and notice where the pressure lands.",
      },
    ],
  },
  {
    slug: "technical-fabric-care",
    category: "Care notes",
    title: "Good fabric deserves a little attention.",
    intro:
      "A few habits that keep the things you use looking and working better.",
    read: "5 min",
    image: "a02-tech-organizer",
    sections: [
      {
        title: "Start gently.",
        body: "Empty the bag and shake out loose dirt. Wipe the exterior with a damp cloth. For stubborn marks, use a small amount of mild soap and test it on an inconspicuous area first.",
      },
      {
        title: "Air dry, always.",
        body: "Leave compartments open and dry the product in a ventilated space, away from direct heat. Do not tumble dry or machine wash packs. Heat can damage coatings, foam, and adhesives.",
      },
      {
        title: "Make the small fix early.",
        body: "A stiff zip or a loose stitch is easier to address before it becomes a bigger problem. Clean zip teeth with a soft brush. If stitching opens, stop loading that area and submit a repair enquiry.",
      },
    ],
  },
  {
    slug: "fewer-bags",
    category: "A point of view",
    title: "The case for a bag with more than one job.",
    intro: "What happens when we design around the overlap in our routines?",
    read: "3 min",
    image: "b01-weekender",
    sections: [
      {
        title: "The categories are ours. The days are yours.",
        body: "A commute can end at a gym. A meeting can turn into an overnight stay. Products designed for a single moment often ask you to own more things than your routine requires.",
      },
      {
        title: "Adaptation starts with restraint.",
        body: "A clean silhouette, sensible capacity, and a flexible opening let one object fit more contexts. The goal is not to fit everything. It is to fit the things that keep coming with you.",
      },
      {
        title: "Keep the things that earn their place.",
        body: "The most useful bag is the one you reach for without thinking. Notice what you carry for a week. Buy for that routine, and leave a little room for the unexpected.",
      },
    ],
  },
];
export const campaigns = [
  {
    title: "Your day doesn’t end at your desk.",
    label: "Launch / brand",
    product: "p02-transit-pack",
    tone: "light",
  },
  {
    title: "One bag. A few more days.",
    label: "Product / P—03",
    product: "p03-travel-pack",
    tone: "dark",
  },
  {
    title: "A change of clothes. A change of pace.",
    label: "Training / B—02",
    product: "b02-utility-duffel",
    tone: "orange",
  },
  {
    title: "Everything in its own time. And place.",
    label: "System / accessories",
    product: "a02-tech-organizer",
    tone: "light",
  },
  {
    title: "The best part is getting used.",
    label: "Membership / In Use",
    product: "p01-day-pack",
    tone: "dark",
  },
  {
    title: "Friday isn’t a destination.",
    label: "Weekend / B—01",
    product: "b01-weekender",
    tone: "orange",
  },
  {
    title: "A small fix. A longer story.",
    label: "Ownership / repair",
    product: "s01-overshirt",
    tone: "light",
  },
  {
    title: "Packed for a different kind of day.",
    label: "Editorial / packing notes",
    product: "a01-packing-set",
    tone: "dark",
  },
];
export const emails = [
  {
    slug: "brand-launch",
    subject: "Introducing VELT. Fewer things. Fuller days.",
    preheader: "Objects for the overlap.",
    title: "Your day has more than one part.",
    body: "Meet the first VELT collection. Considered packs, bags, and small essentials for the space between work, training, and a few days away.",
    cta: "Meet the collection",
    href: "/shop",
    product: "p02-transit-pack",
  },
  {
    slug: "product-launch",
    subject: "P—03. Three days, one bag.",
    preheader: "The travel pack, considered.",
    title: "A little more room. A lot less baggage.",
    body: "A full-opening 35L pack, with compression inside and a place for your laptop. Made for the trip that doesn’t need a second bag.",
    cta: "Explore P—03",
    href: "/product/p03-travel-pack",
    product: "p03-travel-pack",
  },
  {
    slug: "browse-follow-up",
    subject: "A closer look at P—02.",
    preheader: "A few details worth knowing.",
    title: "The details make the day.",
    body: "A suspended laptop sleeve. Two bottle pockets. An opening that lets you see what you packed. Here’s a closer look at the Transit Pack.",
    cta: "See the details",
    href: "/product/p02-transit-pack",
    product: "p02-transit-pack",
  },
  {
    slug: "cart-reminder",
    subject: "Your setup is still here.",
    preheader: "Take your time.",
    title: "Ready when you are.",
    body: "The items you considered are saved in your bag. Need a second opinion? Compare the details or use our finder. No rush, no countdown.",
    cta: "Return to your bag",
    href: "/cart",
    product: "p02-transit-pack",
  },
  {
    slug: "order-confirmation",
    subject: "Your VELT order is confirmed.",
    preheader: "A place for the next part of your day.",
    title: "Good things, on their way.",
    body: "This template displays the order number, itemized receipt, delivery method, and address from the order. For the concept preview, no order is dispatched.",
    cta: "View your orders",
    href: "/account/orders",
    product: "p02-transit-pack",
  },
  {
    slug: "shipping-update",
    subject: "Next stop: your door.",
    preheader: "Your order has a tracking update.",
    title: "Packed. Sent. Almost yours.",
    body: "An operational template for the dispatch notification, with a carrier tracking link and estimated arrival. Tracking details appear only when supplied by a fulfillment system.",
    cta: "View order status",
    href: "/account/orders",
    product: "b01-weekender",
  },
  {
    slug: "post-purchase-care",
    subject: "A few notes for the long run.",
    preheader: "Keep it in good use.",
    title: "Use it well. Keep it longer.",
    body: "A damp cloth. A little mild soap. Air drying, away from heat. Your pack doesn’t need much attention, just the right kind. Keep the care notes handy.",
    cta: "Read the care notes",
    href: "/journal/technical-fabric-care",
    product: "a02-tech-organizer",
  },
  {
    slug: "membership-invitation",
    subject: "For the things you keep using.",
    preheader: "Introducing VELT / In Use.",
    title: "Ownership is just the beginning.",
    body: "In Use brings repair credit, early access, and a closer connection to the things you own. $48 a year, including a $40 annual repair credit. This is a concept program.",
    cta: "Meet In Use",
    href: "/membership",
    product: "p01-day-pack",
  },
];
