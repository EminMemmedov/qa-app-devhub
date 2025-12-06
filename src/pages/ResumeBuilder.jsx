import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    FileText, Download, User, Mail, Phone, Linkedin, Github,
    MapPin, Award, BookOpen, Briefcase, ChevronRight, Eye, Layout,
    Plus, Trash2, CheckCircle2, AlertTriangle, Sparkles, X, Target
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { useGameProgress } from '../hooks/useGameProgress';
import { useAchievements } from '../hooks/useAchievements';
import { getStorageItem } from '../utils/storage';
import { SKILLS_MAPPING, INITIAL_RESUME_STATE } from '../data/skillsMapping';

export default function ResumeBuilder() {
    const { t } = useTranslation();
    const resumeRef = useRef(null);

    // User Progress Data
    const { xp, foundBugs } = useGameProgress();
    const { unlockedAchievements } = useAchievements();

    // Component State
    const [formData, setFormData] = useState(INITIAL_RESUME_STATE.personalInfo);
    const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'
    const [isGenerating, setIsGenerating] = useState(false);
    const [earnedSkills, setEarnedSkills] = useState([]);

    // Calculate Earned Skills based on progress
    useEffect(() => {
        // Check local storage for various progress markers
        const dbLevels = getStorageItem('qa_database_completed', []);
        const apiLevels = getStorageItem('qa_api_completed', []);
        const mobileLevels = getStorageItem('qa_mobile_completed', []);
        const autoLevels = getStorageItem('qa_automation_completed', []);
        const examScore = getStorageItem('qa_exam_score', 0);
        const theoryRead = getStorageItem('theory_progress', []); // Array of read module IDs
        const interviewComplete = getStorageItem('qa_interview_complete', false);

        // Logic to determine earned skills
        const definedSkills = [];

        // 1. Manual Testing (Bugs found)
        if (foundBugs.length >= 10) definedSkills.push('practice_registration');
        if (foundBugs.length >= 30) definedSkills.push('practice_ecommerce');

        // 2. API Testing
        if (apiLevels.length > 0) definedSkills.push('practice_api');
        if (apiLevels.includes(3)) definedSkills.push('api_advanced');

        // 3. Database
        if (dbLevels.length > 0) definedSkills.push('practice_sql');
        if (dbLevels.includes(4)) definedSkills.push('sql_advanced');

        // 4. Mobile
        if (mobileLevels.length > 0) definedSkills.push('practice_mobile');

        // 5. Automation
        if (autoLevels.length > 0) definedSkills.push('practice_automation');
        if (autoLevels.includes(2) || autoLevels.includes(3)) definedSkills.push('automation_advanced');

        // 6. Theory
        if (theoryRead && Object.keys(theoryRead).length > 3) {
            definedSkills.push('theory_fundamentals');
        }

        // 7. Interview & Soft Skills
        if (interviewComplete) {
            definedSkills.push('interview_soft');
        }

        // 8. Certificates (ISTQB)
        // Check if unlockedAchievements contains 'istqb_certified' OR high exam score
        if (unlockedAchievements.includes('istqb_certified') || examScore >= 70) {
            definedSkills.push('istqb_certified');
        }

        // Map defined skill IDs to actual skill objects from SKILLS_MAPPING
        const skills = definedSkills.map(skillId => SKILLS_MAPPING[skillId]).filter(Boolean);

        // Deduplicate and filter empty
        const uniqueSkills = [...new Map(skills.filter(Boolean).map(item => [item.id, item])).values()];
        setEarnedSkills(uniqueSkills);
    }, [foundBugs, unlockedAchievements]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Experience Management
    const addExperience = () => {
        setFormData(prev => ({
            ...prev,
            experience: [
                ...prev.experience,
                { id: Date.now(), company: '', role: '', duration: '', description: '' }
            ]
        }));
    };

    const removeExperience = (id) => {
        setFormData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    const updateExperience = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }));
    };

    // ATS Logic
    const [atsTab, setAtsTab] = useState('general'); // 'general' or 'jd'
    const [jobDescription, setJobDescription] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showAts, setShowAts] = useState(false);

    // Separate State for each Tab
    const [atsResults, setAtsResults] = useState({
        general: { score: 0, feedback: [], details: { keywords: 0, impact: 0, structure: 0 } },
        jd: { score: 0, feedback: [], details: { keywords: 0, impact: 0, structure: 0 } }
    });

    const handleTabChange = (tab) => {
        setAtsTab(tab);
        // No reset here, we want to persist state
    };

    // --- ADVANCED ATS LOGIC (AI-SIMULATION) ---
    const calculateATS = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            let score = 0;
            const feedback = [];
            const details = { keywords: 0, structure: 0, impact: 0, skills: 0 };

            // Normalize content
            const resumeText = (
                Object.values(formData).join(' ') +
                ' ' +
                earnedSkills.map(s => s.skill).join(' ') +
                ' ' +
                (formData.customSkills || '')
            ).toLowerCase();

            // Helper: Fuzzy Match
            const hasKeyword = (text, keyword) => {
                if (text.includes(keyword)) return true;
                // Simple fuzzy: allow 1 char difference for long words (e.g. 'seleniun')
                if (keyword.length > 5) {
                    // This is a simplified check for simulation purposes
                    return false;
                }
                return false;
            };

            // --- 1. KEYWORD ANALYSIS REFACTOR ---
            let targetKeywords = [];
            let maxKeywordScore = 0;
            let currentKeywordScore = 0;
            let keywordRating = 0;
            const missingKeywords = [];

            if (atsTab === 'jd') {
                // --- JD MODE: DYNAMIC KEYWORDS (70% Weight) ---
                if (jobDescription.trim().length > 50) {
                    const jdWords = jobDescription.toLowerCase()
                        .replace(/[^\w\s]/g, '')
                        .split(/\s+/)
                        .filter(w => w.length > 2 && !['and', 'the', 'for', 'with', 'that', 'have', 'from', 'this', 'will', 'your', 'team', 'work', 'experience', 'company', 'role'].includes(w));

                    const freq = {};
                    jdWords.forEach(w => freq[w] = (freq[w] || 0) + 1);

                    targetKeywords = Object.entries(freq)
                        .sort((a, b) => b[1] - a[1]) // Sort by freq
                        .slice(0, 15) // Top 15
                        .map(item => ({ word: item[0], weight: item[1] > 2 ? 6 : 4 })); // High weights for JD mode

                    if (targetKeywords.length === 0) {
                        feedback.push({ type: 'error', text: "Vakansiyadan açar sözlər çıxarıla bilmədi. Mətni yoxlayın." });
                    } else {
                        feedback.push({ type: 'success', text: "Vakansiya analiz edildi! Hədəf açar sözlər müəyyənləşdirildi." });
                    }
                } else {
                    feedback.push({ type: 'error', text: "Vakansiya mətni analiz üçün çox qısadır." });
                    // No keywords -> partial fail for JD mode
                }
            } else {
                // --- GENERAL MODE: STATIC BEST PRACTICES (20% Weight) ---
                targetKeywords = [
                    { word: 'qa', weight: 2 }, { word: 'testing', weight: 2 },
                    { word: 'manual', weight: 1 }, { word: 'bug', weight: 1 },
                    { word: 'test case', weight: 1 }, { word: 'agile', weight: 1 }
                ];
            }

            // Calculate Matches
            if (targetKeywords.length > 0) {
                maxKeywordScore = targetKeywords.reduce((acc, k) => acc + k.weight, 0);
                targetKeywords.forEach(k => {
                    if (resumeText.includes(k.word)) {
                        currentKeywordScore += k.weight;
                    } else {
                        missingKeywords.push(k.word);
                    }
                });

                keywordRating = maxKeywordScore > 0 ? (currentKeywordScore / maxKeywordScore) * 100 : 0;

                // Weight Logic
                const KEYWORD_WEIGHT = atsTab === 'jd' ? 0.7 : 0.2;
                score += (keywordRating * KEYWORD_WEIGHT);
                details.keywords = keywordRating;

                // Keyword Feedback
                if (atsTab === 'jd') {
                    if (keywordRating < 60) {
                        feedback.push({ type: 'error', text: `Vakansiya ilə uyğunluq zəifdir. Çatışmayan kritik sözlər: ${missingKeywords.slice(0, 5).join(', ')}` });
                    } else if (missingKeywords.length > 0) {
                        feedback.push({ type: 'warning', text: `Yaxşıdır, amma bunları da əlavə edin: ${missingKeywords.slice(0, 3).join(', ')}` });
                    }
                } else if (missingKeywords.length > 2) {
                    // General mode only complains if MANY core words are missing
                    feedback.push({ type: 'warning', text: "Ümumi QA terminologiyasını zənginləşdirin (məs: 'Test Case', 'Agile')." });
                }
            }


            // --- 2. IMPACT & STRUCTURE ANALYSIS (Shared but Weighted Differently) ---
            // HR systems look for "Action Verbs" and "Metrics"
            const actionVerbs = ['developed', 'created', 'tested', 'managed', 'led', 'improved', 'designed', 'automated', 'executed', 'yaratdı', 'test etdi', 'hazırladı'];
            const metrics = [/\d+%/, /\d+\+/, /increased/, /decreased/, /reduced/, /artırdı/, /azaltdı/, /faiz/];

            let impactScore = 0;
            const experiences = formData.experience || [];

            const fullExpText = experiences.map(e => e.description).join(' ').toLowerCase() + ' ' + (formData.summary || '').toLowerCase();
            const hasActionVerb = actionVerbs.some(v => fullExpText.includes(v));
            const hasMetric = metrics.some(m => m.test(fullExpText));

            if (hasActionVerb) impactScore += 50;
            if (hasMetric) impactScore += 50;

            // Weight Logic
            const IMPACT_WEIGHT = atsTab === 'jd' ? 0.15 : 0.40;
            score += (impactScore * IMPACT_WEIGHT);
            details.impact = impactScore;

            if (atsTab === 'general') {
                if (!hasActionVerb) feedback.push({ type: 'warning', text: "Gümanlı fellər (Action Verbs) istifadə edin (məs: 'Managed', 'Developed'). HR-lar buna diqqət yetirir." });
                if (!hasMetric) feedback.push({ type: 'warning', text: "Nailiyyətləri rəqəmlərlə ifadə edin (məs: 'Baqları 20% azaltdı')." });
            }

            // --- 3. STRUCTURE CHECK ---
            let structureScore = 100;

            if (!formData.summary || formData.summary.length < 50) {
                structureScore -= 20;
                if (atsTab === 'general') feedback.push({ type: 'error', text: "Xülasə (Summary) çox qısadır." });
            }
            if (!formData.email || !formData.phone) {
                structureScore -= 30;
                feedback.push({ type: 'error', text: "Kritik əlaqə vasitələri yoxdur!" }); // Always critical
            }
            if (experiences.length === 0 && earnedSkills.length < 5) {
                structureScore -= 30;
                if (atsTab === 'general') feedback.push({ type: 'warning', text: "Təcrübə bölməsi zəif görünür." });
            }

            const STRUCTURE_WEIGHT = atsTab === 'jd' ? 0.15 : 0.40;
            score += (structureScore * STRUCTURE_WEIGHT);

            // Final Polish
            const finalScore = Math.min(Math.round(score), 100);

            setAtsResults(prev => ({
                ...prev,
                [atsTab]: {
                    score: finalScore,
                    feedback,
                    details: {
                        keywords: Math.round(keywordRating),
                        // Normalize Impact/Structure to 0-100 scale for visual bars
                        impact: Math.min(Math.round((impactScore / 100) * 100), 100),
                        structure: Math.min(Math.round((structureScore / 100) * 100), 100)
                    }
                }
            }));

            setIsAnalyzing(false);
            if (!showAts) setShowAts(true);
        }, 1500);
    };

    const generatePDF = async () => {
        if (!resumeRef.current) return;
        setIsGenerating(true);

        try {
            // Temporary style adjustments for capture
            const originalStyle = resumeRef.current.style.transform;
            const originalLetterSpacing = resumeRef.current.style.letterSpacing;

            resumeRef.current.style.transform = 'scale(1)'; // Ensure scale is 1:1 for capture
            resumeRef.current.style.letterSpacing = '0.5px'; // Fix for text squashing in PDF

            const canvas = await html2canvas(resumeRef.current, {
                scale: 2, // High resolution
                useCORS: true,
                logging: false,
                letterRendering: 1,
                allowTaint: true
            });

            // Restore styles
            resumeRef.current.style.transform = originalStyle;
            resumeRef.current.style.letterSpacing = originalLetterSpacing;

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`QA_Resume_${formData.fullName.replace(/\s+/g, '_') || 'Student'}.pdf`);

            // Restore style
            resumeRef.current.style.transform = originalStyle;
            alert(t('resume.success', 'Resume downloaded successfully!'));
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert(t('resume.error', 'Failed to generate PDF. Please try again.'));
        } finally {
            setIsGenerating(false);
        }
    };

    // --- UI HELPERS ---
    const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-black focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400";
    const labelClasses = "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1";
    const cardClasses = "bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-white/50 dark:border-slate-700/50 backdrop-blur-sm";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 pt-20 pb-32 md:p-8 md:pt-24 lg:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-3 tracking-tight">
                            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30">
                                <FileText className="text-white" size={24} />
                            </div>
                            CV Konstruktor
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-3 font-medium text-lg max-w-lg">
                            Oyun proqresinizi peşəkar, ATS-dostu bir CV-yə çevirin.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        {/* Mobile Tab Switcher */}
                        <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 lg:hidden w-full sm:w-auto">
                            <button
                                onClick={() => setActiveTab('edit')}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'edit'
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <Layout size={18} />
                                Redaktor
                            </button>
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'preview'
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <Eye size={18} />
                                Önizləmə
                            </button>
                        </div>

                        <button
                            onClick={calculateATS}
                            className="hidden md:flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all active:scale-95"
                        >
                            <Sparkles size={20} />
                            ATS Yoxla
                        </button>
                        {/* Mobile ATS Button */}
                        <button
                            onClick={calculateATS}
                            className="md:hidden w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/30 active:scale-95 transition-all"
                        >
                            <Sparkles size={20} />
                            ATS Analizi
                        </button>
                    </div>
                </header>

                {/* ATS Modal */}
                <AnimatePresence>
                    {showAts && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-md"
                        >
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="bg-white dark:bg-slate-900 rounded-t-[2.5rem] sm:rounded-3xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
                            >
                                <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-6 sm:hidden" />

                                <button
                                    onClick={() => setShowAts(false)}
                                    className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors z-10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    <X size={24} />
                                </button>

                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">ATS & AI Audit</h2>

                                    {/* Tab Switcher */}
                                    <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl mx-auto max-w-sm mb-8">
                                        <button
                                            onClick={() => handleTabChange('general')}
                                            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${atsTab === 'general'
                                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md'
                                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                                }`}
                                        >
                                            Ümumi
                                        </button>
                                        <button
                                            onClick={() => handleTabChange('jd')}
                                            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${atsTab === 'jd'
                                                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-md'
                                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                                }`}
                                        >
                                            Vakansiya
                                        </button>
                                    </div>

                                    {/* Score Dashboard */}
                                    <div className="flex flex-col items-center">
                                        <div className="relative mb-6 group">
                                            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-all"></div>
                                            <div className="w-48 h-48 rounded-full flex items-center justify-center border-[12px] border-slate-100 dark:border-slate-800 relative bg-white dark:bg-slate-900 shadow-2xl">
                                                <svg className="absolute inset-0 w-full h-full -rotate-90 transform scale-110" viewBox="0 0 100 100">
                                                    <circle cx="50" cy="50" r="42" fill="none" stroke={isAnalyzing ? '#e2e8f0' : atsResults[atsTab].score >= 80 ? '#10b981' : atsResults[atsTab].score >= 50 ? '#f59e0b' : '#ef4444'} strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset={isAnalyzing ? 0 : 264 - (264 * atsResults[atsTab].score) / 100} className="transition-all duration-1000 ease-out" />
                                                </svg>
                                                <div className="text-center z-10 flex flex-col items-center">
                                                    {isAnalyzing ? (
                                                        <Layout className="animate-spin text-slate-300 mb-2" size={40} />
                                                    ) : (
                                                        <span className={`text-6xl font-black tracking-tighter ${atsResults[atsTab].score >= 80 ? 'text-emerald-500 mr-[-6px]' :
                                                            atsResults[atsTab].score >= 50 ? 'text-amber-500 mr-[-6px]' : 'text-red-500 mr-[-6px]'
                                                            }`}>
                                                            {atsResults[atsTab].score}
                                                        </span>
                                                    )}
                                                    {!isAnalyzing && <span className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Xal</span>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Detailed Breakdown Bars */}
                                        {!isAnalyzing && atsResults[atsTab].score > 0 && (
                                            <div className="w-full grid grid-cols-3 gap-4 px-2">
                                                {[
                                                    { label: 'Açar Sözlər', val: atsResults[atsTab].details?.keywords || 0, color: 'bg-blue-500' },
                                                    { label: 'Təsir', val: atsResults[atsTab].details?.impact || 0, color: 'bg-purple-500' },
                                                    { label: 'Struktur', val: atsResults[atsTab].details?.structure || 0, color: 'bg-orange-500' }
                                                ].map((stat, idx) => (
                                                    <div key={idx} className="flex flex-col gap-2">
                                                        <div className="flex justify-between items-end">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                                                            <span className="text-xs font-black text-slate-700 dark:text-slate-200">{stat.val}%</span>
                                                        </div>
                                                        <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${stat.val}%` }}
                                                                transition={{ duration: 1, delay: 0.2 }}
                                                                className={`h-full ${stat.color} rounded-full`}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3 overflow-y-auto px-1 flex-1 min-h-0 custom-scrollbar pb-6">
                                    {/* JD Input Section */}
                                    {atsTab === 'jd' && (
                                        <div className="mb-6 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                                <Target size={18} className="text-emerald-500" />
                                                Vakansiya Tələbləri
                                            </label>
                                            <textarea
                                                value={jobDescription}
                                                onChange={(e) => setJobDescription(e.target.value)}
                                                rows={4}
                                                className={inputClasses}
                                                placeholder="Vakansiyanın mətnini bura yapışdırın ki, AI analiz etsin..."
                                            />
                                            <button
                                                onClick={calculateATS}
                                                disabled={isAnalyzing}
                                                className="mt-3 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
                                            >
                                                {isAnalyzing ? <Layout className="animate-spin" size={18} /> : <Sparkles size={18} />}
                                                {isAnalyzing ? 'Analiz Edilir...' : 'Uyğunluğu Yoxla'}
                                            </button>
                                        </div>
                                    )}

                                    {atsTab === 'general' && (
                                        <button
                                            onClick={calculateATS}
                                            disabled={isAnalyzing}
                                            className="w-full mb-4 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95"
                                        >
                                            {isAnalyzing ? <Layout className="animate-spin" size={18} /> : <Sparkles size={18} />}
                                            {isAnalyzing ? 'Audit Aparılır...' : 'Auditi Yenilə'}
                                        </button>
                                    )}

                                    {atsResults[atsTab].feedback.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className={`flex items-start gap-4 p-4 rounded-2xl text-sm border-l-4 shadow-sm ${item.type === 'error' ? 'bg-red-50 border-red-500 text-red-700 dark:bg-red-900/10 dark:text-red-300' :
                                                item.type === 'warning' ? 'bg-amber-50 border-amber-500 text-amber-800 dark:bg-amber-900/10 dark:text-amber-300' :
                                                    'bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-900/10 dark:text-emerald-300'
                                                }`}
                                        >
                                            {item.type === 'error' && <AlertTriangle size={20} className="shrink-0 text-red-500" />}
                                            {item.type === 'warning' && <AlertTriangle size={20} className="shrink-0 text-amber-500" />}
                                            {item.type === 'success' && <CheckCircle2 size={20} className="shrink-0 text-emerald-500" />}
                                            <span className="leading-relaxed font-medium">{item.text}</span>
                                        </motion.div>
                                    ))}

                                    {!isAnalyzing && atsResults[atsTab].score > 80 && atsResults[atsTab].feedback.length === 0 && (
                                        <div className="flex flex-col items-center justify-center gap-3 p-8 bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl text-emerald-700 dark:text-emerald-300 font-bold text-center border border-emerald-100 dark:border-emerald-900/30">
                                            <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                                                <CheckCircle2 size={32} />
                                            </div>
                                            <div>
                                                <p className="text-lg">Mükəmməl!</p>
                                                <p className="text-sm font-normal opacity-80">Rezümen ATS sistemləri üçün tam hazırdır.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Editor Panel - Form */}
                    <div className={`lg:col-span-5 space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cardClasses}
                        >
                            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                    <User size={20} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                Şəxsi Məlumatlar
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className={labelClasses}>Ad və Soyad</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                        placeholder="e.g. Emin Memmedov"
                                    />
                                </div>

                                <div>
                                    <label className={labelClasses}>Vəzifə (Başlıq)</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className={inputClasses}
                                        placeholder="e.g. Senior QA Engineer"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelClasses}>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={inputClasses}
                                            placeholder="mail@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Telefon</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={inputClasses}
                                            placeholder="+994 50 123 45 67"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelClasses}>LinkedIn</label>
                                        <input
                                            type="text"
                                            name="linkedin"
                                            value={formData.linkedin}
                                            onChange={handleInputChange}
                                            className={inputClasses}
                                            placeholder="linkedin.com/in/..."
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>GitHub</label>
                                        <input
                                            type="text"
                                            name="github"
                                            value={formData.github}
                                            onChange={handleInputChange}
                                            className={inputClasses}
                                            placeholder="github.com/..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>Peşəkar Xülasə</label>
                                    <textarea
                                        name="summary"
                                        value={formData.summary}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className={`${inputClasses} resize-none`}
                                        placeholder="Karyera hədəfləriniz və qısa tərcümeyi-hal..."
                                    />
                                </div>

                                <div>
                                    <label className={labelClasses}>
                                        Əlavə Bacarıqlar (Keywords for ATS)
                                    </label>
                                    <textarea
                                        name="customSkills"
                                        value={formData.customSkills}
                                        onChange={handleInputChange}
                                        rows={2}
                                        className={`${inputClasses} resize-none`}
                                        placeholder="JIRA, Selenium, Python, API Testing..."
                                    />
                                    <p className="text-xs font-medium text-slate-500 mt-2 flex items-center gap-1">
                                        <CheckCircle2 size={12} className="text-emerald-500" />
                                        Bu açar sözlər ATS analizində istifadə olunacaq
                                    </p>
                                </div>

                            </div>


                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={cardClasses}
                        >
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                                        <Briefcase size={20} className="text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    İş Təcrübəsi
                                </h3>
                                <button
                                    onClick={addExperience}
                                    className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
                                    aria-label="Add Experience"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <AnimatePresence>
                                    {(formData.experience || []).map((exp) => (
                                        <motion.div
                                            key={exp.id}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 relative group transition-all hover:bg-white dark:hover:bg-slate-900 hover:shadow-md"
                                        >
                                            <button
                                                onClick={() => removeExperience(exp.id)}
                                                className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors p-1"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block ml-1">Şirkət</label>
                                                    <input
                                                        placeholder="Şirkət"
                                                        value={exp.company}
                                                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                        className={inputClasses}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block ml-1">Vəzifə</label>
                                                    <input
                                                        placeholder="Vəzifə"
                                                        value={exp.role}
                                                        onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                                        className={inputClasses}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block ml-1">Müddət</label>
                                                <input
                                                    placeholder="Tarix (məs: 2021 - 2023)"
                                                    value={exp.duration}
                                                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                                                    className={inputClasses}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block ml-1">Təsvir</label>
                                                <textarea
                                                    placeholder="Gördüyünüz işlər, nailiyyətlər..."
                                                    value={exp.description}
                                                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                                    className={inputClasses}
                                                    rows={3}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {(formData.experience || []).length === 0 && (
                                    <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 font-medium">
                                        <p>Hələ təcrübə qeyd olunmayıb.</p>
                                        <p className="text-xs text-slate-400 mt-1">Əlavə etmək üçün + düyməsini istifadə edin.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>



                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={cardClasses}
                        >
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 text-xl pb-4 border-b border-slate-100 dark:border-slate-700">
                                <Award size={20} className="text-orange-500" />
                                Avtomatik Aşkarlanan Bacarıqlar
                                <span className="ml-2 px-2.5 py-0.5 bg-orange-100 text-orange-600 rounded-full text-sm font-bold">{earnedSkills.length}</span>
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {earnedSkills.length > 0 ? (
                                    earnedSkills.map(skill => (
                                        <span key={skill.id} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-600 transition-hover duration-200 hover:scale-105 select-none cursor-default">
                                            {skill.skill}
                                        </span>
                                    ))
                                ) : (
                                    <div className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 text-center">
                                        <p className="text-sm text-slate-400 font-medium italic">
                                            Hələ heç bir bacarıq aşkarlanmayıb.
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-xs text-blue-600 dark:text-blue-300 font-medium">
                                Bacarıqlar Təcrübə Modulları və İmtahan nəticələrinizə əsasən avtomatik əlavə olunur.
                            </div>
                        </motion.div>
                    </div>

                    {/* Preview Panel - Sticky Layout */}
                    <div className={`lg:col-span-7 ${activeTab === 'edit' ? 'hidden lg:block' : 'block'}`}>
                        <div className="sticky top-28 space-y-4">
                            <div className="flex justify-end mb-2">
                                <button
                                    onClick={generatePDF}
                                    disabled={isGenerating}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-500/30 flex items-center gap-2 transition-all disabled:opacity-50 active:scale-95 w-full sm:w-auto justify-center"
                                >
                                    <Download size={20} />
                                    {isGenerating ? 'PDF Hazırlanır...' : 'PDF Yüklə'}
                                </button>
                            </div>

                            {/* A4 Paper Preview Container - Responsive Scaling */}
                            <div className="relative w-full overflow-hidden bg-slate-200/50 dark:bg-black/20 p-2 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-700 flex justify-center items-start min-h-[500px]">
                                <div className="origin-top transform scale-[0.38] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.6] xl:scale-[0.8] 2xl:scale-100 transition-transform duration-300">
                                    <div
                                        ref={resumeRef}
                                        className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl mx-auto p-[15mm] flex flex-col relative"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        {/* Resume Header */}
                                        <div className="border-b-2 border-slate-900 pb-6 mb-8">
                                            <h1 className="text-4xl font-black uppercase tracking-tight mb-2 text-slate-900">
                                                {formData.fullName || 'SİZİN ADINIZ'}
                                            </h1>
                                            <p className="text-xl text-slate-600 font-medium">{formData.title || 'JUNIOR QA ENGINEER'}</p>

                                            <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
                                                {formData.email && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Mail size={14} /> {formData.email}
                                                    </div>
                                                )}
                                                {formData.phone && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Phone size={14} /> {formData.phone}
                                                    </div>
                                                )}
                                                {formData.linkedin && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Linkedin size={14} /> {formData.linkedin}
                                                    </div>
                                                )}
                                                {formData.github && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Github size={14} /> {formData.github}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Summary */}
                                        <div className="mb-8">
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-1">Xülasə</h3>
                                            <p className="text-sm leading-relaxed text-slate-800">
                                                {formData.summary}
                                            </p>
                                        </div>

                                        {/* Skills Section - Categorized */}
                                        <div className="mb-8">
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-100 pb-1">Texniki Bacarıqlar</h3>
                                            <div className="grid grid-cols-2 gap-y-2 gap-x-8 mb-6">
                                                {/* In-App Skills */}
                                                {earnedSkills.filter(s => !['Sertifikatlar', 'Ünsiyyət Bacarıqları', 'Soft Skills', 'Certifications'].includes(s.category)).map(skill => (
                                                    <div key={skill.id} className="flex items-center gap-2 text-sm text-slate-800">
                                                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                                                        <span>{skill.skill}</span>
                                                    </div>
                                                ))}

                                                {/* Custom Skills */}
                                                {formData.customSkills && formData.customSkills.split(',').map((skill, index) => (
                                                    skill.trim() && (
                                                        <div key={`custom-${index}`} className="flex items-center gap-2 text-sm text-slate-800">
                                                            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                                                            <span>{skill.trim()}</span>
                                                        </div>
                                                    )
                                                ))}

                                                {earnedSkills.length === 0 && !formData.customSkills && (
                                                    <p className="text-sm text-slate-400 italic col-span-2">Texniki bacarıq yoxdur.</p>
                                                )}
                                            </div>

                                            {/* Soft Skills */}
                                            {earnedSkills.some(s => ['Ünsiyyət Bacarıqları', 'Soft Skills'].includes(s.category)) && (
                                                <>
                                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-100 pb-1">Yumşaq Bacarıqlar</h3>
                                                    <div className="grid grid-cols-2 gap-y-2 gap-x-8 mb-6">
                                                        {earnedSkills.filter(s => ['Ünsiyyət Bacarıqları', 'Soft Skills'].includes(s.category)).map(skill => (
                                                            <div key={skill.id} className="flex items-center gap-2 text-sm text-slate-800">
                                                                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                                                <span>{skill.skill}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}

                                            {/* Certifications */}
                                            {earnedSkills.some(s => ['Sertifikatlar', 'Certifications'].includes(s.category)) && (
                                                <>
                                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-100 pb-1">Sertifikatlar</h3>
                                                    <div className="space-y-2">
                                                        {earnedSkills.filter(s => ['Sertifikatlar', 'Certifications'].includes(s.category)).map(skill => (
                                                            <div key={skill.id} className="flex items-center gap-2 text-sm font-bold text-slate-900">
                                                                <Award size={16} className="text-yellow-500" />
                                                                <span>{skill.skill}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Education / Training */}
                                        <div className="mb-8">
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-100 pb-1">Təhsil və Təlim</h3>

                                            <div className="mb-4">
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h4 className="font-bold text-slate-900">DevHub Academy Student App</h4>
                                                    <span className="text-sm text-slate-500">2025 - Hazırda</span>
                                                </div>
                                                <div className="text-sm text-slate-700">
                                                    Manual Testləmə, API, SQL və Avtomatlaşdırma əsaslarını əhatə edən hərtərəfli QA təlimi.
                                                </div>
                                                <div className="mt-2 text-sm text-slate-600">
                                                    <strong>Əsas Nailiyyətlər:</strong>
                                                    <ul className="list-disc list-inside mt-1 ml-2 space-y-0.5">
                                                        <li>Simulyasiya edilmiş mühitlərdə {foundBugs.length} baq tapıldı.</li>
                                                        <li>Səviyyə {Math.floor(xp / 500) + 1} ({xp} XP) əldə edildi.</li>
                                                        {unlockedAchievements.includes('istqb_certified') && (
                                                            <li>ISTQB Foundation Səviyyə Sınaq İmtahanını keçdi.</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Projects & Experience */}
                                        <div>
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-100 pb-1">Təcrübə</h3>

                                            <div className="space-y-6">
                                                {/* Custom Experience */}
                                                {(formData.experience || []).map(exp => (
                                                    <div key={exp.id} className="flex gap-4">
                                                        <div className="w-full">
                                                            <div className="flex justify-between items-baseline mb-1">
                                                                <h4 className="font-bold text-slate-900 text-sm">{exp.role} @ {exp.company}</h4>
                                                                <span className="text-xs text-slate-500 font-mono">{exp.duration}</span>
                                                            </div>
                                                            <p className="text-sm text-slate-700 leading-snug">
                                                                {exp.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Built-in Simulation Experience */}
                                                <div className="flex gap-4">
                                                    <div className="w-full">
                                                        <h4 className="font-bold text-slate-900 text-sm">Simulyasiya edilmiş E-ticarət Testi</h4>
                                                        Onlayn mağaza simulyatorunun funksional və UI testlərini apardı. Çıxış prosesində (checkout) və ödəniş sistemlərinin inteqrasiyasında kritik baqları müəyyən etdi.
                                                    </div>
                                                </div>

                                                {earnedSkills.some(s => s.id === 'api_testing') && (
                                                    <div className="flex gap-4">
                                                        <div className="w-full">
                                                            <h4 className="font-bold text-slate-900 text-sm">API Test Laboratoriyası</h4>
                                                            REST metodlarından istifadə edərək API yoxlaması apardı. Status kodlarını, payload strukturlarını və avtorizasiya mexanizmlərini yoxladı.
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Watermark */}
                                        <div className="absolute bottom-6 right-6 text-[10px] text-slate-300">
                                            Generated by DevHub Academy Student App
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}
