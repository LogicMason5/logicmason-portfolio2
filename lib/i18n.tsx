"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Lang = "en" | "fr" | "ja"

export const flags: Record<Lang, string> = { en: "🇬🇧", fr: "🇫🇷", ja: "🇯🇵" }
export const langLabels: Record<Lang, string> = { en: "EN", fr: "FR", ja: "JA" }

// ─────────────────────────────────────────────────────────────────────────────
// Translation dictionary
// ─────────────────────────────────────────────────────────────────────────────
export const t: Record<Lang, {
  // nav
  nav: string[]
  // hero
  heroBadge: string
  heroLine1: string
  heroLine2: string
  heroLine3: string
  heroDesc: string
  heroContact: string
  heroProjects: string
  // about
  aboutTitle: string
  aboutDesc: string
  aboutYears: string
  aboutYearsLabel: string
  aboutProjects: string
  aboutProjectsLabel: string
  aboutCerts: string
  aboutCertsLabel: string
  // services
  servicesTitle: string
  servicesSubtitle: string
  services: {
    title: string
    description: string
    features: string[]
  }[]
  // skills
  skillsTitle: string
  skillsSubtitle: string
  // reviews
  reviewsTitle: string
  reviewsSubtitle: string
  reviewsCount: string
  reviews: { comment: string }[]
  // projects
  projectsTitle: string
  projectsSubtitle: string
  projectsAll: string
  projectsFullStack: string
  projectsMobile: string
  projectsAI: string
  projectsShowMore: string
  projectsShowLess: string
  projectsTech: string
  projectsViewDemo: string
  projectsViewSource: string
  projectsPrivateNote: string
  projectsPublicNote: string
  // contact
  contactTitle: string
  contactSubtitle: string
  contactResponseTime: string
  contactPriority: string
  contactHigh: string
  contactETA: string
  contactAvailability: string
  contactMonitoring: string
  contactGlobal: string
  contactDownloadCV: string
  // footer
  footerRights: string
  footerCreatedBy: string
  // chatbot
  chatbotTitle: string
  chatbotOnline: string
  chatbotPlaceholder: string
  chatbotWelcome: string
  chatbotSuggestions: string[]
  chatbotFallback: string
}> = {
  // ── ENGLISH ────────────────────────────────────────────────────────────────
  en: {
    nav: ["Home", "About", "Services", "Projects", "Reviews", "Contact"],
    heroBadge: "AI Engineer · Full-Stack · LLMs & Agent Systems",
    heroLine1: "Building",
    heroLine2: "Intelligent",
    heroLine3: "Digital Solutions",
    heroDesc:
      "Specializing in AI agent systems, LLM integration, chatbots, full-stack web applications, and personal websites. Transforming ideas into intelligent, scalable digital products — from concept to production.",
    heroContact: "Get In Touch",
    heroProjects: "View Projects",
    aboutTitle: "About Me",
    aboutDesc:
      "I'm a Full-Stack & AI Engineer with 7+ years of experience building intelligent web and mobile applications. My core focus is AI engineering — designing LLM-powered systems, autonomous AI agents, conversational chatbots, and RAG pipelines — combined with full-stack development using React, Next.js, Node.js, and FastAPI. I craft everything from polished personal websites to production-grade SaaS platforms, always prioritizing clean architecture, performance, and exceptional user experience.",
    aboutYears: "7+ Years",
    aboutYearsLabel: "AI, Full-Stack & Mobile Experience",
    aboutProjects: "45+",
    aboutProjectsLabel: "AI & Full-Stack Projects",
    aboutCerts: "15+",
    aboutCertsLabel: "AI & Tech Certifications",
    servicesTitle: "Services",
    servicesSubtitle: "Comprehensive AI, full-stack, and mobile development services for modern applications",
    services: [
      {
        title: "AI/ML Integration",
        description: "Implement cutting-edge machine learning models and AI solutions using TensorFlow, PyTorch, and LangChain for intelligent applications.",
        features: ["LLM Integration", "ML Models", "NLP Solutions", "Computer Vision"],
      },
      {
        title: "Full-Stack Development",
        description: "End-to-end web application development with modern frameworks like Next.js, React, and Node.js with scalable, secure architectures.",
        features: ["Next.js Apps", "API Development", "Database Design", "Real-time Features"],
      },
      {
        title: "Mobile Development",
        description: "Native and cross-platform mobile applications for iOS and Android using React Native, Flutter, Swift, and Kotlin.",
        features: ["iOS Apps", "Android Apps", "Cross-platform", "App Store Deployment"],
      },
      {
        title: "Cloud & DevOps",
        description: "Scalable cloud infrastructure and deployment using AWS, Google Cloud, and modern DevOps practices.",
        features: ["Cloud Migration", "CI/CD Pipelines", "Container Orchestration", "Performance Optimization"],
      },
      {
        title: "Database Architecture",
        description: "Design and implementation of robust database solutions with PostgreSQL, MySQL, MongoDB, and modern ORMs.",
        features: ["Schema Design", "Query Optimization", "Data Migration", "Backup Strategies"],
      },
      {
        title: "Performance & Optimization",
        description: "Enhance application speed and efficiency through code optimization, caching strategies, and modern best practices.",
        features: ["Code Splitting", "Lazy Loading", "Caching", "Lighthouse Optimization"],
      },
    ],
    skillsTitle: "Technical Expertise",
    skillsSubtitle: "Mastering modern technologies to build exceptional solutions",
    reviewsTitle: "Client Reviews",
    reviewsSubtitle: "What clients say about my AI, full-stack, and mobile work",
    reviewsCount: "reviews",
    reviews: [
      { comment: "Exceptional AI integration work on our platform. The ML models were accurate and the full-stack architecture was outstanding. Delivered ahead of schedule." },
      { comment: "Brilliant mobile app development with AI features. The UI/UX is flawless, performance incredible, and the AI assistant works perfectly. Highly recommend!" },
      { comment: "Great full-stack developer with strong AI/ML problem-solving skills. Built our entire platform with LLM integration from scratch with excellent architecture." },
      { comment: "Outstanding AI/ML expertise. The machine learning models and TensorFlow implementation are performing beyond expectations. Exceptional technical knowledge." },
      { comment: "Exceptional work on our AI-powered DeFi platform. Full-stack expertise, security-first approach, and clean code. Will definitely work together again." },
      { comment: "Excellent mobile development skills with AI integration. The healthcare app with predictive analytics is HIPAA-compliant and user-friendly. Great collaboration." },
    ],
    projectsTitle: "Featured Projects",
    projectsSubtitle: "Showcasing innovative solutions across mobile, web, and AI platforms",
    projectsAll: "All Projects",
    projectsFullStack: "Full-Stack",
    projectsMobile: "Mobile",
    projectsAI: "AI",
    projectsShowMore: "Show More",
    projectsShowLess: "Show Less",
    projectsTech: "Technologies Used:",
    projectsViewDemo: "View Demo",
    projectsViewSource: "View Source",
    projectsPrivateNote: "Access to GitHub repositories requires user's permission.",
    projectsPublicNote: "Public repository",
    contactTitle: "Get In Touch",
    contactSubtitle: "Let's discuss your next project",
    contactResponseTime: "RESPONSE TIME",
    contactPriority: "PRIORITY:",
    contactHigh: "HIGH",
    contactETA: "ETA:",
    contactAvailability: "AVAILABILITY",
    contactMonitoring: "24/7 MONITORING",
    contactGlobal: "GLOBAL COVERAGE",
    contactDownloadCV: "Download CV",
    footerRights: "All rights reserved.",
    footerCreatedBy: "Created by",
    chatbotTitle: "LogicMason Assistant",
    chatbotOnline: "Online",
    chatbotPlaceholder: "Ask me anything...",
    chatbotWelcome: "Hi there! 👋 I'm LogicMason's assistant. Ask me about his skills, projects, services, or how to get in touch!",
    chatbotSuggestions: ["What are your skills?", "Show me your projects", "How can I hire you?", "What services do you offer?", "How to contact you?"],
    chatbotFallback: "I'm not sure about that one. Try asking about skills, projects, services, or contact info — or reach out directly at logicmason5@gmail.com 📧",
  },

  // ── FRENCH ─────────────────────────────────────────────────────────────────
  fr: {
    nav: ["Accueil", "À propos", "Services", "Projets", "Avis", "Contact"],
    heroBadge: "Ingénieur IA · Full-Stack · LLMs & Agents",
    heroLine1: "Construire",
    heroLine2: "des Solutions",
    heroLine3: "Intelligentes",
    heroDesc:
      "Spécialisé dans les agents IA, l'intégration LLM, les chatbots, le développement full-stack et les sites personnels. Transformer les idées en produits numériques intelligents et évolutifs — du concept à la production.",
    heroContact: "Me Contacter",
    heroProjects: "Voir les Projets",
    aboutTitle: "À Propos",
    aboutDesc:
      "Je suis un ingénieur Full-Stack & IA avec plus de 7 ans d'expérience dans la création d'applications web et mobiles intelligentes. Mon cœur de métier est l'ingénierie IA — conception de systèmes LLM, agents IA autonomes, chatbots conversationnels et pipelines RAG — combinée au développement full-stack avec React, Next.js, Node.js et FastAPI. Je réalise aussi bien des sites personnels soignés que des plateformes SaaS en production.",
    aboutYears: "7+ Ans",
    aboutYearsLabel: "Expérience IA, Full-Stack & Mobile",
    aboutProjects: "100+",
    aboutProjectsLabel: "Projets IA & Full-Stack",
    aboutCerts: "15+",
    aboutCertsLabel: "Certifications IA & Tech",
    servicesTitle: "Services",
    servicesSubtitle: "Services complets de développement IA, full-stack et mobile pour les applications modernes",
    services: [
      {
        title: "Intégration IA/ML",
        description: "Implémentation de modèles de machine learning et de solutions IA de pointe avec TensorFlow, PyTorch et LangChain.",
        features: ["Intégration LLM", "Modèles ML", "Solutions NLP", "Vision par Ordinateur"],
      },
      {
        title: "Développement Full-Stack",
        description: "Développement d'applications web de bout en bout avec des frameworks modernes comme Next.js, React et Node.js.",
        features: ["Applications Next.js", "Développement API", "Conception BDD", "Fonctionnalités Temps Réel"],
      },
      {
        title: "Développement Mobile",
        description: "Applications mobiles natives et multiplateformes pour iOS et Android avec React Native, Flutter, Swift et Kotlin.",
        features: ["Applications iOS", "Applications Android", "Multiplateforme", "Déploiement App Store"],
      },
      {
        title: "Cloud & DevOps",
        description: "Infrastructure cloud évolutive et déploiement avec AWS, Google Cloud et les pratiques DevOps modernes.",
        features: ["Migration Cloud", "Pipelines CI/CD", "Orchestration de Conteneurs", "Optimisation des Performances"],
      },
      {
        title: "Architecture de Base de Données",
        description: "Conception et implémentation de solutions de base de données robustes avec PostgreSQL, MySQL, MongoDB et des ORM modernes.",
        features: ["Conception de Schéma", "Optimisation des Requêtes", "Migration de Données", "Stratégies de Sauvegarde"],
      },
      {
        title: "Performance & Optimisation",
        description: "Améliorer la vitesse et l'efficacité des applications grâce à l'optimisation du code, les stratégies de mise en cache et les meilleures pratiques modernes.",
        features: ["Découpage du Code", "Chargement Différé", "Mise en Cache", "Optimisation Lighthouse"],
      },
    ],
    skillsTitle: "Expertise Technique",
    skillsSubtitle: "Maîtriser les technologies modernes pour créer des solutions exceptionnelles",
    reviewsTitle: "Avis Clients",
    reviewsSubtitle: "Ce que les clients disent de mon travail en IA, full-stack et mobile",
    reviewsCount: "avis",
    reviews: [
      { comment: "Travail exceptionnel d'intégration IA sur notre plateforme. Les modèles ML étaient précis et l'architecture full-stack était remarquable. Livré avant le délai prévu." },
      { comment: "Développement d'application mobile brillant avec des fonctionnalités IA. L'UI/UX est impeccable, les performances incroyables et l'assistant IA fonctionne parfaitement." },
      { comment: "Excellent développeur full-stack avec de solides compétences en résolution de problèmes IA/ML. A construit toute notre plateforme avec intégration LLM depuis zéro." },
      { comment: "Expertise IA/ML remarquable. Les modèles de machine learning et l'implémentation TensorFlow dépassent les attentes. Connaissances techniques exceptionnelles." },
      { comment: "Travail exceptionnel sur notre plateforme DeFi alimentée par l'IA. Expertise full-stack, approche axée sur la sécurité et code propre. Nous travaillerons à nouveau ensemble." },
      { comment: "Excellentes compétences en développement mobile avec intégration IA. L'application de santé avec analyses prédictives est conforme HIPAA et conviviale." },
    ],
    projectsTitle: "Projets Phares",
    projectsSubtitle: "Des solutions innovantes sur les plateformes mobile, web et IA",
    projectsAll: "Tous les Projets",
    projectsFullStack: "Full-Stack",
    projectsMobile: "Mobile",
    projectsAI: "IA",
    projectsShowMore: "Voir Plus",
    projectsShowLess: "Voir Moins",
    projectsTech: "Technologies Utilisées :",
    projectsViewDemo: "Voir la Démo",
    projectsViewSource: "Voir le Code",
    projectsPrivateNote: "L'accès aux dépôts GitHub nécessite la permission de l'utilisateur.",
    projectsPublicNote: "Dépôt public",
    contactTitle: "Me Contacter",
    contactSubtitle: "Discutons de votre prochain projet",
    contactResponseTime: "TEMPS DE RÉPONSE",
    contactPriority: "PRIORITÉ :",
    contactHigh: "HAUTE",
    contactETA: "DÉLAI :",
    contactAvailability: "DISPONIBILITÉ",
    contactMonitoring: "SURVEILLANCE 24/7",
    contactGlobal: "COUVERTURE MONDIALE",
    contactDownloadCV: "Télécharger le CV",
    footerRights: "Tous droits réservés.",
    footerCreatedBy: "Créé par",
    chatbotTitle: "Assistant LogicMason",
    chatbotOnline: "En ligne",
    chatbotPlaceholder: "Posez-moi une question...",
    chatbotWelcome: "Bonjour ! 👋 Je suis l'assistant de LogicMason. Posez-moi des questions sur ses compétences, projets, services ou comment le contacter !",
    chatbotSuggestions: ["Quelles sont vos compétences ?", "Montrez-moi vos projets", "Comment vous recruter ?", "Quels services proposez-vous ?", "Comment vous contacter ?"],
    chatbotFallback: "Je ne suis pas sûr de ça. Essayez de demander des compétences, projets, services ou coordonnées — ou contactez directement logicmason5@gmail.com 📧",
  },

  // ── JAPANESE ───────────────────────────────────────────────────────────────
  ja: {
    nav: ["ホーム", "について", "サービス", "プロジェクト", "レビュー", "お問い合わせ"],
    heroBadge: "AIエンジニア・フルスタック・LLM & エージェント",
    heroLine1: "構築する",
    heroLine2: "インテリジェントな",
    heroLine3: "デジタルソリューション",
    heroDesc:
      "AIエージェントシステム、LLM統合、チャットボット、フルスタックWebアプリ、パーソナルサイト制作を専門としています。アイデアをコンセプトから本番環境まで、インテリジェントでスケーラブルなデジタルプロダクトに変換します。",
    heroContact: "お問い合わせ",
    heroProjects: "プロジェクトを見る",
    aboutTitle: "私について",
    aboutDesc:
      "7年以上の経験を持つフルスタック＆AIエンジニアです。LLMシステム設計、自律型AIエージェント、会話型チャットボット、RAGパイプラインなどのAIエンジニアリングを核に、React・Next.js・Node.js・FastAPIを用いたフルスタック開発を組み合わせています。洗練されたパーソナルサイトから本番グレードのSaaSプラットフォームまで、クリーンなアーキテクチャ・高パフォーマンス・優れたユーザー体験を常に追求しています。",
    aboutYears: "7年以上",
    aboutYearsLabel: "AI・フルスタック・モバイル経験",
    aboutProjects: "100+",
    aboutProjectsLabel: "AI・フルスタックプロジェクト",
    aboutCerts: "15+",
    aboutCertsLabel: "AI・技術認定資格",
    servicesTitle: "サービス",
    servicesSubtitle: "現代のアプリケーション向けの包括的なAI・フルスタック・モバイル開発サービス",
    services: [
      {
        title: "AI/ML統合",
        description: "TensorFlow、PyTorch、LangChainを使用した最先端の機械学習モデルとAIソリューションの実装。",
        features: ["LLM統合", "MLモデル", "NLPソリューション", "コンピュータビジョン"],
      },
      {
        title: "フルスタック開発",
        description: "Next.js、React、Node.jsなどの最新フレームワークを使用したエンドツーエンドのWebアプリケーション開発。",
        features: ["Next.jsアプリ", "API開発", "データベース設計", "リアルタイム機能"],
      },
      {
        title: "モバイル開発",
        description: "React Native、Flutter、Swift、KotlinによるiOSおよびAndroid向けのネイティブおよびクロスプラットフォームモバイルアプリ。",
        features: ["iOSアプリ", "Androidアプリ", "クロスプラットフォーム", "App Storeデプロイ"],
      },
      {
        title: "クラウド & DevOps",
        description: "AWS、Google Cloudと最新のDevOpsプラクティスを使用したスケーラブルなクラウドインフラとデプロイ。",
        features: ["クラウド移行", "CI/CDパイプライン", "コンテナオーケストレーション", "パフォーマンス最適化"],
      },
      {
        title: "データベースアーキテクチャ",
        description: "PostgreSQL、MySQL、MongoDBと最新のORMを使用した堅牢なデータベースソリューションの設計と実装。",
        features: ["スキーマ設計", "クエリ最適化", "データ移行", "バックアップ戦略"],
      },
      {
        title: "パフォーマンス & 最適化",
        description: "コード最適化、キャッシュ戦略、最新のベストプラクティスによるアプリケーションの速度と効率の向上。",
        features: ["コード分割", "遅延読み込み", "キャッシュ", "Lighthouse最適化"],
      },
    ],
    skillsTitle: "技術的専門知識",
    skillsSubtitle: "優れたソリューションを構築するための最新技術の習得",
    reviewsTitle: "クライアントレビュー",
    reviewsSubtitle: "AI・フルスタック・モバイル開発に関するクライアントの声",
    reviewsCount: "件のレビュー",
    reviews: [
      { comment: "プラットフォームへの卓越したAI統合作業。MLモデルは正確で、フルスタックアーキテクチャは素晴らしかった。スケジュールより早く納品されました。" },
      { comment: "AI機能を備えた素晴らしいモバイルアプリ開発。UI/UXは完璧で、パフォーマンスは驚異的で、AIアシスタントは完璧に動作します。強くお勧めします！" },
      { comment: "強力なAI/ML問題解決スキルを持つ優れたフルスタック開発者。LLM統合を含むプラットフォーム全体をゼロから構築しました。" },
      { comment: "卓越したAI/ML専門知識。機械学習モデルとTensorFlowの実装は期待を超えています。例外的な技術知識です。" },
      { comment: "AI搭載DeFiプラットフォームでの卓越した作業。フルスタックの専門知識、セキュリティ優先のアプローチ、クリーンなコード。また一緒に仕事をします。" },
      { comment: "AI統合を備えた優れたモバイル開発スキル。予測分析を備えたヘルスケアアプリはHIPAA準拠でユーザーフレンドリーです。" },
    ],
    projectsTitle: "注目プロジェクト",
    projectsSubtitle: "モバイル、Web、AIプラットフォームにわたる革新的なソリューション",
    projectsAll: "全プロジェクト",
    projectsFullStack: "フルスタック",
    projectsMobile: "モバイル",
    projectsAI: "AI",
    projectsShowMore: "もっと見る",
    projectsShowLess: "折りたたむ",
    projectsTech: "使用技術：",
    projectsViewDemo: "デモを見る",
    projectsViewSource: "ソースを見る",
    projectsPrivateNote: "GitHubリポジトリへのアクセスにはユーザーの許可が必要です。",
    projectsPublicNote: "公開リポジトリ",
    contactTitle: "お問い合わせ",
    contactSubtitle: "次のプロジェクトについて話し合いましょう",
    contactResponseTime: "応答時間",
    contactPriority: "優先度：",
    contactHigh: "高",
    contactETA: "目安：",
    contactAvailability: "対応可能時間",
    contactMonitoring: "24時間365日監視",
    contactGlobal: "グローバル対応",
    contactDownloadCV: "履歴書をダウンロード",
    footerRights: "全著作権所有。",
    footerCreatedBy: "制作：",
    chatbotTitle: "LogicMasonアシスタント",
    chatbotOnline: "オンライン",
    chatbotPlaceholder: "何でも聞いてください...",
    chatbotWelcome: "こんにちは！👋 LogicMasonのアシスタントです。スキル、プロジェクト、サービス、連絡方法について何でも聞いてください！",
    chatbotSuggestions: ["スキルを教えてください", "プロジェクトを見せてください", "採用するには？", "どんなサービスがありますか？", "連絡方法は？"],
    chatbotFallback: "それについてはわかりません。スキル、プロジェクト、サービス、連絡先について質問してみてください。または logicmason5@gmail.com に直接ご連絡ください 📧",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────
interface I18nContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  tr: typeof t["en"]
}

const I18nContext = createContext<I18nContextValue>({
  lang: "en",
  setLang: () => {},
  tr: t.en,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  return (
    <I18nContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
