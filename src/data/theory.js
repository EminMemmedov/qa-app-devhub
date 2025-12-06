export const theoryModules = [
  {
    id: 'qa-basics',
    title: 'QA Dünyasına Giriş',
    description: 'Testləşdirmənin fəlsəfəsi, QA vs Tester fərqi və karyera yolu',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    readTime: '15 dəq',
    difficulty: 'Asan',
    content: `### QA Nədir? Sadə İzah
Təsəvvür edin ki, bir **Restoran** işlədirsiniz.
- **Developer:** Aşpazdır. Yeməyi bişirir.
- **QA:** Baş Aşpazdır (Head Chef). Yemək müştəriyə getməmişdən əvvəl dadına baxır, tərkibini yoxlayır və "Bu yemək servisə hazırdır" deyir.

Əgər QA olmasa, duzlu yemək müştəriyə gedər və restoranın (şirkətin) reputasiyası ölər.

### Mindset: Sındırmaq yox, Qorumaq!
Çoxları elə bilir ki, QA-nın işi proqramı "sındırmaqdır".
**Yanlış!** QA-nın işi proqramın zəif nöqtələrini tapıb, onları gücləndirməkdir.
Siz "baq tapan" deyilsiniz, siz **"keyfiyyət qoruyucususunuz"**.

### SDLC (Software Development Life Cycle) 🔄
Proqramın "Doğulub - Böyüyüb - Yaşaması" dövrüdür.

1.  **Requirement Analysis (Tələblər):** Müştəri nə istəyir? (Məs: "Mənə uçan maşın düzəldin")
2.  **Design (Dizayn):** Necə görünəcək? Memarlar plan cızır.
3.  **Development (Kodlama)::** Developerlər kodu yazır.
4.  **Testing (Testləşdirmə):** **SİZ BURADASINIZ!** Səhvləri tapırıq.
5.  **Deployment (Release):** Proqram canlıya (müştəriyə) verilir.
6.  **Maintenance (Dəstək):** Çıxan xırda problemlər düzəldilir.

**Model Növləri:**
- **Waterfall:** Şəlalə kimi. Bir mərhələ bitmədən digərinə keçmək olmaz. Geri qayıtmaq çətindir.
- **Agile:** Çevik. Hər 2 həftədən bir (Sprint) kiçik hissələr təhvil verilir. Dəyişikliyə açıqdır. (Müasir şirkətlərin 90%-i bunu işlədir).

### STLC (Software Testing Life Cycle) 🧪
Testin öz həyat dövrü var:

1.  **Requirement Analysis:** Tələbi oxu, başa düş. Sualın varsa indi ver!
2.  **Test Planning:** "Necə test edəcəyik?", "Kim edəcək?", "Nə vaxt?". Strategiya qururuq.
3.  **Test Case Development:** Ssenariləri (Test Keysləri) yazırıq.
4.  **Environment Setup:** Test mühitini (Server, Brauzerlər) hazırlayırıq.
5.  **Execution:** Testləri icra edirik (Run!). Baq tapırıq.
6.  **Test Closure:** Hesabat (Report) hazırlayıb testi bitiririk.

### QA vs QC vs Testing 🤔
Bunlar fərqli şeylərdir!

- **Testing:** Kodu yoxlamaq (Prosesin ən sonu). *Məs: Düyməni basdım, işləmədi.*
- **QC (Quality Control):** Məhsula fokuslanır. Baqı tapmaq və düzəltmək. *Testing QC-nin bir hissəsidir.*
- **QA (Quality Assurance):** Prosesə fokuslanır. Baqın **yaranmaması** üçün qaydalar qoyur.
    *   *Analogy:* QC - Xəstəni müalicə etməkdir. QA - Xəstələnməmək üçün idman etmək və düzgün qidalanmaqdır.

### Tester vs QA Engineer
Çox vaxt bu sözləri səhv salırlar. Gəlin fərqə baxaq:

| Xüsusiyyət | Tester | QA Engineer |
|------------|--------|-------------|
| **Fokus** | Səhv tapmaq | Səhvin qarşısını almaq |
| **Zaman** | Proqram hazır olanda | Layihə başlayandan |
| **Sualı** | "Bu işləyirmi?" | "Biz düzgün şeyi, düzgün şəkildə edirikmi?" |
| **Analogy** | Yanğınsöndürən | Yanğın Təhlükəsizliyi Müfəttişi |

**Pro Tip:** Interview-da "Tester" əvəzinə "QA Engineer" kimi düşüncə tərzinizi göstərsəniz, şansınız 2 qat artar.

### Testləşdirmənin 7 Qızıl Qaydasından Seçmələr

1.  **Erkən Testləmə (Early Testing):**
    Səhvi planlamada tapsan = 1 AZN xərc.
    Kod yazanda tapsan = 10 AZN xərc.
    Production-da müştəri tapsa = 1000 AZN + Reputasiya itkisi.
    *Nəticə: Nə qədər tez, o qədər ucuz.*

2.  **Pestisid Paradoksu (Pesticide Paradox):**
    Eyni dərmanı həşəratlara vursan, immunitet qazanarlar.
    Eyni testləri təkrar etsən, yeni baq tapa bilməyəcəksən.
    *Həll: Testlərini mütəmadi olaraq yenilə və fərqli bucaqlardan bax.*

3.  **Səhvsizlik İllüziyası (Absence of Errors Fallacy):**
    Maşının təkərləri əladır, mühərriki superdir, amma maşın **uçmur**.
    Müştəri isə "uçan maşın" istəyirdi.
    Proqrama texniki cəhətdən səhvsiz ola bilər, amma müştərinin işinə yaramırsa, layihə uğursuzdur.

### 🎤 Məşhur İntervyu Sualları

**Sual 1: QA və QC fərqi nədir?**
*Cavab:* QA prosesyönümlüdür (Process oriented), səhvin yaranmamasını hədəfləyir (Prevention). QC məhsulyönümlüdür (Product oriented), yaranmış səhvi tapmağı hədəfləyir (Detection).

**Sual 2: Niyə 100% test etmək mümkün deyil?**
*Cavab:* Sonsuz sayda kombinasiya (inputlar, mühitlər, versiyalar) var. Vaxt və büdcə məhduddur. Biz riski azaltmaq üçün "Risk-Based Testing" edirik.

**Sual 3: Agile nədir?**
*Cavab:* Layihənin kiçik hissələrə (sprintlərə) bölünərək tez-tez təhvil verilməsi metodologiyasıdır. Dəyişikliklərə çevik reaksiya verir.`,
    quiz: [
      {
        question: "QA-nın əsas məqsədi nədir?",
        options: [
          "Kodu yazmaq",
          "Məhsulun keyfiyyətini təmin etmək",
          "Dizayn etmək",
          "Layihəni idarə etmək"
        ],
        correct: 1
      },
      {
        question: "Erkən testləmənin faydası nədir?",
        options: [
          "Daha çox vaxt aparır",
          "Daha bahalıdır",
          "Səhvlərin düzəldilməsi daha ucuz başa gəlir",
          "Heç bir faydası yoxdur"
        ],
        correct: 2
      },
      {
        question: "Pareto prinsipinə görə səhvlərin 80%-i harada olur?",
        options: [
          "Kodun 20%-ində",
          "Bütün kodda bərabər paylanır",
          "Dizaynda",
          "Database-də"
        ],
        correct: 0
      }
    ]
  },
  {
    id: 'test-types',
    title: 'Test Növləri',
    description: 'Funksional, qeyri-funksional və digər test növləri',
    color: 'bg-gradient-to-br from-green-500 to-emerald-500',
    readTime: '15 dəq',
    difficulty: 'Orta',
    content: `### Test Piramidası: Avtomobil Analogiyası 🚗
Test növlərini başa düşmək üçün **Avtomobil İstehsalını** düşünək.

\`\`\`
        /\\
       /E2E\\        ← Sürüş Testi (Çölə çıxırıq)
      /------\\
     /  API   \\      ← Mühərrik və Qutusu əlaqəsi
    /----------\\
   / Unit Tests \\   ← Boltlar və Hissələr
  /--------------\\
\`\`\`

### Kutu (Box) Metodologiyaları 📦

Testing-ə yanaşma tərzləridir:

1.  **Black Box (Qara Qutu):**
    - Kodun içinə baxmırıq. Kodu görmürük.
    - Yalnız Input (giriş) və Output (çıxış) yoxlayırıq.
    - *Kim edir?* Əsasən Manual QA-lər.
    - *Nümunə:* Televizor pultunda düyməni basıram, kanal dəyişir. İçində nə baş verdiyini bilmirəm və maraqlı deyil.

2.  **White Box (Ağ Qutu):**
    - Kodun içinə baxırıq. Məntiqi, strukturu yoxlayırıq.
    - *Kim edir?* Developerlər.
    - *Nümunə:* Televizor ustası pultun içinə baxır, lehimləri yoxlayır.

3.  **Grey Box (Boz Qutu):**
    - Kodun bəzi hissəsini bilirik (məs: Database strukturu, API).
    - Həm funksionallığı, həm strukturu yoxlayırıq.
    - *Kim edir?* Automation QA, API Tester.

### Static vs Dynamic Testing

**Static Testing (Statik):**
- Proqramı işə salmadan yoxlamaq.
- Sənədləri oxumaq (Review), kodu gözdən keçirmək (Walkthrough).
- *Məqsəd:* Səhvi ən erkən mərhələdə tapmaq.

**Dynamic Testing (Dinamik):**
- Proqramı işə salıb (Run edib) yoxlamaq.
- Düymələrə basmaq, formaları doldurmaq.
- *Məqsəd:* İşlək məhsulda davranışı görmək.

### Funksional Testlər (Nə edir?)

**1. Unit Testing (Vahid Test) - "Boltlar yerindədirmi?"**
Ən kiçik hissəni yoxlayırıq.
*Avtomobil:* Təkərin havası yerindədirmi? Şamlar (spark plugs) işləyirmi?
*Kod:* Email funksiyası "@" işarəsini yoxlayırmı? (Developer edir).

**2. Integration Testing - "Mühərrik təkərlərlə danışırmı?"**
İki hissənin birləşməsini yoxlayırıq.
*Avtomobil:* Sükanı döndərəndə təkərlər dönürmü?
*Kod:* Qeydiyyat düyməsini basanda API-yə sorğu gedirmi?

**3. System Testing - "Maşın sürülürmü?"**
Bütöv sistemi yoxlayırıq.
*Avtomobil:* Maşını işə salıb, sürüb, park edirik.
*Kod:* İstifadəçi tam flow-nu (Login -> Məhsul seçim -> Ödəniş) keçə bilirmi?

**4. Acceptance Testing (UAT) - "Müştəri bəyəndimi?"**
Müştəri özü yoxlayır.
*Avtomobil:* Müştəri oturur, sürür və "Bəli, mən bunu istəmişdim" deyir.

### Qeyri-funksional Testlər (Necə işləyir?)

Avtomobil hərəkət edir (Funksional OK), bəs necə hərəkət edir?

**1. Performance Testing (Sürət):**
- Maşın 100 km/sürətə neçə saniyəyə yığır?
- Yoxuşda sönürmü? (Load Testing)
- Eyni anda 5 adam otursa sürəti azalırmı? (Stress Testing)

**2. Security Testing (Təhlükəsizlik):**
- Maşının qapısını başqa açarla açmaq olarmı?
- Şüşəni qırıb içəri girmək asandırmı?

**3. Usability Testing (Rahatlıq):**
- Oturacaqlar rahatdırmı?
- Kondisionerin düyməsi əlin çatacağı yerdədirmi?
- *Kod:* Düymə görünürmü? Yazılar oxunaqlıdırmı?

### Exploratory Testing (Kəşfiyyat Testi) 🗺️
Ssenarisiz test etməkdir.
Test keyslərə baxmırsan. Proqramı bir istifadəçi kimi "kəşf" edirsən.
Bu sadəcə "qurdalamaq" deyil! Təcrübəli QA-in intuisiyasıdır.
**Time-Boxing:** Özünə 30 dəqiqə vaxt qoyursan və yalnız "Search" modulunu "dağıdırsan".

### "Smoke Test" Nədir? 🔥
Elektronikada bir cihazı toka taxanda tüstü (smoke) çıxırsa, deməli yanır, dərin testə ehtiyac yoxdur.
QA-də: "Login işləyirmi?". Əgər əsas funksiya işləmirsə, xırda detalları yoxlamağın mənası yoxdur. Build-i developerə qaytar!

### 🎤 Məşhur İntervyu Sualları

**Sual 1: Black Box vs White Box fərqi?**
*Cavab:* Black Box-da kodu görmürük, yalnız nəticəyə baxırıq (QA edir). White Box-da kodun strukturunu bilirik və yoxlayırıq (Dev edir).

**Sual 2: Regression Testing nədir?**
*Cavab:* Proqramda dəyişiklik edildikdən sonra (yeni funksiya və ya baq fix), köhnə funksiyaların pozulmadığını yoxlamaqdır.

**Sual 3: Smoke vs Sanity fərqi?**
*Cavab:* Smoke - ən kritik funksiyaların ümumi yoxlanışıdır (sistem yanır ya yox?). Sanity - konkret bir düzəlişin və ya modulun dərin yoxlanışıdır (bu hissə düzəldimi?).`,
    quiz: [
      {
        question: "Unit Test nəyi yoxlayır?",
        options: [
          "Bütün sistemi",
          "Kodun ən kiçik hissəsini",
          "İstifadəçi təcrübəsini",
          "Təhlükəsizliyi"
        ],
        correct: 1
      },
      {
        question: "Regression Testing nə vaxt aparılır?",
        options: [
          "Layihənin əvvəlində",
          "Yalnız sonda",
          "Yeni dəyişiklikdən sonra köhnə funksiyaları yoxlamaq üçün",
          "Heç vaxt"
        ],
        correct: 2
      },
      {
        question: "Hansı test növü proqramın sürətini yoxlayır?",
        options: [
          "Security Testing",
          "Usability Testing",
          "Performance Testing",
          "Functional Testing"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 'bug-reporting',
    title: 'Baq Reportu Yazmaq',
    description: 'Effektiv baq reportu necə yazılır?',
    color: 'bg-gradient-to-br from-red-500 to-pink-500',
    readTime: '12 dəq',
    difficulty: 'Orta',
    content: `### Baq Reportu: Detektivin Qeyd Dəftərçəsi 🕵️‍♂️
Baq reportu sadəcə "Xəta var" demək deyil. Bu, **Cinayət İşinin Dosyesidir**.
Developer isə bu dosye əsasında cinayətkarı (baqı) tapıb zərərsizləşdirməlidir.

Əgər dosye yarımçıq olsa, cinayətkar azadlıqda gəzəcək!

### Baq Triage (Çeşidləmə) ⚖️
Hər tapılan baq dərhal düzəldilmir. **Triage Meeting** keçirilir və qərar verilir:
1.  **To be fixed:** Kritikdir, düzəldək.
2.  **Deferred (Təxirə sal):** Vacib deyil, sonra baxarıq.
3.  **Rejected:** Bu baq deyil (feature-dir) və ya təkrarlanmır.
4.  **Duplicate:** Artıq kimsə bunu report edib.

### Jira Workflow (Həyat Dövrü) 🔄
Müasir şirkətlərdə (Agile) baqın yolu belədir:

1.  **To Do / Backlog:** Baq report edildi, növbədədir.
2.  **In Progress:** Developer işə başladı.
3.  **In Review / Dev Core:** Developer bitirdi, kod review olunur.
4.  **Ready for QA:** QA mühitinə yükləndi. Sənin növbəndir! ✅
5.  **In QA / Testing:** Sən test edirsən.
6.  **Done / Verified:** Baq düzəlib, bağlandı. 🎉
7.  **Reopened:** Düzəlməyib, geri qaytarırsan. ↩️

### Qızıl Qayda: "Necə təkrarlayım?"
Developerlərin ən çox dediyi cümlə: **"Mənim kompüterimdə işləyir!" (Works on my machine)**.
Bunun qarşısını almaq üçün addımları elə yazmalısan ki, hətta nənən də oxuyub o səhvi təkrarlaya bilsin.

### Yaxşı Report vs Pis Report 📝

**Pis Report:**
> "Qeydiyyat işləmir. Düyməni basıram xəta verir."

*Developer:* Hansı düymə? Nə xətası? Hansı brauzer? Mən yoxladım işləyir. -> **Status: Rejected / Cannot Reproduce**

**Yaxşı Report (Detektiv yanaşması):**
> **Title:** Registration səhifəsində "Submit" edərkən 500 erroru (Email sahəsi boş olduqda)
> **Severity:** Major
> **Environment:** Chrome 110, Windows 11
>
> **Steps to reproduce:**
> 1. Registration səhifəsinə get.
> 2. Email sahəsini boş qoy.
> 3. Şifrə sahəsinə "12345" yaz.
> 4. "Submit" düyməsinə kliklə.
>
> **Actual Result:** Səhifə ağarır və ekranda "500 Internal Server Error" yazılır.
> **Expected Result:** "Email sahəsi tələb olunur" xətası çıxmalıdır (qırmızı rəngdə).
> **Evidence:** [Screen_Recording.mp4], [Console_Log.txt]

*Developer:* Aha, başa düşdüm! Backend validasiyası yoxdur. 5 dəqiqəyə düzəldirəm. -> **Status: Fixed** ✅

### Severity vs Priority (Çox qarışdırılır!) ⚠️

- **Severity (Ciddilik):** Baqın sistemə vurduğu ziyan. (Texniki tərəf)
- **Priority (Vaciblik):** Nə qədər tez düzəlməlidir? (Biznes tərəf)

**Priority Matrix:**

| | High Urgency | Low Urgency |
|---|---|---|
| **High Impact** | Fix Immediately! (Server çöküb) | Fix Next Release (Kritik, amma istifadəçi azdır) |
| **Low Impact** | Fix if time permits (Logo səhvdir) | Won't Fix (Kosmetik kiçik səhv) |

### 🎤 Məşhur İntervyu Sualları

**Sual 1: Baq reportun ən vacib komponenti nədir?**
*Cavab:* "Steps to Reproduce" (Təkrarlama addımları). Əgər developer baqı təkrar edə bilmirsə, düzəldə bilməz.

**Sual 2: Developer baqı qəbul etmirsə (Rejected) nə edirsən?**
*Cavab:* Mübahisə etmirəm. Təkrar yoxlayıram (Retest), sübut (video/log) əlavə edirəm və Tələblər sənədinə (Requirements) istinad edirəm.

**Sual 3: High Severity, Low Priority nümunəsi ver.**
*Cavab:* Saytın "Haqqımızda" səhifəsində düymə işləmir (Funksiya yoxdur - High Severity), amma o səhifəyə heç kim girmir (Low Priority).`,
    quiz: [
      {
        question: "Baq reportunun ən vacib hissəsi nədir?",
        options: [
          "Yalnız başlıq",
          "Təkrarlana bilən addımlar",
          "Müəllifin adı",
          "Tarix"
        ],
        correct: 1
      },
      {
        question: "Severity nəyi göstərir?",
        options: [
          "Baqın nə qədər tez düzəldilməli olduğunu",
          "Baqın sistemə təsir dərəcəsini (ciddiliyini)",
          "Developerin adını",
          "Testin növünü"
        ],
        correct: 1
      },
      {
        question: "Əgər proqram çökürsə, bu hansı Severity-dir?",
        options: [
          "Minor",
          "Trivial",
          "Critical",
          "Major"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 'test-planning',
    title: 'Test Planlaşdırması',
    description: 'Test strategiyası və test keyslərin yazılması',
    color: 'bg-gradient-to-br from-purple-500 to-indigo-500',
    readTime: '18 dəq',
    difficulty: 'Çətin',
    content: `### Test Planı: Səyahət Planı ✈️
Test Planı yazmağı **Tətilə getməyə (Səyahətə)** bənzədə bilərik.
Əgər plansız getsəniz, oteldə yer tapmaya bilərsiniz, pulunuz bitər və ya təyyarəni qaçırarsınız.
QA-də də eynidir: Plansız test olmaz!

### Test Planının Komponentləri (Səyahət Dili ilə)

**1. Test Scope (Əhatə Dairəsi): "Hara gedirik?"**
- **In-Scope (Gediləcək yerlər):** Paris, Luvr muzeyi. (*Login, Registration*)
- **Out-of-Scope (Gedilməyəcək):** Parisin kənar kəndləri. (*Admin Panel - hələ hazır deyil*)

**2. Test Strategy (Strategiya): "Necə gedirik?"**
- Təyyarə ilə? Qatarla? (*Manual yoxsa Avtomatlaşdırma?*)
- Hansı alətləri götürürük? (*Postman, Selenium*)

**3. Resources (Resurslar): "Kimlə gedirik?"**
- 2 nəfər, büdcəmiz 1000$. (*2 QA Engineer, 3 gün vaxt*)
- Telefonumuz dözümlüdür? (*Test serverlərimiz hazırdırmı?*)

**4. Schedule (Cədvəl): "Nə vaxt gedirik?"**
- Gün 1: Uçuş. (*Test mühitinin hazırlanması*)
- Gün 2-3: Gəzinti. (*Testlərin icrası*)
- Gün 4: Qayıdış. (*Report və Release*)

### Entry & Exit Criteria (Giriş və Çıxış Meyarları) 🚦
Nə vaxt başlayırıq və nə vaxt bitiririk?

- **Entry Criteria (Giriş):**
    - Tələblər sənədi hazırdır?
    - Test mühiti (Staging) işləyir?
    - Smoke test keçdi?

- **Exit Criteria (Çıxış):**
    - Bütün Critical və Major baqlar düzəlib?
    - Test keyslərin 95%-i "Pass" olub?
    - Büdcə və vaxt bitib?

### RTM (Requirement Traceability Matrix) 🔗
Tələblərlə Testlərin xəritəsidir.
Məqsəd: Heç bir tələbin testdən kənar qalmadığına əmin olmaq.

*Nümunə:*
| Req ID | Req Description | Test Case ID | Status |
|---|---|---|---|
| R-01 | Login funksiyası | TC-01, TC-02 | Pass |
| R-02 | Şifrə bərpası | TC-05 | Fail |

### Risk Hazard Analysis ⚠️
Risk = Probability (Ehtimal) x Impact (Təsir).

- **High Risk:** Payment Gateway (Sistem çökə bilər + Pul itkisi). -> *Dərin test et!*
- **Low Risk:** "About Us" səhifəsində hərf səhvi. -> *Sürətli bax.*

### Test Case Strukturu (Sadələşdirilmiş)
*Nümunə:* "Eyfel qülləsinin qarşısında şəkil çəkdir."

| ID | Title | Steps | Expected Result |
|----|-------|-------|-----------------|
| TC01 | Uğurlu Login | 1. Login səhifəsinə get<br>2. Düzgün user/pass yaz<br>3. 'Login' bas | "Home" səhifəsi açılır ✅ |
| TC02 | Yanlış Şifrə | 1. Şifrəni səhv yaz<br>2. 'Login' bas | "Şifrə yanlışdır" xətası çıxır ❌ |

**Pro Tip:** Test keysləri o qədər aydın yaz ki, yeni işə girən Junior QA belə onu heç kimdən soruşmadan icra edə bilsin.

### 🎤 Məşhur İntervyu Sualları

**Sual 1: Test Plan nə vaxt yazılır?**
*Cavab:* Tələb analizi (Requirement Analysis) bitdikdən dərhal sonra. Proqram kodu yazılmağa başlamamışdan əvvəl.

**Sual 2: Exit Criteria nədir?**
*Cavab:* Testi dayandırmaq üçün lazım olan şərtlərdir. Məsələn, "Critical baq qalmayıb" və "90% testlər pass olub".

**Sual 3: Əgər test üçün vaxt çatmırsa nə edirsən?**
*Cavab:* Prioritizasiya edirəm (Risk-Based Testing). Ən vacib, kritik funksiyaları (High Priority) test edirəm, kosmetik işləri (Low Priority) saxlayıram.`,
    quiz: [
      {
        question: "Test Planı nədir?",
        options: [
          "Baq reportu",
          "Testləşdirmə prosesinin yol xəritəsi",
          "Kodun bir hissəsi",
          "Dizayn sənədi"
        ],
        correct: 1
      },
      {
        question: "Test Scope nəyi müəyyən edir?",
        options: [
          "Nəyin test ediləcəyini və edilməyəcəyini",
          "Testin qiymətini",
          "Developerlərin adlarını",
          "Layihənin bitmə tarixini"
        ],
        correct: 0
      },
      {
        question: "Boundary Testing nəyi yoxlayır?",
        options: [
          "Rəngləri",
          "Sərhəd dəyərlərini (min/max)",
          "Sürəti",
          "Təhlükəsizliyi"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 'api-testing',
    title: 'API Testləmə',
    description: 'REST API, metodlar, status kodlar və Postman',
    color: 'bg-gradient-to-br from-orange-500 to-amber-500',
    readTime: '20 dəq',
    difficulty: 'Çətin',
    content: `### API Nədir?
**API (Application Programming Interface)** - proqramların bir-biri ilə danışması üçün bir vasitədir.

**Restoran Analologiyası:**
- **Siz (Müştəri):** Frontend (React app)
- **Offisiant (API):** Sizin sifarişinizi mətbəxə aparır və yeməyi gətirir.
- **Mətbəx (Server/Database):** Sifarişi hazırlayır.

### API Memarlıq Növləri 🏛️
1.  **REST (Representational State Transfer):** Ən populyar. Standart HTTP metodlarını istifadə edir. Yüngül və sürətlidir.
2.  **SOAP (Simple Object Access Protocol):** Qədim, XML əsaslı, çox təhlükəsiz amma ağırdır. (Banklarda çox istifadə olunur).
3.  **GraphQL:** Facebook tərəfindən yaradılıb. Yalnız istədiyin datanı gətirir (Məs: User-in adını istəyirsən, bütün məlumatı yox).

### HTTP Headers & Payload 📦
Bir məktub göndərərkən zərf (Headers) və məktubun özü (Payload) olur.

- **Headers (Zərf):** Meta məlumatlar.
    - \`Content-Type: application/json\` (Mən sənə JSON göndərirəm)
    - \`Authorization: Bearer xyz123\` (Mənim giriş icazəm var)
    - \`User-Agent: Chrome\` (Mən Chrome brauzeriyəm)

- **Payload / Body (Məktub):** Əsas məlumat.
    - \`{ "username": "emin", "password": "123" }\`

### Authentication Types (Giriş Növləri) 🔐

1.  **Basic Auth:** Username və Password hər sorğuda göndərilir (Təhlükəlidir).
2.  **Bearer Token (JWT):** Login olanda server sənə "Token" (bilet) verir. Sonrakı sorğularda o bileti göstərirsən.
3.  **OAuth 2.0:** "Google ilə daxil ol". Şifrəni paylaşmadan başqa sayta icazə verirsən.

### Status Kodları - Qısa Yaddaş Vərəqi 📝

- **200:** OK (Hər şey super)
- **201:** Created (Yarandı)
- **400:** Bad Request (Sorğunu düzəlt)
- **401:** Unauthorized (Login olmamısan)
- **403:** Forbidden (İcazən yoxdur)
- **404:** Not Found (Tapılmadı)
- **500:** Server Error (Server partladı)

### Praktikada Test Ssenarisi

**Ssenari:** Qeydiyyat (Register)
1. **Positive:** Düzgün email/pass -> \`201 Created\` + ID qayıdır.
2. **Negative:** Email boş göndər -> \`400 Bad Request\` + "Email required" mesajı.
3. **Security:** Token olmadan profilə girməyə çalış -> \`401 Unauthorized\`.

### 🎤 Məşhur İntervyu Sualları

**Sual 1: REST və SOAP fərqi?**
*Cavab:* REST daha yüngüldür, JSON istifadə edir və HTTP metodlarına əsaslanır. SOAP XML istifadə edir, daha ağırdır amma təhlükəsizlik standartları (WS-Security) yüksəkdir.

**Sual 2: 401 və 403 fərqi?**
*Cavab:* 401 - "Sən kimsən?" (Login olmamısan). 403 - "Səni tanıdım, amma bura girməyə haqqın yoxdur" (Admin deyilsən).

**Sual 3: API testini nə ilə edirsən?**
*Cavab:* Manual test üçün **Postman** (və ya Insomnia). Avtomatlaşdırma üçün **Rest Assured** (Java) və ya **Supertest** (JS).`,
    quiz: [
      {
        question: "Yeni məlumat yaratmaq üçün hansı metod istifadə olunur?",
        options: ["GET", "PUT", "POST", "DELETE"],
        correct: 2
      },
      {
        question: "404 status kodu nə deməkdir?",
        options: ["Uğurlu", "Server xətası", "Tapılmadı", "İcazə yoxdur"],
        correct: 2
      },
      {
        question: "API nəyin qısaltmasıdır?",
        options: [
          "Application Personal Interface",
          "Automated Programming Interface",
          "Application Programming Interface",
          "Advanced Program Interaction"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 'mobile-testing',
    title: 'Mobil Testləmə',
    description: 'Android vs iOS, emulyatorlar və real cihazlar',
    color: 'bg-gradient-to-br from-teal-500 to-green-500',
    readTime: '12 dəq',
    difficulty: 'Orta',
    content: `### Mobil Tətbiq Növləri
1. **Native Apps (Yerli):**
   - Xüsusi olaraq iOS (Swift) və ya Android (Kotlin) üçün yazılır.
   - Sürətli, kamera və GPS-ə tam çıxış var.
   - *Test:* Hər iki OS üçün ayrıca testetməlisən.
   
2. **Web Apps (PWA):**
   - Brauzerdə (Chrome/Safari) işləyən saytlardır.
   - *Test:* Brauzer uyğunluğu vacibdir.
   
3. **Hybrid Apps:**
   - Bir kod yazılır, hər yerdə işləyir (React Native, Flutter).
   - "Wrapper" içində işləyən veb sayt kimidir.

### Test Edilməli Xüsusi Məqamlar 📱

**1. Hardware & Sensors:**
- **GPS:** Xəritə yerini düz göstərir?
- **Camera:** Şəkil çəkib yükləmək olur?
- **Biometrics:** FaceID/TouchID işləyirmi?
- **Battery:** Tətbiq batareyanı "yeyirmi"? (Battery Drain Test)

**2. Network Conditions (Şəbəkə):**
- **Sürətli:** WiFi 5G.
- **Zəif:** 3G/2G (Metroda, lift-də test etmək vacibdir!).
- **Keçid:** WiFi-dan 4G-yə keçəndə tətbiq donurmu?

**3. Interruptions (Kəsilmələr):**
- Oyun oynayanda zəng gəlsə?
- SMS gəlsə?
- Batareya "Low Battery" xəbərdarlığı versə?
- Tətbiq arxa fona (Background) atılıb geri qayıtsa?

**4. Gestures (Jestlər):**
- Swipe (Sürüşdürmə), Pinch (Böyütmə), Zoom, Shake.
- Düymələr barmaq üçün kifayət qədər böyükdürmü? (Minimum 44px).

### Cloud Testing Farms ☁️
Hər testçinin evində 50 dənə telefon ola bilməz.
Buna görə **BrowserStack** və ya **SauceLabs** istifadə edirik.
Bu saytlar sənə "virtual" real cihazlar verir.
*Məsələn:* BrowserStack-də "iPhone 15 Pro, iOS 17" seçirsən və brauzerdə idarə edirsən.

### Android vs iOS Fərqləri
- **Dizayn:** Android-də Material Design, iOS-da Human Interface Guidelines.
- **Naviqasiya:** Android-də fiziki "Geri" düyməsi var, iOS-da yoxdur.
- **Fragmentation:** Android-də minlərlə model var (Samsung, Xiaomi, Pixel...), iOS-da azdır.

### 🎤 Məşhur İntervyu Sualları

**Sual 1: Native və Hybrid tətbiq fərqi?**
*Cavab:* Native sürətlidir və OS-in bütün imkanlarından istifadə edir. Hybrid daha ucuz başa gəlir, bir kodla hər yerdə işləyir amma performansı aşağı ola bilər.

**Sual 2: Emulator və Real Cihaz fərqi?**
*Cavab:* Emulator sürətlidir və ilkin test üçün yaxşıdır. Amma batareya, kamera, sensorlar və real şəbəkə şəraiti üçün mütləq Real Cihaz lazımdır.

**Sual 3: Bir tətbiq batareyanı çox yeyirsə, bunu necə test edirsən?**
*Cavab:* Tətbiqi işlədib batareya faizini izləyirəm, CPU istifadəsini monitorinq edirəm (Android Studio Profiler və ya Xcode Instruments ilə).`,
    quiz: [
      {
        question: "Tətbiq işləyərkən zəng gəlməsini yoxlamaq hansı test növüdür?",
        options: ["Network Testing", "Interruption Testing", "Installation Testing", "Security Testing"],
        correct: 1
      },
      {
        question: "Hansı cihaz daha etibarlı test nəticəsi verir?",
        options: ["Emulator", "Simulator", "Real Cihaz", "Hamısı eynidir"],
        correct: 2
      },
      {
        question: "Android və iOS arasında əsas test fərqi nədir?",
        options: [
          "Rənglər",
          "Ekran ölçülərinin müxtəlifliyi (Fragmentation)",
          "İnternet sürəti",
          "Hər ikisi eynidir"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 'automation-basics',
    title: 'Avtomatlaşdırma Əsasları',
    description: 'Nə vaxt avtomatlaşdırmalı? Alətlər və Selektorlar',
    color: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
    readTime: '20 dəq',
    difficulty: 'Ekspert',
    content: `### Avtomatlaşdırma Nədir?
Proqram təminatını test etmək üçün xüsusi kodlar yazmaqdır. İnsan müdaxiləsi olmadan testlər işləyir.

### Test Automation Pyramid vs Pizza 🍕

**Doğru Üsul (Piramida):**
1.  **Unit Tests (70%):** Çoxlu sayda, sürətli. (Təməl)
2.  **Integration / API (20%):** Orta səviyyə.
3.  **UI / E2E (10%):** Az sayda. (Zirvə)

**Səhv Üsul (Pizza / Ice Cream Cone):**
- Çoxlu UI testləri yazmaq.
- Az Unit testlər.
- *Nəticə:* Testlər çox yavaş işləyir, tez-tez qırılır (flaky) və maintain etmək cəhənnəm olur.

### Nə vaxt Avtomatlaşdırmalıyıq? (ROI - Return on Investment)

Hər şeyi avtomatlaşdırmaq axmaqlıqdır. Avtomatlaşdırma bahalıdır (kod yazmaq vaxt aparır).

✅ **YES (Avtomatlaşdır):**
- **Regression:** Hər release-də eyni login-i yoxlamaqdan bezmisən? Avtomatlaşdır.
- **Data Driven:** 1000 müxtəlif istifadəçi ilə login olmalısan? Skript yaz.
- **Complex Calculation:** Əl ilə hesablamaq çətindir.

❌ **NO (Manual et):**
- **Exploratory:** Kəşfiyyat. İntuisiya lazımdır.
- **Usability:** "Bu rəng gözə xoş gəlirmi?" (Robot bilməz).
- **One-time:** Cəmi bir dəfə yoxlanacaq funksiya.
- **Unstable:** Hələ dizayn dəyişir.

### CI/CD (Continuous Integration / Deployment) 🚀
Avtomatlaşdırmanın əsas məqsədi sürətdir.
Biz testləri öz kompüterimizdə yox, **CI Serverdə** (Jenkins, GitHub Actions, GitLab CI) işlədirik.

1.  Developer kodu GitHub-a push edir.
2.  Jenkins avtomatik "oyanır".
3.  Layihəni build edir.
4.  Sənin yazdığın avto-testləri işlədir.
5.  Əgər testlər keçsə (Green) -> Deploy edir.
6.  Əgər testlər qırılsa (Red) -> Developerə email gedir: "Kodu pozdun, düzəlt!".

### POM (Page Object Model) - Qızıl Standart 🏆
Kodun təkrarını azaldır.

- **Problem:** Təsəvvür et 50 testdə "Username" inputunu tapmaq üçün ID istifadə etmisən. Developer ID-ni dəyişdi. 50 yerdə dəyişməlisən! 😱
- **Həll (POM):** "LoginPage" adlı class yaradırsan. ID-ni orada saxlayırsan. Bütün testlər oradan götürür. ID dəyişsə, tək 1 yerdə dəyişirsən. 😎

### 🎤 Məşhur İntervyu Sualları

**Sual 1: Selenium və Playwright fərqi?**
*Cavab:* Selenium köhnədir, WebDriver protokolundan istifadə edir (yavaşdır). Playwright müasirdir, birbaşa brauzer engini ilə danışır (sürətlidir) və "Auto-wait" funksiyası var (elementi gözləyir).

**Sual 2: Flaky Test nədir?**
*Cavab:* "Qeyri-stabil" test. Gah keçir, gah keçmir (kod dəyişməsə belə). Səbəbi adətən şəbəkə gecikmələri və ya pis yazılmış Wait-lərdir.

**Sual 3: Nəyi avtomatlaşdırmaq olmaz?**
*Cavab:* Captcha, 2FA (SMS kod), Fiziki qarşılıqlı əlaqə (kartı terminala taxmaq), Vizual estetika (Rəng uyğunluğu).`,
    quiz: [
      {
        question: "Nə vaxt avtomatlaşdırma etmək MƏSLƏHƏT DEYİL?",
        options: [
          "Təkrarlanan testlər üçün",
          "Test yalnız bir dəfə icra olunacaqsa",
          "Böyük layihələrdə",
          "Regression testləri üçün"
        ],
        correct: 1
      },
      {
        question: "Elementi tapmaq üçün ən sürətli lokator hansıdır?",
        options: ["XPath", "CSS Selector", "ID", "Class Name"],
        correct: 2
      },
      {
        question: "Page Object Model (POM) nəyə kömək edir?",
        options: [
          "Testin sürətini artırır",
          "Kodun təkrarının qarşısını alır və saxlanmasını asanlaşdırır",
          "Baqları avtomatik tapır",
          "Dizaynı yoxlayır"
        ],
        correct: 1
      }
    ]
  }
];
