export const glossaryTerms = [
    // --- Basics ---
    {
        id: 'bug',
        term: 'Bug (Defect)',
        category: 'basics',
        definition: {
            az: 'Proqram təminatında gözlənilən nəticə ilə faktiki nəticə arasındakı uyğunsuzluq.',
            ru: 'Несоответствие между ожидаемым и фактическим результатом в программном обеспечении.',
            en: 'A flaw in a component or system that can cause the component or system to fail to perform its required function.'
        },
        example: {
            az: 'Məsələn: "Səbətə əlavə et" düyməsi işləmir.',
            ru: 'Например: Кнопка "Добавить в корзину" не работает.',
            en: 'E.g., "Add to Cart" button is not working.'
        }
    },
    {
        id: 'quality_assurance',
        term: 'Quality Assurance (QA)',
        category: 'basics',
        definition: {
            az: 'Məhsulun keyfiyyət tələblərinə cavab verdiyinə əmin olmaq üçün həyata keçirilən proseslər toplusu. QA prosesə fokuslanır.',
            ru: 'Совокупность мероприятий, направленных на обеспечение того, что продукт соответствует требованиям качества. QA фокусируется на процессе.',
            en: 'Part of quality management focused on providing confidence that quality requirements will be fulfilled.'
        }
    },
    {
        id: 'quality_control',
        term: 'Quality Control (QC)',
        category: 'basics',
        definition: {
            az: 'Məhsulun keyfiyyətini yoxlamaq üçün həyata keçirilən fəaliyyətlər (məsələn, testlər). QC məhsula fokuslanır.',
            ru: 'Действия, предпринимаемые для проверки качества продукта (например, тестирование). QC фокусируется на продукте.',
            en: 'Part of quality management focused on fulfilling quality requirements.'
        }
    },
    {
        id: 'verification',
        term: 'Verification',
        category: 'basics',
        definition: {
            az: 'Biz məhsulu düzgün qururuqmu? Tələblərə uyğunluğun yoxlanılması (Review, Walkthrough).',
            ru: 'Мы делаем продукт правильно? Проверка соответствия требованиям (Review, Walkthrough).',
            en: 'Confirmation by examination and through provision of objective evidence that specified requirements have been fulfilled. (Are we building the product right?)'
        }
    },
    {
        id: 'validation',
        term: 'Validation',
        category: 'basics',
        definition: {
            az: 'Biz düzgün məhsulu qururuqmu? Məhsulun istifadəçi ehtiyaclarını ödədiyini yoxlamaq (Testing).',
            ru: 'Мы делаем правильный продукт? Проверка того, что продукт удовлетворяет нужды пользователя (Testing).',
            en: 'Confirmation by examination and through provision of objective evidence that the requirements for a specific intended use or application have been fulfilled. (Are we building the right product?)'
        }
    },

    // --- Documentation ---
    {
        id: 'test_plan',
        term: 'Test Plan',
        category: 'documentation',
        definition: {
            az: 'Testlərin əhatə dairəsi, yanaşması, resursları və cədvəlini təsvir edən sənəd.',
            ru: 'Документ, описывающий объем, подход, ресурсы и график тестирования.',
            en: 'A document describing the scope, approach, resources and schedule of intended test activities.'
        }
    },
    {
        id: 'test_case',
        term: 'Test Case',
        category: 'documentation',
        definition: {
            az: 'Müəyyən bir funksionallığı yoxlamaq üçün giriş məlumatları, icra şərtləri və gözlənilən nəticələr toplusu.',
            ru: 'Набор входных данных, условий выполнения и ожидаемых результатов, разработанный для проверки определенной функциональности.',
            en: 'A set of preconditions, inputs, actions (where applicable), expected results and postconditions, developed based on test conditions.'
        },
        example: {
            az: 'Addım 1: Login səhifəsini aç. Addım 2: Düzgün şifrə daxil et. Nəticə: Ana səhifə açılır.',
            ru: 'Шаг 1: Открыть Login. Шаг 2: Ввести верный пароль. Результат: Открывается главная.',
            en: 'Step 1: Open Login. Step 2: Enter valid password. Result: Home page opens.'
        }
    },
    {
        id: 'test_scenario',
        term: 'Test Scenario',
        category: 'documentation',
        definition: {
            az: 'Nəyin test ediləcəyini təsvir edən qısa başlıq (High Level).',
            ru: 'Краткое описание того, что нужно протестировать (High Level).',
            en: 'A document specifying a sequence of actions for the execution of a test. Also known as test procedure specification.'
        }
    },
    {
        id: 'rtm',
        term: 'Traceability Matrix (RTM)',
        category: 'documentation',
        definition: {
            az: 'Tələblər və test caselər arasındakı əlaqəni göstərən cədvəl.',
            ru: 'Таблица, связывающая требования с тест-кейсами.',
            en: 'A two-dimensional table which correlates two entities (e.g., requirements and test cases).'
        }
    },

    // --- Types ---
    {
        id: 'smoke_test',
        term: 'Smoke Testing',
        category: 'types',
        definition: {
            az: 'Əsas funksionallıqların işlədiyini yoxlamaq üçün edilən ilkin yoxlama testi.',
            ru: 'Поверхностное тестирование для проверки работоспособности основных функций перед глубоким тестированием.',
            en: 'A subset of all defined/planned test cases that cover the main functionality of a component or system.'
        },
        example: {
            az: 'Proqram açılır? Login olur?',
            ru: 'Программа запускается? Логин работает?',
            en: 'Does the app launch? Can I login?'
        }
    },
    {
        id: 'sanity_test',
        term: 'Sanity Testing',
        category: 'types',
        definition: {
            az: 'Yeni funksionallıq və ya bug fix-dən sonra, həmin hissənin işlədiyini dəqiqləşdirmək üçün edilən test.',
            ru: 'Тестирование конкретной функции после изменений или исправлений, чтобы убедиться, что она работает.',
            en: 'A simplified form of regression testing used to verify that a particular function works as planned.'
        }
    },
    {
        id: 'regression',
        term: 'Regression Testing',
        category: 'types',
        definition: {
            az: 'Dəyişikliklərdən sonra mövcud funksionallığın pozulmadığını yoxlamaq üçün aparılan test.',
            ru: 'Тестирование, проводимое для проверки того, что изменения в коде не нарушили существующую функциональность.',
            en: 'Testing of a previously tested program following modification to ensure that defects have not been introduced or uncovered in unchanged areas of the software.'
        }
    },
    {
        id: 'black_box',
        term: 'Black Box Testing',
        category: 'types',
        definition: {
            az: 'Sistemin daxili strukturunu bilmədən aparılan test.',
            ru: 'Тестирование без знания внутренней структуры системы (кода).',
            en: 'Testing, either functional or non-functional, without reference to the internal structure of the component or system.'
        }
    },
    {
        id: 'white_box',
        term: 'White Box Testing',
        category: 'types',
        definition: {
            az: 'Sistemin daxili strukturuna (koduna) əsaslanan test.',
            ru: 'Тестирование, основанное на анализе внутренней структуры (кода).',
            en: 'Testing based on an analysis of the internal structure of the component or system.'
        }
    },
    {
        id: 'grey_box',
        term: 'Grey Box Testing',
        category: 'types',
        definition: {
            az: 'Həm Black Box, həm də White Box metodlarının kombinasiyası.',
            ru: 'Комбинация методов Black Box и White Box.',
            en: 'Testing that uses a combination of black-box and white-box testing techniques.'
        }
    },
    {
        id: 'api_testing',
        term: 'API Testing',
        category: 'types',
        definition: {
            az: 'Tətbiqetmənin proqramlaşdırma interfeyslərinin (API) funksionallığını, etibarlılığını, performansını və təhlükəsizliyini yoxlayan test növü.',
            ru: 'Тип тестирования, проверяющий функциональность, надежность, производительность и безопасность программных интерфейсов приложения (API).',
            en: 'A type of software testing that involves testing application programming interfaces (APIs) directly and as part of integration testing.'
        }
    },

    // --- Techniques ---
    {
        id: 'equivalence_partitioning',
        term: 'Equivalence Partitioning',
        category: 'techniques',
        definition: {
            az: 'Giriş məlumatlarını ekvivalent siniflərə bölərək hər sinifdən bir nümayəndə seçib test etmək.',
            ru: 'Разделение входных данных на классы эквивалентности и тестирование одного представителя от каждого класса.',
            en: 'A black-box test design technique in which test cases are designed to execute representatives from equivalence partitions.'
        },
        example: {
            az: 'Yaş: 18-60. Siniflər: <18 (Səhv), 18-60 (Düz), >60 (Səhv).',
            ru: 'Возраст: 18-60. Классы: <18 (Invalid), 18-60 (Valid), >60 (Invalid).',
            en: 'Age: 18-60. Classes: <18 (Invalid), 18-60 (Valid), >60 (Invalid).'
        }
    },
    {
        id: 'boundary_value',
        term: 'Boundary Value Analysis',
        category: 'techniques',
        definition: {
            az: 'Giriş dəyərlərinin sərhədlərini (minimum və maksimum) yoxlayan test dizayn texnikası.',
            ru: 'Техника тест-дизайна, проверяющая граничные значения (минимум и максимум) входных данных.',
            en: 'A black-box test design technique in which test cases are designed based on boundary values.'
        },
        example: {
            az: 'Yaş 18-60: Yoxla -> 17, 18, 19 ... 59, 60, 61.',
            ru: 'Возраст 18-60: Проверить -> 17, 18, 19 ... 59, 60, 61.',
            en: 'Age 18-60: Check -> 17, 18, 19 ... 59, 60, 61.'
        }
    },
    {
        id: 'decision_table',
        term: 'Decision Table Testing',
        category: 'techniques',
        definition: {
            az: 'Mürəkkəb biznes məntiqini və müxtəlif şərt kombinasiyalarını yoxlamaq üçün istifadə olunan cədvəl.',
            ru: 'Таблица для проверки сложной бизнес-логики и комбинаций различных условий.',
            en: 'A black-box test design technique in which test cases are designed to execute the combinations of inputs and/or stimuli (causes) shown in a decision table.'
        }
    },
    {
        id: 'state_transition',
        term: 'State Transition Testing',
        category: 'techniques',
        definition: {
            az: 'Sistemin bir vəziyyətdən digərinə keçidini yoxlayan texnika.',
            ru: 'Техника, проверяющая переходы системы из одного состояния в другое.',
            en: 'A black-box test design technique in which test cases are designed to execute valid and invalid state transitions.'
        }
    },

    // --- Process (SDLC) ---
    {
        id: 'sdlc',
        term: 'SDLC (Software Development Life Cycle)',
        category: 'process',
        definition: {
            az: 'Proqram təminatının yaradılması, test edilməsi və saxlanılması prosesini əhatə edən mərhələlər.',
            ru: 'Жизненный цикл разработки ПО, включающий планирование, создание, тестирование и развертывание.',
            en: 'The period of time that begins when a software product is conceived and ends when the software is no longer available for use.'
        }
    },
    {
        id: 'stlc',
        term: 'STLC (Software Testing Life Cycle)',
        category: 'process',
        definition: {
            az: 'Test prosesinin mərhələləri: Planlaşdırma, Analiz, Dizayn, İcra, Bağlanış.',
            ru: 'Жизненный цикл тестирования: Планирование, Анализ, Дизайн, Выполнение, Закрытие.',
            en: 'The testing process which is executed in a systematic and planned manner.'
        }
    },
    {
        id: 'waterfall',
        term: 'Waterfall Model',
        category: 'process',
        definition: {
            az: 'Ardıcıl (xətti) inkişaf modeli. Bir mərhələ bitmədən digəri başlamır.',
            ru: 'Каскадная модель. Последовательный метод разработки, где каждая фаза должна быть завершена до начала следующей.',
            en: 'A sequential development approach where development is seen as flowing steadily downwards (like a waterfall).'
        }
    },
    {
        id: 'agile',
        term: 'Agile Methodology',
        category: 'process',
        definition: {
            az: 'Çevik inkişaf metodologiyası. İterativ yanaşma və dəyişikliklərə açıq olma.',
            ru: 'Гибкая методология разработки. Итеративный подход, готовность к изменениям.',
            en: 'A group of software development methodologies based on iterative development, where requirements and solutions evolve through collaboration.'
        }
    },
    {
        id: 'scrum',
        term: 'Scrum',
        category: 'process',
        definition: {
            az: 'Agile çərçivəsində ən populyar metod. Sprintlər, Daily Standup və Retrospektivlər daxildir.',
            ru: 'Популярный фреймворк Agile. Включает Спринты, Ежедневные встречи и Ретроспективы.',
            en: 'An iterative and incremental agile software development framework for managing product development.'
        }
    },
    {
        id: 'kanban',
        term: 'Kanban',
        category: 'process',
        definition: {
            az: 'İş axınını vizuallaşdırmaq (lövhə) və WIP (Work In Progress) limitləmək üçün metod.',
            ru: 'Метод управления разработкой, основанный на визуализации задач (доска) и ограничении незавершенной работы (WIP).',
            en: 'A method for managing the creation of products with an emphasis on continual delivery while not overburdening the development team.'
        }
    },

    // --- Bug Management ---
    {
        id: 'severity',
        term: 'Severity',
        category: 'bug_management',
        definition: {
            az: 'Xətanın sistemə təsir dərəcəsi (məsələn: Critical, Major, Minor).',
            ru: 'Степень влияния дефекта на работу системы (например: Критический, Значительный).',
            en: 'The degree of impact that a defect has on the development or operation of a component or system.'
        },
        example: {
            az: 'Critical: Sistem çökür. Minor: Hərf səhvi.',
            ru: 'Critical: Система падает. Minor: Опечатка.',
            en: 'Critical: System crash. Minor: Typo.'
        }
    },
    {
        id: 'priority',
        term: 'Priority',
        category: 'bug_management',
        definition: {
            az: 'Xətanın nə qədər tez düzəldilməli olduğunu göstərən göstərici.',
            ru: 'Показатель того, как быстро дефект должен быть исправлен.',
            en: 'The level of (business) importance assigned to an item, e.g., defect.'
        }
    },
    {
        id: 'bug_life_cycle',
        term: 'Bug Life Cycle',
        category: 'bug_management',
        definition: {
            az: 'Baqın tapılmasından bağlanmasına qədər keçdiyi mərhələlər (New -> Assigned -> Fixed -> Verified -> Closed).',
            ru: 'Этапы, которые проходит баг от обнаружения до закрытия.',
            en: 'The different stages of a defect during its life cycle (e.g., New, Open, Fixed, Verified, Closed).'
        }
    },

    // --- Automation ---
    {
        id: 'test_automation',
        term: 'Test Automation',
        category: 'automation',
        definition: {
            az: 'Testlərin avtomatik icrası üçün proqram vasitələrindən istifadə.',
            ru: 'Использование программных средств для автоматического выполнения тестов.',
            en: 'The use of software to control the execution of tests, the comparison of actual outcomes to predicted outcomes.'
        },
        example: {
            az: 'Selenium, Cypress, Playwright ilə testlərin avtomatlaşdırılması.',
            ru: 'Автоматизация тестов с помощью Selenium, Cypress, Playwright.',
            en: 'Automating tests with Selenium, Cypress, Playwright.'
        }
    },
    {
        id: 'selenium',
        term: 'Selenium',
        category: 'automation',
        definition: {
            az: 'Veb tətbiqetmələrini test etmək üçün açıq mənbəli avtomatlaşdırma aləti.',
            ru: 'Опен-сорс инструмент для автоматизации веб-приложений.',
            en: 'An open-source tool for automating web browsers.'
        }
    },
    {
        id: 'appium',
        term: 'Appium',
        category: 'automation',
        definition: {
            az: 'Mobil tətbiqetmələri (iOS, Android) test etmək üçün avtomatlaşdırma aləti.',
            ru: 'Инструмент для автоматизации мобильных приложений (iOS, Android).',
            en: 'An open-source tool for automating mobile applications (iOS, Android).'
        }
    },
    {
        id: 'ci_cd',
        term: 'CI/CD',
        category: 'automation',
        definition: {
            az: 'Continuous Integration / Continuous Deployment. Kodun avtomatik inteqrasiya və deploy edilməsi.',
            ru: 'Непрерывная интеграция / Непрерывная доставка. Автоматическая интеграция и развертывание кода.',
            en: 'Continuous Integration / Continuous Deployment. Automated code integration and deployment.'
        }
    },

    // --- Performance ---
    {
        id: 'performance_testing',
        term: 'Performance Testing',
        category: 'performance',
        definition: {
            az: 'Sistemin sürət, stabil lik və resurs istifadəsini yöxləyən test növü.',
            ru: 'Тип тестирования, проверяющий скорость, стабильность и использование ресурсов.',
            en: 'Testing to determine the speed, responsiveness and stability of a system under a particular workload.'
        }
    },
    {
        id: 'load_testing',
        term: 'Load Testing',
        category: 'performance',
        definition: {
            az: 'Sistemin müəyyən yük altında necxə işlədiyini yöxləmək.',
            ru: 'Проверка работы системы под определенной нагрузкой.',
            en: 'Testing to determine system behavior under both normal and anticipated peak load conditions.'
        },
        example: {
            az: '1000 istifadəçi eyni anda login olur.',
            ru: '1000 пользователей одновременно входят в систему.',
            en: '1000 users logging in simultaneously.'
        }
    },
    {
        id: 'stress_testing',
        term: 'Stress Testing',
        category: 'performance',
        definition: {
            az: 'Sistemin həddindən artıq yük altında necxə davrandığını yöxləmək.',
            ru: 'Проверка поведения системы при превышении нормальной нагрузки.',
            en: 'Testing to determine system behavior beyond normal or peak load conditions.'
        }
    },

    // --- Security ---
    {
        id: 'security_testing',
        term: 'Security Testing',
        category: 'security',
        definition: {
            az: 'Sistemin təhlükəsizlik zəiflərini və risk lərini müəyyənləşdirmək üçün test.',
            ru: 'Тестирование для выявления уязвимостей и рисков безопасности.',
            en: 'Testing to determine the security of the software product.'
        }
    },
    {
        id: 'penetration_testing',
        term: 'Penetration Testing',
        category: 'security',
        definition: {
            az: 'Sistemin təhlükəsizliyini yöxləmək üçün hücum simulyasiyası.',
            ru: 'Симуляция атаки для проверки безопасности системы.',
            en: 'A simulated cyber attack against your system to check for exploitable vulnerabilities.'
        }
    },
    {
        id: 'sql_injection',
        term: 'SQL Injection',
        category: 'security',
        definition: {
            az: 'Zərərli SQL kodunun daxil edilməsi ilə verilənlər bazəsına qeyri-qanuni giriş.',
            ru: 'Внедрение вредоносного SQL-кода для несанкционированного доступа к БД.',
            en: 'A code injection technique used to attack data-driven applications.'
        },
        example: {
            az: "Username: admin' OR '1'='1",
            ru: "Username: admin' OR '1'='1",
            en: "Username: admin' OR '1'='1"
        }
    },
    {
        id: 'xss',
        term: 'XSS (Cross-Site Scripting)',
        category: 'security',
        definition: {
            az: 'Zərərli skriptlərin veb səhifəyə daxil edilməsi.',
            ru: 'Внедрение вредоносных скриптов на веб-страницу.',
            en: 'A security vulnerability that allows attackers to inject malicious scripts into web pages.'
        }
    },

    // --- Tools ---
    {
        id: 'jira',
        term: 'Jira',
        category: 'tools',
        definition: {
            az: 'Layihə idarəetməsi və baq izləmə aləti.',
            ru: 'Инструмент для управления проектами и отслеживания багов.',
            en: 'A project management and bug tracking tool.'
        }
    },
    {
        id: 'postman',
        term: 'Postman',
        category: 'tools',
        definition: {
            az: 'API testləşdirmə və saz lama aləti.',
            ru: 'Инструмент для тестирования и настройки API.',
            en: 'An API testing and development tool.'
        }
    },
    {
        id: 'git',
        term: 'Git',
        category: 'tools',
        definition: {
            az: 'Versiya idarəetmə sistemi. Kod dəyişikliklərini izləmək üçün.',
            ru: 'Система контроля версий. Для отслеживания изменений в коде.',
            en: 'A distributed version control system for tracking changes in source code.'
        }
    },

    // --- Mobile Testing ---
    {
        id: 'mobile_testing',
        term: 'Mobile Testing',
        category: 'types',
        definition: {
            az: 'Mobil tətbiqetmələrin (iOS, Android) test edilməsi.',
            ru: 'Тестирование мобильных приложений (iOS, Android).',
            en: 'Testing of mobile applications on iOS and Android platforms.'
        }
    },
    {
        id: 'usability_testing',
        term: 'Usability Testing',
        category: 'types',
        definition: {
            az: 'Tətbiqetmənin istifadə rahatlxğını və istifadəçi təcrübəsini yöxləmək.',
            ru: 'Проверка удобства использования и пользовательского опыта.',
            en: 'Testing to evaluate how easy and user-friendly the application is.'
        }
    },
    {
        id: 'acceptance_testing',
        term: 'Acceptance Testing (UAT)',
        category: 'types',
        definition: {
            az: 'İstifadəçi tərəfindən məhsulun qəbul edilməsi üçün son test.',
            ru: 'Итоговое тестирование пользователем для приемки продукта.',
            en: 'Formal testing conducted to determine whether a system satisfies its acceptance criteria.'
        }
    }
];

export const categories = {
    all: { az: 'Hamısı', ru: 'Все', en: 'All' },
    basics: { az: 'Əsaslar', ru: 'Основы', en: 'Basics' },
    documentation: { az: 'Sənədləşmə', ru: 'Документация', en: 'Documentation' },
    types: { az: 'Test Növləri', ru: 'Виды тестов', en: 'Test Types' },
    techniques: { az: 'Texnikalar', ru: 'Техники', en: 'Techniques' },
    process: { az: 'Proses', ru: 'Процесс', en: 'Process' },
    bug_management: { az: 'Baq İdarəetmə', ru: 'Управление багами', en: 'Bug Mgmt' },
    automation: { az: 'Avtomatlaşdırma', ru: 'Автоматизация', en: 'Automation' },
    performance: { az: 'Performans', ru: 'Производительность', en: 'Performance' },
    security: { az: 'Təhlükəsizlik', ru: 'Безопасность', en: 'Security' },
    tools: { az: 'Alətlər', ru: 'Инструменты', en: 'Tools' }
};