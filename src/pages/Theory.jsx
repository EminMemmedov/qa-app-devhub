import { useState } from 'react';
import { theoryModules } from '../data/theory';
import { BookOpen, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

// Simple Markdown renderer replacement since we didn't install react-markdown
const SimpleMarkdown = ({ content }) => {
    return (
        <div className="prose prose-slate prose-sm max-w-none">
            {content.split('\n').map((line, i) => {
                if (line.trim().startsWith('###')) return <h3 key={i} className="text-lg font-bold mt-6 mb-3 text-slate-800">{line.replace('###', '').trim()}</h3>;
                if (line.trim().startsWith('**')) return <strong key={i} className="text-indigo-600">{line.replace(/\*\*/g, '')}</strong>;
                if (line.trim().startsWith('-')) return <li key={i} className="ml-4 list-disc marker:text-indigo-400 pl-1 mb-1">{line.replace('-', '').trim()}</li>;
                return <p key={i} className="mb-3 text-slate-600 leading-relaxed">{line}</p>;
            })}
        </div>
    );
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
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
        <PageTransition className="p-6 pt-12 pb-24 min-h-screen">
            <header className="mb-8">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Nəzəriyyə</h1>
                <p className="text-slate-500 font-medium">Test mühəndisinin bilik bazası</p>
            </header>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
            >
                {theoryModules.map((module) => (
                    <motion.div
                        key={module.id}
                        variants={item}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedModule(module)}
                        className="group bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center gap-5 cursor-pointer hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-100 transition-all duration-300"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${module.color} flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300`}>
                            <BookOpen size={26} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors">{module.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-1 mt-1">{module.description}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                            <ChevronRight className="text-slate-400 group-hover:text-indigo-500" size={18} />
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {selectedModule && (
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-white flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0">
                            <h2 className="text-xl font-bold text-slate-900 truncate pr-4">{selectedModule.title}</h2>
                            <button
                                onClick={() => setSelectedModule(null)}
                                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                            >
                                <X size={20} className="text-slate-600" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 pb-24">
                            <SimpleMarkdown content={selectedModule.content} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageTransition>
    );
}
