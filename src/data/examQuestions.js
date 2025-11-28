// Exam questions database - QA theory questions in Azerbaijani
export const examQuestions = [
    // QA əsasları (QA Basics)
    {
        id: 1,
        category: 'qa_basics',
        difficulty: 'easy',
        question: 'QA-nın (Quality Assurance) əsas məqsədi nədir?',
        options: [
            'Proqram təminatındakı bütün səhvləri aşkar etmək və düzəltmək',
            'Proseslərin keyfiyyətini təmin edərək qüsurların yaranmasının qarşısını almaq',
            'Test sənədlərini hazırlamaq və testləri icra etmək',
            'Müştəri məmnuniyyətini təmin etmək üçün son yoxlamanı aparmaq'
        ],
        correctAnswer: 1,
        explanation: 'QA - keyfiyyəti təmin etmək üçün proseslərin qurulması və qüsurların yaranmasının qarşısının alınmasıdır (Proses yönümlü). Testləşdirmə isə məhsul yönümlüdür.'
    },
    {
        id: 2,
        category: 'qa_basics',
        difficulty: 'medium',
        question: 'Verifikasiya və Validasiya arasındakı fərq hansıdır?',
        options: [
            'Verifikasiya prosesin düzgünlüyünü, Validasiya məhsulun düzgünlüyünü yoxlayır',
            'Verifikasiya: "Biz məhsulu düzgün qururuq?" (Tələblərə uyğunluq); Validasiya: "Biz düzgün məhsulu qururuq?" (İstifadəçi ehtiyacı)',
            'Verifikasiya dinamik testdir, Validasiya statik testdir',
            'Validasiya yalnız sənədlər üzərində aparılır, Verifikasiya isə kod üzərində'
        ],
        correctAnswer: 1,
        explanation: 'Verifikasiya (Verification) məhsulun spesifikasiyalara uyğunluğunu yoxlayır. Validasiya (Validation) isə məhsulun istifadəçinin real ehtiyaclarını ödəyib-ödəmədiyini yoxlayır.'
    },
    {
        id: 3,
        category: 'qa_basics',
        difficulty: 'medium',
        question: 'Səhv (Error), Qüsur (Defect/Bug) və Uğursuzluq (Failure) zənciri necədir?',
        options: [
            'Qüsur -> Səhv -> Uğursuzluq',
            'Uğursuzluq -> Qüsur -> Səhv',
            'İnsan Səhvi -> Kodda Qüsur -> Proqramda Uğursuzluq',
            'Kod Xətası -> Sistem Xətası -> İstifadəçi Xətası'
        ],
        correctAnswer: 2,
        explanation: 'İnsan səhv edir (Error), bu kodda qüsur (Defect) yaradır, proqram işlədikdə isə bu qüsur uğursuzluğa (Failure) səbəb olur.'
    },
    {
        id: 4,
        category: 'qa_basics',
        difficulty: 'easy',
        question: 'SDLC (Software Development Life Cycle) nədir?',
        options: [
            'Proqram təminatının təhlükəsizlik lisenziyası',
            'Sistem dizaynının kodlaşdırma standartları',
            'Proqram təminatının planlaşdırılmasından istismardan çıxarılmasına qədər olan həyat dövrü',
            'Yalnız kodlaşdırma və test mərhələlərini əhatə edən proses'
        ],
        correctAnswer: 2,
        explanation: 'SDLC - proqramın ideya formasından başlayaraq, hazırlanması, test edilməsi, istifadəyə verilməsi və ləğv edilməsinə qədər olan prosesdir.'
    },
    {
        id: 5,
        category: 'qa_basics',
        difficulty: 'medium', // Upgraded difficulty
        question: 'Test Case-in ən vacib komponentləri hansılardır?',
        options: [
            'Test Addımları, Test Məlumatları və Gözlənilən Nəticə',
            'ID, Təsvir, İlkin Şərtlər (Pre-conditions), Addımlar, Gözlənilən Nəticə',
            'Yalnız Faktiki Nəticə və Gözlənilən Nəticə',
            'Baq Hesabatı, Status, Prioritet və Təyin edilən şəxs'
        ],
        correctAnswer: 1,
        explanation: 'Test Case konkret bir ssenarini yoxlamaq üçün lazım olan addımları, ilkin şərtləri və gözlənilən nəticəni ehtiva edir.'
    },
    {
        id: 6,
        category: 'qa_basics',
        difficulty: 'medium',
        question: 'Reqressiya (Regression) testi nə zaman yerinə yetirilməlidir?',
        options: [
            'Layihənin ən əvvəlində planlaşdırma zamanı',
            'Kodda hər hansı dəyişiklik (bug fix, yeni funksiya) edildikdən sonra',
            'Yalnız "Critical" prioritetli baqlar tapıldıqda',
            'Müştəri rəsmi olaraq tələb etdikdə'
        ],
        correctAnswer: 1,
        explanation: 'Reqressiya testi kod dəyişikliklərinin mövcud (işləyən) funksionallığa mənfi təsir etmədiyini yoxlamaq üçün aparılır.'
    },
    {
        id: 7,
        category: 'qa_basics',
        difficulty: 'hard',
        question: '"Pestisid Paradoksu" (Pesticide Paradox) prinsipi nəyi ifadə edir?',
        options: [
            'Kodda həmişə tapılmayan baqlar qalır',
            'Eyni testləri təkrar-təkrar icra etdikdə, onlar yeni baqları tapmağı dayandırır',
            'Testləri tam avtomatlaşdırmaq mümkün deyil',
            'Baqlar adətən müəyyən modullarda toplanır'
        ],
        correctAnswer: 1,
        explanation: 'Pestisid paradoksu: Həşəratlar dərmana öyrəşdiyi kimi, proqram da eyni testlərə "öyrəşir". Yeni baqlar tapmaq üçün testlər mütəmadi yenilənməlidir.'
    },
    {
        id: 8,
        category: 'qa_basics',
        difficulty: 'medium',
        question: 'White Box (Ağ Qutu) testi hansı bilikləri tələb edir?',
        options: [
            'Yalnız biznes tələblərini və istifadəçi hekayələrini',
            'Proqramın daxili kod strukturunu, alqoritmləri və məntiqini',
            'Sistem memarlığını və istifadəçi interfeysini',
            'Heç bir texniki bilik tələb etmir, sadəcə məntiq'
        ],
        correctAnswer: 1,
        explanation: 'White Box testing sistemin daxili strukturunu (kod, alqoritmlər) yoxlayır, buna görə proqramlaşdırma biliyi tələb edir.'
    },
    {
        id: 9,
        category: 'qa_basics',
        difficulty: 'hard',
        question: '"Tam Testləşdirmə" (Exhaustive Testing) niyə mümkün deyil?',
        options: [
            'Testçilərin vaxtı və büdcəsi məhduddur',
            'Kombinasiyaların sayı sonsuz ola bilər, bu isə resurs və vaxt baxımından qeyri-realdır',
            'Mümkündür, sadəcə bahalıdır və uzun çəkir',
            'Developerlər kodun tam test edilməsinə icazə vermir'
        ],
        correctAnswer: 1,
        explanation: 'Giriş məlumatlarının bütün mümkün kombinasiyalarını yoxlamaq (məsələn, sonsuz sayda rəqəm) fiziki olaraq mümkün deyil. Testlər riskə əsaslanmalıdır.'
    },
    {
        id: 10,
        category: 'qa_basics',
        difficulty: 'medium',
        question: 'Smoke Test (Tüstü Testi) nədir?',
        options: [
            'Sistemin maksimum yük altında dayanıqlılığını yoxlamaq',
            'Yeni build-in əsas funksionallığının işlədiyini təsdiqləyən səthi yoxlama',
            'Təhlükəsizlik zəifliklərini və giriş nöqtələrini yoxlamaq',
            'Sistemin bütün modullarını detallı şəkildə yoxlamaq'
        ],
        correctAnswer: 1,
        explanation: 'Smoke Test - "build partlayır ya yox?" yoxlamasıdır. Əgər əsas funksiyalar işləmirsə, daha dərin testə ehtiyac yoxdur.'
    },
    {
        id: 31,
        category: 'qa_basics',
        difficulty: 'hard',
        question: 'Sazlama (Debugging) və Testləşdirmə arasındakı əsas fərq nədir?',
        options: [
            'Fərq yoxdur, eyni prosesin fərqli adlarıdır',
            'Testləşdirmə səhvləri tapır, Sazlama isə səhvlərin səbəbini tapıb düzəldir',
            'Testləşdirməni developerlər, Sazlamanı testçilər edir',
            'Sazlama sənədləşdirmə prosesidir, Testləşdirmə isə icra prosesidir'
        ],
        correctAnswer: 1,
        explanation: 'Testçilər qüsurları (failures) aşkar edir. Developerlər isə Debugging edərək kodun içindəki səhvi (root cause) tapıb düzəldirlər.'
    },
    {
        id: 32,
        category: 'qa_basics',
        difficulty: 'medium',
        question: 'Statik Test (Static Testing) nədir?',
        options: [
            'Kodu icra edərək real nəticələri yoxlamaq',
            'Kodu icra etmədən sənədləri və ya kodu nəzərdən keçirmək (Review)',
            'Performans və yük testlərini əhatə edir',
            'Avtomatlaşdırılmış test skriptlərini işə salmaq'
        ],
        correctAnswer: 1,
        explanation: 'Statik test proqramı işə salmadan aparılır (Review, Walkthrough, Inspection). Dinamik test isə proqramı işlətməyi tələb edir.'
    },

    // Test növləri (Test Types)
    {
        id: 11,
        category: 'test_types',
        difficulty: 'medium', // Upgraded
        question: 'Qeyri-funksional (Non-functional) testləşdirmə nəyi yoxlayır?',
        options: [
            'Sistemin funksional tələblərini (nə etdiyini)',
            'Sistemin necə işlədiyini (Performans, Təhlükəsizlik, Usability)',
            'Kodun sintaksisini və strukturunu',
            'Verilənlər bazasının strukturunu və əlaqələrini'
        ],
        correctAnswer: 1,
        explanation: 'Qeyri-funksional testlər sistemin atributlarını (sürət, etibarlılıq, təhlükəsizlik) yoxlayır.'
    },
    {
        id: 12,
        category: 'test_types',
        difficulty: 'medium',
        question: 'Stress Testing-in əsas məqsədi nədir?',
        options: [
            'Sistemin gözlənilən istifadəçi yükü altında necə işlədiyini yoxlamaq',
            'Sistemin limitlərini və limitdən artıq yükdə davranışını (qırılma nöqtəsini) yoxlamaq',
            'Sistemin uzun müddətli yük altında sabitliyini yoxlamaq',
            'Serverin cavab vermə müddətini ölçmək'
        ],
        correctAnswer: 1,
        explanation: 'Load test normal yükü, Stress test isə ekstremal yükü yoxlayır ki, sistemin dayanıqlığını və bərpa olunma qabiliyyətini görək.'
    },
    {
        id: 13,
        category: 'test_types',
        difficulty: 'hard',
        question: 'Sanity Test ilə Smoke Test arasındakı incə fərq nədir?',
        options: [
            'Smoke test avtomatlaşdırılmışdır, Sanity test manualdır',
            'Smoke test geniş və səthidir (bütün sistemi əhatə edir), Sanity test isə dar və dərindir (müəyyən funksiyanı yoxlayır)',
            'Smoke test sənədləri yoxlayır, Sanity kodu yoxlayır',
            'Sanity test reqressiya testindən əvvəl, Smoke test sonra edilir'
        ],
        correctAnswer: 1,
        explanation: 'Smoke test "ümumi sağlamlığı" yoxlayır (General Health Check). Sanity test isə spesifik dəyişikliklərin (bug fix) düzgün işlədiyini yoxlayan alt çoxluqdur.'
    },
    {
        id: 14,
        category: 'test_types',
        difficulty: 'easy',
        question: 'Usability Testing (İstifadə Rahatlığı) kim tərəfindən aparılsa daha effektiv olar?',
        options: [
            'Yalnız kodun müəllifi olan developerlər',
            'Real istifadəçilər və ya onları təmsil edən testçilər',
            'Sistem administratorları və DevOps mühəndisləri',
            'Layihə menecerləri'
        ],
        correctAnswer: 1,
        explanation: 'Usability testing məhsulun istifadəçi üçün nə qədər rahat olduğunu yoxlayır, buna görə real istifadəçi baxışı vacibdir.'
    },
    {
        id: 15,
        category: 'test_types',
        difficulty: 'hard',
        question: 'İnteqrasiya Testində (Integration Testing) "Top-down" yanaşması nədir?',
        options: [
            'Aşağı səviyyəli modullardan başlayıb yuxarı qalxmaq (Drivers istifadə edərək)',
            'Yuxarı səviyyəli modullardan başlayıb aşağı enmək (Stubs istifadə edərək)',
            'Bütün modulları eyni anda birləşdirmək (Big Bang)',
            'Yalnız kritik modulları test etmək (Sandwich)'
        ],
        correctAnswer: 1,
        explanation: 'Top-down yanaşmada əsas idarəetmə modulu birinci test edilir, aşağı səviyyəli modullar isə "Stub" (kötük) ilə əvəz olunur.'
    },
    {
        id: 16,
        category: 'test_types',
        difficulty: 'medium',
        question: 'Unit Testing (Komponent Testi) kimin məsuliyyətindədir?',
        options: [
            'Test Menecerin',
            'Manual Testçinin',
            'Developerin (Proqramçının)',
            'Müştərinin'
        ],
        correctAnswer: 2,
        explanation: 'Unit testlər kodun ən kiçik hissələrini yoxlayır və kodu yazan şəxs (developer) tərəfindən yazılır.'
    },
    {
        id: 17,
        category: 'test_types',
        difficulty: 'hard',
        question: 'Hansı test növü "Maintenance Testing" (Saxlama Testi) hesab olunur?',
        options: [
            'Sistem istifadəyə verildikdən sonra edilən miqrasiya və ya dəyişiklik testləri',
            'İlkin inkişaf zamanı edilən testlər',
            'Yalnız Unit və İntegration testlər',
            'Alpha və Beta testlər'
        ],
        correctAnswer: 0,
        explanation: 'Maintenance testing məhsul istismarda (production) olduqda edilən dəyişikliklər, yamalar (patches) və ya miqrasiya zamanı aparılır.'
    },
    {
        id: 18,
        category: 'test_types',
        difficulty: 'medium',
        question: 'UAT (User Acceptance Testing) nə zaman uğurlu sayılır?',
        options: [
            'Developer kodun bitdiyini deyəndə',
            'Müştəri/İstifadəçi sistemin onların biznes ehtiyaclarını ödədiyini təsdiqləyəndə',
            'Bütün Unit testlər keçəndə',
            'Sistemdə heç bir kritik səhv qalmayanda'
        ],
        correctAnswer: 1,
        explanation: 'UAT-nin məqsədi məhsulun biznes ehtiyaclarını ödədiyini təsdiqləməkdir (Validation).'
    },
    {
        id: 19,
        category: 'test_types',
        difficulty: 'medium', // Upgraded
        question: 'API Testing-də hansı status kodu sorğunun "Uğurlu" olduğunu bildirir?',
        options: [
            '404 Not Found',
            '500 Internal Server Error',
            '200 OK',
            '301 Moved Permanently'
        ],
        correctAnswer: 2,
        explanation: 'HTTP 200 OK - sorğunun uğurla yerinə yetirildiyini göstərir. 404 (Not Found), 500 (Server Error), 301 (Redirect) fərqli mənaları daşıyır.'
    },
    {
        id: 20,
        category: 'test_types',
        difficulty: 'hard',
        question: 'Kəşfiyyat Testi (Exploratory Testing) nə vaxt istifadə olunmalıdır?',
        options: [
            'Test sənədləri tam hazır və təsdiqlənmiş olduqda',
            'Vaxt az olduqda və ya sənədləşmə natamam olduqda (testerin təcrübəsinə əsasən)',
            'Yalnız avtomatlaşdırma mümkün olduqda',
            'Heç vaxt, bu qeyri-peşəkar yanaşmadır'
        ],
        correctAnswer: 1,
        explanation: 'Exploratory testing formal ssenarilər olmadıqda və ya sürətli yoxlama lazım olduqda testerin intuisiyasına və təcrübəsinə əsaslanır.'
    },
    {
        id: 33,
        category: 'test_types',
        difficulty: 'hard',
        question: 'Alpha və Beta testləri arasındakı fərq nədir?',
        options: [
            'Alpha müştəri mühitində, Beta developer mühitində aparılır',
            'Alpha developer mühitində (təşkilat daxilində), Beta real istifadəçi mühitində aparılır',
            'Fərq yoxdur, sadəcə adları fərqlidir',
            'Alpha pullu versiyadır, Beta pulsuz versiyadır'
        ],
        correctAnswer: 1,
        explanation: 'Alpha test təşkilat daxilində, Beta test isə real istifadəçilər tərəfindən onların öz mühitlərində aparılır.'
    },
    {
        id: 34,
        category: 'test_types',
        difficulty: 'hard',
        question: 'Dinamik Testin (Dynamic Testing) 4 əsas test səviyyəsi hansılardır?',
        options: [
            'Planlaşdırma, Dizayn, Kodlaşdırma, Silmə',
            'Komponent, İnteqrasiya, Sistem, Qəbul (Test Səviyyələri)',
            'Baq tapma, Baq silmə, Baq yazma, Baq oxuma',
            'Analiz, Dizayn, İcra, Hesabat'
        ],
        correctAnswer: 1,
        explanation: 'ISTQB-yə görə test səviyyələri: Component Testing, Integration Testing, System Testing, Acceptance Testing.'
    },

    // Baq hesabatı (Bug Reporting)
    {
        id: 21,
        category: 'bug_reporting',
        difficulty: 'medium', // Upgraded
        question: 'Baq hesabatında developera ən çox kömək edən hissə hansıdır?',
        options: [
            'Baqı tapanın şəxsi rəyi',
            'Addımlar (Steps to Reproduce) - baqı necə təkrarlamaq olar',
            'Baqın tapıldığı mühit (Environment) və Loglar',
            'Prioritet və Ciddilik dərəcəsi'
        ],
        correctAnswer: 1,
        explanation: 'Baxmayaraq ki, Environment və Loglar vacibdir, "Steps to Reproduce" olmadan developer baqı təkrarlaya və düzəldə bilməz.'
    },
    {
        id: 22,
        category: 'bug_reporting',
        difficulty: 'medium',
        question: 'Severity (Ciddilik) və Priority (Prioritet) arasındakı fərq nədir?',
        options: [
            'Severity biznesə təsirdir, Priority texniki təsirdir',
            'Severity texniki təsirin dərəcəsidir (nə qədər pisdir), Priority düzəldilmə ardıcıllığıdır (nə qədər təcilidir)',
            'Eyni şeydir, sadəcə fərqli alətlərdə fərqli adlanır',
            'Priority tester tərəfindən təyin edilmir, yalnız developer təyin edir'
        ],
        correctAnswer: 1,
        explanation: 'Severity - baqın sistemə vurduğu zərərdir (məs: sistem çökür). Priority - baqın nə vaxt düzəldilməli olduğudur (məs: dərhal).'
    },
    {
        id: 23,
        category: 'bug_reporting',
        difficulty: 'hard',
        question: 'High Severity, Low Priority (Yüksək Ciddilik, Aşağı Prioritet) nümunəsi hansıdır?',
        options: [
            'Sistemdə şirkət loqosu səhv rəngdədir',
            'Çox nadir istifadə olunan köhnə bir modyulda sistem çökür (müştərilər artıq istifadə etmir)',
            'Ana səhifədə hərf səhvi var',
            'Login funksiyası işləmir'
        ],
        correctAnswer: 1,
        explanation: 'Sistem çökür (High Severity), amma modul istifadə olunmadığı üçün biznes baxımından təcili deyil (Low Priority).'
    },
    {
        id: 24,
        category: 'bug_reporting',
        difficulty: 'hard',
        question: 'Low Severity, High Priority (Aşağı Ciddilik, Yüksək Prioritet) nümunəsi hansıdır?',
        options: [
            'Sistem məlumatları silir və bərpa etmək olmur',
            'Şirkətin əsas səhifəsində şirkət adı səhv yazılıb ("Goolge" əvəzinə "Google")',
            'Server tamamilə cavab vermir',
            'Hesablama modulunda ciddi səhv var'
        ],
        correctAnswer: 1,
        explanation: 'Texniki olaraq sistem işləyir (Low Severity), amma brend imicinə zərər vurduğu üçün dərhal düzəldilməlidir (High Priority).'
    },
    {
        id: 25,
        category: 'bug_reporting',
        difficulty: 'hard',
        question: 'Developer baqı "Works for Me" (Məndə işləyir) kimi qaytardı. Testçi nə etməlidir?',
        options: [
            'Baqı dərhal bağlamalıdır',
            'Developerlə mübahisə etməli və şikayət etməlidir',
            'Baqı yenidən yoxlamalı, mühit fərqlərini analiz etməli və əlavə sübutlar təqdim etməlidir',
            'Baqı silməlidir'
        ],
        correctAnswer: 2,
        explanation: 'Baqı dərhal bağlamaq olmaz. Testçi əmin olmalıdır ki, test mühiti ilə developer mühiti eynidir və baqın təkrarlanma addımlarını dəqiqləşdirməlidir.'
    },
    {
        id: 35,
        category: 'bug_reporting',
        difficulty: 'medium',
        question: 'Baqın Həyat Dövründə (Bug Life Cycle) "Deferred" statusu nə deməkdir?',
        options: [
            'Baq tamamilə düzəldilib və yoxlanılıb',
            'Baq rədd edilib və bağlanıb',
            'Baq təsdiqlənib, lakin düzəlişi gələcək versiyaya saxlanılıb (təxirə salınıb)',
            'Baq təkrarlanmır və ignor edilir'
        ],
        correctAnswer: 2,
        explanation: 'Deferred - baqın varlığı qəbul edilir, lakin resurs çatışmazlığı və ya prioritetin aşağı olması səbəbindən düzəliş sonraya saxlanılır.'
    },
    {
        id: 36,
        category: 'bug_reporting',
        difficulty: 'medium',
        question: 'Baqın "Duplicate" olması nə deməkdir?',
        options: [
            'Baq çox vacibdir və təcili düzəldilməlidir',
            'Bu baq artıq sistemdə başqa bir ID ilə qeydiyyatdadır',
            'Baq iki dəfə düzəldilib',
            'Baq təkrarlana bilən baqdır'
        ],
        correctAnswer: 1,
        explanation: 'Duplicate - eyni xətanın artıq başqa bir testçi tərəfindən report edildiyini bildirir. Belə baqlar bağlanır.'
    },

    // Test planlaşdırması (Test Planning)
    {
        id: 26,
        category: 'test_planning',
        difficulty: 'medium', // Upgraded
        question: 'Test Planı (Test Plan) hansı suala cavab verir?',
        options: [
            'Sistemi necə test edəcəyik? (Texniki detallar)',
            'Nəyi, kim, nə vaxt və hansı resurslarla test edəcək?',
            'Testlər nə vaxt bitəcək? (Yalnız qrafik)',
            'Hansı baqlar tapılıb? (Hesabat)'
        ],
        correctAnswer: 1,
        explanation: 'Test Planı - "Nəyi, necə, kim və nə vaxt test edəcəyik?" suallarına cavab verən əsas idarəetmə sənədidir.'
    },
    {
        id: 27,
        category: 'test_planning',
        difficulty: 'medium',
        question: 'Giriş Meyarları (Entry Criteria) nədir?',
        options: [
            'Testi bitirmək üçün şərtlər',
            'Test fəaliyyətinə başlamaq üçün lazım olan ilkin şərtlər (məs: Mühit hazırdır, Kod deploy olunub)',
            'İşə qəbul meyarları',
            'Baqın bağlanma şərtləri'
        ],
        correctAnswer: 1,
        explanation: 'Entry Criteria - test prosesinə başlamaq üçün nələrin hazır olmalı olduğunu müəyyən edir.'
    },
    {
        id: 28,
        category: 'test_planning',
        difficulty: 'medium',
        question: 'Çıxış Meyarları (Exit Criteria) nədir?',
        options: [
            'Testi başlamaq üçün şərtlər',
            'Testi dayandırmaq və ya tamamlamaq üçün şərtlər (məs: 100% testlər icra olunub, Kritik baq yoxdur)',
            'İşdən çıxma şərtləri',
            'Layihənin başlanğıc tarixi'
        ],
        correctAnswer: 1,
        explanation: 'Exit Criteria (və ya Definition of Done) - testin nə vaxt bitmiş hesab ediləcəyini müəyyən edir.'
    },
    {
        id: 29,
        category: 'test_planning',
        difficulty: 'hard',
        question: 'Test Strategiyası (Test Strategy) ilə Test Planı arasındakı fərq nədir?',
        options: [
            'Fərq yoxdur, eyni sənəddir',
            'Strategiya layihədən asılı olmayan ümumi yanaşmadır, Plan isə konkret layihə üçün detallardır',
            'Plan ümumi yanaşmadır, Strategiya konkret detallardır',
            'Strategiya yalnız avtomatlaşdırma üçündür'
        ],
        correctAnswer: 1,
        explanation: 'Strategiya daha yüksək səviyyəli sənəddir (məs: şirkət səviyyəsində). Plan isə konkret layihənin vaxtı, resursları və hədəfləri ilə bağlıdır.'
    },
    {
        id: 30,
        category: 'test_planning',
        difficulty: 'hard',
        question: 'Məhsul Riski (Product Risk) nümunəsi hansıdır?',
        options: [
            'Layihənin təhvil verilməsinin gecikməsi',
            'Test mühitinin vaxtında hazır olmaması',
            'Sistemin istifadəçi gözləntilərini qarşılamaması (məs: səhv hesablama)',
            'Test komandasının təcrübəsiz olması'
        ],
        correctAnswer: 2,
        explanation: 'Məhsul riski birbaşa proqramın keyfiyyəti ilə bağlıdır. Digərləri (vaxt, büdcə, heyət) Layihə Riskləridir.'
    },
    {
        id: 37,
        category: 'test_planning',
        difficulty: 'hard',
        question: 'Konfiqurasiya İdarəetməsi (Configuration Management) testdə niyə vacibdir?',
        options: [
            'Testçilərin kompüterlərini idarə etmək üçün',
            'Test edilən proqramın versiyalarını və mühitini nəzarətdə saxlamaq üçün',
            'Baqları silmək üçün',
            'Ofis ləvazimatlarını izləmək üçün'
        ],
        correctAnswer: 1,
        explanation: 'CM (Configuration Management) təmin edir ki, biz hansı versiyanı test etdiyimizi bilək və proses təkrarlana bilsin.'
    },
    {
        id: 38,
        category: 'test_planning',
        difficulty: 'medium',
        question: 'Test Eforunun (Zəhmətinin) Qiymətləndirilməsi (Test Estimation) hansı metodla edilə bilər?',
        options: [
            'Yalnız təxmin etməklə',
            'Mütəxəssis rəyi (Wideband Delphi) və Metrikalar əsasında',
            'Zər atmaqla',
            'Müştəridən soruşmaqla'
        ],
        correctAnswer: 1,
        explanation: 'Qiymətləndirmə adətən təcrübəli ekspertlərin rəyi və ya əvvəlki layihələrin statistikası (metrikalar) əsasında aparılır.'
    },
    // More Hard/Medium questions to balance adaptability
    {
        id: 39,
        category: 'qa_basics',
        difficulty: 'hard',
        question: 'Qüsurların Toplanması (Defect Clustering) prinsipi nəyi nəzərdə tutur?',
        options: [
            'Baqlar sistemin bütün modullarına bərabər paylanır',
            'Baqların əksəriyyəti (80%) modulların kiçik bir hissəsində (20%) cəmləşir',
            'Baqlar təsadüfi yerlərdə olur və onları proqnozlaşdırmaq mümkün deyil',
            'Baqlar yalnız istifadəçi interfeysində (UI) olur'
        ],
        correctAnswer: 1,
        explanation: 'Defect Clustering prinsipinə görə, qüsurlar bərabər paylanmır, adətən ən mürəkkəb və ya dəyişən modullarda toplanır.'
    },
    {
        id: 40,
        category: 'test_types',
        difficulty: 'medium',
        question: 'Black Box (Qara Qutu) test dizayn texnikalarına hansı aiddir?',
        options: [
            'Statement Coverage',
            'Boundary Value Analysis (Sərhəd Dəyərləri Analizi)',
            'Branch Coverage',
            'Code Review'
        ],
        correctAnswer: 1,
        explanation: 'Boundary Value Analysis, Equivalence Partitioning kimi texnikalar Black Box (Qara Qutu) üsullarıdır. Digərləri White Box və ya Statik testdir.'
    },
    {
        id: 41,
        category: 'test_types',
        difficulty: 'medium',
        question: 'White Box (Ağ Qutu) test dizayn texnikalarına hansı aiddir?',
        options: [
            'Use Case Testing',
            'Decision Coverage (Qərar örtüyü)',
            'State Transition Testing',
            'User Story Testing'
        ],
        correctAnswer: 1,
        explanation: 'Decision Coverage kodun məntiqi budaqlarını yoxlayır, bu White Box texnikasıdır.'
    },
    {
        id: 42,
        category: 'qa_basics',
        difficulty: 'hard', // Upgraded
        question: 'Hansı halda testləşdirmə dayandırılmalıdır?',
        options: [
            'Bütün baqlar tapıldıqda (Zero Defect)',
            'Çıxış Meyarları (Exit Criteria) qarşılandıqda və risklər məqbul səviyyəyə endikdə',
            'Test üçün ayrılan vaxt bitdikdə',
            'Bütün Test Case-lər icra edildikdə (nəticədən asılı olmayaraq)'
        ],
        correctAnswer: 1,
        explanation: 'Testi dayandırma qərarı əvvəlcədən müəyyən edilmiş meyarlara (Exit Criteria) və risk analizinə əsaslanmalıdır. Vaxt bitməsi məcburi səbəbdir, ideal səbəb deyil.'
    },
    {
        id: 43,
        category: 'bug_reporting',
        difficulty: 'medium',
        question: 'Baq hesabatında "Reproducibility" (Təkrarlanma) nə üçün vacibdir?',
        options: [
            'Vacib deyil, əsas odur ki baq tapılıb',
            'Baqın hər dəfə eyni addımlarla yarandığını göstərmək üçün (Developerin işini asanlaşdırır)',
            'Baqın sayını süni şəkildə artırmaq üçün',
            'Hesabatı daha uzun və ətraflı etmək üçün'
        ],
        correctAnswer: 1,
        explanation: 'Əgər baq təkrarlanmırsa (intermittent), onu düzəltmək çox çətindir. Reproducible (Təkrarlanan) olması onun stabil olduğunu göstərir.'
    },
    {
        id: 44,
        category: 'test_planning',
        difficulty: 'hard',
        question: 'Layihə Riski (Project Risk) nümunəsi hansıdır?',
        options: [
            'Verilənlər bazasının məlumat itirməsi',
            'Test mühitinin vaxtında hazır olmaması',
            'Hesablama modulunda səhv',
            'Sistemin cavab müddətinin uzun olması'
        ],
        correctAnswer: 1,
        explanation: 'Test mühitinin hazır olmaması layihənin gedişatına mane olur (Project Risk). Digərləri Məhsul riskləridir.'
    },
    {
        id: 45,
        category: 'test_types',
        difficulty: 'hard',
        question: '"End-to-End" (E2E) testləşdirmə nədir?',
        options: [
            'Yalnız sonuncu modulu yoxlamaq',
            'Sistemin başlanğıcdan sona qədər bütöv bir biznes prosesi kimi düzgün işlədiyini yoxlamaq',
            'Sistem Testi ilə eyni şeydir',
            'Bütün inteqrasiya testlərinin cəmidir'
        ],
        correctAnswer: 1,
        explanation: 'E2E testi istifadəçinin sistemdəki tam yolunu (məs: Qeydiyyat -> Sifariş -> Ödəniş -> Çatdırılma) yoxlayır, bütün inteqrasiyaları əhatə edir.'
    },
    {
        id: 46,
        category: 'qa_basics',
        difficulty: 'medium',
        question: 'İzləniləbilirlik Matrisi (Traceability Matrix) nə işə yarayır?',
        options: [
            'Testçilərin performansını izləmək üçün',
            'Tələblər (Requirements) ilə Test Case-lər arasındakı əlaqəni göstərmək və əhatəni (coverage) yoxlamaq üçün',
            'Baqların statusunu izləmək üçün',
            'Kodun versiyasını və tarixçəsini izləmək üçün'
        ],
        correctAnswer: 1,
        explanation: 'Traceability Matrix (RTM) hansı tələbin hansı testlə yoxlandığını göstərir, heç bir tələbin testsiz qalmamasını təmin edir.'
    },
    {
        id: 47,
        category: 'test_types',
        difficulty: 'easy',
        question: 'GUI (Graphical User Interface) testi nəyi yoxlayır?',
        options: [
            'Serverin işini və cavab sürətini',
            'Tətbiqin vizual elementlərini (düymələr, menyular, rənglər) və istifadəçi ilə qarşılıqlı əlaqəsini',
            'Verilənlər bazasının tamlığını',
            'API sorğularının düzgünlüyünü'
        ],
        correctAnswer: 1,
        explanation: 'GUI testi istifadəçinin gördüyü interfeys elementlərinin dizayna uyğunluğunu və işləkliyini yoxlayır.'
    },
    {
        id: 48,
        category: 'test_types',
        difficulty: 'hard',
        question: 'Localization (L10n) vs Internationalization (I18n) fərqi nədir?',
        options: [
            'Eyni şeydir',
            'I18n tətbiqi müxtəlif dillərə uyğunlaşdırmaq üçün texniki hazırlıqdır, L10n isə konkret bir dilə/regiona uyğunlaşdırmaqdır',
            'L10n proqramlaşdırmadır, I18n tərcümədir',
            'I18n yalnız tərcümədir, L10n isə valyuta dəyişimidir'
        ],
        correctAnswer: 1,
        explanation: 'Internationalization (I18n) - proqramın arxitekturasını elə qurmaqdır ki, fərqli dilləri dəstəkləsin. Localization (L10n) isə məzmunun konkret dilə tərcüməsi və formatlanmasıdır.'
    },
    {
        id: 49,
        category: 'bug_reporting',
        difficulty: 'medium',
        question: 'Baqın "Reopened" statusu nə vaxt verilir?',
        options: [
            'Baq ilk dəfə tapılanda',
            'Developer baqı düzəltdiyini deyib, amma testçi yoxlayanda baq hələ də mövcud olarsa',
            'Baq düzəldiləndə və bağlandıqda',
            'Baq rədd ediləndə və silinəndə'
        ],
        correctAnswer: 1,
        explanation: 'Əgər "Fixed" statuslu baq Retest zamanı uğursuz olarsa, o yenidən açılır (Reopened).'
    },
    {
        id: 50,
        category: 'test_planning',
        difficulty: 'medium',
        question: '"Risk-Based Testing" (Riskə əsaslanan test) yanaşmasının əsas prinsipi nədir?',
        options: [
            'Bütün testləri eyni dərəcədə vacib saymaq',
            'Test səylərini risk səviyyəsi yüksək olan sahələrə yönəltmək',
            'Risklərə fikir verməmək, yalnız funksionallığı yoxlamaq',
            'Yalnız asan və sürətli yerləri test etmək'
        ],
        correctAnswer: 1,
        explanation: 'Resurslar məhdud olduğu üçün, Risk-Based Testing ən çox problem çıxa biləcək və biznesə ən çox zərər vura biləcək hissələri prioritetləşdirir.'
    },
    // New Questions 51-60 to reach ~60 total pool
    {
        id: 51,
        category: 'test_planning',
        difficulty: 'hard',
        question: 'V-Model inkişaf modelində Testləşdirmə ilə İnkişaf (Development) arasındakı əlaqə necədir?',
        options: [
            'Testləşdirmə yalnız kod yazıldıqdan sonra başlayır',
            'Hər inkişaf mərhələsinin (Tələb, Dizayn, Kod) özünə uyğun test səviyyəsi var (Qəbul, Sistem, Unit)',
            'Testləşdirmə və inkişaf tamamilə ayrı proseslərdir',
            'V-Model yalnız şəlalə (Waterfall) modelidir'
        ],
        correctAnswer: 1,
        explanation: 'V-Modeldə hər inkişaf mərhələsinin qarşısında müvafiq test mərhələsi durur (Məs: Tələblər <-> Qəbul Testi, Kod <-> Unit Test).'
    },
    {
        id: 52,
        category: 'qa_basics',
        difficulty: 'medium',
        question: 'Kəşfiyyat (Exploratory) Testi ilə Ad-hoc Testi arasındakı fərq nədir?',
        options: [
            'Fərq yoxdur',
            'Ad-hoc tamamilə təsadüfidir, Exploratory isə strukturlaşdırılmış öyrənmə və test dizaynı prosesidir',
            'Ad-hoc sənədləşdirilir, Exploratory sənədləşdirilmir',
            'Exploratory yalnız avtomatlaşdırılmış testdir'
        ],
        correctAnswer: 1,
        explanation: 'Exploratory Testing planlı və məqsədyönlüdür, Ad-hoc isə tamamilə plansız və sistemsizdir ("monkey testing").'
    },
    {
        id: 53,
        category: 'test_types',
        difficulty: 'hard',
        question: 'Hansı test "Statik Analiz" alətləri ilə avtomatlaşdırıla bilər?',
        options: [
            'Funksional Test',
            'Kod standartlarına uyğunluq, ölü kod (dead code), təhlükəsizlik boşluqları',
            'İstifadəçi Qəbul Testi (UAT)',
            'Performans Testi'
        ],
        correctAnswer: 1,
        explanation: 'Statik analiz alətləri (məs: SonarQube) kodu işə salmadan onun strukturunu, standartlara uyğunluğunu və potensial səhvlərini yoxlayır.'
    },
    {
        id: 54,
        category: 'qa_basics',
        difficulty: 'medium', // Upgraded
        question: '"Shift Left" (Sola sürüşdürmə) yanaşması nə deməkdir?',
        options: [
            'Testləşdirməni layihənin sonuna saxlamaq',
            'Test fəaliyyətlərini inkişaf dövrünün (SDLC) mümkün qədər erkən mərhələlərində başlatmaq',
            'TDD (Test Driven Development) ilə eyni şeydir',
            'Yalnız Unit testlərə fokuslanmaq'
        ],
        correctAnswer: 1,
        explanation: 'Shift Left - səhvləri erkən tapmaq və düzəltmək üçün test fəaliyyətlərini inkişaf dövrünün əvvəlinə (sola) çəkməkdir. TDD bunun bir yoludur, amma eyni şey deyil.'
    },
    {
        id: 55,
        category: 'bug_reporting',
        difficulty: 'hard',
        question: 'Baq hesabatında "Əlavələr" (Attachments) nə üçün vacibdir?',
        options: [
            'Hesabatı bəzəmək üçün',
            'Sözlə təsvir edilməsi çətin olan vizual sübutları (screenshot, video, loglar) təmin etmək üçün',
            'Serverdə yer tutmaq üçün',
            'Developerə hörmət əlaməti olaraq'
        ],
        correctAnswer: 1,
        explanation: 'Bir şəkil min sözə bərabərdir. Loglar və screenshotlar developerə problemin kökünü tapmaqda əvəzsiz kömək edir.'
    },
    {
        id: 56,
        category: 'test_planning',
        difficulty: 'medium',
        question: 'Test Mühiti (Test Environment) ilə Canlı Mühit (Production Environment) arasındakı ideal əlaqə necə olmalıdır?',
        options: [
            'Test mühiti daha zəif olmalıdır',
            'Test mühiti mümkün qədər Canlı mühitə (Production) bənzəməlidir (Data, Konfiqurasiya)',
            'Test mühiti tamamilə fərqli olmalıdır',
            'Test mühiti developerin kompüterində olmalıdır'
        ],
        correctAnswer: 1,
        explanation: 'Əgər Test mühiti Production mühitindən çox fərqlidirsə, test nəticələri etibarsız ola bilər (məs: Production-da çıxan səhv Test-də çıxmaz).'
    },
    {
        id: 57,
        category: 'test_types',
        difficulty: 'hard',
        question: 'Hansı test növü "Regressiya" (Regression) testindən fərqlidir?',
        options: [
            'Təkrar test (Re-testing / Confirmation Testing)',
            'Avtomatlaşdırılmış test',
            'Funksional test',
            'Qeyri-funksional test'
        ],
        correctAnswer: 0,
        explanation: 'Re-testing (Təkrar test) konkret bir baqın düzəldiyini yoxlayır. Regressiya isə bu düzəlişin başqa yerləri sındırmadığını yoxlayır.'
    },
    {
        id: 58,
        category: 'qa_basics',
        difficulty: 'easy',
        question: 'QA mühəndisinin ən vacib "yumşaq bacarığı" (soft skill) hansıdır?',
        options: [
            'Yalnız kod yaza bilmək',
            'Effektiv ünsiyyət (Communication) və detallara diqqət',
            'Sürətli yazmaq',
            'Dizayn edə bilmək'
        ],
        correctAnswer: 1,
        explanation: 'QA texniki bacarıqlar qədər, tapdığı səhvləri düzgün izah etməli və komanda ilə effektiv ünsiyyət qurmalıdır.'
    },
    {
        id: 59,
        category: 'test_planning',
        difficulty: 'hard',
        question: 'Test Piramidasının (Test Pyramid) əsas prinsipi nədir?',
        options: [
            'Çoxlu UI test, az Unit test',
            'Çoxlu Unit test (təməl), orta sayda İnteqrasiya test, az sayda UI test (zirvə)',
            'Bütün testlər bərabər sayda olmalıdır',
            'Yalnız manual test olmalıdır'
        ],
        correctAnswer: 1,
        explanation: 'Test Piramidası: Unit testlər sürətli və ucuzdur (çox olmalıdır), UI testlər yavaş və bahalıdır (az olmalıdır).'
    },
    {
        id: 60,
        category: 'bug_reporting',
        difficulty: 'medium',
        question: 'Baqın "Priority" (Prioritet) səviyyəsini kim təyin edir?',
        options: [
            'Yalnız Developer',
            'Adətən Məhsul Sahibi (Product Owner) və ya Biznes tərəf (testçi ilə məsləhətləşərək)',
            'Yalnız Testçi',
            'Müştəri Xidmətləri'
        ],
        correctAnswer: 1,
        explanation: 'Prioritet biznesin ehtiyaclarına əsaslanır (nə vaxt düzəlməlidir?), buna görə biznes tərəfi və ya PO qərar verir.'
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

// Helper function to get questions by difficulty
export function getQuestionsByDifficulty(difficulty) {
    return examQuestions.filter(q => q.difficulty === difficulty);
}

// Category names
export const categories = {
    qa_basics: 'QA əsasları',
    test_types: 'Test növləri',
    bug_reporting: 'Baq hesabatı',
    test_planning: 'Test planlaşdırması'
};
