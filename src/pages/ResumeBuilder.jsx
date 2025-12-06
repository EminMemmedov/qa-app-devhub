import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    FileText, Download, User, Mail, Phone, Linkedin, Github,
    MapPin, Award, BookOpen, Briefcase, ChevronRight, Eye, Layout,
    Plus, Trash2, CheckCircle2, AlertTriangle, Sparkles, X, Briefcase as JobIcon, Target
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

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 pt-24 pb-32">
            <div className="w-full mx-auto">
                {/* Header */}
                <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                            <FileText className="text-indigo-600 dark:text-indigo-400" size={32} />
                            CV Konstruktor
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Oyun proqresinizi peşəkar bir QA CV-sinə çevirin.
                        </p>
                    </div>

                    <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 lg:hidden">
                        <button
                            onClick={() => setActiveTab('edit')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'edit'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                }`}
                        >
                            <Layout size={18} />
                            Redaktor
                        </button>
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'preview'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                }`}
                        >
                            <Eye size={18} />
                            Önizləmə
                        </button>
                    </div>

                    <button
                        onClick={calculateATS}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
                    >
                        <Sparkles size={18} />
                        ATS Yoxla
                    </button>
                </header>

                {/* ATS Modal */}
                <AnimatePresence>
                    {showAts && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        >
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
                                <button
                                    onClick={() => setShowAts(false)}
                                    className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors z-10 text-slate-500"
                                >
                                    <X size={24} />
                                </button>

                                <div className="text-center mb-6 pt-4">
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">ATS & AI Audit</h2>

                                    {/* Tab Switcher */}
                                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mx-auto max-w-sm mb-6">
                                        <button
                                            onClick={() => handleTabChange('general')}
                                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${atsTab === 'general'
                                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                                }`}
                                        >
                                            Ümumi Yoxlanış
                                        </button>
                                        <button
                                            onClick={() => handleTabChange('jd')}
                                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${atsTab === 'jd'
                                                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                                }`}
                                        >
                                            Vakansiya Uyğunluğu
                                        </button>
                                    </div>

                                    {/* Score Dashboard */}
                                    <div className="flex flex-col items-center mb-8">
                                        <div className="w-40 h-40 rounded-full flex items-center justify-center border-8 border-slate-100 dark:border-slate-800 relative mb-4">
                                            {/* Circular Progress (Simplified CSS) */}
                                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                                <circle
                                                    cx="50" cy="50" r="42"
                                                    fill="none"
                                                    stroke={
                                                        isAnalyzing ? '#e2e8f0' :
                                                            atsResults[atsTab].score >= 80 ? '#10b981' :
                                                                atsResults[atsTab].score >= 50 ? '#f59e0b' : '#ef4444'
                                                    }
                                                    strokeWidth="8"
                                                    strokeDasharray="264"
                                                    strokeDashoffset={isAnalyzing ? 0 : 264 - (264 * atsResults[atsTab].score) / 100}
                                                    className="transition-all duration-1000 ease-out"
                                                />
                                            </svg>

                                            <div className="text-center z-10">
                                                <span className={`text-4xl font-black ${isAnalyzing ? 'text-slate-400' :
                                                    atsResults[atsTab].score >= 80 ? 'text-emerald-500' :
                                                        atsResults[atsTab].score >= 50 ? 'text-amber-500' : 'text-red-500'
                                                    }`}>
                                                    {isAnalyzing ? <Layout className="animate-spin inline" /> : atsResults[atsTab].score}
                                                </span>
                                                {!isAnalyzing && <span className="text-xl font-bold text-slate-400 block">%</span>}
                                            </div>
                                        </div>

                                        <p className="text-slate-500 text-sm font-medium mb-6">
                                            {atsTab === 'general' ? 'Ümumi ATS Uyğunluğu' : 'Vakansiya Uyğunluğu'}
                                        </p>

                                        {/* Detailed Breakdown Bars */}
                                        {!isAnalyzing && atsResults[atsTab].score > 0 && (
                                            <div className="w-full grid grid-cols-3 gap-2 px-2">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                                                        <span>Açar Sözlər</span>
                                                        <span>{atsResults[atsTab].details?.keywords || 0}%</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                                                            style={{ width: `${atsResults[atsTab].details?.keywords || 0}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                                                        <span>Təsir Gücü</span>
                                                        <span>{atsResults[atsTab].details?.impact || 0}%</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                                                            style={{ width: `${atsResults[atsTab].details?.impact || 0}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                                                        <span>Struktur</span>
                                                        <span>{atsResults[atsTab].details?.structure || 0}%</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-orange-500 rounded-full transition-all duration-1000"
                                                            style={{ width: `${atsResults[atsTab].details?.structure || 0}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3 overflow-y-auto px-1 flex-1 min-h-0">
                                    {/* JD Input Section inside Modal - Only if JD Tab */}
                                    {atsTab === 'jd' && (
                                        <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                                <Target size={16} className="text-emerald-500" />
                                                Məqsədli Vakansiya
                                            </label>
                                            <textarea
                                                value={jobDescription}
                                                onChange={(e) => setJobDescription(e.target.value)}
                                                rows={4}
                                                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 text-sm mb-3"
                                                placeholder="Vakansiyanın mətnini bura yapışdırın..."
                                            />
                                            <button
                                                onClick={calculateATS}
                                                disabled={isAnalyzing}
                                                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                                            >
                                                {isAnalyzing ? <Layout className="animate-spin" size={18} /> : <Sparkles size={18} />}
                                                {isAnalyzing ? 'Vakansiya Analiz Edilir...' : 'Uyğunluğu Yoxla'}
                                            </button>
                                        </div>
                                    )}

                                    {/* Analyze Button for General Tab */}
                                    {atsTab === 'general' && (
                                        <button
                                            onClick={calculateATS}
                                            disabled={isAnalyzing}
                                            className="w-full mb-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                                        >
                                            {isAnalyzing ? <Layout className="animate-spin" size={18} /> : <Sparkles size={18} />}
                                            {isAnalyzing ? 'Ümumi Audit Aparılır...' : 'Ümumi Auditi Yenilə'}
                                        </button>
                                    )}

                                    {atsResults[atsTab].feedback.map((item, i) => (
                                        <div key={i} className={`flex items-start gap-3 p-3 rounded-xl text-sm ${item.type === 'error' ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                                            item.type === 'warning' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300' :
                                                'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300'
                                            }`}>
                                            {item.type === 'error' && <AlertTriangle size={16} className="shrink-0 mt-0.5" />}
                                            {item.type === 'warning' && <AlertTriangle size={16} className="shrink-0 mt-0.5" />}
                                            {item.type === 'success' && <CheckCircle2 size={16} className="shrink-0 mt-0.5" />}
                                            <span>{item.text}</span>
                                        </div>
                                    ))}

                                    {!isAnalyzing && atsResults[atsTab].score > 80 && atsResults[atsTab].feedback.length === 0 && (
                                        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-700 dark:text-green-300 font-bold">
                                            <CheckCircle2 size={20} />
                                            Əla! Rezümen ATS üçün tam hazırdır.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Editor Panel */}
                    <div className={`lg:col-span-5 space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700"
                        >
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <User size={20} className="text-blue-500" />
                                Şəxsi Məlumatlar
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ad və Soyad</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500"
                                        placeholder="e.g. John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Vəzifə Başlığı (Seniority)</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500"
                                        placeholder="e.g. Senior QA Engineer"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Telefon</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500"
                                            placeholder="+994 50 123 45 67"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">LinkedIn</label>
                                        <input
                                            type="text"
                                            name="linkedin"
                                            value={formData.linkedin}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500"
                                            placeholder="linkedin.com/in/john"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">GitHub</label>
                                        <input
                                            type="text"
                                            name="github"
                                            value={formData.github}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500"
                                            placeholder="github.com/john"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Peşəkar Xülasə</label>
                                    <textarea
                                        name="summary"
                                        value={formData.summary}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Hədəflərinizi qısaca təsvir edin..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        Əlavə Bacarıqlar (Kök sözlər / Keywords)
                                    </label>
                                    <textarea
                                        name="customSkills"
                                        value={formData.customSkills}
                                        onChange={handleInputChange}
                                        rows={2}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Məsələn: JIRA, Postman, Python, Cypress (vergüllə ayırın)"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Bu bacarıqlar ATS yoxlanışı zamanı nəzərə alınacaq.</p>
                                </div>

                            </div>

                            {/* Experience Editor */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Briefcase size={20} className="text-indigo-500" />
                                        İş Təcrübəsi
                                    </h3>
                                    <button
                                        onClick={addExperience}
                                        className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 transition-colors"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {(formData.experience || []).map((exp) => (
                                        <div key={exp.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative group">
                                            <button
                                                onClick={() => removeExperience(exp.id)}
                                                className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            <div className="grid grid-cols-2 gap-3 mb-3">
                                                <input
                                                    placeholder="Şirkət"
                                                    value={exp.company}
                                                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                    className="px-3 py-2 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                                                />
                                                <input
                                                    placeholder="Vəzifə"
                                                    value={exp.role}
                                                    onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                                    className="px-3 py-2 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    placeholder="Tarix (məs: 2021 - 2023)"
                                                    value={exp.duration}
                                                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                                                />
                                            </div>
                                            <textarea
                                                placeholder="Təsvir..."
                                                value={exp.description}
                                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                                                rows={3}
                                            />
                                        </div>
                                    ))}
                                    {(formData.experience || []).length === 0 && (
                                        <div className="text-center p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 text-sm">
                                            Təcrübə əlavə etmək üçün + düyməsini basın
                                        </div>
                                    )}
                                </div>
                            </div>


                            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Award size={18} className="text-orange-500" />
                                    Aşkarlanan Bacarıqlar ({earnedSkills.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {earnedSkills.length > 0 ? (
                                        earnedSkills.map(skill => (
                                            <span key={skill.id} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium border border-green-200 dark:border-green-800">
                                                {skill.skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-400 italic">
                                            Hələ heç bir bacarıq aşkarlanmayıb. Bacarıq qazanmaq üçün təcrübə modullarını tamamlayın.
                                        </p>
                                    )}
                                </div>
                                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-xs text-blue-600 dark:text-blue-300">
                                    Bacarıqlar Təcrübə Modulları və İmtahan nəticələrinizə əsasən avtomatik əlavə olunur.
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Preview Panel */}
                    <div className={`lg:col-span-7 ${activeTab === 'edit' ? 'hidden lg:block' : ''}`}>
                        <div className="sticky top-24">
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={generatePDF}
                                    disabled={isGenerating}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all disabled:opacity-50"
                                >
                                    <Download size={20} />
                                    {isGenerating ? 'Yaradılır...' : 'PDF Yüklə'}
                                </button>
                            </div>

                            {/* A4 Paper Preview Container */}
                            <div className="w-full overflow-x-auto overflow-y-hidden flex justify-center bg-slate-200/50 dark:bg-black/20 p-4 rounded-xl border border-slate-200 dark:border-slate-700 custom-scrollbar">
                                <div className="origin-top transform scale-[0.4] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.65] xl:scale-[0.85] 2xl:scale-100 transition-transform duration-300 -mb-[160mm] sm:-mb-[120mm] md:-mb-[70mm] lg:-mb-[90mm] xl:-mb-[30mm] 2xl:mb-0">
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
                                                    <h4 className="font-bold text-slate-900">QA Academy Student App</h4>
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
                                            Generated by QA Student App
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
