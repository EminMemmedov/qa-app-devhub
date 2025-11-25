// Exam questions database - QA theory questions in Azerbaijani
export const examQuestions = [
    // QA əsasları (QA Basics) - 10 questions
    {
        id: 1,
        category: 'qa_basics',
        question: 'QA-nın əsas məqsədi nədir?',
        options: [
            'Proqramı yazmaq',
            'Proqramın keyfiyyətini təmin etmək və səhvləri tapmaq',
            'Dizayn hazırlamaq',
            'Verilənlər bazasını idarə etmək'
        ],
        correctAnswer: 1,
        explanation: 'QA (Quality Assurance) - keyfiyyətə nəzarət, proqramın keyfiyyətini təmin etmək və səhvləri tapmaq üçün aparılan prosesdir.'
    },
    {
        id: 2,
        category: 'qa_basics',
        question: 'Verifikasiya və Validasiya arasında əsas fərq nədir?',
        options: [
            'Heç bir fərq yoxdur',
            'Verifikasiya - "Düzgün qurulub?", Validasiya - "Düzgün məhsul qurulub?"',
            'Validasiya daha vacibdir',
            'Verifikasiya yalnız manual testləşdirmədə istifadə olunur'
        ],
        correctAnswer: 1,
        explanation: 'Verifikasiya - məhsulun tələblərə uyğun qurulub-qurulmadığını yoxlayır. Validasiya - məhsulun istifadəçi ehtiyaclarını ödəyib-ödəmədiyini yoxlayır.'
    },
    {
        id: 3,
        category: 'qa_basics',
        question: 'Bug və Defect arasında fərq nədir?',
        options: [
            'Bug - kod səhvi, Defect - tələbə uyğunsuzluq',
            'Eyni şeydir',
            'Defect daha ciddidir',
            'Bug yalnız development mərhələsində tapılır'
        ],
        correctAnswer: 0,
        explanation: 'Bug adətən kodda olan səhvdir. Defect isə məhsulun tələblərə uyğun olmaması deməkdir.'
    },
    {
        id: 4,
        category: 'qa_basics',
        question: 'SDLC nədir?',
        options: [
            'Software Development Life Cycle - Proqram təminatının həyat dövrü',
            'System Design Language Code',
            'Standard Data Loading Center',
            'Secure Development License Contract'
        ],
        correctAnswer: 0,
        explanation: 'SDLC (Software Development Life Cycle) - proqram təminatının planlaşdırılmasından istifadəyə verilməsinə qədər olan bütün mərhələləri əhatə edən prosesdir.'
    },
    {
        id: 5,
        category: 'qa_basics',
        question: 'Test case nədir?',
        options: [
            'Testləşdirmə üçün istifadə olunan kompüter',
            'Müəyyən funksionallığı yoxlamaq üçün addım-addım təlimat',
            'Baq hesabatı',
            'Test planı'
        ],
        correctAnswer: 1,
        explanation: 'Test case - müəyyən bir funksiyanı və ya xüsusiyyəti yoxlamaq üçün hazırlanmış addım-addım təlimatdır.'
    },
    {
        id: 6,
        category: 'qa_basics',
        question: 'Regression testing nə zaman aparılır?',
        options: [
            'Yalnız yeni layihələrdə',
            'Kod dəyişikliyindən sonra köhnə funksionallığın işlədiyini yoxlamaq üçün',
            'Heç vaxt',
            'Yalnız production-da'
        ],
        correctAnswer: 1,
        explanation: 'Regression testing - kod dəyişikliklərindən sonra mövcud funksionallığın hələ də düzgün işlədiyini yoxlamaq üçün aparılır.'
    },
    {
        id: 7,
        category: 'qa_basics',
        question: 'Black box testing nədir?',
        options: [
            'Yalnız qaranlıq otaqda aparılan test',
            'Daxili strukturu bilmədən, yalnız giriş və çıxışa əsasən test',
            'Yalnız kod səviyyəsində test',
            'Avtomatlaşdırılmış test'
        ],
        correctAnswer: 1,
        explanation: 'Black box testing - sistemin daxili strukturunu bilmədən, yalnız giriş və çıxış məlumatlarına əsasən aparılan testdir.'
    },
    {
        id: 8,
        category: 'qa_basics',
        question: 'White box testing nədir?',
        options: [
            'Ağ rəngli interfeysin testi',
            'Kod strukturunu bilərək, daxili məntiqə əsasən test',
            'Yalnız UI testi',
            'Manual test'
        ],
        correctAnswer: 1,
        explanation: 'White box testing - sistemin daxili strukturunu, kodunu bilərək aparılan testdir. Kod səviyyəsində məntiq yoxlanılır.'
    },
    {
        id: 9,
        category: 'qa_basics',
        question: 'Test coverage nədir?',
        options: [
            'Testlərin neçə faiz kodunu əhatə etdiyi',
            'Test planının ölçüsü',
            'Baqların sayı',
            'Testerin iş vaxtı'
        ],
        correctAnswer: 0,
        explanation: 'Test coverage - testlərin kodun, tələblərin və ya funksionallığın neçə faizini əhatə etdiyini göstərən metrikadır.'
    },
    {
        id: 10,
        category: 'qa_basics',
        question: 'Smoke test nədir?',
        options: [
            'Yanğın təhlükəsizliyi testi',
            'Əsas funksionallığın işlədiyini yoxlayan sürətli test',
            'Performance test',
            'Security test'
        ],
        correctAnswer: 1,
        explanation: 'Smoke test - yeni build-in əsas funksionallığının işlədiyini yoxlamaq üçün aparılan sürətli, əsas testdir.'
    },

    // Test növləri (Test Types) - 10 questions
    {
        id: 11,
        category: 'test_types',
        question: 'Funksional testləşdirmə nədir?',
        options: [
            'Sistemin performansını yoxlamaq',
            'Sistemin tələblərə uyğun işlədiyini yoxlamaq',
            'Yalnız dizaynı yoxlamaq',
            'Kodun strukturunu yoxlamaq'
        ],
        correctAnswer: 1,
        explanation: 'Funksional testləşdirmə - sistemin funksional tələblərə uyğun işləyib-işləmədiyini yoxlayır.'
    },
    {
        id: 12,
        category: 'test_types',
        question: 'Performance testing nə üçün aparılır?',
        options: [
            'Baqları tapmaq üçün',
            'Sistemin sürətini, yükü və sabitliyini yoxlamaq üçün',
            'Dizaynı yoxlamaq üçün',
            'Kodun keyfiyyətini yoxlamaq üçün'
        ],
        correctAnswer: 1,
        explanation: 'Performance testing - sistemin müxtəlif yük altında necə işlədiyini, sürətini və sabitliyini yoxlayır.'
    },
    {
        id: 13,
        category: 'test_types',
        question: 'Security testing-in məqsədi nədir?',
        options: [
            'Sistemin təhlükəsizlik zəifliklərini tapmaq',
            'Yalnız parol yoxlamaq',
            'UI-ı yoxlamaq',
            'Performansı yoxlamaq'
        ],
        correctAnswer: 0,
        explanation: 'Security testing - sistemdə təhlükəsizlik zəifliklərini, boşluqları tapmaq və məlumatların qorunmasını yoxlamaq üçün aparılır.'
    },
    {
        id: 14,
        category: 'test_types',
        question: 'Usability testing nəyi yoxlayır?',
        options: [
            'Kodun keyfiyyətini',
            'İstifadəçi təcrübəsini və interfeysin rahatlığını',
            'Verilənlər bazasını',
            'Serverin sürətini'
        ],
        correctAnswer: 1,
        explanation: 'Usability testing - sistemin istifadəçilər üçün nə qədər rahat və anlaşılan olduğunu yoxlayır.'
    },
    {
        id: 15,
        category: 'test_types',
        question: 'Integration testing nə zaman aparılır?',
        options: [
            'Yalnız layihənin sonunda',
            'Müxtəlif modullar birləşdirildikdən sonra',
            'Heç vaxt',
            'Yalnız production-da'
        ],
        correctAnswer: 1,
        explanation: 'Integration testing - ayrı-ayrı modullar və ya komponentlər birləşdirildikdən sonra onların bir-biri ilə düzgün işlədiyini yoxlamaq üçün aparılır.'
    },
    {
        id: 16,
        category: 'test_types',
        question: 'Unit testing nədir?',
        options: [
            'Bütün sistemin testi',
            'Kodun ən kiçik hissələrinin (funksiya, metod) ayrı-ayrılıqda testi',
            'UI testi',
            'Manual test'
        ],
        correctAnswer: 1,
        explanation: 'Unit testing - kodun ən kiçik hissələrinin (funksiya, metod, klass) ayrı-ayrılıqda test edilməsidir.'
    },
    {
        id: 17,
        category: 'test_types',
        question: 'Load testing və Stress testing arasında fərq nədir?',
        options: [
            'Eyni şeydir',
            'Load - normal yük, Stress - limit yük',
            'Stress daha asandır',
            'Load yalnız UI üçündür'
        ],
        correctAnswer: 1,
        explanation: 'Load testing - sistemin normal və gözlənilən yük altında necə işlədiyini yoxlayır. Stress testing - sistemin limit və həddindən artıq yük altında necə davrandığını yoxlayır.'
    },
    {
        id: 18,
        category: 'test_types',
        question: 'Acceptance testing nə zaman aparılır?',
        options: [
            'Development başlamazdan əvvəl',
            'Məhsul istifadəyə verilməzdən əvvəl, müştəri tərəfindən',
            'Heç vaxt',
            'Yalnız bug tapıldıqda'
        ],
        correctAnswer: 1,
        explanation: 'Acceptance testing (UAT - User Acceptance Testing) - məhsulun istifadəyə verilməzdən əvvəl müştəri və ya son istifadəçilər tərəfindən aparılan testdir.'
    },
    {
        id: 19,
        category: 'test_types',
        question: 'API testing nəyi yoxlayır?',
        options: [
            'Yalnız UI-ı',
            'Tətbiqin proqramlaşdırma interfeyslərini (API)',
            'Verilənlər bazasını',
            'Dizaynı'
        ],
        correctAnswer: 1,
        explanation: 'API testing - tətbiqin proqramlaşdırma interfeyslərinin (API) düzgün işlədiyini, məlumat mübadiləsinin və cavabların doğruluğunu yoxlayır.'
    },
    {
        id: 20,
        category: 'test_types',
        question: 'Exploratory testing nədir?',
        options: [
            'Test case olmadan, sərbəst araşdırma ilə test',
            'Yalnız avtomatlaşdırılmış test',
            'Yalnız regression test',
            'Planlaşdırılmış test'
        ],
        correctAnswer: 0,
        explanation: 'Exploratory testing - əvvəlcədən hazırlanmış test case-lər olmadan, testerin təcrübəsinə əsaslanaraq sərbəst araşdırma ilə aparılan testdir.'
    },

    // Baq hesabatı (Bug Reporting) - 5 questions
    {
        id: 21,
        category: 'bug_reporting',
        question: 'Baq hesabatında hansı məlumatlar mütləq olmalıdır?',
        options: [
            'Yalnız baqın adı',
            'Başlıq, addımlar, gözlənilən nəticə, faktiki nəticə, severity, priority',
            'Yalnız screenshot',
            'Yalnız tarix'
        ],
        correctAnswer: 1,
        explanation: 'Keyfiyyətli baq hesabatı: başlıq, təkrarlama addımları, gözlənilən nəticə, faktiki nəticə, severity, priority, ekran görüntüsü və s. məlumatları ehtiva etməlidir.'
    },
    {
        id: 22,
        category: 'bug_reporting',
        question: 'Bug Severity nədir?',
        options: [
            'Baqın nə qədər tez düzəldilməli olduğu',
            'Baqın sistemə təsirinin dərəcəsi',
            'Baqı kimin tapdığı',
            'Baqın rəngi'
        ],
        correctAnswer: 1,
        explanation: 'Severity - baqın sistemə və ya funksionallığa təsirinin dərəcəsidir (Critical, Major, Minor, Trivial).'
    },
    {
        id: 23,
        category: 'bug_reporting',
        question: 'Bug Priority nədir?',
        options: [
            'Baqın sistemə təsiri',
            'Baqın nə qədər tez düzəldilməli olduğu (təcililik)',
            'Baqın ölçüsü',
            'Baqın növü'
        ],
        correctAnswer: 1,
        explanation: 'Priority - baqın nə qədər tez düzəldilməli olduğunu göstərir (High, Medium, Low).'
    },
    {
        id: 24,
        category: 'bug_reporting',
        question: 'Critical severity nə deməkdir?',
        options: [
            'Kiçik dizayn problemi',
            'Sistem işləmir və ya əsas funksionallıq əlçatmazdır',
            'Yalnız mətn səhvi',
            'Performans problemi'
        ],
        correctAnswer: 1,
        explanation: 'Critical severity - sistem tamamilə işləmir, məlumat itkisi var və ya əsas funksionallıq tamamilə əlçatmazdır.'
    },
    {
        id: 25,
        category: 'bug_reporting',
        question: 'Baq statusu "Resolved" nə deməkdir?',
        options: [
            'Baq hələ açıqdır',
            'Baq düzəldildi və yoxlanmaq üçün hazırdır',
            'Baq rədd edildi',
            'Baq təkrarlanmır'
        ],
        correctAnswer: 1,
        explanation: 'Resolved statusu - developer baqı düzəltdiyini bildirdi və baq tester tərəfindən yoxlanmaq üçün hazırdır.'
    },

    // Test planlaşdırması (Test Planning) - 5 questions
    {
        id: 26,
        category: 'test_planning',
        question: 'Test plan nədir?',
        options: [
            'Baq siyahısı',
            'Testləşdirmə strategiyası, resurslar və qrafiki əhatə edən sənəd',
            'Kod sənədi',
            'Dizayn maketi'
        ],
        correctAnswer: 1,
        explanation: 'Test plan - testləşdirmə prosesinin məqsədlərini, strategiyasını, resurslarını, qrafikini və yanaşmasını təsvir edən sənəddir.'
    },
    {
        id: 27,
        category: 'test_planning',
        question: 'Test strategy nədir?',
        options: [
            'Konkret test case',
            'Testləşdirmə yanaşmasının ümumi planı',
            'Baq hesabatı',
            'Kod review'
        ],
        correctAnswer: 1,
        explanation: 'Test strategy - layihədə istifadə olunacaq testləşdirmə yanaşmasının, metodlarının və alətlərinin ümumi planıdır.'
    },
    {
        id: 28,
        category: 'test_planning',
        question: 'Entry criteria nədir?',
        options: [
            'Testləşdirməyə başlamaq üçün lazım olan şərtlər',
            'Testləşdirməni bitirmək şərtləri',
            'Baq düzəltmə şərtləri',
            'Kod yazma şərtləri'
        ],
        correctAnswer: 0,
        explanation: 'Entry criteria - testləşdirmə mərhələsinə başlamaq üçün yerinə yetirilməli olan şərtlərdir (məs: kod hazırdır, test mühiti qurulub).'
    },
    {
        id: 29,
        category: 'test_planning',
        question: 'Exit criteria nədir?',
        options: [
            'Testləşdirməyə başlama şərtləri',
            'Testləşdirməni tamamlamaq və növbəti mərhələyə keçmək üçün şərtlər',
            'Developer-in işini bitirmə şərtləri',
            'Dizayn tamamlama şərtləri'
        ],
        correctAnswer: 1,
        explanation: 'Exit criteria - testləşdirməni tamamlanmış hesab etmək və növbəti mərhələyə keçmək üçün yerinə yetirilməli olan şərtlərdir.'
    },
    {
        id: 30,
        category: 'test_planning',
        question: 'Test environment nədir?',
        options: [
            'Testerin iş otağı',
            'Testlərin aparıldığı proqram və hardware mühiti',
            'Test planı',
            'Baq tracking sistemi'
        ],
        correctAnswer: 1,
        explanation: 'Test environment - testlərin aparıldığı proqram təminatı, hardware, şəbəkə və digər konfiqurasiyaların birləşməsidir.'
    }
];

// Helper function to get random questions
export function getRandomQuestions(count = 30) {
    const shuffled = [...examQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Helper function to get questions by category
export function getQuestionsByCategory(category) {
    return examQuestions.filter(q => q.category === category);
}

// Category names
export const categories = {
    qa_basics: 'QA əsasları',
    test_types: 'Test növləri',
    bug_reporting: 'Baq hesabatı',
    test_planning: 'Test planlaşdırması'
};
