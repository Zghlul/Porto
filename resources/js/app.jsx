import '@fontsource/gloock/latin-400.css';
import '@fontsource-variable/plus-jakarta-sans/wght.css';
import '@fontsource-variable/plus-jakarta-sans/wght-italic.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';

import '../css/app.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import AppLayout from './Layouts/AppLayout';
import { site } from './data/portfolio';

const pages = import.meta.glob('./Pages/**/*.jsx');
const adminPages = import.meta.glob('./Pages/Admin/**/*.jsx');

createInertiaApp({
    title: (title) => (title ? `${title} — ${site.name}` : `${site.name} — ${site.shortRole}`),
    resolve: async (name) => {
        const page = await pages[`./Pages/${name}.jsx`]();

        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        // The dashboard brings its own rail; the public site shell would fight it.
        if (!adminPages[`./Pages/${name}.jsx`]) {
            page.default.layout = (content) => <AppLayout>{content}</AppLayout>;
        }

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#FF4B3E',
        showSpinner: false,
    },
});
