import { Head } from '@inertiajs/react';
import { site } from '../data/portfolio';

export default function Seo({ title, description, path = '/', image = '/og-image.png', children }) {
    const canonical = `${site.url}${path === '/' ? '' : path}`;
    const socialImage = `${site.url}${image}`;

    return (
        <Head title={title}>
            <meta head-key="description" name="description" content={description} />
            <meta head-key="og:type" property="og:type" content="website" />
            <meta head-key="og:title" property="og:title" content={title ? `${title} — ${site.name}` : site.name} />
            <meta head-key="og:description" property="og:description" content={description} />
            <meta head-key="og:url" property="og:url" content={canonical} />
            <meta head-key="og:image" property="og:image" content={socialImage} />
            <meta head-key="og:image:width" property="og:image:width" content="1200" />
            <meta head-key="og:image:height" property="og:image:height" content="630" />
            <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta head-key="twitter:title" name="twitter:title" content={title ? `${title} — ${site.name}` : site.name} />
            <meta head-key="twitter:description" name="twitter:description" content={description} />
            <meta head-key="twitter:image" name="twitter:image" content={socialImage} />
            <link head-key="canonical" rel="canonical" href={canonical} />
            {children}
        </Head>
    );
}
