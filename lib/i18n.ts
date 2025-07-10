import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
  translation: {
    // Navigation
    language: 'Language',
    home: 'Home',
    dashboard: 'Dashboard',
    customers: 'Customers',
    orders: 'Orders',
    invoices: 'Invoices',
    reports: 'Reports',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    
    // Common actions
    search: 'Search',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    submit: 'Submit',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    
    // Months
    month1: 'January',
    month2: 'February',
    month3: 'March',
    month4: 'April',
    month5: 'May',
    month6: 'June',
    month7: 'July',
    month8: 'August',
    month9: 'September',
    month10: 'October',
    month11: 'November',
    month12: 'December',
    
    // Features
    features: 'Features',
    eliminateManualEntry: 'Eliminate manual data re-entry',
    eliminateManualEntryDesc: 'Save time and reduce errors by automating data transfer between systems.',
    eliminateManualEntryFullDesc: 'Our system eliminates the need for manual data re-entry by providing seamless data import and export capabilities. Save time and reduce errors by automating data transfer between systems.',
    automatedAccounting: 'Automated accounting integration',
    automatedAccountingDesc: 'Sync with accounting software to eliminate double-entry and keep books up to date.',
    automatedAccountingFullDesc: 'Integrate directly with popular accounting software to automatically sync invoices, payments, and financial data. Eliminate double-entry and ensure your books are always up to date.',
    
    // Data Entry Feature
    dataEntryBenefits: 'Benefits',
    dataEntryBenefit1: 'Reduce data entry time by up to 80%',
    dataEntryBenefit2: 'Eliminate human error in data transfer',
    dataEntryBenefit3: 'Seamless import from Excel, CSV, and other formats',
    dataEntryBenefit4: 'Automatic data validation and error checking',
    howItWorks: 'How It Works',
    dataEntryStep1Title: 'Upload your data',
    dataEntryStep1Desc: 'Import data from Excel, CSV, or connect directly to other systems',
    dataEntryStep2Title: 'Map your fields',
    dataEntryStep2Desc: 'Our system intelligently maps fields or allows custom mapping',
    dataEntryStep3Title: 'Validate and import',
    dataEntryStep3Desc: 'Review data quality and import with a single click',
    tryDataImport: 'Try Data Import Now',
    
    // Accounting Integration Feature
    accountingBenefits: 'Benefits',
    accountingBenefit1: 'Automatic syncing of invoices and payments',
    accountingBenefit2: 'Real-time financial reporting',
    accountingBenefit3: 'Eliminate double-entry bookkeeping',
    accountingBenefit4: 'Reduce accounting errors and reconciliation time',
    integrationOptions: 'Integration Options',
    quickBooks: 'QuickBooks Online',
    quickBooksDesc: 'Bi-directional sync with QuickBooks Online for invoices, payments, and customers',
    xero: 'Xero',
    xeroDesc: 'Connect your Xero account for seamless financial data transfer',
    sage: 'Sage',
    sageDesc: 'Integrate with Sage accounting software for comprehensive financial management',
    realTimeSync: 'Real-Time Synchronization',
    autoSyncTitle: 'Automatic Background Syncing',
    autoSyncDesc: 'Data is synchronized automatically in the background, ensuring your accounting system is always up to date without manual intervention.',
    
    // Reports Page
    financialReports: 'Financial Reports',
    csvDownload: 'CSV Download',
    pdfReport: 'PDF Report',
    monthlyRevenue: 'Monthly Revenue',
    monthlyRevenueDesc: 'Monthly revenue comparison between divisions',
    divisionRevenueComparison: 'Division Revenue Comparison',
    divisionRevenueDesc: 'Percentage breakdown of revenue by division',
    financialSummary: 'Financial Summary',
    accountingEffectiveness: 'Accounting Integration Effects',
    accountingEffectivenessDesc: 'Measured improvements after implementing automated accounting integration',
    timeReduction: 'Time Reduction',
    errorReduction: 'Error Reduction',
    dataVisibility: 'Data Visibility',
    processingSpeed: 'Processing Speed Improvement',
    accountItem: 'Account Item',
    sewingDivision: 'Sewing Division',
    interiorDivision: 'Interior Division',
    total: 'Total',
    revenue: 'Revenue',
    materialCosts: 'Material Costs',
    laborCosts: 'Labor Costs',
    otherExpenses: 'Other Expenses',
    netProfit: 'Net Profit',
    reportingTitle: 'Unified Reporting',
    reportingDesc: 'Generate financial reports that combine data from both systems for comprehensive business insights.',
    setupAccountingIntegration: 'Set Up Accounting Integration',
    learnMore: 'Learn More',
    
    // Dashboard
    dashboardTitle: 'Dashboard',
    welcome: 'Welcome to Iwate DX Unified System',
    summary: 'Business Summary',
    recentOrders: 'Recent Orders',
    recentInvoices: 'Recent Invoices',
    salesOverview: 'Sales Overview',
    customerGrowth: 'Customer Growth',
    totalCustomers: 'Total Customers',
    
    // Customers
    customersTitle: 'Customers',
    addCustomer: 'Add Customer',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    company: 'Company',
    status: 'Status',
    actions: 'Actions',
    contact: 'Contact',
    lastOrder: 'Last Order',
    allCustomers: 'All Customers',
    sewingDivisionCustomers: 'Sewing Division Customers',
    interiorDivisionCustomers: 'Interior Division Customers',
    search: 'Search by name, company, email',
    tanakaTaro: 'Tanaka Taro',
    tanakaShoji: 'Tanaka Shoji',
    satoHanako: 'Sato Hanako',
    satoKogyo: 'Sato Kogyo',
    yamadaJiro: 'Yamada Jiro',
    yamadaDesign: 'Yamada Design',
    
    // Invoices
    invoicesTitle: 'Invoices',
    createInvoice: 'Create Invoice',
    invoiceNumber: 'Invoice Number',
    customerName: 'Customer',
    issueDate: 'Issue Date',
    dueDate: 'Due Date',
    amount: 'Amount',
    paid: 'Paid',
    sent: 'Sent',
    overdue: 'Overdue',
    draft: 'Draft',
    division: 'Division',
    taxIncluded: '(Tax Included)',
    invoicesAutoGenerated: 'Invoices are automatically generated when orders are confirmed',
    searchInvoices: 'Search by invoice number, customer name',
    allDivisions: 'All Divisions',
    allStatuses: 'All Statuses'
  }
};

