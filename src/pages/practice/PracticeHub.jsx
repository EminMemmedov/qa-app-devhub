import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserPlus, CreditCard, Building2, ShoppingBag, ChevronRight } from 'lucide-react';
import PageTransition from '../../components/PageTransition';

const scenarios = [
    {
        id: 'registration',
        title: 'Qeydiyyat Forması',
        description: 'Vizual səhvlər, validasiya problemləri və DevTools tapşırıqları.',
        icon: UserPlus,
        color: 'bg-blue-500',
        path: '/practice/registration'
    },
    {
        id: 'payment',
        title: 'Ödəniş Səhifəsi',
        description: 'Kredit kartı validasiyası, səhv hesablamalar və təhlükəsizlik boşluqları.',
        icon: CreditCard,
        color: 'bg-purple-500',
        path: '/practice/payment'
    },
    {
        id: 'banking',
        title: 'Bank Tətbiqi',
        description: 'Pul köçürmələri, mənfi balans və məntiqi səhvlər.',
        icon: Building2,
        color: 'bg-emerald-500',
        path: '/practice/banking'
    },
    {
        id: 'ecommerce',
        title: 'İnternet Mağaza',
        description: 'Səbət hesablamaları, endirim kuponları və məhsul filtrləri.',
        icon: ShoppingBag,
        color: 'bg-orange-500',
        path: '/practice/ecommerce'
    }
];

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
    return (
        <PageTransition className="p-6 pt-12 pb-24 min-h-screen">
            <header className="mb-8">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Təcrübə</h1>
                <p className="text-slate-500 font-medium">Real layihələrdə qarşılaşa biləcəyiniz ssenarilər</p>
            </header>

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
                            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-xl hover:shadow-slate-200/50 transition-all"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${scenario.color} flex items-center justify-center text-white shadow-lg shadow-slate-200`}>
                                <scenario.icon size={32} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                    {scenario.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {scenario.description}
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                <ChevronRight className="text-slate-400 group-hover:text-blue-500" />
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </motion.div>
        </PageTransition>
    );
}
