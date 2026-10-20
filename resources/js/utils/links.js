export function externalLinkProps(url) {
    if (!url || url.startsWith('mailto:') || url.startsWith('tel:')) {
        return {};
    }

    return { target: '_blank', rel: 'noreferrer' };
}
