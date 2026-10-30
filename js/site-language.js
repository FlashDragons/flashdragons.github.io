// URL language and an explicit saved choice take precedence over the system language.
window.siteLanguage = {
    detect() {
        const language = (navigator.language || 'en').toLowerCase();
        if (!/^zh(?:-|$)/.test(language)) return 'en-us';
        if (language.includes('-hant')) return 'zh-hant';
        if (language.includes('-hans')) return 'zh-hans';
        return /^zh-(tw|hk|mo)(?:-|$)/.test(language) ? 'zh-hant' : 'zh-hans';
    },
    resolve() {
        const supported = ['en-us', 'zh-hans', 'zh-hant'];
        const requested = new URLSearchParams(location.search).get('lang');
        if (supported.includes(requested)) return requested;
        try {
            const saved = localStorage.getItem('preferred_lang');
            if (supported.includes(saved)) return saved;
        } catch (_) { /* System language still works when storage is unavailable. */ }
        return this.detect();
    },
    save(lang) {
        try { localStorage.setItem('preferred_lang', lang); } catch (_) {}
    }
};
