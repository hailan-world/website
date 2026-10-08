import type { Field } from "payload";
import sampleDictionary from "@/app/[lang]/dictionaries/en.json";

const labels: Record<string, string> = {
  siteMeta: "网站 SEO",
  nav: "导航栏",
  common: "通用按钮和文字",
  productLines: "产品线卡片",
  hero: "首屏",
  intro: "公司介绍",
  productsHome: "产品区",
  manufacturingHome: "制造区",
  why: "优势区",
  markets: "市场区",
  newsHome: "新闻区",
  cta: "行动号召",
  footer: "页脚",
  about: "关于我们",
  productsPage: "产品中心",
  contactPage: "联系我们",
  manufacturingPage: "生产制造",
  oemOdmPage: "OEM / ODM",
  qualityPage: "质量管理",
  linusPage: "商务名片",
  meta: "SEO 信息",
  title: "标题",
  description: "描述",
  text: "正文",
  lede: "导语",
  short: "摘要",
  eyebrow: "栏目小标题",
  name: "名称",
  category: "分类",
  label: "标签",
  value: "内容",
  items: "条目",
  chips: "标签",
  headlineLine1: "主标题（第一行）",
  headlineLine2: "主标题（第二行）",
  kicker: "首屏小标题",
  badge: "首屏徽标",
  scroll: "滚动提示",
  para1: "第一段",
  para2: "第二段",
  para3: "第三段",
  tagline: "品牌短句",
  button: "按钮文字",
  link: "链接文字",
  address: "地址",
  company: "公司名称",
  rights: "版权文字",
  signoff: "结尾文字",
  globalInquiries: "全球业务咨询",
  headquarters: "总部",
  skipToContent: "无障碍：跳到正文",
  allProducts: "查看全部产品",
  allNews: "查看全部新闻",
  readArticle: "阅读文章",
  requestSamples: "索取样品",
  moreAboutHailan: "进一步了解海蓝",
  exploreProducts: "浏览产品",
  ourManufacturing: "了解生产制造",
  languageLabel: "语言选择器标签",
  stats: "数据摘要",
  figures: "数字",
  regions: "区域",
  reasons: "理由",
  pillars: "支柱",
  process: "流程",
  story: "公司故事",
  timeline: "时间线",
  values: "价值观",
  compliance: "合规信息",
  explore: "探索产品",
  roadmap: "产品路线",
  form: "联系表单",
  expectations: "合作预期",
  inquiries: "咨询方式",
  visits: "来访",
  hours: "工作时间",
  hq: "总部信息",
  nextTitle: "下一步标题",
  capabilities: "生产能力",
  automation: "自动化",
  logistics: "物流",
  services: "服务",
  assurances: "保障",
  certs: "认证",
  gates: "质量关卡",
  lab: "实验室",
  trace: "追溯",
  companyTagline: "公司短句",
  getInTouch: "联系引导",
  labels: "字段标签",
  linkedinValue: "LinkedIn 显示文字",
  wecomHeading: "企业微信标题",
  wecomNote: "企业微信说明",
  wecomScan: "扫码提示",
  wecomValue: "企业微信显示文字",
};

const textareaKeys = new Set([
  "description",
  "text",
  "lede",
  "short",
  "intro",
  "para1",
  "para2",
  "para3",
  "tagline",
  "note",
]);

const relationalDbNames: Record<string, string> = {
  "manufacturingPage.process.steps": "mfg_process_steps",
  "manufacturingPage.automation.items": "mfg_automation_items",
};

function humanize(name: string): string {
  if (labels[name]) return labels[name];
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replaceAll("-", " ")
    .replace(/^./, (value) => value.toUpperCase());
}

function fieldFromSample(name: string, value: unknown, parentPath: string[] = []): Field {
  const fieldPath = [...parentPath, name];
  const dbName = relationalDbNames[fieldPath.join(".")];
  if (Array.isArray(value)) {
    const sample = value[0];
    if (sample && typeof sample === "object" && !Array.isArray(sample)) {
      return {
        name,
        label: humanize(name),
        type: "array",
        localized: true,
        ...(dbName ? { dbName } : {}),
        labels: { singular: "条目", plural: "条目" },
        fields: Object.entries(sample).map(([childName, childValue]) =>
          fieldFromSample(childName, childValue, fieldPath),
        ),
      };
    }

    return {
      name,
      label: humanize(name),
      type: "text",
      hasMany: true,
      localized: true,
    };
  }

  if (value && typeof value === "object") {
    return {
      name,
      label: humanize(name),
      type: "group",
      admin: { hideGutter: true },
      fields: Object.entries(value).map(([childName, childValue]) =>
        fieldFromSample(childName, childValue, fieldPath),
      ),
    };
  }

  if (textareaKeys.has(name) || String(value ?? "").length > 90) {
    return {
      name,
      label: humanize(name),
      type: "textarea",
      localized: true,
      required: true,
    };
  }

  return {
    name,
    label: humanize(name),
    type: "text",
    localized: true,
    required: true,
  };
}

export function dictionaryFields(keys: string[]): Field[] {
  const dictionary = sampleDictionary as Record<string, unknown>;
  return keys.map((key) => fieldFromSample(key, dictionary[key]));
}

export const siteContentAreas = [
  {
    slug: "common-content",
    dbName: "site_common",
    label: "全站通用内容",
    description: "网站 SEO、导航、通用按钮、行动号召和页脚。",
    previewPath: "/",
    keys: ["siteMeta", "nav", "common", "cta", "footer"],
  },
  {
    slug: "home-content",
    dbName: "site_home",
    label: "首页",
    description: "按访客从上到下看到的顺序编辑首页。",
    previewPath: "/",
    keys: [
      "hero",
      "intro",
      "productsHome",
      "productLines",
      "manufacturingHome",
      "why",
      "markets",
      "newsHome",
    ],
  },
  {
    slug: "about-content",
    dbName: "site_about",
    label: "关于我们",
    description: "公司故事、数据、价值观、时间线和合规信息。",
    previewPath: "/about",
    keys: ["about"],
  },
  {
    slug: "products-page-content",
    dbName: "site_products",
    label: "产品中心页面",
    description: "产品列表页的标题、说明和行动号召；具体产品在“产品”中编辑。",
    previewPath: "/products",
    keys: ["productsPage"],
  },
  {
    slug: "manufacturing-content",
    dbName: "site_mfg",
    label: "生产制造",
    description: "制造流程、自动化能力和物流信息。",
    previewPath: "/manufacturing",
    keys: ["manufacturingPage"],
  },
  {
    slug: "oem-odm-content",
    dbName: "site_oem",
    label: "OEM / ODM",
    description: "定制合作流程、服务和保障。",
    previewPath: "/oem-odm",
    keys: ["oemOdmPage"],
  },
  {
    slug: "quality-content",
    dbName: "site_quality",
    label: "质量管理",
    description: "质量关卡、实验室、认证和追溯信息。",
    previewPath: "/quality",
    keys: ["qualityPage"],
  },
  {
    slug: "contact-content",
    dbName: "site_contact",
    label: "联系我们",
    description: "联系表单、咨询方式、来访和工作时间。",
    previewPath: "/contact",
    keys: ["contactPage"],
  },
  {
    slug: "business-card-content",
    dbName: "site_card",
    label: "商务名片",
    description: "林子越商务名片页面的文案与联系方式标签。",
    previewPath: "/linus",
    keys: ["linusPage"],
  },
] as const;

export type SiteContentArea = (typeof siteContentAreas)[number];
