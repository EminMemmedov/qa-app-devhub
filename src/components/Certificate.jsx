import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Download, Share2, Award, CheckCircle, Linkedin, Copy } from 'lucide-react';
import { useLeaderboard } from '../hooks/useLeaderboard';

export default function Certificate({ score, percentage, date }) {
    const certificateRef = useRef(null);
    const containerRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [scale, setScale] = useState(1);
    const { userProfile } = useLeaderboard();

    // Use user's name or a default fallback
    const studentName = userProfile?.name || "QA Tələbəsi";
    const currentDate = date || new Date().toLocaleDateString('az-AZ');

    // Auto-scale logic to fit screen
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const parentWidth = containerRef.current.offsetWidth;
                const baseWidth = 800; // Fixed design width
                // Calculate scale, maxing out at 1 (don't upscale on huge screens)
                const newScale = Math.min(parentWidth / baseWidth, 1);
                setScale(newScale);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const generateImage = async () => {
        if (!certificateRef.current) return null;
        
        try {
            await document.fonts.ready;
            await new Promise(resolve => setTimeout(resolve, 500));

            // Temporarily reset transform to capture high-res image
            const originalTransform = certificateRef.current.style.transform;
            certificateRef.current.style.transform = 'none';
            
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2, // High quality export
                backgroundColor: '#ffffff',
                logging: false,
                useCORS: true,
                allowTaint: true,
                width: 800, // Capture at design width
                height: 566, // Approx A4 aspect ratio
            });

            // Restore transform
            certificateRef.current.style.transform = originalTransform;

            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error("Certificate generation failed:", error);
            return null;
        }
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        const dataUrl = await generateImage();
        if (dataUrl) {
            const link = document.createElement('a');
            link.download = `QA-Academy-Certificate-${studentName.replace(/\s+/g, '-')}.png`;
            link.href = dataUrl;
            link.click();
        }
        setIsDownloading(false);
    };

    const handleShare = async () => {
        setIsDownloading(true);
        await handleDownload();

        const text = `Mən indicə QA Student App-də ISTQB sınaq imtahanını uğurla keçdim! 🎓\n\nNəticə: ${percentage}%\n\nSiz də özünüzü yoxlayın: https://qa-student-app.vercel.app \n\n#QA #Testing #ISTQB #Learning #Certification`;
        
        navigator.clipboard.writeText(text);

        const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');

        alert("Sertifikat yükləndi! 📥\nİndi LinkedIn-də şəkli posta əlavə edin.");
        setIsDownloading(false);
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-3xl mx-auto">
            {/* Certificate Scalable Container */}
            <div 
                ref={containerRef} 
                className="w-full relative flex justify-center overflow-hidden shadow-2xl rounded-xl bg-slate-100"
                style={{ height: `${566 * scale}px` }} // Dynamic height based on scale
            >
                {/* The Fixed-Size Certificate (800x566) */}
                <div 
                    ref={certificateRef}
                    className="absolute top-0 left-0 origin-top-left bg-[#fdfbf7] text-slate-900 flex flex-col overflow-hidden"
                    style={{ 
                        width: '800px', 
                        height: '566px',
                        transform: `scale(${scale})`
                    }}
                >
                    {/* Complex Border Pattern */}
                    <div className="absolute inset-4 border-[3px] border-slate-900/10 pointer-events-none z-10"></div>
                    <div className="absolute inset-6 border border-slate-900/5 pointer-events-none z-10"></div>
                    
                    {/* Ornamental Corners */}
                    <svg className="absolute top-6 left-6 w-24 h-24 text-indigo-900 opacity-80 z-10" viewBox="0 0 100 100" fill="none">
                        <path d="M2 2h30v2H4v28H2V2z" fill="currentColor"/>
                        <path d="M10 10h20v1H11v20H10V10z" fill="currentColor" opacity="0.5"/>
                    </svg>
                    <svg className="absolute top-6 right-6 w-24 h-24 text-indigo-900 opacity-80 z-10 rotate-90" viewBox="0 0 100 100" fill="none">
                        <path d="M2 2h30v2H4v28H2V2z" fill="currentColor"/>
                        <path d="M10 10h20v1H11v20H10V10z" fill="currentColor" opacity="0.5"/>
                    </svg>
                    <svg className="absolute bottom-6 right-6 w-24 h-24 text-indigo-900 opacity-80 z-10 rotate-180" viewBox="0 0 100 100" fill="none">
                        <path d="M2 2h30v2H4v28H2V2z" fill="currentColor"/>
                        <path d="M10 10h20v1H11v20H10V10z" fill="currentColor" opacity="0.5"/>
                    </svg>
                    <svg className="absolute bottom-6 left-6 w-24 h-24 text-indigo-900 opacity-80 z-10 -rotate-90" viewBox="0 0 100 100" fill="none">
                        <path d="M2 2h30v2H4v28H2V2z" fill="currentColor"/>
                        <path d="M10 10h20v1H11v20H10V10z" fill="currentColor" opacity="0.5"/>
                    </svg>

                    {/* Background */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-transparent to-transparent scale-150"></div>

                    {/* Content - FIXED PIXEL SIZES for perfect layout */}
                    <div className="h-full flex flex-col items-center justify-between relative z-20 py-8 px-12">
                        
                        {/* Header Logo */}
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <div className="relative">
                                <Award size={48} className="text-indigo-900" />
                                <div className="absolute -inset-2 bg-amber-400/20 blur-xl rounded-full"></div>
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mt-2">QA Student App Academy</span>
                        </div>

                        {/* Title */}
                        <div className="text-center">
                            <h1 className="text-6xl font-serif text-indigo-950 mb-2 tracking-tight" style={{ fontFamily: 'Didot, "Playfair Display", serif' }}>
                                Sertifikat
                            </h1>
                            <div className="h-px w-32 bg-amber-400 mx-auto mb-2"></div>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-[0.2em]">Müvəffəqiyyət Təsdiqi</p>
                        </div>

                        {/* Name Section */}
                        <div className="w-full text-center my-2">
                            <p className="text-slate-500 italic mb-2 text-lg font-serif">Təqdim edilir:</p>
                            <h2 className="text-5xl font-bold text-indigo-700 mb-2 font-serif tracking-wide py-2 border-b border-slate-200 inline-block px-12 min-w-[400px]">
                                {studentName}
                            </h2>
                        </div>

                        {/* Description */}
                        <div className="max-w-xl text-center">
                            <p className="text-slate-600 leading-relaxed text-lg font-serif">
                                <span className="font-bold text-indigo-900">ISTQB Foundation Level</span> üzrə sınaq imtahanını uğurla başa vuraraq yüksək peşəkarlıq nümayiş etdirdiyinə görə.
                            </p>
                        </div>

                        {/* Footer Stats */}
                        <div className="w-full flex items-end justify-between px-8 mt-4">
                            <div className="text-center">
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Tarix</p>
                                <p className="font-serif text-xl text-slate-800 border-b border-slate-200 pb-1 min-w-[120px]">{currentDate}</p>
                            </div>

                            {/* Gold Seal */}
                            <div className="relative -mb-4">
                                <div className="w-28 h-28 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl shadow-amber-900/20 relative z-10">
                                    <div className="w-[104px] h-[104px] border-2 border-dashed border-amber-200 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-inner">
                                        <span className="text-3xl font-black tracking-tighter">{percentage}%</span>
                                        <span className="text-[8px] uppercase font-bold tracking-widest opacity-90">Nəticə</span>
                                        <div className="mt-1 flex gap-1">
                                            {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 bg-white rounded-full"></div>)}
                                        </div>
                                    </div>
                                </div>
                                {/* Ribbons */}
                                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-16 h-16 bg-amber-600 -z-10 rotate-45 rounded-sm shadow-lg"></div>
                                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-16 h-16 bg-amber-600 -z-10 rotate-[35deg] rounded-sm shadow-lg opacity-80"></div>
                            </div>

                            <div className="text-center">
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">İmza</p>
                                <div className="font-serif text-2xl text-indigo-900 italic min-w-[120px]" style={{ fontFamily: 'cursive' }}>QA Academy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Smart Share Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="py-4 bg-white text-indigo-900 border-2 border-indigo-100 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-50 transition-all shadow-sm"
                >
                     <Download size={20} />
                     Sertifikatı Yüklə
                </button>

                <button
                    onClick={handleShare}
                    disabled={isDownloading}
                    className="py-4 bg-[#0a66c2] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 hover:bg-[#004182] transition-all transform active:scale-95"
                >
                    {isDownloading ? <span className="animate-pulse">Hazırlanır...</span> : <><Linkedin size={24} /> LinkedIn-də Paylaş</>}
                </button>
            </div>
            
            <p className="text-xs text-slate-400 text-center max-w-md">
                "LinkedIn-də Paylaş" düyməsinə basdıqda sertifikat avtomatik yüklənəcək və LinkedIn səhifəsi açılacaq. Şəkli posta əlavə etməyi unutmayın!
            </p>
        </div>
    );
}
