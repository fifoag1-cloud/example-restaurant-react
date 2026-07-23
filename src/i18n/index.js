import en from './en';
import bs from './bs';

const languages = {
    en,
    bs,
};

const languageNames = {
    en: 'English',
    bs: 'Bosanski',
};

const languageCodes = {
    en: 'EN',
    bs: 'BS',
};

function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

function useStrings() {
    const lang = getCurrentLanguage();
    return languages[lang] || languages.en;
}

function setLanguage(lang) {
    if (languages[lang]) {
        localStorage.setItem('language', lang);
        window.location.reload();
    }
}

function getAvailableLanguages() {
    return Object.keys(languages);
}

function getLanguageName(lang) {
    return languageNames[lang] || lang;
}

function getLanguageCode(lang) {
    return languageCodes[lang] || lang;
}

export default useStrings;
export { setLanguage, getAvailableLanguages, getLanguageName, getLanguageCode, getCurrentLanguage };