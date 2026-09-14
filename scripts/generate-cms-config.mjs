import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dictionaryDir = path.join(root, "src/app/[lang]/dictionaries");
const sampleDictionary = JSON.parse(
  readFileSync(path.join(dictionaryDir, "en.json"), "utf8"),
);

const labels = {
  siteMeta: "网站 SEO",
  nav: "导航",
  common: "通用按钮与文字",
  productLines: "产品线摘要",
  hero: "首页首屏",
  intro: "首页公司介绍",
  productsHome: "首页产品区",
  manufacturingHome: "首页制造区",
  why: "首页优势区",
  markets: "首页市场区",
  newsHome: "首页新闻区",
  cta: "行动号召",
  footer: "页脚",
  about: "关于我们页",
  productsPage: "产品列表页",
  contactPage: "联系我们页",
  manufacturingPage: "生产制造页",
  oemOdmPage: "OEM / ODM 页",
  qualityPage: "质量页",
  linusPage: "商务名片页",
  title: "标题",
  description: "描述",
  text: "正文",
  lede: "导语",
  short: "摘要",
  eyebrow: "栏目眉题",
  meta: "SEO 信息",
  items: "条目",
  name: "名称",
  label: "标签",
  value: "内容",
};

const longTextKeys = new Set([
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

const quote = (value) => JSON.stringify(String(value));
const labelFor = (key) => labels[key] ?? key;

function fieldLines(name, value, indent) {
  const pad = " ".repeat(indent);
  const lines = [
    `${pad}- label: ${quote(labelFor(name))}`,
    `${pad}  name: ${quote(name)}`,
  ];

  if (Array.isArray(value)) {
    lines.push(`${pad}  widget: list`);
    lines.push(`${pad}  collapsed: true`);
    const sample = value[0] ?? "";
    if (sample && typeof sample === "object") {
      lines.push(`${pad}  fields:`);
      for (const [childName, childValue] of Object.entries(sample)) {
        lines.push(...fieldLines(childName, childValue, indent + 4));
      }
    } else {
      lines.push(`${pad}  field:`);
      lines.push(`${pad}    label: "项目"`);
      lines.push(`${pad}    name: "item"`);
      lines.push(`${pad}    widget: text`);
    }
    return lines;
  }

  if (value && typeof value === "object") {
    lines.push(`${pad}  widget: object`);
    lines.push(`${pad}  collapsed: true`);
    lines.push(`${pad}  fields:`);
    for (const [childName, childValue] of Object.entries(value)) {
      lines.push(...fieldLines(childName, childValue, indent + 4));
    }
    return lines;
  }

  lines.push(
    `${pad}  widget: ${longTextKeys.has(name) || String(value).length > 90 ? "text" : "string"}`,
  );
  return lines;
}

const dictionaryFields = Object.entries(sampleDictionary).flatMap(
  ([name, value]) => fieldLines(name, value, 10),
);

const locales = [
  ["en", "English"],
  ["zh", "简体中文"],
  ["fr", "Français"],
  ["es", "Español"],
  ["ru", "Русский"],
  ["ar", "العربية"],
  ["ja", "日本語"],
  ["ms", "Bahasa Melayu"],
  ["id", "Bahasa Indonesia"],
];

const siteFiles = locales.flatMap(([locale, label], index) => [
  `      - label: ${quote(label)}`,
  `        name: ${quote(`site_${locale}`)}`,
  `        file: ${quote(`src/app/[lang]/dictionaries/${locale}.json`)}`,
  `        preview_path: ${quote(locale)}`,
  index === 0
    ? "        fields: &site_copy_fields"
    : "        fields: *site_copy_fields",
  ...(index === 0 ? dictionaryFields : []),
]);

const productFields = `
        - { label: "URL 标识", name: slug, widget: hidden }
        - { label: "产品名称", name: name, widget: string }
        - { label: "产品分类", name: category, widget: string }
        - { label: "主标题", name: headline, widget: string }
        - { label: "摘要", name: short, widget: text }
        - label: "产品介绍"
          name: description
          widget: list
          field: { label: "段落", name: paragraph, widget: text }
        - label: "技术参数"
          name: specs
          widget: list
          fields:
            - { label: "参数名", name: label, widget: string }
            - { label: "参数值", name: value, widget: string }
        - label: "产品特点"
          name: features
          widget: list
          fields:
            - { label: "标题", name: title, widget: string }
            - { label: "正文", name: text, widget: text }
        - label: "应用场景"
          name: applications
          widget: list
          field: { label: "场景", name: application, widget: string }
        - label: "产品形式"
          name: formats
          widget: list
          field: { label: "形式", name: format, widget: string }
        - label: "认证与标准"
          name: compliance
          widget: list
          field: { label: "认证或标准", name: item, widget: string }
        - { label: "视觉纹理", name: texture, widget: hidden }`;
const anchoredProductFields = productFields.replaceAll("\n        ", "\n          ");

const config = `backend:
  name: git-gateway
  repo: hailan-world/website
  branch: main
  base_url: https://hailanworld.com
  auth_type: pkce
  auth_endpoint: api/cms/dingtalk/authorize
  auth_token_endpoint: api/cms/dingtalk/token
  app_id: hailan-cms
  gateway_url: https://hailanworld.com/api/cms/git/github
  status_endpoint: https://hailanworld.com/api/cms/status
  squash_merges: true
auth:
  scope: openid
  email_claim: email
  full_name_claim: name
  avatar_url_claim: avatar_url
local_backend: true
publish_mode: editorial_workflow
locale: zh_Hans
site_url: https://hailanworld.com
display_url: https://hailanworld.com
logo_url: /hailan-wordmark.svg
show_preview_links: true
search: true
media_folder: public/uploads/news
public_folder: /uploads/news
slug:
  encoding: ascii
  clean_accents: true
  sanitize_replacement: "-"

collections:
  - name: site_copy
    label: 网站文案
    description: 编辑九种语言的页面文案。发布后由 GitHub 审核流程合并并自动部署。
    extension: json
    format: json
    delete: false
    editor:
      preview: false
    files:
${siteFiles.join("\n")}

  - name: products
    label: 产品资料
    description: 编辑产品介绍、参数、特点、应用、形式和认证信息。
    extension: json
    format: json
    delete: false
    editor:
      preview: false
    files:
      - label: LVT Flooring
        name: lvt_flooring
        file: content/products/lvt-flooring.json
        preview_path: en/products/lvt-flooring
        fields: &product_fields${anchoredProductFields}
      - label: PET Wall Coverings
        name: pet_wall_coverings
        file: content/products/pet-wall-coverings.json
        preview_path: en/products/pet-wall-coverings
        fields: *product_fields
      - label: PET Carpet Coverings
        name: pet_carpet_coverings
        file: content/products/pet-carpet-coverings.json
        preview_path: en/products/pet-carpet-coverings
        fields: *product_fields

  - name: news
    label: 新闻动态
    label_singular: 新闻文章
    description: 业务员可创建草稿；只有完成审核并标记为“已核实”的文章才会显示。
    folder: content/news
    extension: json
    format: json
    create: true
    delete: true
    i18n: true
    identifier_field: title
    slug: "{{fields.slug}}"
    preview_path: en/news/{{fields.slug}}
    summary: "{{date}} · {{title}} · {{status}}"
    sortable_fields: [date, title, status]
    view_filters:
      - { label: "待核实", field: status, pattern: draft }
      - { label: "已核实", field: status, pattern: approved }
    fields:
      - label: 发布状态
        name: status
        widget: select
        default: draft
        i18n: duplicate
        options:
          - { label: "草稿（不会在网站显示）", value: draft }
          - { label: "已核实（审核发布后显示）", value: approved }
      - label: URL 标识
        name: slug
        widget: string
        i18n: duplicate
        hint: 仅使用小写英文字母、数字和连字符，例如 new-showroom-opening。
        pattern: ['^[a-z0-9]+(?:-[a-z0-9]+)*$', 仅可使用小写英文字母、数字和连字符。]
      - { label: 标题, name: title, widget: string, i18n: true }
      - { label: 发布日期, name: date, widget: datetime, i18n: duplicate, date_format: YYYY-MM-DD, time_format: false, format: YYYY-MM-DD, picker_utc: true }
      - label: 分类
        name: category
        widget: select
        i18n: duplicate
        options: [Events, Manufacturing, Sustainability, Company]
      - { label: 摘要, name: excerpt, widget: text, i18n: true }
      - label: 正文段落
        name: body
        widget: list
        i18n: true
        min: 1
        field: { label: 段落, name: paragraph, widget: text }
      - { label: 封面图片, name: coverImage, widget: image, i18n: duplicate, required: false }
      - { label: 图片替代文字, name: coverImageAlt, widget: string, i18n: true, required: false }
      - { label: 核实人, name: approvedBy, widget: string, i18n: duplicate, required: false }
      - { label: 批准记录编号, name: approvalReference, widget: string, i18n: duplicate, required: false }
      - { label: 事实依据, name: sourceNotes, widget: text, i18n: duplicate, required: false }
`;

writeFileSync(path.join(root, "public/admin/config.yml"), config);
