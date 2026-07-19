import type { ArticleCategory } from "@/lib/content/news";
import type { Locale } from "@/lib/i18n";

interface NewsCopy {
  eyebrow: string;
  title: string;
  lede: string;
  emptyTitle: string;
  emptyText: string;
  readArticle: string;
  allNews: string;
  backToNews: string;
  moreNews: string;
  contactAboutArticle: string;
  categories: Record<ArticleCategory, string>;
}

const copy: Record<Locale, NewsCopy> = {
  en: {
    eyebrow: "News",
    title: "Verified updates from HAILAN.",
    lede: "Company updates appear here after their facts and source material have been reviewed.",
    emptyTitle: "New updates are being prepared.",
    emptyText: "There are no verified articles to publish yet. Please check back soon.",
    readArticle: "Read article",
    allNews: "All news",
    backToNews: "All news",
    moreNews: "More from HAILAN",
    contactAboutArticle: "Talk to us about this update",
    categories: {
      Events: "Events",
      Manufacturing: "Manufacturing",
      Sustainability: "Sustainability",
      Company: "Company",
    },
  },
  zh: {
    eyebrow: "新闻动态",
    title: "来自海蓝的真实动态。",
    lede: "公司动态会在事实与来源材料完成审核后发布于此。",
    emptyTitle: "新的动态正在准备中。",
    emptyText: "目前还没有通过核实、可公开发布的文章，敬请稍后关注。",
    readArticle: "阅读文章",
    allNews: "全部新闻",
    backToNews: "返回新闻",
    moreNews: "更多海蓝动态",
    contactAboutArticle: "就此动态联系我们",
    categories: {
      Events: "活动",
      Manufacturing: "生产制造",
      Sustainability: "可持续发展",
      Company: "公司动态",
    },
  },
  fr: {
    eyebrow: "Actualités",
    title: "Les actualités vérifiées de HAILAN.",
    lede: "Les nouvelles de l’entreprise sont publiées ici après vérification des faits et des sources.",
    emptyTitle: "De nouvelles actualités sont en préparation.",
    emptyText: "Aucun article vérifié n’est encore prêt à être publié. Revenez bientôt.",
    readArticle: "Lire l’article",
    allNews: "Toutes les actualités",
    backToNews: "Toutes les actualités",
    moreNews: "Plus d’actualités HAILAN",
    contactAboutArticle: "Nous contacter à ce sujet",
    categories: {
      Events: "Événements",
      Manufacturing: "Fabrication",
      Sustainability: "Durabilité",
      Company: "Entreprise",
    },
  },
  es: {
    eyebrow: "Noticias",
    title: "Novedades verificadas de HAILAN.",
    lede: "Las novedades de la empresa se publican aquí después de revisar los hechos y las fuentes.",
    emptyTitle: "Estamos preparando nuevas noticias.",
    emptyText: "Todavía no hay artículos verificados para publicar. Vuelva pronto.",
    readArticle: "Leer artículo",
    allNews: "Todas las noticias",
    backToNews: "Todas las noticias",
    moreNews: "Más de HAILAN",
    contactAboutArticle: "Consúltenos sobre esta noticia",
    categories: {
      Events: "Eventos",
      Manufacturing: "Fabricación",
      Sustainability: "Sostenibilidad",
      Company: "Empresa",
    },
  },
  ru: {
    eyebrow: "Новости",
    title: "Проверенные новости HAILAN.",
    lede: "Новости компании публикуются здесь после проверки фактов и источников.",
    emptyTitle: "Мы готовим новые материалы.",
    emptyText: "Проверенных статей для публикации пока нет. Загляните сюда позже.",
    readArticle: "Читать",
    allNews: "Все новости",
    backToNews: "Все новости",
    moreNews: "Другие новости HAILAN",
    contactAboutArticle: "Связаться с нами по этой новости",
    categories: {
      Events: "События",
      Manufacturing: "Производство",
      Sustainability: "Устойчивое развитие",
      Company: "Компания",
    },
  },
  ar: {
    eyebrow: "الأخبار",
    title: "آخر أخبار HAILAN الموثّقة.",
    lede: "تُنشر أخبار الشركة هنا بعد مراجعة الحقائق والمواد المصدرية.",
    emptyTitle: "نعمل على إعداد أخبار جديدة.",
    emptyText: "لا توجد حالياً مقالات موثّقة جاهزة للنشر. نرجو العودة قريباً.",
    readArticle: "قراءة المقال",
    allNews: "كل الأخبار",
    backToNews: "كل الأخبار",
    moreNews: "المزيد من HAILAN",
    contactAboutArticle: "تواصل معنا بشأن هذا الخبر",
    categories: {
      Events: "الفعاليات",
      Manufacturing: "التصنيع",
      Sustainability: "الاستدامة",
      Company: "الشركة",
    },
  },
  ja: {
    eyebrow: "ニュース",
    title: "HAILANの確認済み最新情報。",
    lede: "事実と出典資料の確認が完了した企業情報を、こちらで公開します。",
    emptyTitle: "新しい情報を準備しています。",
    emptyText: "現在、公開できる確認済みの記事はありません。しばらくお待ちください。",
    readArticle: "記事を読む",
    allNews: "ニュース一覧",
    backToNews: "ニュース一覧",
    moreNews: "HAILANのその他の情報",
    contactAboutArticle: "この情報について問い合わせる",
    categories: {
      Events: "イベント",
      Manufacturing: "製造",
      Sustainability: "サステナビリティ",
      Company: "会社情報",
    },
  },
  ms: {
    eyebrow: "Berita",
    title: "Kemas kini HAILAN yang disahkan.",
    lede: "Kemas kini syarikat diterbitkan di sini selepas fakta dan sumbernya disemak.",
    emptyTitle: "Kemas kini baharu sedang disediakan.",
    emptyText: "Belum ada artikel yang disahkan untuk diterbitkan. Sila semak semula nanti.",
    readArticle: "Baca artikel",
    allNews: "Semua berita",
    backToNews: "Semua berita",
    moreNews: "Lagi daripada HAILAN",
    contactAboutArticle: "Hubungi kami tentang kemas kini ini",
    categories: {
      Events: "Acara",
      Manufacturing: "Pembuatan",
      Sustainability: "Kelestarian",
      Company: "Syarikat",
    },
  },
  id: {
    eyebrow: "Berita",
    title: "Kabar terverifikasi dari HAILAN.",
    lede: "Kabar perusahaan diterbitkan di sini setelah fakta dan sumbernya ditinjau.",
    emptyTitle: "Kabar baru sedang disiapkan.",
    emptyText: "Belum ada artikel terverifikasi yang siap diterbitkan. Silakan kembali lagi nanti.",
    readArticle: "Baca artikel",
    allNews: "Semua berita",
    backToNews: "Semua berita",
    moreNews: "Kabar lain dari HAILAN",
    contactAboutArticle: "Hubungi kami tentang kabar ini",
    categories: {
      Events: "Acara",
      Manufacturing: "Manufaktur",
      Sustainability: "Keberlanjutan",
      Company: "Perusahaan",
    },
  },
};

export function getNewsCopy(locale: Locale): NewsCopy {
  return copy[locale];
}
