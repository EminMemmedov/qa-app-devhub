import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserPlus, CreditCard, Building2, ShoppingBag, ChevronRight, Code, Database, Globe, Smartphone, Bug, LayoutGrid } from 'lucide-react';
import { useState, useEffect } from 'react';
import PageTransition from '../../components/PageTransition';
import AllFoundBugs from '../../components/AllFoundBugs';

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

export default function PracticeHub() {
    const { t } = useTranslation();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('modules');

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    const scenarios = [
        {
            id: 'registration',
            title: t('practice.modules.registration.title'),
            description: t('practice.modules.registration.description'),
            icon: UserPlus,
            color: 'bg-blue-500',
            path: '/practice/registration'
        },
        {
            id: 'payment',
            title: t('practice.modules.payment.title'),
            description: t('practice.modules.payment.description'),
            icon: CreditCard,
            color: 'bg-purple-500',
            path: '/practice/payment'
        },
        {
            id: 'banking',
            title: t('practice.modules.banking.title'),
            description: t('practice.modules.banking.description'),
            icon: Building2,
            color: 'bg-emerald-500',
            path: '/practice/banking'
        },
        {
            id: 'ecommerce',
            title: t('practice.modules.ecommerce.title'),
            description: t('practice.modules.ecommerce.description'),
            icon: ShoppingBag,
            color: 'bg-orange-500',
            path: '/practice/ecommerce'
        },
        {
            id: 'automation',
            title: t('practice.modules.automation.title'),
            description: t('practice.modules.automation.description'),
            icon: Code,
            color: 'bg-cyan-500',
            path: '/practice/automation'
        },
        {
            id: 'database',
            title: t('practice.modules.database.title'),
            description: t('practice.modules.database.description'),
            icon: Database,
            color: 'bg-indigo-500',
            path: '/practice/database'
        },
        {
            id: 'api',
            title: t('api.title'),
            description: t('api.description'),
            icon: Globe,
            color: 'bg-sky-500',
            path: '/practice/api'
        }/*,
        {
            id: 'mobile',
            title: t('mobile.title'),
            description: t('mobile.description'),
            icon: Smartphone,
            color: 'bg-rose-500',
            path: '/practice/mobile'
        }*/
    ];
    return (
        <PageTransition className="p-6 pt-12 pb-24 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            {/* Header removed as per user request */}

            {/* Header removed as per user request */}
            {/* Tabs removed as per user request */}

            {activeTab === 'modules' ? (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-4"
                >
                    {scenarios.map((scenario) => (
                        <Link key={scenario.id} to={scenario.path}>
                            <motion.div
                                variants={item}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-5 group hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 transition-all"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${scenario.color} flex items-center justify-center text-white shadow-lg shadow-slate-200 dark:shadow-black/20`}>
                                    <scenario.icon size={32} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {scenario.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                        {scenario.description}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-slate-600 transition-colors">
                                    <ChevronRight className="text-slate-400 dark:text-slate-300 group-hover:text-blue-500 dark:group-hover:text-blue-300" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <AllFoundBugs />
                </motion.div>
            )}
        </PageTransition>
    );
}
