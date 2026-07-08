export const site = {
  name: "HAILAN",
  legalName: "Hailan New Materials Co., Ltd.",
  tagline: "Global decorative building materials manufacturer",
  description:
    "HAILAN designs and manufactures LVT flooring, PET wall coverings and PET carpet coverings for importers, distributors and brands in more than 60 countries.",
  url: "https://hailanworld.com",
  email: "sales@hailan-materials.com",
  phone: "+86 572 8266 000",
  address: [
    "No. 88 Nanxun Avenue",
    "Nanxun Economic Development Zone",
    "Huzhou, Zhejiang 313009, China",
  ],
  founded: 2008,
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Quality", href: "/quality" },
  { label: "OEM / ODM", href: "/oem-odm" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

export const stats = {
  countries: 60,
  facility: 120000,
  capacity: 20,
  lines: 25,
  team: 400,
  onTime: 98.6,
} as const;

export const certifications = [
  "ISO 9001:2015",
  "ISO 14001:2015",
  "CE · EN 14041",
  "FloorScore®",
  "REACH",
  "EN 13501-1",
  "ASTM E648",
] as const;
