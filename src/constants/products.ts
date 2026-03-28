import type { Product } from "@/src/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Timur Ko Achar",
    description:
      "A tingling Sichuan pepper pickle with a citrusy burst — the classic Nepali table condiment.",
    price: 250,
    emoji: "🌶️",
    rating: 5,
    spiceLevel: "Hot",
    type: "Timur",
    inStock: true,
  },
  {
    id: 2,
    name: "Golbheda Ko Achar",
    description:
      "Sun-dried tomato pickle slow-roasted with sesame and mustard oil. Rich, smoky, irresistible.",
    price: 220,
    emoji: "🍅",
    rating: 5,
    spiceLevel: "Medium",
    type: "Mixed",
    inStock: true,
  },
  {
    id: 3,
    name: "Aaul Ko Achar",
    description:
      "Hog plum pickle with a perfect sweet-tangy punch — pairs beautifully with rice and dal.",
    price: 200,
    emoji: "🫙",
    rating: 4,
    spiceLevel: "Mild",
    type: "Mixed",
    inStock: true,
  },
  {
    id: 4,
    name: "Mango Achar",
    description:
      "Raw mango pickle bursting with tangy heat. A monsoon favourite made year-round.",
    price: 230,
    emoji: "🥭",
    rating: 5,
    spiceLevel: "Hot",
    type: "Mango",
    inStock: true,
  },
  {
    id: 5,
    name: "Garlic Achar",
    description:
      "Whole garlic cloves slow-pickled in mustard oil and spices. Bold, pungent, and deeply satisfying.",
    price: 240,
    emoji: "🧄",
    rating: 4,
    spiceLevel: "Medium",
    type: "Garlic",
    inStock: true,
  },
  {
    id: 6,
    name: "Lemon Achar",
    description:
      "Sun-cured lemon pickle with cumin, chilli, and salt. Refreshingly sharp with every spoonful.",
    price: 190,
    emoji: "🍋",
    rating: 4,
    spiceLevel: "Mild",
    type: "Lemon",
    inStock: true,
  },
  {
    id: 7,
    name: "Mixed Achar",
    description:
      "A vibrant medley of seasonal vegetables pickled together — the ultimate variety jar.",
    price: 260,
    emoji: "🥗",
    rating: 5,
    spiceLevel: "Medium",
    type: "Mixed",
    inStock: true,
  },
  {
    id: 8,
    name: "Kaag Bhagate Achar",
    description:
      "A rare wild fruit pickle with an earthy, bitter-sweet profile unique to the Himalayan foothills.",
    price: 280,
    emoji: "🍇",
    rating: 4,
    spiceLevel: "Mild",
    type: "Other",
    inStock: false,
  },
  {
    id: 9,
    name: "Dalle Achar",
    description:
      "Made from Nepal's iconic Dalle Khursani — one of the world's hottest round chillies. Handle with love.",
    price: 270,
    emoji: "🔥",
    rating: 5,
    spiceLevel: "Extra Hot",
    type: "Mixed",
    inStock: true,
  },
];
