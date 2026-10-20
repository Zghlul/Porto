import { Link } from '@inertiajs/react';
import { site } from '../data/portfolio';

export default function Logo({ inverted = false, onClick }) {
    return (
        <Link
            href="/"
            className={`brand ${inverted ? 'brand--inverted' : ''}`}
            aria-label={`${site.name}, beranda`}
            onClick={onClick}
        >
            <span className="brand__mark" aria-hidden="true">
                Z
            </span>
            <span className="brand__name">{site.name}</span>
        </Link>
    );
}
