import { setLanguage, getAvailableLanguages, getCurrentLanguage } from '@/i18n';

const languageLabels = {
    en: { label: 'EN', flag: '🇺🇸' },
    bs: { label: 'BS', flag: '🇧🇦' },
};

function LanguageSwitcher() {
    const currentLang = getCurrentLanguage();
    const available = getAvailableLanguages().filter(lang => lang !== currentLang);
    const current = languageLabels[currentLang];

    return (
        <div className="relative group">
            <button
                className="flex items-center space-x-1 px-2 py-1 rounded text-xs font-semibold text-foreground/80 hover:text-foreground hover:bg-card transition-colors"
            >
                <span className="text-sm">{current.flag}</span>
                <span>{current.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5 opacity-50">
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </button>

            {/* Dropdown on hover */}
            <div className="absolute right-0 top-full mt-1 bg-popover border border-border rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[100px]">
                {available.map((lang) => {
                    const info = languageLabels[lang];
                    return (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className="flex items-center space-x-2 w-full px-3 py-2 text-xs text-popover-foreground hover:bg-primary hover:text-primary-foreground transition-colors rounded-md"
                        >
                            <span className="text-sm">{info.flag}</span>
                            <span>{info.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default LanguageSwitcher;