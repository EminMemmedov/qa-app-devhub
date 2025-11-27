
export const istqbChapters = [
    {
        id: 1,
        title: "Testləşdirmənin Əsasları",
        desc: "Testin mahiyyəti, prinsipləri və psixologiyası.",
        color: "bg-blue-500",
        icon: "BookOpen"
    },
    {
        id: 2,
        title: "SDLC-də Testləşdirmə",
        desc: "Agile, Waterfall və V-Model-də testin yeri.",
        color: "bg-purple-500",
        icon: "GitBranch"
    },
    {
        id: 3,
        title: "Statik Testləşdirmə",
        desc: "Review prosesi və statik analiz.",
        color: "bg-emerald-500",
        icon: "Search"
    },
    {
        id: 4,
        title: "Test Texnikaları",
        desc: "Black-box, White-box və Experience-based texnikalar.",
        color: "bg-orange-500",
        icon: "Target"
    },
    {
        id: 5,
        title: "Testin İdarə Edilməsi",
        desc: "Test Plan, Risklər və Konfiqurasiya idarəetməsi.",
        color: "bg-red-500",
        icon: "Briefcase"
    },
    {
        id: 6,
        title: "Test Alətləri",
        desc: "Alətlərin növləri, seçimi və tətbiqi.",
        color: "bg-indigo-500",
        icon: "Wrench"
    }
];