// Japanese translations
const jaTranslations = {
  translation: {
    // Navigation
    language: '言語',
    home: 'ホーム',
    dashboard: 'ダッシュボード',
    customers: '顧客',
    orders: '注文',
    invoices: '請求書',
    reports: 'レポート',
    settings: '設定',
    profile: 'プロフィール',
    logout: 'ログアウト',
    
    // Common actions
    search: '検索',
    save: '保存',
    cancel: 'キャンセル',
    delete: '削除',
    edit: '編集',
    create: '作成',
    submit: '送信',
    back: '戻る',
    next: '次へ',
    previous: '前へ',
    
    // Months
    month1: '1月',
    month2: '2月',
    month3: '3月',
    month4: '4月',
    month5: '5月',
    month6: '6月',
    month7: '7月',
    month8: '8月',
    month9: '9月',
    month10: '10月',
    month11: '11月',
    month12: '12月',
    
    // Features
    features: '機能',
    eliminateManualEntry: '手動データ再入力の排除',
    eliminateManualEntryDesc: 'システム間のデータ転送を自動化し、時間を節約しエラーを減らします。',
    eliminateManualEntryFullDesc: '当システムは、シームレスなデータのインポートとエクスポート機能により、手動でのデータ再入力の必要性を排除します。システム間のデータ転送を自動化することで、時間を節約しエラーを減らします。',
    automatedAccounting: '会計の自動統合',
    automatedAccountingDesc: '会計ソフトと同期し、二重入力を排除して帳簿を最新に保ちます。',
    automatedAccountingFullDesc: '人気の会計ソフトウェアと直接統合して、請求書、支払い、財務データを自動的に同期します。二重入力を排除し、帳簿が常に最新の状態であることを確保します。',
    
    // Data Entry Feature
    dataEntryBenefits: 'メリット',
    dataEntryBenefit1: 'データ入力時間を最大80%削減',
    dataEntryBenefit2: 'データ転送における人的ミスを排除',
    dataEntryBenefit3: 'Excel、CSVなどからのシームレスなインポート',
    dataEntryBenefit4: '自動データ検証とエラーチェック',
    howItWorks: '仕組み',
    dataEntryStep1Title: 'データをアップロード',
    dataEntryStep1Desc: 'Excel、CSVからデータをインポート、または他のシステムに直接接続',
    dataEntryStep2Title: 'フィールドをマッピング',
    dataEntryStep2Desc: 'システムがフィールドを自動的にマッピング、またはカスタムマッピングが可能',
    dataEntryStep3Title: '検証してインポート',
    dataEntryStep3Desc: 'データ品質を確認し、ワンクリックでインポート',
    tryDataImport: 'データインポートを試す',
    
    // Accounting Integration Feature
    accountingBenefits: 'メリット',
    accountingBenefit1: '請求書と支払いの自動同期',
    accountingBenefit2: 'リアルタイム財務レポート',
    accountingBenefit3: '二重帳簿記入の排除',
    accountingBenefit4: '会計エラーと照合時間の削減',
    integrationOptions: '統合オプション',
    quickBooks: 'QuickBooks Online',
    quickBooksDesc: '請求書、支払い、顧客のQuickBooks Onlineとの双方向同期',
    xero: 'Xero',
    xeroDesc: 'シームレスな財務データ転送のためのXeroアカウント接続',
    sage: 'Sage',
    sageDesc: '包括的な財務管理のためのSage会計ソフトウェアとの統合',
    realTimeSync: 'リアルタイム同期',
    autoSyncTitle: '自動バックグラウンド同期',
    autoSyncDesc: 'データはバックグラウンドで自動的に同期され、手動操作なしで会計システムが常に最新の状態に保たれます。',
    
    // Reports
    financialReports: '財務レポート',
    csvDownload: 'CSVダウンロード',
    pdfReport: 'PDFレポート',
    monthlyRevenue: '月次売上',
    monthlyRevenueDesc: '部門別の月次売上比較',
    divisionRevenueComparison: '部門別売上比較',
    divisionRevenueDesc: '部門別の売上割合の内訳',
    financialSummary: '財務サマリー',
    accountingEffectiveness: '会計統合の効果',
    accountingEffectivenessDesc: '会計システム統合によるビジネス効率の向上',
    timeReduction: '時間削減',
    errorReduction: 'エラー削減',
    dataVisibility: 'データ可視性',
    processingSpeed: '処理速度向上',
    accountItem: '勘定科目',
    sewingDivision: '縫製部門',
    interiorDivision: 'インテリア部門',
    total: '合計',
    revenue: '売上高',
    materialCosts: '材料費',
    laborCosts: '人件費',
    otherExpenses: 'その他経費',
    netProfit: '純利益',
    reportingTitle: '統合レポート',
    reportingDesc: '包括的なビジネスインサイトのために両システムからのデータを組み合わせた財務レポートを生成します。',
    setupAccountingIntegration: '会計統合を設定',
    learnMore: '詳細を見る',
    
    // Dashboard
    dashboardTitle: 'ダッシュボード',
    welcome: 'いわてDX統合システムへようこそ',
    summary: 'ビジネス概要',
    recentOrders: '最近の注文',
    recentInvoices: '最近の請求書',
    salesOverview: '売上概要',
    customerGrowth: '顧客成長',
    totalCustomers: '顧客総数',
    
    // Customers
    customersTitle: '顧客',
    addCustomer: '顧客を追加',
    name: '名前',
    email: 'メール',
    phone: '電話番号',
    address: '住所',
    company: '会社',
    status: 'ステータス',
    actions: 'アクション',
    
    // Invoices
    invoicesTitle: '請求書',
    createInvoice: '請求書を作成',
    invoiceNumber: '請求書番号',
    customer: '顧客',
    issueDate: '発行日',
    dueDate: '支払期日',
    amount: '金額',
    paid: '支払済',
    sent: '送信済',
    overdue: '期限超過',
    draft: '下書き'
  }
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslations,
      ja: jaTranslations,
    },
    fallbackLng: 'ja',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
