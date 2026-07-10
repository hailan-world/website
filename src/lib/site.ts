export const site = {
  name: "HAILAN",
  legalName: "海澜新材料有限公司",
  tagline: "全球装饰建材制造商",
  description:
    "HAILAN 为 60 多个国家的进口商、经销商和品牌客户研发并制造 LVT 地板、PET 墙面覆材和 PET 地毯覆材。",
  url: "https://www.hailan-materials.com",
  email: "sales@hailan-materials.com",
  phone: "+86 572 8266 000",
  address: [
    "中国浙江省湖州市南浔经济开发区",
    "南浔大道 88 号",
    "邮编 313009",
  ],
  founded: 2008,
} as const;

export const nav = [
  { label: "关于我们", href: "/about" },
  { label: "产品", href: "/products" },
  { label: "制造能力", href: "/manufacturing" },
  { label: "质量体系", href: "/quality" },
  { label: "OEM / ODM", href: "/oem-odm" },
  { label: "新闻", href: "/news" },
  { label: "联系", href: "/contact" },
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
