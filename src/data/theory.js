export const theoryModules = [
  {
    id: 'qa-basics',
    title: 'QA Əsasları',
    description: 'Testləşdirmənin əsas prinsipləri və QA mühəndisinin rolu',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    content: `### QA Nədir?

**Quality Assurance (QA)** - məhsulun keyfiyyətini təmin etmək üçün həyata keçirilən proseslər toplusudur. QA mühəndisi proqramda səhvləri tapır və onların düzəldilməsini təmin edir.

### Niyə Test Etməliyik?

- **İstifadəçi təcrübəsini yaxşılaşdırır** - Səhvsiz proqram istifadəçiləri məmnun edir
- **Maliyyə itkilərinin qarşısını alır** - Erkən tapılan səhv ucuz başa gələr
- **Brend reputasiyasını qoruyur** - Keyfiyyətli məhsul şirkətin nüfuzunu artırır
- **Təhlükəsizliyi təmin edir** - Kritik səhvlərin qarşısını alır

### Testləşdirmənin 7 Prinsipi

**1. Testləşdirmə səhvlərin varlığını göstərir**
Testlər səhvləri tapa bilər, amma heç bir səhv olmadığını sübut edə bilməz.

**Praktik nümunə:** Registration səhifəsində email validasiyasını test edirsən. "test@test" qəbul olunursa, bu səhvdir. Amma bütün email formatlarını test etmək mümkün deyil.

**2. Tam testləmə mümkün deyil**
Bütün mümkün kombinasiyaları test etmək qeyri-mümkündür.

**Praktik nümunə:** Payment səhifəsində kart nömrəsi 16 rəqəmdir. 10^16 kombinasiya var! Hamısını test etmək mümkün deyil. Risk analizi əsasında ən mühüm halları test edirik.

**3. Erkən testləmə**
Nə qədər tez başlasa, o qədər ucuz başa gələr.

**Praktik nümunə:** Dizayn mərhələsində düymə rənginin çox açıq olduğunu görsən, 5 dəqiqədə düzəlir. Amma production-da tapsan, bütün testləri yenidən keçməli olacaqsan.

**4. Səhvlərin klasterləşməsi**
Səhvlərin 80%-i kodun 20%-ində olur (Pareto prinsipi).

**Praktik nümunə:** Banking modulunda transfer funksiyasında 10 səhv tapsan, həmin funksiyaya daha çox diqqət yetir - daha çox səhv ola bilər.

**5. Pestisid paradoksu**
Eyni testləri təkrar etsən, yeni səhvlər tapmayacaqsan.

**Praktik nümunə:** Hər dəfə "test@test.com" ilə qeydiyyatdan keçirsən. Yeni bir dəfə "test@test" (nöqtəsiz) yoxla - yeni səhv tapa bilərsən.

**6. Testləmə kontekstdən asılıdır**
Bank proqramı ilə oyun fərqli test edilir.

**Praktik nümunə:** E-commerce-də 0.01 saniyə gecikmə normaldır, amma Banking-də pul transferində bu kritikdir.

**7. Səhvsizlik illüziyası**
Proqram səhvsiz işləyir, amma istifadəçi tələblərini ödəmir.

**Praktik nümunə:** Registration formu mükəmməl işləyir, amma istifadəçi "Şifrəni unutdum?" düyməsi axtarır - o yoxdur.

### QA Mühəndisinin Vəzifələri

- Test planlarının hazırlanması
- Test keyslərin yazılması
- Manual və avtomatik testlərin aparılması
- Baq reportlarının yaradılması
- Developerlərlə əməkdaşlıq
- Məhsulun keyfiyyətinə nəzarət

### Praktikada Necə İstifadə Edəcəksən?

**Registration modulunda:**
- Email validasiyasını yoxla (prinsip 2)
- Şifrə uzunluğunu test et (prinsip 4)
- Müxtəlif brauzerlərdə yoxla (prinsip 6)

**Payment modulunda:**
- Kart nömrəsi formatını yoxla (prinsip 1)
- CVV uzunluğunu test et (prinsip 3)
- Luhn alqoritmini yoxla (prinsip 5)

**Banking modulunda:**
- Transfer məbləğini yoxla (prinsip 7)
- Balans yenilənməsini test et (prinsip 4)
- Təsdiq dialoqunu yoxla (prinsip 6)

**E-commerce modulunda:**
- Məhsul sayını test et (prinsip 2)
- Kupon kodunu yoxla (prinsip 5)
- Endirim hesablamasını yoxla (prinsip 1)`
  },
  {
    id: 'test-types',
    title: 'Test Növləri',
    description: 'Funksional, qeyri-funksional və digər test növləri',
    color: 'bg-gradient-to-br from-green-500 to-emerald-500',
    content: `### Test Piramidası

\`\`\`
        /\\
       /E2E\\        ← Az sayda, yavaş, bahalı
      /------\\
     /  API   \\      ← Orta sayda, sürətli
    /----------\\
   / Unit Tests \\   ← Çox sayda, çox sürətli, ucuz
  /--------------\\
\`\`\`

### Funksional Testlər

Proqramın **NƏ ETDİYİNİ** yoxlayır.

**1. Unit Testing (Vahid Test)**
Kodun ən kiçik hissəsini (funksiya, metod) test edir.

**Praktik nümunə:**
\`\`\`javascript
function validateEmail(email) {
  return email.includes('@') && email.includes('.');
}
// Test: validateEmail('test@test.com') → true ✓
// Test: validateEmail('test') → false ✓
\`\`\`

**2. Integration Testing (İnteqrasiya Test)**
Modulların bir-biri ilə əlaqəsini yoxlayır.

**Praktik nümunə:** Registration səhifəsində forma göndəriləndə API-yə sorğu gedirmi? Cavab düzgün işlənirmi?

**3. System Testing (Sistem Test)**
Bütün sistemin bir yerdə işləməsini yoxlayır.

**Praktik nümunə:** İstifadəçi qeydiyyatdan keçir → Login olur → Məhsul alır → Ödəniş edir. Bütün proses işləyirmi?

**4. Acceptance Testing (Qəbul Test)**
Müştərinin tələblərinə uyğunluğu yoxlayır.

**Praktik nümunə:** Müştəri deyir "Qeydiyyat 30 saniyədən az çəkməlidir". Yoxlayırsan - 45 saniyə çəkir. Qəbul edilmir.

### Qeyri-funksional Testlər

Proqramın **NECƏ İŞLƏDİYİNİ** yoxlayır.

**1. Performance Testing (Performans Test)**
Sürət və yükü yoxlayır.

**Praktik nümunələr:**
- **Load Testing:** 1000 istifadəçi eyni anda qeydiyyatdan keçir
- **Stress Testing:** Sistem nə vaxt çökür? 10,000 istifadəçi?
- **Spike Testing:** Qəfil 5000 istifadəçi gəlir (Black Friday)

**Banking modulunda:** Transfer 3 saniyədən çox çəkməməlidir.

**2. Security Testing (Təhlükəsizlik Test)**
Zəiflikləri axtarır.

**Praktik nümunələr:**
- **SQL Injection:** Input-a \`' OR '1'='1\` yaz, işləyirmi?
- **XSS:** \`<script>alert('hack')</script>\` yaz, icra olurmu?
- **CSRF:** Başqa saytdan sorğu göndərmək mümkündürmü?

**Registration modulunda:** Şifrə hash-lənərək saxlanılırsa təhlükəsizdir.

**3. Usability Testing (İstifadə Rahatlığı Test)**
İstifadəçi təcrübəsini yoxlayır.

**Praktik nümunələr:**
- Düymələr kifayət qədər böyükdürmü? (44x44px minimum)
- Rənglər oxunaqlıdırmı? (kontrast nisbəti 4.5:1)
- Səhv mesajları aydındırmı?

**E-commerce modulunda:** "Səbətə əlavə et" düyməsi asan tapılırsa, yaxşı UX-dir.

**4. Compatibility Testing (Uyğunluq Test)**
Müxtəlif platformalarda işləməsini yoxlayır.

**Praktik nümunələr:**
- **Brauzer:** Chrome, Safari, Firefox, Edge
- **OS:** Windows, macOS, Linux, iOS, Android
- **Ekran:** Desktop, Tablet, Mobile

**Payment modulunda:** Safari-də kart nömrəsi düzgün formatlanırsa, uyğundur.

### Digər Mühüm Test Növləri

**Regression Testing (Reqressiya Test)**
Yeni dəyişiklik köhnə funksiyaları pozmayıb?

**Praktik nümunə:** Banking-ə yeni "Kredit" funksiyası əlavə etdin. Transfer hələ də işləyirmi?

**Smoke Testing (Tüstü Test)**
Əsas funksiyalar işləyirmi? (Sürətli yoxlama)

**Praktik nümunə:** 
- Login işləyir? ✓
- Qeydiyyat işləyir? ✓
- Ödəniş işləyir? ✓
Hamısı işləyirsə, daha dərin testə keç.

**Sanity Testing (Sağlamlıq Test)**
Düzəliş işləyirmi?

**Praktik nümunə:** Developer email validasiyasını düzəltdi. Yalnız onu yoxla, bütün sistemi yox.

### Praktikada Necə İstifadə Edəcəksən?

**Registration:**
- Funksional: Email formatı düzgündürmü?
- Performance: 1000 qeydiyyat eyni anda işləyir?
- Security: SQL injection mümkündürmü?
- Usability: Forma aydındırmı?

**Payment:**
- Funksional: Kart nömrəsi validasiyası işləyir?
- Performance: Ödəniş 5 saniyədən az?
- Security: CVV şifrələnir?
- Compatibility: Bütün brauzerlə işləyir?

**Banking:**
- Funksional: Transfer düzgün işləyir?
- Performance: 10,000 transfer eyni anda?
- Security: CSRF mümkündürmü?
- Usability: Təsdiq dialoqu aydındırmı?

**E-commerce:**
- Funksional: Səbət düzgün hesablayır?
- Performance: 1000 məhsul yükləmə sürəti?
- Security: XSS mümkündürmü?
- Usability: Checkout prosesi asandırmı?`
  },
  {
    id: 'bug-reporting',
    title: 'Baq Reportu Yazmaq',
    description: 'Effektiv baq reportu necə yazılır?',
    color: 'bg-gradient-to-br from-red-500 to-pink-500',
    content: `### Yaxşı Baq Reportunun Xüsusiyyətləri

**1. Aydın Başlıq**
Baq nə haqqındadır? Bir cümlə ilə izah et.

❌ Pis: "Düymə işləmir"
✅ Yaxşı: "Registration səhifəsində 'Göndər' düyməsi klikləndikdə heç nə baş vermir"

**2. Təkrarlana Bilən Addımlar**
Başqası baqı təkrar edə bilməlidir.

**Nümunə:**
\`\`\`
Addımlar:
1. Registration səhifəsinə get
2. Email: "test@test" daxil et (nöqtə yoxdur)
3. Şifrə: "123" daxil et (5 simvoldan az)
4. "Göndər" düyməsinə klik et

Gözlənilən nəticə: Validasiya xətası göstərilməlidir
Faktiki nəticə: Forma göndərilir, səhv mesajı yoxdur
\`\`\`

**3. Mühit Məlumatı**
Baq harada baş verir?

- Brauzer: Chrome 120.0
- OS: macOS 14.0
- Ekran: 1920x1080
- Mobil: iPhone 15 Pro, iOS 17.2

**4. Prioritet və Severity**

**Severity (Ciddilik):**
- **Critical:** Proqram çökür, məlumat itirilir
- **Major:** Əsas funksiya işləmir
- **Minor:** Kiçik problem, workaround var
- **Trivial:** Kosmetik səhv

**Priority (Prioritet):**
- **High:** Dərhal düzəldilməlidir
- **Medium:** Növbəti releasedə
- **Low:** Vaxt olduqda

**Nümunələr:**

| Baq | Severity | Priority |
|-----|----------|----------|
| Ödəniş sistemi işləmir | Critical | High |
| Email validasiyası yoxdur | Major | High |
| Düymə rəngi yanlışdır | Minor | Low |
| Mətn səhvi var | Trivial | Low |

### Baq Həyat Dövrü

\`\`\`
New → Assigned → Open → Fixed → Retest → Verified → Closed
                                    ↓
                                Reopened (düzəliş işləmirsə)
\`\`\`

**Statuslar:**

1. **New** - QA yeni baq tapıb
2. **Assigned** - Developer-ə təyin edilib
3. **Open** - Developer üzərində işləyir
4. **Fixed** - Developer düzəldib
5. **Retest** - QA təkrar yoxlayır
6. **Verified** - Düzəliş təsdiqlənib
7. **Closed** - Baq bağlanıb
8. **Reopened** - Düzəliş işləmir, yenidən açılıb

### Praktik Nümunələr

**Nümunə 1: Registration**

**Başlıq:** Email validasiyası yanlış email formatını qəbul edir

**Addımlar:**
1. Registration səhifəsinə get
2. Email: "test@test" daxil et (domain extension yoxdur)
3. "Göndər" klikə

**Gözlənilən:** "Düzgün email daxil edin" xətası
**Faktiki:** Forma qəbul edilir

**Severity:** Major
**Priority:** High
**Mühit:** Chrome 120, macOS 14

---

**Nümunə 2: Payment**

**Başlıq:** CVV 4 rəqəm qəbul edir (maksimum 3 olmalıdır)

**Addımlar:**
1. Payment səhifəsinə get
2. CVV: "1234" daxil et
3. "Ödə" klikə

**Gözlənilən:** "CVV 3 rəqəm olmalıdır" xətası
**Faktiki:** Ödəniş uğurlu

**Severity:** Major
**Priority:** High
**Mühit:** Safari 17, iOS 17

---

**Nümunə 3: Banking**

**Başlıq:** Transfer təsdiq dialoqusuz icra olunur

**Addımlar:**
1. Banking səhifəsinə get
2. Məbləğ: 1000 AZN
3. Alıcı: seç
4. "Köçür" klikə

**Gözlənilən:** Təsdiq dialoqu göstərilməlidir
**Faktiki:** Transfer dərhal icra olunur

**Severity:** Critical
**Priority:** High
**Mühit:** Firefox 121, Windows 11

---

**Nümunə 4: E-commerce**

**Başlıq:** Kupon kodu "FREE100" 100% endirim verir

**Addımlar:**
1. E-commerce səhifəsinə get
2. Kupon: "FREE100" daxil et
3. "Tətbiq et" klikə

**Gözlənilən:** Maksimum 50% endirim
**Faktiki:** 100% endirim (pulsuz)

**Severity:** Critical
**Priority:** High
**Mühit:** Chrome 120, Android 14

### Baq Reportu Şablonu

\`\`\`
Başlıq: [Qısa və aydın təsvir]

Addımlar:
1. [Birinci addım]
2. [İkinci addım]
3. [Üçüncü addım]

Gözlənilən Nəticə:
[Nə olmalıdır?]

Faktiki Nəticə:
[Nə olur?]

Severity: [Critical/Major/Minor/Trivial]
Priority: [High/Medium/Low]

Mühit:
- Brauzer: [Chrome/Safari/Firefox]
- OS: [Windows/macOS/iOS/Android]
- Versiya: [120.0]

Əlavə Məlumat:
- Screenshot: [əlavə et]
- Video: [əlavə et]
- Console log: [əlavə et]
\`\`\`

### Praktikada Necə İstifadə Edəcəksən?

**Registration modulunda:**
- Email validasiyası səhvi → Major, High
- Şifrə görünür (type="text") → Critical, High
- Düymə rəngi yanlış → Minor, Low

**Payment modulunda:**
- Kart nömrəsi 17 rəqəm qəbul edir → Major, High
- CVV görünür → Critical, High
- Loading state yoxdur → Minor, Medium

**Banking modulunda:**
- Balans yenilənmir → Critical, High
- Təsdiq dialoqu yoxdur → Critical, High
- Tarix formatı yanlış → Minor, Low

**E-commerce modulunda:**
- Məhsul sayı mənfi ola bilir → Major, High
- Endirim yanlış hesablanır → Critical, High
- Şəkil yüklənmir → Minor, Medium`
  },
  {
    id: 'test-planning',
    title: 'Test Planlaşdırması',
    description: 'Test strategiyası və test keyslərin yazılması',
    color: 'bg-gradient-to-br from-purple-500 to-indigo-500',
    content: `### Test Planı Nədir?

Test planı - testləşdirmə prosesinin yol xəritəsidir. Nə test edəcəyini, necə test edəcəyini və nə vaxt test edəcəyini müəyyənləşdirir.

### Test Planının Strukturu

**1. Test Obyekti**
Nə test edəcəksən?

**Nümunə:** "QA Student App - Registration Modulu"

**2. Test Scope (Əhatə Dairəsi)**
Nə test ediləcək və nə test edilməyəcək?

**Test ediləcək:**
- Email validasiyası
- Şifrə uzunluğu
- Telefon formatı
- Doğum tarixi

**Test edilməyəcək:**
- Backend API (ayrıca test edilir)
- Database (ayrıca test edilir)

**3. Test Strategiyası**
Necə test edəcəksən?

- Manual Testing: 80%
- Automated Testing: 20%
- Regression Testing: Hər releasedə
- Performance Testing: Həftədə 1 dəfə

**4. Test Mühiti**
Harada test edəcəksən?

- Brauzer: Chrome, Safari, Firefox
- OS: Windows 11, macOS 14, iOS 17, Android 14
- Ekran: Desktop (1920x1080), Mobile (375x667)

**5. Test Schedule (Cədvəl)**
Nə vaxt test edəcəksən?

- Test planı: 1 gün
- Test keyslərin yazılması: 2 gün
- Test icrası: 3 gün
- Baq reportları: 1 gün
- Regression: 1 gün

**6. Resurslar**
Kimlərlə test edəcəksən?

- QA Lead: 1 nəfər
- QA Engineer: 2 nəfər
- Test Automation: 1 nəfər

### Test Keys Nədir?

Test keys - konkret test ssenariləridir. Hər bir test keys bir funksiyanı yoxlayır.

### Test Keys Strukturu

\`\`\`
Test Keys ID: TC_REG_001
Test Keys Adı: Email validasiyası - düzgün format
Modul: Registration
Prioritet: High

Ön-şərtlər:
- Registration səhifəsi açıqdır

Addımlar:
1. Email input-a "test@example.com" daxil et
2. "Göndər" düyməsinə klik et

Gözlənilən Nəticə:
- Email qəbul edilir
- Növbəti səhifəyə keçid

Faktiki Nəticə:
[Test zamanı doldurulacaq]

Status: [Pass/Fail]
\`\`\`

### Praktik Nümunələr

**Registration Modulu üçün Test Keysləri:**

**TC_REG_001: Email validasiyası - düzgün format**
- Input: "test@example.com"
- Gözlənilən: Qəbul edilir ✓

**TC_REG_002: Email validasiyası - yanlış format**
- Input: "test@test"
- Gözlənilən: "Düzgün email daxil edin" xətası ✓

**TC_REG_003: Şifrə uzunluğu - minimum**
- Input: "12345" (5 simvol)
- Gözlənilən: Qəbul edilir ✓

**TC_REG_004: Şifrə uzunluğu - maksimum**
- Input: "123456" (6 simvol)
- Gözlənilən: "Maksimum 5 simvol" xətası ✓

**TC_REG_005: Telefon formatı - hərflər**
- Input: "abc123"
- Gözlənilən: "Yalnız rəqəmlər" xətası ✓

---

**Payment Modulu üçün Test Keysləri:**

**TC_PAY_001: Kart nömrəsi - düzgün format**
- Input: "4111111111111111" (16 rəqəm)
- Gözlənilən: Qəbul edilir ✓

**TC_PAY_002: Kart nömrəsi - qısa**
- Input: "411111" (6 rəqəm)
- Gözlənilən: "16 rəqəm olmalıdır" xətası ✓

**TC_PAY_003: CVV uzunluğu - 3 rəqəm**
- Input: "123"
- Gözlənilən: Qəbul edilir ✓

**TC_PAY_004: CVV uzunluğu - 4 rəqəm**
- Input: "1234"
- Gözlənilən: "Maksimum 3 rəqəm" xətası ✓

---

**Banking Modulu üçün Test Keysləri:**

**TC_BANK_001: Transfer məbləği - müsbət**
- Input: 100 AZN
- Gözlənilən: Transfer uğurlu ✓

**TC_BANK_002: Transfer məbləği - mənfi**
- Input: -100 AZN
- Gözlənilən: "Mənfi məbləğ ola bilməz" xətası ✓

**TC_BANK_003: Transfer məbləği - balansdan çox**
- Input: 10000 AZN (balans: 500 AZN)
- Gözlənilən: "Kifayət qədər balans yoxdur" xətası ✓

**TC_BANK_004: Təsdiq dialoqu**
- Addım: "Köçür" klikə
- Gözlənilən: Təsdiq dialoqu göstərilir ✓

---

**E-commerce Modulu üçün Test Keysləri:**

**TC_ECOM_001: Məhsul sayı - müsbət**
- Input: 5
- Gözlənilən: Səbətə əlavə edilir ✓

**TC_ECOM_002: Məhsul sayı - mənfi**
- Input: -1
- Gözlənilən: "Mənfi say ola bilməz" xətası ✓

**TC_ECOM_003: Məhsul sayı - stokdan çox**
- Input: 100 (stok: 50)
- Gözlənilən: "Stokda yalnız 50 var" xətası ✓

**TC_ECOM_004: Kupon kodu - düzgün**
- Input: "SAVE20"
- Gözlənilən: 20% endirim tətbiq edilir ✓

### Test Keys Şablonu

\`\`\`
Test Keys ID: TC_[MODUL]_[NÖMRƏ]
Test Keys Adı: [Qısa təsvir]
Modul: [Registration/Payment/Banking/E-commerce]
Prioritet: [High/Medium/Low]
Tip: [Positive/Negative/Boundary]

Ön-şərtlər:
- [Nə hazır olmalıdır?]

Addımlar:
1. [Birinci addım]
2. [İkinci addım]
3. [Üçüncü addım]

Test Data:
- Input: [Daxil ediləcək məlumat]

Gözlənilən Nəticə:
- [Nə olmalıdır?]

Faktiki Nəticə:
- [Nə oldu?]

Status: [Pass/Fail/Blocked]
Qeydlər: [Əlavə məlumat]
\`\`\`

### Test Keys Növləri

**1. Positive Test Keys**
Düzgün məlumatla test edir.

**Nümunə:** Email: "test@test.com" → Qəbul edilir ✓

**2. Negative Test Keys**
Yanlış məlumatla test edir.

**Nümunə:** Email: "test" → Xəta göstərilir ✓

**3. Boundary Test Keys**
Sərhəd dəyərlərini test edir.

**Nümunə:** 
- Şifrə: "1234" (4 simvol) → Xəta (minimum 5)
- Şifrə: "12345" (5 simvol) → Qəbul ✓
- Şifrə: "123456" (6 simvol) → Xəta (maksimum 5)

### Praktikada Necə İstifadə Edəcəksən?

**1. Test Planı Hazırla**
- Scope müəyyənləşdir
- Strategiya seç
- Cədvəl təyin et

**2. Test Keysləri Yaz**
- Hər funksiya üçün minimum 3 test keys:
  - 1 Positive
  - 1 Negative
  - 1 Boundary

**3. Test Keysləri İcra Et**
- Addımları izlə
- Nəticələri qeyd et
- Screenshot çək

**4. Baq Report Yaz**
- Fail olan test keysləri üçün
- Aydın təsvir ver
- Severity/Priority təyin et

**5. Regression Test Et**
- Düzəlişdən sonra
- Bütün test keysləri yenidən
- Yeni baq tapılmadığından əmin ol`
  }
];
