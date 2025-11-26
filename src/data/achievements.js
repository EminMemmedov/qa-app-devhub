export const achievements = [
    {
        id: 'first_bug',
        title: 'İlk Baq',
        description: 'İlk baqı tapın',
        icon: '🎯',
        requirement: { type: 'bugs_found', count: 1 },
        reward: 10
    },
    {
        id: 'bug_hunter',
        title: 'Baq Ovçusu',
        description: '10 baq tapın',
        icon: '🏹',
        requirement: { type: 'bugs_found', count: 10 },
        reward: 50
    },
    {
        id: 'qa_master',
        title: 'QA Master',
        description: 'Bir modulda bütün baqları tapın',
        icon: '👑',
        requirement: { type: 'module_complete', module: 'any' },
        reward: 100
    },
    {
        id: 'perfectionist',
        title: 'Perfeksionist',
        description: 'Bütün 84 baqı tapın',
        icon: '💎',
        requirement: { type: 'bugs_found', count: 84 },
        reward: 500
    },
    {
        id: 'detective',
        title: 'Detektiv',
        description: 'Bütün DevTools baqlarını tapın',
        icon: '🔍',
        requirement: { type: 'devtools_bugs', count: 'all' },
        reward: 150
    },
    {
        id: 'economical',
        title: 'Qənaətcil',
        description: 'İpucu istifadə etmədən 10 baq tapın',
        icon: '💰',
        requirement: { type: 'bugs_without_hints', count: 10 },
        reward: 100
    },
    {
        id: 'speed_demon',
        title: 'Sürət Şeytanı',
        description: '5 dəqiqədə 5 baq tapın',
        icon: '⚡',
        requirement: { type: 'speed', count: 5, time: 300 },
        reward: 75
    },
    {
        id: 'hard_hunter',
        title: 'Çətin Baq Ovçusu',
        description: '5 Hard səviyyəli baq tapın',
        icon: '🔥',
        requirement: { type: 'difficulty', difficulty: 'hard', count: 5 },
        reward: 120
    },
    {
        id: 'database_beginner',
        title: 'SQL Başlanğıcı',
        description: 'Database modulunda ilk səviyyəni tamamlayın',
        icon: '🗄️',
        requirement: { type: 'practice_level', module: 'database', level: 1 },
        reward: 50
    },
    {
        id: 'database_master',
        title: 'SQL Ustası',
        description: 'Database modulunda bütün 5 səviyyəni tamamlayın',
        icon: '💾',
        requirement: { type: 'practice_complete', module: 'database' },
        reward: 200
    },
    {
        id: 'automation_beginner',
        title: 'Avtomatlaşdırma Başlanğıcı',
        description: 'Automation modulunda ilk səviyyəni tamamlayın',
        icon: '🤖',
        requirement: { type: 'practice_level', module: 'automation', level: 1 },
        reward: 50
    },
    {
        id: 'automation_master',
        title: 'Test Avtomatlaşdırma Ustası',
        description: 'Automation modulunda bütün 5 səviyyəni tamamlayın',
        icon: '⚙️',
        requirement: { type: 'practice_complete', module: 'automation' },
        reward: 200
    },
    {
        id: 'interview_ready',
        title: 'Müsahibəyə Hazır',
        description: 'Interview simulyatorunu tamamlayın',
        icon: '🎤',
        requirement: { type: 'interview_complete' },
        reward: 150
    },
    {
        id: 'exam_passed',
        title: 'İmtahan Keçdi',
        description: 'İmtahandan 80%+ bal toplayın',
        icon: '📜',
        requirement: { type: 'exam_score', score: 80 },
        reward: 250
    },
    {
        id: 'xp_collector',
        title: 'XP Toplayıcı',
        description: '1000 XP toplayın',
        icon: '⭐',
        requirement: { type: 'xp_earned', amount: 1000 },
        reward: 100
    },
    {
        id: 'xp_master',
        title: 'XP Ustası',
        description: '5000 XP toplayın',
        icon: '🌟',
        requirement: { type: 'xp_earned', amount: 5000 },
        reward: 500
    },
    {
        id: 'practice_champion',
        title: 'Praktika Çempionu',
        description: 'Database və Automation modullarını tamamlayın',
        icon: '🏆',
        requirement: { type: 'both_practice_complete' },
        reward: 300
    },
    {
        id: 'all_rounder',
        title: 'Hamısında Peşəkar',
        description: 'Interview, Exam və Practice modullarını tamamlayın',
        icon: '👨‍🎓',
        requirement: { type: 'all_modules_complete' },
        reward: 1000
    }
];
