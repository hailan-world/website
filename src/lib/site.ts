/**
 * QUARANTINED: these legacy marketing values are retained only so the withdrawn
 * pages can be reviewed later. Public traffic is routed to the verified page.
 * Do not reuse a value until its evidence and publication approval are logged.
 */
export const site = {
  name: "HAILAN",
  legalName: "Jinhua Hailan New Materials Co., Ltd.",
  tagline: "Global decorative building materials manufacturer",
  description:
    "HAILAN designs and manufactures LVT flooring, PET wall coverings and PET carpet coverings for importers, distributors and brands in more than 20 countries.",
  url: "https://hailanworld.com",
  email: "sales@hailanworld.com",
  phone: "+86 572 8266 000",
  founded: 2020,
} as const;

export const nav = [
  { label: "Products", href: "/products" },
  { label: "OEM / ODM", href: "/oem-odm" },
  { label: "Factory", href: "/manufacturing" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

export const stats = {
  countries: 20,
  facility: 33000,
  capacity: 20,
  lines: 25,
  team: 30,
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
