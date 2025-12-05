import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, LibraryBig, Filter, Sparkles, ChevronLeft, ChevronDown, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { glossaryTerms, categories } from '../data/glossary';
import { useDebounce } from '../hooks/useDebounce';
import { triggerHaptic, usePullToRefresh } from '../utils/mobileUtils';
import ScrollToTop from '../components/ScrollToTop';

export default function Glossary() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language || 'az';
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300); // Debounce search input
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedTerm, setExpandedTerm] = useState(null);

    const { refreshing, pullDistance } = usePullToRefresh(async () => {
        // Simulate refresh delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In a real app, you would refetch data here
        triggerHaptic('success');
    });

    // Term of the Day (Random based on date)
    const termOfDay = useMemo(() => {
        const today = new Date().getDate();
        return glossaryTerms[today % glossaryTerms.length];
    }, []);

    const filteredTerms = useMemo(() => {
        return glossaryTerms.filter(item => {
            const matchesSearch = item.term.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                item.definition[lang]?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                item.definition['en'].toLowerCase().includes(debouncedSearch.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [debouncedSearch, selectedCategory, lang]);

    const categoryColors = {
        basics: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        documentation: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        types: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        techniques: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
        process: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
        bug_management: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        automation: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
        performance: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
        security: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
        tools: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    };

    return (
        <PageTransition className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 pt-24 pb-24 transition-colors duration-300">
            <div className="max-w-4xl mx-auto relative">
                {/* Pull to Refresh Indicator */}
                <div
                    className="fixed top-20 left-0 right-0 flex justify-center pointer-events-none transition-transform duration-200 z-50"
                    style={{ transform: `translateY(${pullDistance > 0 ? pullDistance : -100}px)` }}
                >
                    {refreshing ? (
                        <div className="bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg animate-spin">
                            <Sparkles size={24} className="text-blue-600" />
                        </div>
                    ) : pullDistance > 0 && (
                        <div className="bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg transform rotate-180">
                            <ChevronDown size={24} className="text-blue-600" />
                        </div>
                    )}
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all text-slate-600 dark:text-slate-300">
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                            <LibraryBig className="text-blue-600 dark:text-blue-400" size={32} />
                            QA Lüğəti
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            Terminlər və onların izahı
                        </p>
                    </div>
                </div>

                {/* Term of the Day */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20 mb-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4 text-indigo-100 font-bold text-sm uppercase tracking-wider">
                            <Sparkles size={16} className="text-yellow-300" />
                            Günün Termini
                        </div>
                        <h2 className="text-3xl font-black mb-3">{termOfDay.term}</h2>
                        <p className="text-indigo-50 text-lg leading-relaxed mb-4">
                            {termOfDay.definition[lang] || termOfDay.definition['en']}
                        </p>
                        {termOfDay.example && (
                            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-200 mb-1">
                                    <Lightbulb size={12} /> Nümunə
                                </div>
                                <p className="text-sm font-medium">{termOfDay.example[lang] || termOfDay.example['en']}</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Search & Filter */}
                <div className="flex flex-col gap-4 mb-8 sticky top-20 z-30 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-xl py-4 -mx-4 px-4 md:mx-0 md:px-0 transition-colors duration-300">
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                        <input
                            type="text"
                            placeholder={t('common.search', 'Axtar...')}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                if (e.target.value.length === 0) triggerHaptic('light');
                            }}
                            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm focus:shadow-md outline-none focus:border-blue-500 dark:focus:border-blue-400 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
                        {Object.entries(categories).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedCategory(key);
                                    triggerHaptic('light');
                                }}
                                className={`px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${selectedCategory === key
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {label[lang] || label['en']}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Terms Grid */}
                <div className="grid gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredTerms.length > 0 ? (
                            filteredTerms.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onClick={() => {
                                        setExpandedTerm(expandedTerm === item.id ? null : item.id);
                                        triggerHaptic('light');
                                    }}
                                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer group"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {item.term}
                                            </h3>
                                            <span className={`inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${categoryColors[item.category] || 'bg-slate-100 text-slate-500'}`}>
                                                {categories[item.category]?.[lang] || item.category}
                                            </span>
                                        </div>
                                        {item.example && (
                                            <ChevronDown
                                                size={20}
                                                className={`text-slate-400 transition-transform duration-300 ${expandedTerm === item.id ? 'rotate-180' : ''}`}
                                            />
                                        )}
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {item.definition[lang] || item.definition['en']}
                                    </p>

                                    <AnimatePresence>
                                        {expandedTerm === item.id && item.example && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                                                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-blue-500 mb-1">
                                                        <Lightbulb size={12} /> Nümunə
                                                    </div>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                                        {item.example[lang] || item.example['en']}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 text-slate-400"
                            >
                                <Filter size={48} className="mx-auto mb-4 opacity-20" />
                                <p>Heç nə tapılmadı</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <ScrollToTop />
        </PageTransition>
    );
}
