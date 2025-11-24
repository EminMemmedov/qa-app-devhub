export const theoryModules = [
  {
    id: 'fundamentals',
    title: 'Testləşdirmənin Əsasları',
    description: 'QA nədir? Niyə test etməliyik?',
    color: 'bg-blue-500',
    content: `### QA Nədir?
**Quality Assurance (QA)** - məhsulun keyfiyyətini təmin etmək üçün həyata keçirilən proseslər toplusudur.

### Testləşdirmənin 7 Prinsipi
1. **Testləşdirmə səhvlərin varlığını göstərir** - amma onların yoxluğunu sübut etmir.
2. **Tam testləmə mümkün deyil** - bütün kombinasiyaları yoxlamaq qeyri-mümkündür.
3. **Erkən testləmə** - nə qədər tez başlasa, o qədər ucuz başa gələr.
4. **Səhvlərin klasterləşməsi** - səhvlərin çoxu adətən bir neçə modulda toplanır.
5. **Pestisid paradoksu** - eyni testləri təkrar etsəniz, yeni səhvlər tapmayacaqsınız.
6. **Testləmə kontekstdən asılıdır** - bank proqramı ilə oyun fərqli test edilir.
7. **Səhvsizlik illüziyası** - proqram işləyir amma istifadəçi tələblərini ödəmir.`
  },
  {
    id: 'sdlc',
    title: 'SDLC və STLC',
    description: 'Proqram təminatının həyat dövrü',
    color: 'bg-purple-500',
    content: `### SDLC (Software Development Life Cycle)
Proqramın yaradılma mərhələləri:
1. **Planlaşdırma** - Tələblərin toplanması
2. **Analiz** - Texniki tapşırığın hazırlanması
3. **Dizayn** - Memarlığın qurulması
4. **İnkişaf (Development)** - Kodun yazılması
5. **Testləmə** - Səhvlərin tapılması
6. **Buraxılış (Deployment)** - İstifadəçiyə təhvil verilməsi
7. **Dəstək** - Yenilənmələr və düzəlişlər

### STLC (Software Testing Life Cycle)
Test prosesinin mərhələləri:
1. Tələblərin analizi
2. Test planının hazırlanması
3. Test keyslərin yazılması
4. Test mühitinin qurulması
5. Testlərin icrası
6. Testin bağlanması`
  },
  {
    id: 'bug_lifecycle',
    title: 'Baqın Həyat Dövrü',
    description: 'Baq tapılandan bağlanana qədər',
    color: 'bg-red-500',
    content: `### Baq Statusları
- **New** - Yeni tapılmış baq
- **Assigned** - Developerə təyin edilib
- **Open** - Developer üzərində işləyir
- **Fixed** - Developer düzəldib
- **Retest** - QA təkrar yoxlayır
- **Verified** - Düzəliş təsdiqlənib
- **Closed** - Baq bağlanıb
- **Reopened** - Düzəliş işləmir, yenidən açılıb`
  },
  {
    id: 'types',
    title: 'Test Növləri',
    description: 'Funksional və Qeyri-funksional',
    color: 'bg-green-500',
    content: `### Funksional Testlər
Proqramın **nə etdiyini** yoxlayır:
- Unit Testing
- Integration Testing
- System Testing
- Acceptance Testing

### Qeyri-funksional Testlər
Proqramın **necə işlədiyini** yoxlayır:
- Performance (Sürət)
- Security (Təhlükəsizlik)
- Usability (İstifadə rahatlığı)
- Compatibility (Uyğunluq)`
  },
  {
    id: 'api',
    title: 'API Testləşdirmə',
    description: 'Client və Server əlaqəsi',
    color: 'bg-orange-500',
    content: `### API Nədir?
**Application Programming Interface** - proqramlar arası əlaqə vasitəsidir.

### HTTP Metodları
- **GET** - Məlumatı almaq üçün
- **POST** - Yeni məlumat yaratmaq üçün
- **PUT** - Məlumatı tam yeniləmək üçün
- **PATCH** - Məlumatı qismən yeniləmək üçün
- **DELETE** - Məlumatı silmək üçün

### Status Kodlar
- **2xx** - Uğurlu (200 OK, 201 Created)
- **4xx** - Müştəri xətası (400 Bad Request, 404 Not Found)
- **5xx** - Server xətası (500 Internal Server Error)`
  },
  {
    id: 'agile',
    title: 'Agile və Scrum',
    description: 'Müasir idarəetmə metodologiyaları',
    color: 'bg-indigo-500',
    content: `### Agile Manifesti
- **Fərdlər və qarşılıqlı əlaqə** > Proseslər və alətlər
- **İşləyən proqram** > Geniş sənədləşdirmə
- **Müştəri ilə əməkdaşlıq** > Müqavilə danışıqları
- **Dəyişikliyə reaksiya** > Plana riayət etmək

### Scrum Rolları
- **Product Owner** - Məhsulun dəyərinə cavabdehdir
- **Scrum Master** - Komandanın proseslərə əməl etməsini təmin edir
- **Development Team** - Məhsulu yaradan komanda`
  }
];
