export const CONTENT_SECURITY_POLICY = {
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // Needed for some Vite/React dev envs, but strict in production
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://*"],
        connectSrc: ["'self'", "https://api.anthropic.com", "https://generativelanguage.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        mediaSrc: ["'none'"],
        frameSrc: ["'none'"]
    },
    
    getCspString(): string {
        return Object.entries(this.directives)
            .map(([key, values]) => {
                const directive = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
                return `${directive} ${values.join(' ')}`;
            })
            .join('; ');
    },

    applyToDocument(): void {
        if (typeof document !== 'undefined') {
            const meta = document.createElement('meta');
            meta.httpEquiv = 'Content-Security-Policy';
            meta.content = this.getCspString();
            document.head.appendChild(meta);
        }
    }
};
