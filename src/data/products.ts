export type TextureKind = "lvt" | "wall" | "carpet";

export interface Product {
  slug: string;
  name: string;
  category: string;
  headline: string;
  short: string;
  description: string[];
  specs: { label: string; value: string }[];
  features: { title: string; text: string }[];
  applications: string[];
  formats: string[];
  compliance: string[];
  texture: TextureKind;
}

export const products: Product[] = [
  {
    slug: "lvt-flooring",
    name: "LVT 地板",
    category: "弹性地材",
    headline: "面向商业空间的高性能弹性地板，每一片都按工程标准制造。",
    short:
      "高精度装饰膜、同步压纹和耐磨层组合而成的豪华乙烯基地砖与地板，适用于高强度商业通行场景。",
    description: [
      "HAILAN LVT 将稳定芯层、高清装饰膜和 UV 固化耐磨层整合为表现一致的地板系统，确保每个批次、每个集装箱都稳定交付。所有结构都在自有挤出和复合产线上校准，合作伙伴可精准控制厚度、耐磨等级与表面纹理。",
      "产品方案涵盖项目定制干背系列，以及带静音垫的锁扣系统。花色开发由内部设计工作室完成：我们持续跟踪欧美室内趋势，并将木纹、石纹和抽象视觉转化为匹配压纹板的成品方案。",
    ],
    specs: [
      { label: "总厚度", value: "2.0 – 8.0 mm" },
      { label: "耐磨层", value: "0.3 / 0.5 / 0.7 mm" },
      { label: "长板规格", value: "152 × 914 · 178 × 1219 · 229 × 1524 mm" },
      { label: "方片规格", value: "305 × 610 · 457 × 914 mm" },
      { label: "表面", value: "同步压纹 · 深压纹 · 柔光平面" },
      { label: "倒角", value: "微倒角 · 涂色倒角 · 压制倒角" },
      { label: "安装方式", value: "干背 · 锁扣 · 免胶铺装" },
      { label: "防火等级", value: "EN 13501-1 Bfl-s1 · ASTM E648 Class 1" },
      { label: "防滑性能", value: "DIN 51130 R9 – R10" },
    ],
    features: [
      {
        title: "尺寸稳定",
        text: "退火芯层和受控冷却让地板在温湿度变化中保持平整，每个生产批次均按 ISO 23999 验证。",
      },
      {
        title: "同步压纹",
        text: "压纹板与装饰膜精准匹配，呈现锯切橡木、洞石和编织织物般的触感深度。",
      },
      {
        title: "静音结构",
        text: "集成 IXPE 或软木背垫，最高可降低 19 dB 冲击声，适用于多层住宅和酒店项目。",
      },
      {
        title: "防水芯层",
        text: "SPC 与干背结构均为 100% 防水，适合湿区、入口区域和沿海气候。",
      },
    ],
    applications: [
      "连锁零售",
      "酒店与商业空间",
      "医疗机构",
      "企业办公",
      "教育空间",
      "集合住宅",
    ],
    formats: ["干背", "SPC 锁扣", "免胶铺装", "静音锁扣"],
    compliance: ["CE · EN 14041", "FloorScore®", "REACH", "EN 13501-1 Bfl-s1"],
    texture: "lvt",
  },
  {
    slug: "pet-wall-coverings",
    name: "PET 墙面覆材",
    category: "声学墙面系统",
    headline: "将噪声控制转化为设计语言的声学墙面系统。",
    short:
      "聚酯声学毡板，可制成平板、格栅系统和 CNC 异形件，回收材料含量最高可达 60%。",
    description: [
      "我们的 PET 墙面覆材由聚酯纤维针刺并热成型，其中相当比例来自消费后回收瓶片。成品为硬挺、通体同色的声学板材，可开槽、包覆并实现隐藏式安装，是办公、学校和公共空间建筑师常用的规格材料。",
      "HAILAN 提供完整系统：可直接安装的平板、复合声学毡基材的成品格栅板，以及按项目图纸加工的 CNC 异形件。颜色开发通过内部纤维染色合作体系完成，确保品牌项目在多年复购中保持稳定色盘。",
    ],
    specs: [
      { label: "材料", value: "100% 聚酯纤维（PET）" },
      { label: "回收含量", value: "最高 60% 消费后回收材料" },
      { label: "厚度", value: "9 / 12 / 24 mm" },
      { label: "板材尺寸", value: "1220 × 2440 mm · 支持定制裁切" },
      { label: "密度", value: "约 1950 g/m²（9 mm）" },
      { label: "声学性能", value: "NRC 0.40 – 0.85（视安装方式而定）" },
      { label: "防火等级", value: "EN 13501-1 B-s1,d0 · ASTM E84 Class A" },
      { label: "颜色", value: "36 个标准色 · 可按需定制" },
    ],
    features: [
      {
        title: "工程化声学",
        text: "纤维密度和板材厚度按吸声目标调校，每种结构均可提供 ISO 354 测试数据。",
      },
      {
        title: "通体同色",
        text: "采用染色纤维而非表面印刷，边缘、裁切面和开槽细节与面层颜色一致。",
      },
      {
        title: "CNC 加工",
        text: "内部开槽加工可完成格栅、穿孔、倒角和项目专属几何造型，边缘整洁封闭。",
      },
      {
        title: "循环材料",
        text: "每平方米 12 mm 板材约可转化 62 个塑料瓶，并纳入我们的可持续发展报告。",
      },
    ],
    applications: [
      "开放办公",
      "教育空间",
      "酒店空间",
      "媒体与录播室",
      "公共建筑",
      "零售室内",
    ],
    formats: ["平板", "格栅墙系统", "CNC 异形件", "墙面片材与吊片"],
    compliance: ["ASTM E84 Class A", "EN 13501-1 B-s1,d0", "REACH", "ISO 354 测试"],
    texture: "wall",
  },
  {
    slug: "pet-carpet-coverings",
    name: "PET 地毯覆材",
    category: "模块化纺织地材",
    headline: "面向高人流空间的原液着色地毯表面。",
    short:
      "由原液着色 PET 纱线簇绒而成的模块化地毯方块与长条，天然耐污、色牢度高，可直接进入项目规格。",
    description: [
      "HAILAN 地毯覆材采用原液着色聚酯纱线簇绒：颜色锁定在纤维内部，因此可抵抗漂白剂、紫外线和高强度清洁制度对传统地毯造成的褪色影响。这是全球办公品牌在追求十年外观一致性时会选择的结构。",
      "模块化形式包括方块、长条和大规格地毯片，安装快速、可局部替换、运输效率高。背衬可选标准沥青背或更轻的 PET 复合背衬，使整柜重量在多数市场的道路限重内。",
    ],
    specs: [
      { label: "纱线", value: "原液着色 PET · 100% 聚酯" },
      { label: "结构", value: "簇绒圈绒 · 割绒 · 割圈绒" },
      { label: "绒重", value: "500 – 1000 g/m²" },
      { label: "方块尺寸", value: "500 × 500 mm" },
      { label: "长条尺寸", value: "250 × 1000 mm" },
      { label: "背衬", value: "沥青 · PET 复合 · 缓冲背" },
      { label: "防火等级", value: "EN 13501-1 Bfl-s1 · ASTM E648 Class 1" },
      { label: "静电", value: "≤ 2.0 kV（AATCC 134）" },
    ],
    features: [
      {
        title: "天然耐污",
        text: "原液着色纤维缺少污渍可附着的染色位点，日常泼洒可用清水和标准养护方式清洁。",
      },
      {
        title: "十年色彩稳定",
        text: "经超过 400 小时氙弧测试仍保持极小色差，让大面积地面在多年局部替换后仍保持统一。",
      },
      {
        title: "模块化效率",
        text: "方块和长条可将安装损耗控制在 4% 以下，并支持高磨损区域单片替换。",
      },
      {
        title: "回收纱线方案",
        text: "含认证回收 PET 的纱线系列可支持项目 LEED 与 BREEAM 文件要求。",
      },
    ],
    applications: [
      "企业办公",
      "联合办公",
      "酒店空间",
      "交通枢纽",
      "教育空间",
      "公共行政空间",
    ],
    formats: ["地毯方块", "地毯长条", "定制簇绒项目"],
    compliance: ["EN 13501-1 Bfl-s1", "ASTM E648 Class 1", "FloorScore®", "REACH"],
    texture: "carpet",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
