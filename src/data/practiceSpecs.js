export const practiceSpecs = {
    registration: {
        title: "Qeydiyyat Forması - Texniki Tapşırıq",
        requirements: [
            "İstifadəçi adı: 3-20 simvol, yalnız hərflər və rəqəmlər.",
            "Email: Düzgün email formatı olmalıdır (@ və . daxil olmaqla).",
            "Şifrə: Minimum 6 simvol, ən azı 1 rəqəm olmalıdır.",
            "Təkrar Şifrə: Şifrə ilə eyni olmalıdır.",
            "Doğum Tarixi: İstifadəçi 18 yaşdan yuxarı olmalıdır.",
            "Telefon: Yalnız rəqəmlər qəbul edilməlidir.",
            "Qaydalar: Qeydiyyatdan keçmək üçün qaydalar qəbul edilməlidir."
        ]
    },
    payment: {
        title: "Ödəniş Səhifəsi - Texniki Tapşırıq",
        requirements: [
            "Kart Nömrəsi: Dəqiq 16 rəqəm olmalıdır.",
            "Ad Soyad: Yalnız hərflər qəbul edilməlidir.",
            "Bitmə Tarixi: Keçmiş tarix seçilə bilməz.",
            "CVV: 3 rəqəmli təhlükəsizlik kodu, gizli (password type) olmalıdır.",
            "Məbləğ: Yekun məbləğ düzgün hesablanmalıdır (Məbləğ + Komissiya)."
        ]
    },
    banking: {
        title: "Köçürmələr - Texniki Tapşırıq",
        requirements: [
            "Məbləğ: 0-dan böyük olmalıdır (Mənfi və ya 0 olmaz).",
            "Balans: Köçürmə məbləği balansdan çox ola bilməz.",
            "Qəbul edən: İstifadəçi öz kartına pul köçürə bilməz.",
            "Valyuta: Fərqli valyutalar arası köçürmə zamanı konvertasiya tətbiq olunmalıdır.",
            "Təhlükəsizlik: Uğursuz əməliyyat zamanı müvafiq xəta mesajı göstərilməlidir."
        ]
    },
    ecommerce: {
        title: "Səbət - Texniki Tapşırıq",
        requirements: [
            "Say: Məhsul sayı 1-dən az ola bilməz (Mənfi say olmaz).",
            "Stok: Maksimum sifariş limiti 5 ədəddir.",
            "Qiymət: Endirim düzgün hesablanmalıdır (Qiymət - Endirim).",
            "Silmə: 'Sil' düyməsi məhsulu səbətdən çıxarmalıdır.",
            "Şəkillər: Bütün məhsul şəkilləri düzgün yüklənməlidir."
        ]
    }
};
