export const SKILLS_MAPPING = {
    // Теория testing
    'theory_fundamentals': {
        id: 'fundamentals',
        skill: 'STLC və SDLC Bilikləri',
        category: 'Nəzəriyyə'
    },
    'theory_types': {
        id: 'types',
        skill: 'Test Növləri və Səviyyələri',
        category: 'Nəzəriyyə'
    },
    'theory_artifacts': {
        id: 'artifacts',
        skill: 'Test Sənədləşməsi (Plan, Case, Bug Report)',
        category: 'Nəzəriyyə'
    },

    // Практика
    'practice_registration': {
        id: 'func_testing',
        skill: 'Funksional Testləmə',
        category: 'Manual Testləmə'
    },
    'practice_ecommerce': {
        id: 'ecom_testing',
        skill: 'E-ticarət Məntiqinin Testlənməsi',
        category: 'Manual Testləmə'
    },
    'practice_api': {
        id: 'api_testing',
        skill: 'API Testləmə (REST, Postman)',
        category: 'Texniki'
    },
    'practice_sql': {
        id: 'sql',
        skill: 'SQL Sorğuları',
        category: 'Texniki'
    },
    'practice_security': {
        id: 'security_basics',
        skill: 'Təhlükəsizlik Əsasları (OWASP)',
        category: 'Təhlükəsizlik'
    },
    'practice_mobile': {
        id: 'mobile_testing',
        skill: 'Mobil Testləmə Qaydaları',
        category: 'Mobil'
    },

    // Automation
    'practice_automation': {
        id: 'selenium_basic',
        skill: 'Test Avtomatlaşdırılması (Selenium/Java)',
        category: 'Avtomatlaşdırma'
    },
    'automation_advanced': {
        id: 'selenium_advanced',
        skill: 'Page Object Model & Waits',
        category: 'Avtomatlaşdırma'
    },

    // Advanced Practice
    'api_advanced': {
        id: 'api_advanced',
        skill: 'API Environment & Auth (Bearer/OAuth)',
        category: 'Texniki'
    },
    'sql_advanced': {
        id: 'sql_advanced',
        skill: 'Mürəkkəb SQL Sorğuları (Joins, Aggregations)',
        category: 'Texniki'
    },

    // Soft Skills / Interview
    'interview_soft': {
        id: 'soft_communication',
        skill: 'Texniki Ünsiyyət & STAR Metodu',
        category: 'Ünsiyyət Bacarıqları'
    },

    // Дополнительно
    'istqb_certified': {
        id: 'istqb',
        skill: 'ISTQB Foundation Level Knowledge',
        category: 'Sertifikatlar'
    }
};

export const INITIAL_RESUME_STATE = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        title: 'JUNIOR QA ENGINEER', // New field
        summary: 'Avtomatlaşdırılmış və manual testləmə sahəsində təcrübəyə malik motivasiyalı QA Mühəndis. QA Academy tələbəsi.',
        experience: [], // New field for custom experience
        customSkills: '' // New field for manual skills entry
    },
    hiddenSkills: [] // IDs of skills user wants to hide
};