export const istqbQuestions = [
    // Chapter 1
    {
        id: 101,
        chapterId: 1,
        level: "K1",
        question: "Aşağıdakılardan hansı testləşdirmənin əsas məqsədlərindən biri DEYİL?",
        options: [
            "Qüsurların (defektlərin) qarşısını almaq",
            "Proqram təminatına inam yaratmaq",
            "Proqramda heç bir səhvin olmadığını sübut etmək",
            "Qərar qəbulu üçün məlumat təmin etmək"
        ],
        correctAnswer: 2,
        explanation: "Testləşdirmə qüsurların olduğunu göstərə bilər, amma onların yoxluğunu sübut edə bilməz (Testin 7 Prinsipi)."
    },
    {
        id: 102,
        chapterId: 1,
        level: "K2",
        question: "Səhv (Error), Qüsur (Defect) və Uğursuzluq (Failure) arasındakı fərq nədir?",
        options: [
            "Səhv insan tərəfindən edilir, bu qüsuru yaradır, qüsur isə uğursuzluğa səbəb olur.",
            "Qüsur insan tərəfindən edilir, bu səhvi yaradır, səhv isə uğursuzluğa səbəb olur.",
            "Uğursuzluq insan tərəfindən edilir, bu səhvi yaradır, səhv isə qüsuru yaradır.",
            "Bunların hamısı sinonimdir."
        ],
        correctAnswer: 0,
        explanation: "İnsan SƏHV edir -> kodda QÜSUR yaranır -> proqram işlədikdə UĞURSUZLUQ baş verir."
    },
    // Chapter 4
    {
        id: 401,
        chapterId: 4,
        level: "K3",
        topic: "Sərhəd Dəyərləri (BVA)",
        question: "Bir sahə 18-dən 65-ə qədər (daxil olmaqla) yaş qəbul edir. Sərhəd Dəyərləri Analizi (Boundary Value Analysis) üçün hansı dəyərlər seçilməlidir (2-value approach)?",
        options: [
            "17, 18, 65, 66",
            "18, 19, 64, 65",
            "0, 18, 65, 100",
            "17, 19, 64, 66"
        ],
        correctAnswer: 0,
        explanation: "Sərhəd dəyərləri: min-1, min, max, max+1. Yəni: 17, 18, 65, 66."
    },
    {
        id: 402,
        chapterId: 4,
        level: "K3",
        topic: "Ekşivalentlik Sinifləri (EP)",
        question: "Şifrə sahəsi minimum 6, maksimum 10 simvol qəbul edir. Etibarlı (valid) Ekşivalentlik Sinifləri hansılardır?",
        options: [
            "0-5, 6-10, 11+",
            "6-10",
            "5, 6, 10, 11",
            "Yalnız 8"
        ],
        correctAnswer: 1,
        explanation: "Etibarlı sinif qaydalara uyğun olan aralıqdır. 6-10 simvol uzunluğu etibarlıdır. Digərləri (0-5 və 11+) etibarsız siniflərdir."
    },
    {
        id: 403,
        chapterId: 4,
        level: "K3",
        topic: "Ekşivalentlik Sinifləri (EP)",
        question: "Mağaza 10 AZN-dən az alış-verişə 0% endirim, 10-50 AZN arasına 5%, 50 AZN-dən yuxarı isə 10% endirim edir. Neçə ədəd etibarlı ekşivalentlik sinfi var?",
        options: [
            "2",
            "3",
            "4",
            "5"
        ],
        correctAnswer: 1,
        explanation: "3 etibarlı sinif var: 1) <10 (0%), 2) 10-50 (5%), 3) >50 (10%)."
    },
    {
        id: 404,
        chapterId: 4,
        level: "K3",
        topic: "Sərhəd Dəyərləri (BVA)",
        question: "Bir imtahanın nəticəsi 0-100 bal aralığında qiymətləndirilir. Keçid balı 60-dır. Hansı test dəyərləri Sərhəd Dəyərləri Analizi (3-value) üçün ən uyğundur?",
        options: [
            "-1, 0, 59, 60, 100, 101",
            "0, 59, 60, 61, 100",
            "0, 1, 60, 99, 100",
            "-1, 0, 60, 100, 101"
        ],
        correctAnswer: 0,
        explanation: "3-value BVA üçün sərhədlər və onların ətrafı yoxlanılır: min-1, min, min+1, max-1, max, max+1. Bu sualda həm şkalanın sərhədləri (0, 100), həm də keçid balı (60) vacibdir. Keçid balı üçün 59, 60, 61 yoxlanmalıdır. Lakin ən tam cavab sərhədlərin aşılmasını da əhatə edən variantdır: -1, 0, 100, 101 və keçid nöqtəsi 59, 60."
    },
    {
        id: 405,
        chapterId: 4,
        level: "K3",
        topic: "Ekşivalentlik Sinifləri (EP)",
        question: "Sığorta şirkəti sürücüləri yaşına görə qruplaşdırır: 'Gənc' (18-25), 'Təcrübəli' (26-60), 'Yaşlı' (61+). Etibarsız (invalid) ekşivalentlik siniflərindən bir test dəyəri seçin.",
        options: [
            "25",
            "60",
            "17",
            "62"
        ],
        correctAnswer: 2,
        explanation: "Etibarlı siniflər: 18-25, 26-60, 61+. Etibarsızlar: <18 (məsələn 17) və ya qeyri-rəqəm."
    },
    {
        id: 406,
        chapterId: 4,
        level: "K3",
        topic: "Statement Coverage (White-box)",
        question: "Sadə bir 'if-else' şərti: `if (x > 5) print('A'); else print('B');`. 'Statement Coverage' (Operatorların əhatə olunması) 100% olması üçün neçə test keys lazımdır?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: 1,
        explanation: "Koda əsasən: x > 5 olduqda 'A', digər halda 'B' çap olunur. Hər iki sətrin (print A və print B) icra olunması üçün 2 test keys lazımdır (məsələn, x=6 və x=4)."
    },
    {
        id: 407,
        chapterId: 4,
        level: "K3",
        topic: "Vəziyyət Keçidləri (State Transition)",
        question: "Sistemdə sifarişin statusları var: 'Yeni' -> 'Təsdiqlənmiş' -> 'Göndərilmiş' -> 'Çatdırılmış'. 'Təsdiqlənmiş' statusundan 'Ləğv edilmiş' statusuna keçid mümkündür. Neçə ədəd etibarlı keçid (transition) test edilməlidir?",
        options: [
            "3",
            "4",
            "5",
            "6"
        ],
        correctAnswer: 1,
        explanation: "Keçidlər: 1) Yeni -> Təsdiqlənmiş, 2) Təsdiqlənmiş -> Göndərilmiş, 3) Göndərilmiş -> Çatdırılmış, 4) Təsdiqlənmiş -> Ləğv edilmiş. Cəmi 4 keçid."
    },
    {
        id: 408,
        chapterId: 4,
        level: "K3",
        topic: "Qərar Cədvəli (Decision Table)",
        question: "Qərar Cədvəli (Decision Table): Bir kluba giriş qaydası: Yaş >= 18 VƏ (Bilet var VƏ YA Dəvətnamə var). Girişin 'İCAZƏ VERİLİR' olması üçün hansı kombinasiya lazımdır?",
        options: [
            "Yaş: 17, Bilet: Var, Dəvətnamə: Yox",
            "Yaş: 20, Bilet: Yox, Dəvətnamə: Yox",
            "Yaş: 18, Bilet: Yox, Dəvətnamə: Var",
            "Yaş: 25, Bilet: Yox, Dəvətnamə: Yox"
        ],
        correctAnswer: 2,
        explanation: "Şərt: Yaş >= 18 (True) AND (Bilet (True) OR Dəvətnamə (True)). Variant C: Yaş 18 (True), Bilet Yox (False), Dəvətnamə Var (True) -> True && (False || True) = True."
    },
    // K4 (Analyze) Questions
    {
        id: 103,
        chapterId: 1,
        level: "K4",
        topic: "Test Prinsiplərinin Təhlili",
        question: "Komanda layihənin sonunda 100% 'Statement Coverage' əldə etdi və bütün testlər uğurla keçdi. Lakin istifadəçilər proqramda ciddi məntiqi səhvlər tapdılar. Bu hansı test prinsipini sübut edir?",
        options: [
            "Qüsurların olmaması yanılgısı (Absence-of-errors fallacy)",
            "Pestisid paradoksu (Pesticide paradox)",
            "Erkən testləşdirmə (Early testing)",
            "Test kontekstdən asılıdır (Context dependent)"
        ],
        correctAnswer: 0,
        explanation: "Kodun 100% örtülməsi (coverage) proqramın düzgün işlədiyini sübut etmir. Əgər biz səhv tələbləri yoxlayırıqsa və ya istifadəçi ehtiyaclarını nəzərə almırıqsa, bu 'Qüsurların olmaması yanılgısı'dır."
    },
    {
        id: 501,
        chapterId: 5,
        level: "K4",
        topic: "Risk Əsaslı Test (Risk Analysis)",
        question: "Risk əsaslı testləşdirmə (Risk-Based Testing) apararkən aşağıdakı risklərdən hansına ƏN YÜKSƏK prioritet verilməlidir?",
        options: [
            "Ehtimalı YÜKSƏK, Təsiri (Impact) AŞAĞI olan risk",
            "Ehtimalı AŞAĞI, Təsiri YÜKSƏK olan risk",
            "Ehtimalı YÜKSƏK, Təsiri YÜKSƏK olan risk",
            "Ehtimalı AŞAĞI, Təsiri AŞAĞI olan risk"
        ],
        correctAnswer: 2,
        explanation: "Risk səviyyəsi = Ehtimal x Təsir. Həm ehtimalı (baş vermə şansı), həm də təsiri (zərəri) yüksək olan risklər layihə üçün ən təhlükəlidir və dərhal test edilməlidir."
    },
    {
        id: 201,
        chapterId: 2,
        level: "K4",
        topic: "Test Strategiyasının Seçimi",
        question: "Siz Agile layihədə işləyirsiniz. Hər sprintin sonunda 'Regression Testing' vaxt aparır və yeni funksiyaları test etməyə vaxt qalmır. Bu vəziyyəti həll etmək üçün ən yaxşı yanaşma hansıdır?",
        options: [
            "Reqressiya testlərini dayandırmaq",
            "Reqressiya testlərini avtomatlaşdırmaq",
            "Manual testçilərin sayını artırmaq",
            "Sprintin müddətini uzatmaq"
        ],
        correctAnswer: 1,
        explanation: "Agile-da sürət vacibdir. Təkrarlanan reqressiya testləri avtomatlaşdırılmalıdır ki, manual testçilər yeni funksiyaların kəşfiyyat (exploratory) testinə vaxt ayıra bilsinlər."
    },
    // NEW K3 TASKS
    {
        id: 409,
        chapterId: 4,
        level: "K3",
        topic: "Sərhəd Dəyərləri (BVA)",
        question: "Soyuducu temperaturu -20 ilə +10 dərəcə arasında tənzimlənir (daxil olmaqla). 2-value BVA yanaşması ilə hansı dəyərlər seçilməlidir?",
        options: [
            "-21, -20, 10, 11",
            "-20, -19, 9, 10",
            "-20, 0, 10",
            "-21, -20, -19, 9, 10, 11"
        ],
        correctAnswer: 0,
        explanation: "Minimum (-20) və Maksimum (10) sərhədləri üçün: Min (-20), Min-1 (-21), Max (10), Max+1 (11). Cavab: -21, -20, 10, 11."
    },
    {
        id: 410,
        chapterId: 4,
        level: "K3",
        topic: "Vəziyyət Keçidləri (State Transition)",
        question: "ATM (Bankomat) 'Gözləmə' vəziyyətindədir. Kart daxil edilir -> 'PIN Gözləyir'. PIN səhvdir (1-ci cəhd) -> 'PIN Gözləyir'. PIN səhvdir (2-ci cəhd) -> 'PIN Gözləyir'. PIN səhvdir (3-cü cəhd) -> 'Kartı Udmaq'. Neçə fərqli vəziyyət (State) təsvir olunub?",
        options: [
            "2 (Gözləmə, PIN Gözləyir)",
            "3 (Gözləmə, PIN Gözləyir, Kartı Udmaq)",
            "4 (Gözləmə, PIN 1, PIN 2, PIN 3)",
            "5"
        ],
        correctAnswer: 1,
        explanation: "Təsvir olunan vəziyyətlər: 1. Gözləmə, 2. PIN Gözləyir (bura təkrar qayıdır), 3. Kartı Udmaq (son vəziyyət). Cəmi 3 fərqli vəziyyət adı çəkilib."
    },
    {
        id: 411,
        chapterId: 4,
        level: "K3",
        topic: "Qərar Cədvəli (Decision Table)",
        question: "Kredit verilmə şərtləri: (Maaş > 1000 AZN) VƏ (İş təcrübəsi > 2 il) VƏ (Kredit tarixçəsi 'Yaxşı'). Əgər bunlardan HƏR HANSI BİRİ 'Xeyr' olarsa, kredit 'Rədd edilir'. Kreditin 'Verilməsi' üçün neçə qayda (rule) 'True' olmalıdır?",
        options: [
            "1",
            "3",
            "7",
            "8"
        ],
        correctAnswer: 0,
        explanation: "Yalnız bir halda kredit verilir: T, T, T. Qalan bütün kombinasiyalar (F,T,T; T,F,T və s.) imtinaya səbəb olur. Cavab: 1."
    },
    // NEW K4 TASKS
    {
        id: 502,
        chapterId: 5,
        level: "K4",
        topic: "Xəta İdarəetməsi (Incident Management)",
        question: "Sistemdə şirkət logosunun rəngi səhvdir, amma funksionallıq tam işləyir. Bu xətanın (defect) Prioriteti və Ciddiliyi (Severity) necə olmalıdır?",
        options: [
            "Yüksək Ciddilik, Yüksək Prioritet",
            "Aşağı Ciddilik, Yüksək Prioritet",
            "Aşağı Ciddilik, Aşağı Prioritet",
            "Yüksək Ciddilik, Aşağı Prioritet"
        ],
        correctAnswer: 1,
        explanation: "Ciddilik (Severity) aşağıdır, çünki sistem işləyir və bu sadəcə kosmetikdir. Amma Prioritet Yüksək ola bilər, çünki bu brendin imicinə zərər vurur və dərhal düzəldilməlidir."
    },
    {
        id: 301,
        chapterId: 3,
        level: "K4",
        topic: "Statik Test (Review)",
        question: "Tələblərin nəzərdən keçirilməsi (Review) zamanı 'Login' funksiyası üçün şifrə tələblərinin yazılmadığı aşkarlandı. Bu hansı növ xətadır?",
        options: [
            "Kod səhvi",
            "Dizayn səhvi",
            "Yarımçıq tələb (Omission)",
            "Məntiq səhvi"
        ],
        correctAnswer: 2,
        explanation: "Əgər spesifikasiyada vacib bir məlumat (şifrə qaydaları) yoxdursa, bu 'Yarımçıq tələb' (Omission) və ya çatışmazlıqdır. Statik test bunu kod yazılmadan tapmağa kömək edir."
    },
    {
        id: 202,
        chapterId: 2,
        level: "K4",
        topic: "SDLC və Test",
        question: "Startap çox sürətlə bazar dəyişikliklərinə reaksiya verməlidir. Tələblər tez-tez dəyişir. Hansı inkişaf modeli ƏN AZ uyğundur?",
        options: [
            "Agile (Scrum)",
            "Kanban",
            "V-Model",
            "Iterativ model"
        ],
        correctAnswer: 2,
        explanation: "V-Model (və Waterfall) tələblərin əvvəlcədən sabitlənməsini tələb edir. Dəyişən tələblər üçün Agile və ya Kanban daha uyğundur. V-Model bu halda ən az uyğundur."
    },
    // MORE NEW K3 TASKS
    {
        id: 412,
        chapterId: 4,
        level: "K3",
        topic: "Statement Coverage (Ağ Qutu)",
        question: "Kod parçası: `if (A > 0) { print('Positive'); } if (B > 0) { print('Positive'); }`. A=5 və B=5 testi ilə neçə faiz Statement Coverage əldə edilir?",
        options: [
            "25%",
            "50%",
            "75%",
            "100%"
        ],
        correctAnswer: 3,
        explanation: "Test A=5 (True) və B=5 (True) hər iki `print` əmrini icra edir. Bütün sətirlər işlədiyi üçün örtülmə (coverage) 100%-dir."
    },
    {
        id: 413,
        chapterId: 4,
        level: "K3",
        topic: "Use Case Testi",
        question: "İstifadəçi ssenarisi: 1. Kartı daxil et. 2. PIN yığ. 3. PIN OK. 4. Məbləği seç. 5. Pulu götür. Alternativ: 3a. PIN Səhv -> Mesaj göstər. Minimum neçə test keys lazımdır?",
        options: [
            "1 (Uğurlu yol)",
            "2 (Uğurlu yol + PIN Səhv)",
            "3",
            "5"
        ],
        correctAnswer: 1,
        explanation: "Hər bir ssenari yolu üçün ən azı 1 test lazımdır. Bizdə 1 Əsas Yol (Main Path) və 1 Alternativ Yol (3a) var. Cəmi: 2 test keys."
    },
    {
        id: 414,
        chapterId: 4,
        level: "K3",
        topic: "Ekşivalentlik Sinifləri (EP)",
        question: "Mobil nömrə sahəsi yalnız rəqəm qəbul edir və uzunluğu 10 simvol olmalıdır. 'Invalid' (Etibarsız) EP testi üçün hansı dəyər uyğundur?",
        options: [
            "0551234567 (10 rəqəm)",
            "123456789 (9 rəqəm)",
            "0507654321 (10 rəqəm)",
            "0701112233 (10 rəqəm)"
        ],
        correctAnswer: 1,
        explanation: "Etibarlı sinif: Uzunluq = 10. Etibarsız siniflər: Uzunluq < 10 və ya Uzunluq > 10. Variant B (9 rəqəm) etibarsız sinfə aiddir."
    },
    // MORE NEW K4 TASKS
    {
        id: 503,
        chapterId: 5,
        level: "K4",
        topic: "Baqın Həyat Dövrü (Defect Lifecycle)",
        question: "Testçi baq tapdı, status 'New' oldu. Developer baqı düzəltdi və statusu 'Fixed' etdi. Testçi yoxladı, amma baq hələ də mövcuddur. Testçi statusu nəyə dəyişməlidir?",
        options: [
            "Closed",
            "New",
            "Reopened",
            "Deferred"
        ],
        correctAnswer: 2,
        explanation: "Əgər düzəldildiyi iddia edilən baq (Fixed) hələ də təkrarlanırsa, o bağlanmır (Closed), əksinə yenidən açılır (Reopened)."
    },
    {
        id: 504,
        chapterId: 5,
        level: "K4",
        topic: "Test Monitorinqi",
        question: "Layihənin ortasındasınız. Testlərin icrası qrafiki (S-curve) planlaşdırılandan çox aşağıdadır. Baqların tapılma sürəti isə çox yüksəkdir. Bu nə demək ola bilər?",
        options: [
            "Testçilər çox yavaş işləyir",
            "Proqram təminatının keyfiyyəti çox aşağıdır, çoxlu baq testləri bloklayır",
            "Testlər çox asandır",
            "Hər şey plan üzrə gedir"
        ],
        correctAnswer: 1,
        explanation: "Baqların çox olması testlərin irəliləməsinə mane olur (blocking defects). Testçilər vaxtlarını test etməkdən çox, baq report yazmağa və 'fix'ləri gözləməyə sərf edirlər."
    },
    {
        id: 302,
        chapterId: 3,
        level: "K4",
        topic: "İnteqrasiya Strategiyası",
        question: "Sistemin 'Login' modulu hazırdır, amma 'Database' modulu hələ hazır deyil. 'Login' modulunu test etmək üçün hansı yanaşma və alət lazımdır?",
        options: [
            "Top-down inteqrasiya, Stub (kötük) istifadəsi",
            "Bottom-up inteqrasiya, Driver istifadəsi",
            "Big Bang inteqrasiya",
            "Sistem testi"
        ],
        correctAnswer: 0,
        explanation: "Login (Yuxarı səviyyə) hazır, Database (Aşağı səviyyə) yoxdursa, bizə Top-down yanaşma lazımdır. Çağırılan aşağı səviyyəli modulu əvəz etmək üçün 'Stub' istifadə olunur."
    },
    // EVEN MORE K3 TASKS
    {
        id: 415,
        chapterId: 4,
        level: "K3",
        topic: "Statement Coverage (Ağ Qutu)",
        question: "Kod: `if (A > 5 || B < 0) { print('X'); } else { print('Y'); }`. 100% Statement Coverage üçün minimum neçə test keys lazımdır?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: 1,
        explanation: "Statement Coverage üçün hər sətirin ən azı bir dəfə işləməsi lazımdır. 1. Test: A=6 (True) -> print('X'). 2. Test: A=0, B=0 (False) -> print('Y'). Cəmi 2 test kifayətdir."
    },
    {
        id: 416,
        chapterId: 4,
        level: "K3",
        topic: "Qərar Cədvəli (Decision Table)",
        question: "Qayda: Müştəri 'Gold' statusundadırsa VƏ alış > 500 AZN isə, 20% endirim. 'Silver' isə VƏ alış > 500 AZN isə, 10% endirim. Əks halda 0%. Müştəri: Silver, Alış: 600 AZN. Nəticə nədir?",
        options: [
            "20% endirim",
            "10% endirim",
            "0% endirim",
            "Xəta"
        ],
        correctAnswer: 1,
        explanation: "Şərtlər: Status=Silver (True), Alış>500 (True). Cədvələ görə bu kombinasiya 10% endirim verir."
    },
    {
        id: 417,
        chapterId: 4,
        level: "K3",
        topic: "Vəziyyət Keçidləri (State Transition)",
        question: "Sənəd statusları: 'Qaralama' -> 'İcmal' -> 'Dərc edilib'. 'İcmal'dan 'Qaralama'ya qayıtmaq olar. 'Dərc edilib'dən birbaşa 'Qaralama'ya qayıtmaq olmaz. Hansı keçid (transition) etibarsızdır?",
        options: [
            "Qaralama -> İcmal",
            "İcmal -> Qaralama",
            "İcmal -> Dərc edilib",
            "Dərc edilib -> Qaralama"
        ],
        correctAnswer: 3,
        explanation: "Şərtə görə 'Dərc edilib' statusundan birbaşa 'Qaralama'ya qayıtmaq olmaz (ola bilsin ki, arxivlənməlidir). Bu 'Invalid Transition'dur."
    },
    // EVEN MORE K4 TASKS
    {
        id: 505,
        chapterId: 5,
        level: "K4",
        topic: "Test Qiymətləndirilməsi (Estimation)",
        question: "Test meneceri test müddətini hesablayarkən yalnız 'Test Execution' vaxtını nəzərə alıb. Layihə gecikir. O nəyi unutmuş ola bilər?",
        options: [
            "Test Mühitinin (Environment) hazırlanması",
            "Baqların təkrar yoxlanması (Retesting) və Reqressiya",
            "Test məlumatlarının (Data) yaradılması",
            "Bütün yuxarıdakılar"
        ],
        correctAnswer: 3,
        explanation: "Test təkcə 'run' düyməsini sıxmaq deyil. Mühit qurulması, data hazırlığı, report yazılması və ən əsası - tapılan baqların yenidən yoxlanması (retesting) vaxt aparır."
    },
    {
        id: 506,
        chapterId: 5,
        level: "K4",
        topic: "Risk Azaldılması (Mitigation)",
        question: "Relizə 1 gün qalıb. Kritik (Critical) bir baq tapılıb, amma onu düzəltmək (Fix) çox risklidir və digər yerləri sındıra bilər. Test Meneceri hansı qərarı verməlidir?",
        options: [
            "Mütləq düzəldilməlidir, reliz geciksə belə",
            "Baqı gizlətməlidir",
            "Riski bizneslə müzakirə edib, 'Known Issue' (Məlum Xəta) kimi reliz etmək və ya hotfix planlamaq",
            "Developerə qışqırmalıdır"
        ],
        correctAnswer: 2,
        explanation: "Kritik anlarda 'Risk Analizi' lazımdır. Əgər düzəliş daha böyük risk yaradırsa, menecer biznes (Product Owner) ilə danışıb qərar verməlidir (Workaround və ya Known Issue)."
    },
    {
        id: 203,
        chapterId: 2,
        level: "K4",
        topic: "Kök Səbəb Analizi (Root Cause)",
        question: "İstifadəçilər 'Səbət' modulunda tez-tez səhv edirlər. Testlər texniki cəhətdən keçir, amma UX (İstifadəçi Təcrübəsi) pisdir. Bu problemin kök səbəbi (Root Cause) nə ola bilər?",
        options: [
            "Developer səhv kod yazıb",
            "Testçilər diqqətsizdir",
            "Tələblərin toplanması mərhələsində istifadəçi ehtiyacları nəzərə alınmayıb",
            "Server yavaş işləyir"
        ],
        correctAnswer: 2,
        explanation: "Əgər sistem işləyir amma istifadəçilər üçün narahatdırsa, problem adətən dizayn və ya tələblər (Requirements) mərhələsində istifadəçi rəyinin alınmamasından qaynaqlanır."
    },
    // Chapter 1 Extra
    {
        id: 104,
        chapterId: 1,
        level: "K2",
        question: "Testləşdirmə və sazlama (Debugging) arasındakı fərq nədir?",
        options: [
            "Testləşdirmə səhvləri tapır, sazlama onları düzəldir",
            "Testləşdirmə developerlər, sazlama testçilər tərəfindən edilir",
            "Sazlama testləşdirmənin bir növüdür",
            "Fərq yoxdur"
        ],
        correctAnswer: 0,
        explanation: "Testin məqsədi qüsurları (failure) aşkar etməkdir. Sazlamanın (debugging) məqsədi isə kök səbəbi tapıb düzəltməkdir."
    },
    {
        id: 105,
        chapterId: 1,
        level: "K1",
        question: "'Pestisid Paradoksu' prinsipi nəyi ifadə edir?",
        options: [
            "Testlər avtomatlaşdırılmalıdır",
            "Eyni testləri təkrar-təkrar icra etdikdə, onlar yeni baqları tapmır",
            "Kodda səhvlər həmişə var",
            "Testlər erkən başlamalıdır"
        ],
        correctAnswer: 1,
        explanation: "Pestisid paradoksu: Həşəratlar dərmana öyrəşdiyi kimi, proqram da eyni testlərə 'öyrəşir'. Yeni baqlar tapmaq üçün testləri mütəmadi yeniləmək lazımdır."
    },
    {
        id: 106,
        chapterId: 1,
        level: "K1",
        question: "Test prosesinin əsas mərhələlərinin düzgün ardıcıllığı hansıdır?",
        options: [
            "Planlaşdırma, Analiz, Dizayn, İcra, Hesabat",
            "İcra, Planlaşdırma, Analiz, Dizayn, Hesabat",
            "Dizayn, Analiz, Planlaşdırma, İcra, Hesabat",
            "Analiz, Planlaşdırma, İcra, Dizayn, Hesabat"
        ],
        correctAnswer: 0,
        explanation: "Standart ardıcıllıq: Planlaşdırma -> Analiz -> Dizayn -> İmplementasiya -> İcra -> Tamamlama."
    },
    {
        id: 107,
        chapterId: 1,
        level: "K2",
        question: "Testin müstəqilliyi (Independence of Testing) niyə vacibdir?",
        options: [
            "Testçilər developerlərdən daha ağıllıdır",
            "Müstəqil testçilər proqramçıların görmədiyi fərqli qüsurları tapa bilər (qərəzsizlik)",
            "Müstəqil testçilər daha ucuz başa gəlir",
            "Developerlər test edə bilmir"
        ],
        correctAnswer: 1,
        explanation: "Developer öz koduna qərəzli yanaşa bilər (confirmation bias). Müstəqil testçi fərqli baxış bucağı gətirir."
    },
    {
        id: 108,
        chapterId: 1,
        level: "K1",
        question: "Aşağıdakılardan hansı Testin 7 Prinsipinə aid DEYİL?",
        options: [
            "Testlərin tam əhatəli olması (Exhaustive testing) mümkündür",
            "Erkən testləşdirmə (Early testing)",
            "Qüsurların toplanması (Defect clustering)",
            "Pestisid paradoksu"
        ],
        correctAnswer: 0,
        explanation: "Prinsipə görə, 'Exhaustive testing is impossible' (Tam testləmə qeyri-mümkündür) – bütün kombinasiyaları yoxlamaq vaxt baxımından real deyil."
    },
    {
        id: 109,
        chapterId: 1,
        level: "K2",
        question: "Testin 'Kontekstdən asılı olması' (Context dependent) nə deməkdir?",
        options: [
            "Bütün layihələr eyni cür test edilməlidir",
            "Veb saytın testi ilə təyyarə idarəetmə sisteminin testi fərqli yanaşma tələb edir",
            "Testlər həmişə avtomatlaşdırılmalıdır",
            "Testlər həmişə manual olmalıdır"
        ],
        correctAnswer: 1,
        explanation: "Risklər və tələblər fərqli olduğu üçün, bir oyun proqramı ilə bank sisteminin test strategiyası tamamilə fərqli olacaq."
    },
    {
        id: 110,
        chapterId: 1,
        level: "K1",
        question: "Keyfiyyət Təminatı (QA) və Testləşdirmə (Testing) arasındakı fərq nədir?",
        options: [
            "Eyni şeydir",
            "QA prosesə və önləyici tədbirlərə, Testləşdirmə isə məhsula və qüsurların tapılmasına fokuslanır",
            "Testləşdirmə prosesə, QA məhsula fokuslanır",
            "QA yalnız sənədləşdirmədir"
        ],
        correctAnswer: 1,
        explanation: "QA (Quality Assurance) prosesin keyfiyyətini təmin edir (preventive). Testləşdirmə isə məhsuldakı səhvləri tapır (detective)."
    },
    {
        id: 111,
        chapterId: 1,
        level: "K1",
        question: "İzlənilə bilirlik (Traceability) nə üçün lazımdır?",
        options: [
            "Testlərin sayını artırmaq üçün",
            "Tələblər, test keyslər və baqlar arasındakı əlaqəni görmək üçün",
            "Developerləri izləmək üçün",
            "Layihəni bahalaşdırmaq üçün"
        ],
        correctAnswer: 1,
        explanation: "Traceability Matrix kömək edir ki, hansı tələbin hansı testlə yoxlandığını və hansı dəyişikliyin hansı hissələrə təsir etdiyini görək."
    },
    {
        id: 112,
        chapterId: 1,
        level: "K2",
        question: "Testçinin psixologiyası necə olmalıdır?",
        options: [
            "Developerlərin səhvlərini üzünə vurmaq",
            "Konstruktiv tənqid, maraq və diqqətli ünsiyyət",
            "Yalnız sənədlərə inanmaq",
            "Baq tapanda sevinmək və lovğalanmaq"
        ],
        correctAnswer: 1,
        explanation: "Testçi və developer bir komandadır. Ünsiyyət 'Sən səhv etdin' yox, 'Məhsulda problem var' şəklində qurulmalıdır."
    },
    {
        id: 113,
        chapterId: 1,
        level: "K2",
        question: "Kodun Yoxlanması (Code Review) hansı test növünə aiddir?",
        options: [
            "Dinamik test",
            "Statik test",
            "Qara qutu testi",
            "Sistem testi"
        ],
        correctAnswer: 1,
        explanation: "Kod işə salınmadan oxunur və yoxlanılırsa, bu Statik Testdir."
    },
    {
        id: 114,
        chapterId: 1,
        level: "K2",
        question: "Təsdiqləmə (Verification) və Validasiya (Validation) fərqi?",
        options: [
            "Verification: 'Biz düzgün məhsul qururuq?', Validation: 'Biz məhsulu düzgün qururuq?'",
            "Verification: 'Biz məhsulu düzgün qururuq?', Validation: 'Biz düzgün məhsul qururuq?'",
            "Fərq yoxdur",
            "Validation sənədlər üçündür"
        ],
        correctAnswer: 1,
        explanation: "Verification (Təsdiqləmə): Tələblərə uyğundurmu? (Building the product right). Validation (Validasiya): İstifadəçi ehtiyacını ödəyirmi? (Building the right product)."
    },
    {
        id: 115,
        chapterId: 1,
        level: "K1",
        question: "Qüsur (Defect) nə vaxt yaranır?",
        options: [
            "Proqram işləyərkən",
            "Kod yazılarkən və ya sənədləşdirmə zamanı insan səhvi nəticəsində",
            "İstifadəçi səhv edəndə",
            "Test zamanı"
        ],
        correctAnswer: 1,
        explanation: "Qüsur (Bug) kodda və ya sənəddə olan statik bir problemdir. O, insan səhvi (Error) nəticəsində yaranır."
    },
    // Chapter 2 Extra
    {
        id: 204,
        chapterId: 2,
        level: "K2",
        question: "Reqressiya testi (Regression Testing) nə vaxt aparılmalıdır?",
        options: [
            "Yalnız layihənin sonunda",
            "Kod dəyişikliyi edildikdən sonra",
            "Yeni funksiya əlavə ediləndə",
            "B və C"
        ],
        correctAnswer: 3,
        explanation: "Kodda hər hansı dəyişiklik (bug fix və ya yeni funksiya) olduqda, köhnə funksiyaların işlədiyinə əmin olmaq üçün reqressiya testi aparılır."
    },
    {
        id: 205,
        chapterId: 2,
        level: "K2",
        question: "Komponent Testi (Unit Testing) adətən kim tərəfindən aparılır?",
        options: [
            "Müştəri",
            "Biznes Analitik",
            "Developer",
            "Sistem Administratoru"
        ],
        correctAnswer: 2,
        explanation: "Komponent testləri kodun ən kiçik hissələrini yoxlayır və adətən kodu yazan proqramçı (developer) tərəfindən icra edilir."
    },
    {
        id: 206,
        chapterId: 2,
        level: "K1",
        question: "Alpha və Beta testləri hansı test səviyyəsinə aiddir?",
        options: [
            "Sistem Testi",
            "Qəbul Testi (Acceptance Testing)",
            "İnteqrasiya Testi",
            "Komponent Testi"
        ],
        correctAnswer: 1,
        explanation: "Alpha və Beta testləri istifadəçi tərəfindən (və ya istifadəçi mühitində) aparılan Qəbul testləridir."
    },
    {
        id: 207,
        chapterId: 2,
        level: "K2",
        question: "Qeyri-funksional test (Non-functional testing) nəyi yoxlayır?",
        options: [
            "Sistemin nə etdiyini",
            "Sistemin necə işlədiyini (Performans, Təhlükəsizlik, İstifadə rahatlığı)",
            "Kodun strukturunu",
            "Sənədləri"
        ],
        correctAnswer: 1,
        explanation: "Funksional test 'Nə işləyir?' sualına, Qeyri-funksional test isə 'Necə işləyir?' (sürət, təhlükəsizlik) sualına cavab verir."
    },
    {
        id: 208,
        chapterId: 2,
        level: "K1",
        question: "Sistem Testi (System Testing) hansı mühitdə aparılmalıdır?",
        options: [
            "Developerin kompüterində",
            "Canlı (Production) mühitə maksimum yaxın mühitdə",
            "İstənilən mühitdə",
            "Müştərinin ofisində"
        ],
        correctAnswer: 1,
        explanation: "Sistem testi bütün sistemi yoxladığı üçün mühit (server, şəbəkə, verilənlər) real istifadəçi mühitinə (Production) maksimum bənzəməlidir."
    },
    {
        id: 209,
        chapterId: 2,
        level: "K2",
        question: "Təsdiq Testi (Confirmation Testing / Retesting) nədir?",
        options: [
            "Bütün sistemi yenidən yoxlamaq",
            "Tapılmış və düzəldilmiş baqın həqiqətən düzəldiyini yoxlamaq",
            "Yeni funksiyanı yoxlamaq",
            "Avtomatlaşdırılmış test"
        ],
        correctAnswer: 1,
        explanation: "Retesting (Təsdiq testi) konkret olaraq 'fix' olunmuş baqın yoxlanmasıdır. Reqressiya testi isə bu 'fix'in başqa yerləri sındırmadığını yoxlayır."
    },
    {
        id: 210,
        chapterId: 2,
        level: "K2",
        question: "İnteqrasiya Testinin (Integration Testing) əsas məqsədi nədir?",
        options: [
            "Modullar arasındakı əlaqələri (interfeysləri) yoxlamaq",
            "Tək bir modulu yoxlamaq",
            "Bütün sistemi yoxlamaq",
            "İstifadəçi razılığını almaq"
        ],
        correctAnswer: 0,
        explanation: "İnteqrasiya testi komponentlər və ya sistemlər arasındakı qarşılıqlı əlaqəni (interface) və məlumat mübadiləsini yoxlayır."
    },
    {
        id: 211,
        chapterId: 2,
        level: "K2",
        question: "Təsir Analizi (Impact Analysis) nə üçün istifadə olunur?",
        options: [
            "Testlərin qiymətini hesablamaq üçün",
            "Dəyişikliyin sistemin digər hissələrinə təsirini müəyyən etmək üçün (Maintenance Testing)",
            "Baqları tapmaq üçün",
            "Developerləri izləmək üçün"
        ],
        correctAnswer: 1,
        explanation: "Sistemə dəyişiklik ediləndə (məsələn, patch), Təsir Analizi hansı modulların təsirləndiyini və nə qədər reqressiya testi lazım olduğunu müəyyən edir."
    },
    {
        id: 212,
        chapterId: 2,
        level: "K1",
        question: "V-Model inkişaf modelində Test fəaliyyəti nə vaxt başlayır?",
        options: [
            "Kod yazılandan sonra",
            "Layihənin ən əvvəlində, tələblərin analizi zamanı",
            "Sistem testi zamanı",
            "Müştəri istəyəndə"
        ],
        correctAnswer: 1,
        explanation: "V-Modelin əsas prinsipi: Hər inkişaf mərhələsinin (Tələblər, Dizayn) qarşılığında bir test mərhələsi var və test planlaşdırması erkən başlayır."
    },
    {
        id: 213,
        chapterId: 2,
        level: "K2",
        question: "Ağ Qutu (White-box) testi nəyə əsaslanır?",
        options: [
            "Tələblərə",
            "Sistemin daxili strukturuna və koduna",
            "İstifadəçi interfeysinə",
            "Biznes proseslərinə"
        ],
        correctAnswer: 1,
        explanation: "Ağ qutu testi (Structural testing) proqramın daxili məntiqini, kod strukturunu və axınlarını (flow) yoxlayır."
    },
    {
        id: 214,
        chapterId: 2,
        level: "K1",
        question: "Hansı test növü istifadəçinin sistemi nə qədər asan başa düşdüyünü və istifadə etdiyini yoxlayır?",
        options: [
            "Performans testi",
            "İstifadə Rahatlığı testi (Usability Testing)",
            "Təhlükəsizlik testi",
            "Yüklənmə testi"
        ],
        correctAnswer: 1,
        explanation: "Usability Testing (İstifadə rahatlığı) istifadəçinin sistemi nə qədər rahat, effektiv və məmnuniyyətlə istifadə etdiyini ölçür."
    },
    {
        id: 215,
        chapterId: 2,
        level: "K2",
        question: "Mövcud sistemdən verilənlərin (data) yeni sistemə köçürülməsi zamanı hansı test aparılır?",
        options: [
            "Miqrasiya testi (Migration Testing)",
            "Komponent testi",
            "İstifadəçi qəbul testi",
            "Stress testi"
        ],
        correctAnswer: 0,
        explanation: "Maintenance testing növü olan Miqrasiya testi, məlumatların bir platformadan digərinə itkisiz və düzgün keçdiyini yoxlayır."
    },
    // Chapter 3 Extra
    {
        id: 303,
        chapterId: 3,
        level: "K1",
        question: "Rəsmi Yoxlama (Formal Review) prosesində 'Moderator'un rolu nədir?",
        options: [
            "Sənədi yazmaq",
            "Səhvləri düzəltmək",
            "İclası idarə etmək və müzakirələri tənzimləmək",
            "Protokol yazmaq"
        ],
        correctAnswer: 2,
        explanation: "Moderator (Facilitator) görüşü aparır, vaxtı idarə edir və mübahisələri həll edir. O, prosesin uğurlu olmasına cavabdehdir."
    },
    {
        id: 304,
        chapterId: 3,
        level: "K2",
        question: "Statik Analiz (Static Analysis) vasitələri nəyi aşkar edə bilər?",
        options: [
            "Yaddaş sızması (Memory leak) və istifadə olunmayan dəyişənlər",
            "Performans problemləri (yük altında)",
            "UX problemləri",
            "Server xətaları"
        ],
        correctAnswer: 0,
        explanation: "Statik analiz kodu işə salmadan yoxlayır. O, sintaksis səhvlərini, ölü kodu (dead code) və potensial yaddaş problemlərini tapa bilər."
    },
    {
        id: 305,
        chapterId: 3,
        level: "K2",
        question: "Aşağıdakılardan hansı Rəsmi Review (Formal Review) növü DEYİL?",
        options: [
            "İnspeksiya (Inspection)",
            "Texniki Baxış (Technical Review)",
            "Cütləşmiş Proqramlaşdırma (Pair Programming)",
            "Walkthrough"
        ],
        correctAnswer: 2,
        explanation: "Pair Programming bir inkişaf texnikasıdır. Review növləri: Informal, Walkthrough, Technical Review, Inspection."
    },
    {
        id: 306,
        chapterId: 3,
        level: "K1",
        question: "Review prosesində 'Katib' (Scribe/Recorder) nə edir?",
        options: [
            "İclası idarə edir",
            "Tapılan qüsurları və qərarları qeyd edir",
            "Sənədi yazır",
            "Sənədi yoxlayır"
        ],
        correctAnswer: 1,
        explanation: "Scribe (Katib) iclas zamanı müzakirə olunan məsələləri, tapılan baqları və açıq sualları protokollaşdırır."
    },
    {
        id: 307,
        chapterId: 3,
        level: "K2",
        question: "Hansı Review növü ən rəsmi və sənədləşdirilmiş növdür?",
        options: [
            "Informal Review",
            "Walkthrough",
            "Inspection",
            "Peer Review"
        ],
        correctAnswer: 2,
        explanation: "İnspeksiya (Inspection) ən formal növdür: giriş/çıxış kriteriyaları, metrikalar, moderator və rəsmi hesabat tələb edir."
    },
    {
        id: 308,
        chapterId: 3,
        level: "K1",
        question: "Statik testin Dinamik testdən əsas fərqi nədir?",
        options: [
            "Statik test proqramı işə salmadan aparılır",
            "Statik test daha bahalıdır",
            "Statik test yalnız testçilər tərəfindən edilir",
            "Statik test layihənin sonunda edilir"
        ],
        correctAnswer: 0,
        explanation: "Dinamik test proqramı işlətməyi tələb edir (input -> output). Statik test isə sənədləri və ya kodu oxumaqla aparılır."
    },
    {
        id: 309,
        chapterId: 3,
        level: "K2",
        question: "Erkən Review (Baxış) keçirməyin əsas faydası nədir?",
        options: [
            "Testçilərin işini artırmaq",
            "Qüsurları erkən mərhələdə taparaq düzəliş xərcini azaltmaq",
            "Developerləri tənqid etmək",
            "Sənədlərin sayını artırmaq"
        ],
        correctAnswer: 1,
        explanation: "Tələblər mərhələsində tapılan səhvi düzəltmək, kod yazıldıqdan sonra düzəltməkdən 10-100 dəfə daha ucuzdur."
    },
    {
        id: 310,
        chapterId: 3,
        level: "K1",
        question: "Review prosesinin 'Kick-off' mərhələsində nə baş verir?",
        options: [
            "Səhvlər düzəldilir",
            "İştirakçılara sənədlər paylanır və hədəflər izah edilir",
            "Fərdi hazırlıq görülür",
            "Məlumatlar toplanır"
        ],
        correctAnswer: 1,
        explanation: "Kick-off (Başlanğıc) görüşündə Moderator komandaya materialları təqdim edir, rolları bölüşdürür və meyarları izah edir."
    },
    {
        id: 311,
        chapterId: 3,
        level: "K2",
        question: "Sənədin müəllifi (Author) Review prosesində nə edir?",
        options: [
            "Sənədi yoxlayır",
            "Tapılan səhvləri düzəldir və sualları cavablandırır",
            "İclası idarə edir",
            "Qeydlər aparır"
        ],
        correctAnswer: 1,
        explanation: "Müəllifin əsas vəzifəsi: Review zamanı yaranan suallara aydınlıq gətirmək və tapılan qüsurları iclasdan sonra düzəltməkdir."
    },
    {
        id: 312,
        chapterId: 3,
        level: "K2",
        question: "Ad-hoc Review (Qeyri-rəsmi baxış) nədir?",
        options: [
            "Çox ciddi qaydaları olan baxış",
            "Hazırlıq və sənədləşmə tələb etməyən, ucuz və sürətli baxış",
            "Menecerlər tərəfindən aparılan baxış",
            "Avtomatlaşdırılmış yoxlama"
        ],
        correctAnswer: 1,
        explanation: "Ad-hoc və ya Informal Review: 'Yoldaşına kodu göstərmək' kimi sadə, sənədsiz və sürətli bir prosesdir."
    },
    {
        id: 313,
        chapterId: 3,
        level: "K2",
        question: "Hansı qüsur növünü Statik Analizlə tapmaq ÇƏTİNDİR?",
        options: [
            "Sintaksis xətası",
            "Təhlükəsizlik boşluğu",
            "Yaddaş sızması",
            "Funksional istifadəçi ssenarisi xətası (Business Logic)"
        ],
        correctAnswer: 3,
        explanation: "Statik analiz kodun strukturunu yoxlayır. Biznes məntiqinin səhv olduğunu (məsələn, səhv endirim hesablanması) ancaq proqramı işlədərək (Dinamik test) tapmaq asandır."
    },
    {
        id: 314,
        chapterId: 3,
        level: "K1",
        question: "Checklist (Yoxlama siyahısı) Review zamanı nə üçün istifadə olunur?",
        options: [
            "İştirakçıların davamiyyətini yoxlamaq üçün",
            "Vacib yoxlama nöqtələrinin unudulmaması üçün",
            "Vaxtı ölçmək üçün",
            "Səhvləri gizlətmək üçün"
        ],
        correctAnswer: 1,
        explanation: "Checklist, yoxlayıcıya (reviewer) nəyə diqqət yetirməli olduğunu xatırladan suallar siyahısıdır (məsələn: 'Şriftlər uyğundurmu?', 'Təhlükəsizlik qaydaları gözlənilibmi?')."
    },
    {
        id: 315,
        chapterId: 3,
        level: "K2",
        question: "Review prosesinin uğurlu olması üçün vacib amil hansıdır?",
        options: [
            "Yalnız menecerlərin iştirakı",
            "Hər sətirə 1 dəqiqə vaxt ayırmaq",
            "İclasın mümkün qədər uzun olması",
            "Aydın müəyyən edilmiş məqsədlər və düzgün insanlar"
        ],
        correctAnswer: 3,
        explanation: "Review effektiv olması üçün dəqiq hədəf, hazırlıqlı iştirakçılar və qarşılıqlı hörmət mühiti lazımdır."
    },
    // Chapter 6 Extra (Tools)
    {
        id: 601,
        chapterId: 6,
        level: "K1",
        question: "Aşağıdakılardan hansı 'Test İdarəetmə Aləti'dir (Test Management Tool)?",
        options: [
            "Selenium",
            "Jira / TestRail",
            "JMeter",
            "Postman"
        ],
        correctAnswer: 1,
        explanation: "Jira, TestRail, Zephyr kimi alətlər test prosesini, test keysləri və baqları idarə etmək üçün istifadə olunur."
    },
    {
        id: 602,
        chapterId: 6,
        level: "K1",
        question: "Selenium və Appium hansı növ alətlərdir?",
        options: [
            "Statik Analiz",
            "Test İcrası (Test Execution) və Avtomatlaşdırma",
            "Performans Testi",
            "Təhlükəsizlik Testi"
        ],
        correctAnswer: 1,
        explanation: "Selenium (Veb) və Appium (Mobil) testləri avtomatik icra etmək (Execution) üçün istifadə olunan ən məşhur alətlərdir."
    },
    {
        id: 603,
        chapterId: 6,
        level: "K2",
        question: "Test alətlərinin tətbiqinin əsas risklərindən biri nədir?",
        options: [
            "Testlərin sürətli icrası",
            "Təkrarlanan işlərin azalması",
            "Alətdən qeyri-real gözləntilər (Unrealistic expectations)",
            "Obyektiv qiymətləndirmə"
        ],
        correctAnswer: 2,
        explanation: "Ən böyük risklərdən biri rəhbərliyin 'Alət aldıq, hər şey avtomatik düzələcək' deyə düşünməsidir (Qeyri-real gözləntilər). Alət yalnız köməkçidir."
    },
    {
        id: 604,
        chapterId: 6,
        level: "K2",
        question: "Təşkilatda yeni aləti tətbiq etməzdən əvvəl nə edilməlidir?",
        options: [
            "Dərhal bütün layihələrdə istifadə etmək",
            "Pilot layihə (Pilot Project) həyata keçirmək",
            "Köhnə alətləri silmək",
            "Bütün işçiləri işdən çıxarmaq"
        ],
        correctAnswer: 1,
        explanation: "Alətin uyğunluğunu yoxlamaq və riskləri azaltmaq üçün əvvəlcə kiçik, idarə oluna bilən bir 'Pilot Layihə'də sınaqdan keçirilməlidir."
    },
    // Chapter 5 Extra (Management) - Adding 10 more to reach ~15
    {
        id: 507,
        chapterId: 5,
        level: "K1",
        question: "Test Liderinin (Test Manager) əsas vəzifələrindən biri nədir?",
        options: [
            "Test mühitini qurmaq",
            "Test strategiyasını və planını yazmaq",
            "Kod yazmaq",
            "Baqları düzəltmək"
        ],
        correctAnswer: 1,
        explanation: "Test Lideri planlaşdırma, monitorinq və nəzarətə cavabdehdir. Test mühitini qurmaq və testləri icra etmək adətən Testçinin işidir."
    },
    {
        id: 508,
        chapterId: 5,
        level: "K2",
        question: "Giriş Kriteriyası (Entry Criteria) nədir?",
        options: [
            "Testi dayandırmaq üçün şərtlər",
            "Testə başlamaq üçün lazım olan ilkin şərtlər (məsələn, mühit hazırdır, sənədlər mövcuddur)",
            "Testin nəticələri",
            "Baq hesabatı"
        ],
        correctAnswer: 1,
        explanation: "Entry Criteria test mərhələsinə başlamaq üçün nələrin hazır olmalı olduğunu müəyyən edir."
    },
    {
        id: 509,
        chapterId: 5,
        level: "K2",
        question: "Çıxış Kriteriyası (Exit Criteria) nədir?",
        options: [
            "Testi bitirmək üçün lazım olan şərtlər (məsələn, 100% testlər icra olunub, kritik baq yoxdur)",
            "Testə başlamaq şərtləri",
            "İşçinin işdən çıxması",
            "Layihənin büdcəsi"
        ],
        correctAnswer: 0,
        explanation: "Exit Criteria (və ya Definition of Done) testin nə vaxt tamamlanmış sayılacağını müəyyən edir."
    },
    {
        id: 510,
        chapterId: 5,
        level: "K2",
        question: "Test Strategiyası və Test Planı arasındakı fərq nədir?",
        options: [
            "Fərq yoxdur",
            "Strategiya ümumi yanaşmanı (necə test edəcəyik?), Plan isə detalları (kim, nə vaxt, nəyi?) təsvir edir",
            "Plan ümumi, Strategiya detaldır",
            "Strategiya yalnız menecerlər üçündür"
        ],
        correctAnswer: 1,
        explanation: "Test Strategiyası daha yüksək səviyyəli və sabit sənəddir. Test Planı isə konkret layihə üçün zaman, resurs və əhatə dairəsini təsvir edir."
    },
    {
        id: 511,
        chapterId: 5,
        level: "K2",
        question: "Məhsul Riski (Product Risk) nədir?",
        options: [
            "Layihənin gecikməsi",
            "Büdcənin bitməsi",
            "Proqramın istifadəçi üçün düzgün işləməməsi (keyfiyyət problemi)",
            "İşçinin xəstələnməsi"
        ],
        correctAnswer: 2,
        explanation: "Məhsul riski birbaşa proqram təminatının keyfiyyəti ilə bağlıdır (məsələn, sistem çökməsi, səhv hesablama). Digərləri Layihə riskidir."
    },
    {
        id: 512,
        chapterId: 5,
        level: "K2",
        question: "Layihə Riski (Project Risk) nümunəsi hansıdır?",
        options: [
            "Sistem cavab vermir",
            "Verilənlər bazası pozulub",
            "Komanda üzvlərinin lazımi bacarıqlarının olmaması",
            "İstifadəçi interfeysi çirkindir"
        ],
        correctAnswer: 2,
        explanation: "Layihə riskləri idarəetmə və resurslarla bağlıdır (personal, vaxt, büdcə, təchizatçılar)."
    },
    {
        id: 513,
        chapterId: 5,
        level: "K1",
        question: "Konfiqurasiya İdarəetməsi (Configuration Management) testdə niyə vacibdir?",
        options: [
            "Testlərin versiyasını və test olunan proqramın versiyasını izləmək üçün",
            "Kompüterləri təmizləmək üçün",
            "Ofis mebelini idarə etmək üçün",
            "Baqları silmək üçün"
        ],
        correctAnswer: 0,
        explanation: "Əgər biz hansı versiyanı (build) test etdiyimizi bilmiriksə, nəticələr etibarsızdır. Konfiqurasiya idarəetməsi versiyaları nəzarətdə saxlayır."
    },
    {
        id: 514,
        chapterId: 5,
        level: "K2",
        question: "Test Hesabatında (Test Summary Report) nə olmalıdır?",
        options: [
            "Yalnız baqların siyahısı",
            "Layihə menecerinin şəkli",
            "Testlərin statusu, tapılan vacib baqlar, risklər və nəticə (Go/No-Go)",
            "Kodun nüsxəsi"
        ],
        correctAnswer: 2,
        explanation: "Test Summary Report layihənin sonunda (və ya mərhələ sonunda) stakeholders-ə vəziyyəti ümumiləşdirib təqdim edir."
    },
    {
        id: 515,
        chapterId: 5,
        level: "K2",
        question: "Testin Qiymətləndirilməsi (Estimation) üçün hansı texnikadan istifadə olunur?",
        options: [
            "Expert-based (Mütəxəssis rəyi) və Metrics-based (Metrikalar)",
            "Guess-based (Təxmini)",
            "Random (Təsadüfi)",
            "Coin toss (Püşk atma)"
        ],
        correctAnswer: 0,
        explanation: "İki əsas yanaşma var: Təcrübəli insanların rəyinə əsaslanan (Expert-based, məs: Wideband Delphi) və keçmiş layihələrin rəqəmlərinə əsaslanan (Metrics-based)."
    },
    {
        id: 516,
        chapterId: 5,
        level: "K1",
        question: "Müstəqil Testin (Independent Testing) mənfi tərəfi nə ola bilər?",
        options: [
            "Developerlərlə ünsiyyətin zəifləməsi və 'biz və onlar' münasibəti",
            "Daha keyfiyyətli test",
            "Qərəzsizlik",
            "Baqların tapılması"
        ],
        correctAnswer: 0,
        explanation: "Həddindən artıq müstəqillik komanda ruhunu öldürə bilər və developerlər məsuliyyəti tamamilə testçilərin üzərinə ata bilər."
    },
    // Chapter 6 Extra (Tools) - Adding 10 more to reach ~15
    {
        id: 606,
        chapterId: 6,
        level: "K1",
        question: "Performans Testi alətləri (Performance Tools) nə üçün istifadə olunur?",
        options: [
            "Baqları izləmək üçün",
            "Sistemi yük altında (Load/Stress) yoxlamaq üçün",
            "Kodu analiz etmək üçün",
            "Tələbləri idarə etmək üçün"
        ],
        correctAnswer: 1,
        explanation: "JMeter, LoadRunner kimi alətlər minlərlə virtual istifadəçi yaradaraq sistemin necə davrandığını yoxlayır."
    },
    {
        id: 607,
        chapterId: 6,
        level: "K1",
        question: "Data-Driven Testing (Verilənlərlə idarə olunan test) nədir?",
        options: [
            "Test skriptindən məlumatların (input/output) ayrılaraq cədvəldə saxlanması",
            "Testlərin əl ilə yazılması",
            "Verilənlər bazasının silinməsi",
            "Yalnız rəqəmlərin yoxlanması"
        ],
        correctAnswer: 0,
        explanation: "Data-Driven yanaşmada eyni test skripti fərqli test məlumatları (məsələn Excel faylından) ilə dəfələrlə icra edilir."
    },
    {
        id: 608,
        chapterId: 6,
        level: "K2",
        question: "Açar sözlərlə idarə olunan test (Keyword-Driven Testing) nədir?",
        options: [
            "Yalnız açar sözləri yoxlamaq",
            "Test addımlarını (məs: 'Login', 'Click', 'Verify') xüsusi açar sözlərlə təsvir etmək",
            "Şifrə testi",
            "Sənəd testi"
        ],
        correctAnswer: 1,
        explanation: "Keyword-Driven yanaşma testləri texniki olmayan insanların da başa düşəcəyi sadə sözlərlə (Action Words) təsvir edir."
    },
    {
        id: 609,
        chapterId: 6,
        level: "K2",
        question: "Davamlı İnteqrasiya (CI/CD) alətlərinin testdə rolu nədir?",
        options: [
            "Kodu avtomatik olaraq hər dəyişiklikdən sonra test etmək və build almaq",
            "Kodu yazmaq",
            "Dizayn etmək",
            "Layihəni idarə etmək"
        ],
        correctAnswer: 0,
        explanation: "Jenkins, GitLab CI kimi alətlər kod repozitoriyaya düşən kimi avtomatik testləri işə salır və sürətli rəy verir."
    },
    {
        id: 610,
        chapterId: 6,
        level: "K1",
        question: "Test Alətlərinin (Tools) 'Intrusive' (Müdaxilə edən) olması nə deməkdir?",
        options: [
            "Alətin çox baha olması",
            "Alətin test edilən proqramın işinə təsir etməsi və nəticələri dəyişə bilməsi",
            "Alətin çətin quraşdırılması",
            "Alətin rəngli olması"
        ],
        correctAnswer: 1,
        explanation: "Məsələn, performans aləti özü də resurs yeyir və sistemin sürətini azalda bilər. Bu 'Probe Effect' adlanır."
    },
    {
        id: 611,
        chapterId: 6,
        level: "K2",
        question: "Alətin saxlanması (Maintenance) xərcləri nə vaxt nəzərə alınmalıdır?",
        options: [
            "Heç vaxt",
            "Alət seçilərkən (ROI hesablanarkən)",
            "Layihə bitəndə",
            "Alət xarab olanda"
        ],
        correctAnswer: 1,
        explanation: "Avtomatlaşdırma pulsuzdur demək səhvdir. Skriptlərin yenilənməsi və alətin dəstəyi (maintenance) ciddi xərc tələb edir."
    },
    {
        id: 612,
        chapterId: 6,
        level: "K1",
        question: "Test alətləri hansı test fəaliyyətlərini dəstəkləyə bilər?",
        options: [
            "Yalnız icra (Execution)",
            "Planlaşdırma, İcra, Monitorinq, Analiz və s. (Hər şeyi)",
            "Yalnız hesabat",
            "Heç birini"
        ],
        correctAnswer: 1,
        explanation: "Test alətləri test prosesinin demək olar ki, bütün mərhələləri üçün mövcuddur (Management, Execution, Performance, Static Analysis)."
    },
    {
        id: 613,
        chapterId: 6,
        level: "K2",
        question: "Açıq Mənbəli (Open Source) alətlərin üstünlüyü nədir?",
        options: [
            "Həmişə ən yaxşısıdır",
            "Lisenziya haqqı yoxdur və cəmiyyət dəstəyi var",
            "Rəsmi dəstək (Support) zəmanəti var",
            "Quraşdırmaq asandır"
        ],
        correctAnswer: 1,
        explanation: "Selenium kimi Open Source alətlər pulsuzdur, lakin rəsmi texniki dəstək adətən olmur (forumlar və icma kömək edir)."
    },
    {
        id: 614,
        chapterId: 6,
        level: "K1",
        question: "Kommersiya (Commercial/Vendor) alətlərinin üstünlüyü nədir?",
        options: [
            "Pulsuzdur",
            "Rəsmi texniki dəstək və zəmanətli yeniləmələr",
            "Mənbə kodu açıqdır",
            "Hər kəs istifadə edə bilər"
        ],
        correctAnswer: 1,
        explanation: "Pullu alətlər (məs: LoadRunner) adətən güclü texniki dəstək, təlim və inteqrasiya imkanları təklif edir."
    },
    {
        id: 615,
        chapterId: 6,
        level: "K2",
        question: "Test Avtomatlaşdırması (Test Automation) nəyi əvəz EDƏ BİLMƏZ?",
        options: [
            "Reqressiya testlərini",
            "Yük testlərini",
            "Kəşfiyyat testlərini (Exploratory Testing) və insan intuisiyasını",
            "Hesablamaları"
        ],
        correctAnswer: 2,
        explanation: "Avtomatlaşdırma təkrarlanan işləri görür. Lakin yaradıcı düşüncə, vizual qiymətləndirmə və intuisiya tələb edən Exploratory Testing yalnız insan tərəfindən edilə bilər."
    },
    // NEW QUESTIONS FOR EXAM SIMULATION
    {
        id: 116,
        chapterId: 1,
        level: "K2",
        topic: "Test Prinsipləri",
        question: "Bir şirkət bütün mümkün giriş kombinasiyalarını (trilyonlarla) test etmək qərarına gəldi. Bu hansı test prinsipinə ziddir?",
        options: [
            "Erkən testləşdirmə",
            "Tam əhatəli test qeyri-mümkündür (Exhaustive testing is impossible)",
            "Pestisid paradoksu",
            "Qüsurların toplanması"
        ],
        correctAnswer: 1,
        explanation: "Bütün kombinasiyaları yoxlamaq sonsuz vaxt və resurs tələb edir. Bunun əvəzinə risk analizi və prioritetləşdirmə istifadə edilməlidir."
    },
    {
        id: 216,
        chapterId: 2,
        level: "K2",
        topic: "Test Səviyyələri",
        question: "Sistem Testi (System Testing) ilə Qəbul Testi (Acceptance Testing) arasındakı əsas fərq nədir?",
        options: [
            "Sistem testini developerlər edir, qəbul testini testçilər",
            "Sistem testi texniki tələbləri yoxlayır, Qəbul testi biznes ehtiyaclarını və istifadəçi hazırlığını",
            "Fərq yoxdur",
            "Qəbul testi daha əvvəl edilir"
        ],
        correctAnswer: 1,
        explanation: "Sistem testi funksional və qeyri-funksional tələbləri yoxlayır. Qəbul testi (UAT) isə sistemin müştəri tərəfindən istifadəyə hazır olub-olmadığını (Validation) yoxlayır."
    },
    {
        id: 316,
        chapterId: 3,
        level: "K2",
        topic: "Statik Analiz",
        question: "Statik analiz alətləri kodda hansı növ problemləri tapa bilməz?",
        options: [
            "Sintaksis səhvləri",
            "Təhlükəsizlik zəiflikləri",
            "Yaddaş sızmaları",
            "İstifadəçinin sistemdən narazı qalması (Usability)"
        ],
        correctAnswer: 3,
        explanation: "Statik analiz kodu oxuyur. İstifadəçinin hisslərini və ya dizaynın rahatlığını (Usability) ancaq insan (və ya dinamik test) müəyyən edə bilər."
    },
    {
        id: 418,
        chapterId: 4,
        level: "K3",
        topic: "Use Case Testing",
        question: "Use Case testində 'Alternativ Axınlar' (Alternative Flows) nədir?",
        options: [
            "Sistemin çökməsi",
            "Uğurlu əsas ssenari (Main path)",
            "Səhvlər və ya istisnalar zamanı baş verən ssenarilər (məsələn, 'Kart rədd edildi')",
            "Testin sonu"
        ],
        correctAnswer: 2,
        explanation: "Use Case-də əsas axın (Happy Path) hər şeyin düzgün getdiyi yoldur. Alternativ axınlar isə səhvlər, imtinalar və ya fərqli seçimlər zamanı baş verənlərdir."
    },
    {
        id: 517,
        chapterId: 5,
        level: "K2",
        topic: "Konfiqurasiya İdarəetməsi",
        question: "Test zamanı eyni anda həm v1.0, həm də v1.1 versiyalarını test etmək lazımdır. Bu prosesi idarə etmək üçün nə lazımdır?",
        options: [
            "Daha çox kompüter",
            "Konfiqurasiya İdarəetməsi (Configuration Management)",
            "Test Planı",
            "Risk Analizi"
        ],
        correctAnswer: 1,
        explanation: "Versiyaların, sənədlərin və kodun müxtəlif variantlarını idarə etmək Konfiqurasiya İdarəetməsinin (CM) işidir."
    },
    {
        id: 616,
        chapterId: 6,
        level: "K1",
        topic: "Test Alətləri",
        question: "Test Harness (Test Qoşqusu) nədir?",
        options: [
            "Testçinin geyimi",
            "Testləri icra etmək üçün istifadə olunan sürücülər (drivers) və kötüklər (stubs) toplusu",
            "Sənədləşdirmə növü",
            "Baq izləmə sistemi"
        ],
        correctAnswer: 1,
        explanation: "Test Harness, komponentləri və ya sistemləri test etmək üçün lazım olan mühiti simulyasiya edən (Stub/Driver) kod və alətlər toplusudur."
    }
];

