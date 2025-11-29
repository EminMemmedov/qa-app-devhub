import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, X, UserCheck, MessageSquareWarning } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BugReportModal({ isOpen, onClose, onSubmit, bug }) {
    const { t } = useTranslation();
    
    // Form state
    const [reportData, setReportData] = useState({
        summary: '',
        steps: '',
        actualResult: '',
        expectedResult: '',
        severity: '',
        priority: ''
    });

    // Feedback state
    const [isChecking, setIsChecking] = useState(false);
    const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', issues: [] }

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setReportData({
                summary: '',
                steps: '',
                actualResult: '',
                expectedResult: '',
                severity: '',
                priority: ''
            });
            setFeedback(null);
            setIsChecking(false);
        }
    }, [isOpen, bug]);

    if (!isOpen || !bug) return null;

    const validateReport = () => {
        const issues = [];
        
        // 1. Summary check (Smart: Word count)
        const summaryWords = reportData.summary.trim().split(/\s+/).length;
        if (summaryWords < 3) {
            issues.push(t('bugReport.feedback.shortSummary'));
        }

        // 2. Steps check (Smart: Formatting & Count)
        const stepsLines = reportData.steps.split('\n').filter(line => line.trim().length > 0);
        const hasNumbering = /\d+\.|-/.test(reportData.steps); // Checks for "1." or "-"
        
        if (stepsLines.length < 2) {
            issues.push(t('bugReport.feedback.shortSteps')); // Need at least 2 steps
        } else if (!hasNumbering) {
            issues.push(t('bugReport.feedback.stepsFormat')); // Recommend list format
        }

        // 3. Results check
        if (!reportData.actualResult.trim()) {
            issues.push(t('bugReport.feedback.noActual'));
        }
        if (!reportData.expectedResult.trim()) {
            issues.push(t('bugReport.feedback.noExpected'));
        }
        
        // 4. Logical check (Comparison)
        if (reportData.actualResult && reportData.expectedResult && 
            reportData.actualResult.toLowerCase() === reportData.expectedResult.toLowerCase()) {
            issues.push(t('bugReport.feedback.sameResults'));
        }

        // 5. Severity Check (Smart: Keyword matching)
        if (reportData.severity === 'Critical') {
            // English, Azerbaijani, Russian keywords for critical issues
            const criticalKeywords = [
                // EN
                'crash', 'block', 'freeze', '500', '404', 'broken', 'data loss', 'security',
                // AZ
                'çökür', 'işləmir', 'donur', 'blok', 'itki', 'təhlükəsizlik', 'xəta',
                // RU
                'краш', 'упал', 'завис', 'блок', 'потеря', 'безопасность'
            ];
            const textToCheck = (reportData.summary + ' ' + reportData.actualResult).toLowerCase();
            const hasCriticalKeyword = criticalKeywords.some(k => textToCheck.includes(k));
            
            if (!hasCriticalKeyword) {
                issues.push(t('bugReport.feedback.severityMismatch'));
            }
        }

        return issues;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsChecking(true);
        setFeedback(null);

        // Simulate Team Lead thinking
        await new Promise(resolve => setTimeout(resolve, 1500));

        const issues = validateReport();

        if (issues.length > 0) {
            setFeedback({ type: 'error', issues });
            setIsChecking(false);
        } else {
            setFeedback({ type: 'success' });
            // Wait a bit before closing
            setTimeout(() => {
                onSubmit({ 
                    severity: reportData.severity, 
                    priority: reportData.priority 
                });
                setReportData({
                    summary: '',
                    steps: '',
                    actualResult: '',
                    expectedResult: '',
                    severity: '',
                    priority: ''
                });
                setFeedback(null);
                setIsChecking(false);
            }, 1500);
        }
    };

    const handleChange = (field, value) => {
        setReportData(prev => ({ ...prev, [field]: value }));
        // Clear feedback when user starts typing again
        if (feedback) setFeedback(null);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-6 overflow-hidden touch-none"
                onClick={onClose}
                style={{ overscrollBehavior: 'contain' }}
            >
                <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    drag={false}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    className="bg-white rounded-t-3xl md:rounded-2xl w-full max-w-2xl md:h-auto md:max-h-[85vh] flex flex-col overflow-hidden transform-gpu"
                    style={{ 
                        height: 'calc(100dvh - 140px)',
                        maxHeight: 'calc(100dvh - 140px)',
                        marginTop: 'auto',
                        touchAction: 'none',
                        willChange: 'transform',
                        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-slate-900 text-white p-4 md:p-6 flex justify-between items-start shrink-0 rounded-t-3xl md:rounded-t-2xl">
                        <div className="flex-1 pr-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <AlertTriangle className="text-yellow-400" />
                                {t('bugReport.title')}
                            </h2>
                            <p className="text-slate-400 text-sm mt-1">{t('bugReport.subtitle')}</p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg shrink-0"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div 
                        className="p-4 md:p-8 overflow-y-auto overflow-x-hidden flex-1 overscroll-y-contain transform-gpu"
                        style={{ 
                            WebkitOverflowScrolling: 'touch',
                            touchAction: 'pan-y',
                            willChange: 'scroll-position',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            overscrollBehaviorY: 'contain'
                        }}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        {/* Bug Description */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                            <h3 className="text-xs font-bold text-slate-500 uppercase mb-1">{t('bugReport.description')}</h3>
                            <p className="text-slate-800 font-medium text-lg">{bug.description}</p>
                        </div>

                        <form id="bug-report-form" onSubmit={handleSubmit} className="space-y-6">
                            {/* Summary */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    {t('bugReport.fields.summary')} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={reportData.summary}
                                    onChange={(e) => handleChange('summary', e.target.value)}
                                    placeholder={t('bugReport.placeholders.summary')}
                                    className="w-full p-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none font-medium"
                                />
                            </div>

                            {/* Steps */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    {t('bugReport.fields.steps')} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={reportData.steps}
                                    onChange={(e) => handleChange('steps', e.target.value)}
                                    placeholder={t('bugReport.placeholders.steps')}
                                    rows={4}
                                    className="w-full p-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none font-medium resize-none"
                                />
                            </div>

                            {/* Results Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        {t('bugReport.fields.actual')} <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={reportData.actualResult}
                                        onChange={(e) => handleChange('actualResult', e.target.value)}
                                        placeholder={t('bugReport.placeholders.actual')}
                                        rows={3}
                                        className="w-full p-3 rounded-xl border-2 border-slate-200 focus:border-red-500 outline-none font-medium resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        {t('bugReport.fields.expected')} <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={reportData.expectedResult}
                                        onChange={(e) => handleChange('expectedResult', e.target.value)}
                                        placeholder={t('bugReport.placeholders.expected')}
                                        rows={3}
                                        className="w-full p-3 rounded-xl border-2 border-slate-200 focus:border-green-500 outline-none font-medium resize-none"
                                    />
                                </div>
                            </div>

                            {/* Severity & Priority */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        {t('bugReport.severity')} <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Critical', 'Major', 'Minor'].map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => handleChange('severity', s)}
                                                className={`py-2 px-2 rounded-lg text-xs font-bold border-2 ${reportData.severity === s
                                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        {t('bugReport.priority')} <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['High', 'Medium', 'Low'].map((p) => (
                                            <button
                                                key={p}
                                                type="button"
                                                onClick={() => handleChange('priority', p)}
                                                className={`py-2 px-2 rounded-lg text-xs font-bold border-2 ${reportData.priority === p
                                                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Feedback Area */}
                            {feedback && (
                                <div
                                    className={`p-4 rounded-xl border-l-4 ${
                                        feedback.type === 'success' 
                                            ? 'bg-green-50 border-green-500 text-green-800' 
                                            : 'bg-red-50 border-red-500 text-red-800'
                                    }`}
                                >
                                        <div className="flex items-start gap-3">
                                            {feedback.type === 'success' ? (
                                                <CheckCircle2 className="shrink-0" />
                                            ) : (
                                                <MessageSquareWarning className="shrink-0" />
                                            )}
                                            <div>
                                                <p className="font-bold">
                                                    {feedback.type === 'success' 
                                                        ? t('bugReport.feedback.success') 
                                                        : t('bugReport.feedback.improvements')}
                                                </p>
                                                {feedback.issues && (
                                                    <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                                                        {feedback.issues.map((issue, idx) => (
                                                            <li key={idx}>{issue}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Footer - Fixed Button */}
                    <div className="px-4 pt-4 pb-20 md:pb-6 border-t border-slate-100 bg-white shrink-0 rounded-b-3xl md:rounded-b-2xl">
                        <button
                            type="submit"
                            form="bug-report-form"
                            disabled={isChecking || !reportData.severity || !reportData.priority}
                            className={`w-full py-4 rounded-xl font-black text-base md:text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${
                                isChecking 
                                    ? 'bg-slate-100 text-slate-400 cursor-wait'
                                    : feedback?.type === 'success'
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isChecking ? (
                                <>
                                    <UserCheck className="animate-pulse w-5 h-5" />
                                    {t('bugReport.feedback.checking')}
                                </>
                            ) : (
                                t('bugReport.submit')
                            )}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
