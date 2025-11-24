import { useState } from 'react';
import { theoryModules } from '../data/theory';
import { BookOpen, ChevronRight, ArrowLeft, Sparkles, Target, Bug, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

// Icon mapping for each theory module
const moduleIcons = {
    'qa-basics': Bug,
    'test-types': FileCheck,
    'bug-reporting': Target,
    'test-planning': Sparkles
};

// Image mapping for each theory module
const moduleImages = {
    'qa-basics': '/theory-qa-basics.png',
    'test-types': '/theory-test-types.png',
    'bug-reporting': '/theory-bug-reporting.png',
    'test-planning': '/theory-test-planning.png'
};

// Simple Markdown renderer
const SimpleMarkdown = ({ content }) => {
    return (
        <div className="prose prose-slate prose-sm max-w-none">
            {content.split('\n').map((line, i) => {
                if (line.trim().startsWith('###')) {
                    return (
                        <h3 key={i} className="text-xl font-bold mt-8 mb-4 text-slate-800 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
                            {line.replace('###', '').trim()}
                        </h3>
                    );
                }
                if (line.trim().startsWith('**')) {
                    return (
                        <div key={i} className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-xl my-4">
                            <strong className="text-indigo-700 font-bold">
                                {line.replace(/\*\*/g, '')}
                            </strong>
                        </div>
                    );
                }
                if (line.trim().startsWith('-')) {
                    return (
                        <li key={i} className="ml-6 list-none pl-2 mb-3 relative before:content-['✓'] before:absolute before:-left-6 before:text-green-500 before:font-bold">
                            <span className="text-slate-700">{line.replace('-', '').trim()}</span>
                        </li>
                    );
                }
                if (line.trim()) {
                    return <p key={i} className="mb-4 text-slate-600 leading-relaxed text-base">{line}</p>;
                }
                return null;
            })}
        </div>
    );
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Theory() {
    const [selectedModule, setSelectedModule] = useState(null);

    return (
        <PageTransition className="p-6 pt-12 pb-24 min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <header className="mb-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-4"
                >
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                        <BookOpen size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Nəzəriyyə</h1>
                        <p className="text-slate-500 font-medium">Test mühəndisinin bilik bazası</p>
                    </div>
                </motion.div>
            </header>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
            >
                {theoryModules.map((module) => {
                    const Icon = moduleIcons[module.id] || BookOpen;
                    return (
                        <motion.div
                            key={module.id}
                            variants={item}
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedModule(module)}
                            className="group bg-white rounded-3xl p-6 shadow-md border-2 border-slate-100 flex items-center gap-5 cursor-pointer hover:shadow-2xl hover:shadow-indigo-100/50 hover:border-indigo-200 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-indigo-50/50 to-purple-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className={`relative w-16 h-16 rounded-2xl ${module.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                <Icon size={28} strokeWidth={2.5} />
                            </div>

                            <div className="flex-1 relative z-10">
                                <h3 className="font-bold text-xl text-slate-800 group-hover:text-indigo-600 transition-colors mb-1">
                                    {module.title}
                                </h3>
                                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                                    {module.description}
                                </p>
                            </div>

                            <div className="relative w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 transition-all duration-300 group-hover:scale-110">
                                <ChevronRight className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" size={20} />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <AnimatePresence>
                {selectedModule && (
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-gradient-to-b from-white to-slate-50 flex flex-col"
                    >
                        {/* Header with back button */}
                        <div className="p-6 border-b border-slate-200 flex items-center gap-4 bg-white/90 backdrop-blur-md sticky top-0 shadow-sm">
                            <button
                                onClick={() => setSelectedModule(null)}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors group"
                            >
                                <ArrowLeft size={18} className="text-slate-600 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium text-slate-700">Geri</span>
                            </button>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-slate-900">{selectedModule.title}</h2>
                                <p className="text-sm text-slate-500 mt-0.5">{selectedModule.description}</p>
                            </div>
                        </div>

                        {/* Content area with improved styling */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="max-w-3xl mx-auto p-6 pb-24">
                                {/* Decorative header */}
                                <div className="mb-8 p-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                                    <div className="relative z-10">
                                        {/* Module illustration */}
                                        {moduleImages[selectedModule.id] && (
                                            <div className="mb-6 flex justify-center">
                                                <img
                                                    src={moduleImages[selectedModule.id]}
                                                    alt={selectedModule.title}
                                                    className="w-48 h-48 object-contain rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                                                />
                                            </div>
                                        )}
                                        <div className={`inline-flex items-center justify-center w-16 h-16 ${selectedModule.color} bg-white/20 backdrop-blur-sm rounded-2xl mb-4`}>
                                            {(() => {
                                                const Icon = moduleIcons[selectedModule.id] || BookOpen;
                                                return <Icon size={32} className="text-white" />;
                                            })()}
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-2">{selectedModule.title}</h3>
                                        <p className="text-indigo-100 text-sm leading-relaxed">{selectedModule.description}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                                    <SimpleMarkdown content={selectedModule.content} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageTransition>
    );
}
