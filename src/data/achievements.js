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
    }
];
