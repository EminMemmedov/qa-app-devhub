import { useState } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';

export default function AddressForm({ address, onChange, errors, touched, onBlur }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-orange-600" size={20} />
                <h3 className="font-bold text-slate-900">Çatdırılma Ünvanı</h3>
            </div>

            {/* Street Address */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                    Küçə ünvanı
                </label>
                <input
                    type="text"
                    name="street"
                    placeholder="Məsələn: Nizami küçəsi 123"
                    className={`w-full p-3 border-2 rounded-xl outline-none transition-colors ${touched.street && errors.street
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-slate-200 focus:border-orange-500'
                        }`}
                    value={address.street}
                    onChange={(e) => onChange({ ...address, street: e.target.value })}
                    onBlur={() => onBlur('street')}
                />
                {touched.street && errors.street && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle size={16} />
                        <span>{errors.street}</span>
                    </div>
                )}
            </div>

            {/* City and Postal Code */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                        Şəhər
                    </label>
                    <input
                        type="text"
                        name="city"
                        placeholder="Bakı"
                        className={`w-full p-3 border-2 rounded-xl outline-none transition-colors ${touched.city && errors.city
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-slate-200 focus:border-orange-500'
                            }`}
                        value={address.city}
                        onChange={(e) => onChange({ ...address, city: e.target.value })}
                        onBlur={() => onBlur('city')}
                    />
                    {touched.city && errors.city && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            <span>{errors.city}</span>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                        Poçt kodu
                    </label>
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="AZ1000"
                        className={`w-full p-3 border-2 rounded-xl outline-none transition-colors ${touched.postalCode && errors.postalCode
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-slate-200 focus:border-orange-500'
                            }`}
                        value={address.postalCode}
                        onChange={(e) => onChange({ ...address, postalCode: e.target.value })}
                        onBlur={() => onBlur('postalCode')}
                    />
                    {touched.postalCode && errors.postalCode && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                            <AlertCircle size={16} />
                            <span>{errors.postalCode}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Country */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                    Ölkə
                </label>
                <select
                    name="country"
                    className={`w-full p-3 border-2 rounded-xl outline-none transition-colors bg-white cursor-pointer ${touched.country && errors.country
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-slate-200 focus:border-orange-500'
                        }`}
                    value={address.country}
                    onChange={(e) => onChange({ ...address, country: e.target.value })}
                    onBlur={() => onBlur('country')}
                >
                    <option value="">Ölkə seçin</option>
                    <option value="Azerbaijan">Azərbaycan</option>
                    <option value="Turkey">Türkiyə</option>
                    <option value="Russia">Rusiya</option>
                    <option value="Georgia">Gürcüstan</option>
                </select>
                {touched.country && errors.country && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle size={16} />
                        <span>{errors.country}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
