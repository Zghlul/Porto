import { Link } from '@inertiajs/react';
import { ArrowUpRight } from './Icons';
import Reveal from './Reveal';

export default function SectionHead({
    label,
    number,
    title,
    titleId,
    intro,
    link,
    linkLabel,
    className = '',
}) {
    return (
        <Reveal className={`section-head ${className}`}>
            <div className="section-head__top">
                <span className="eyebrow">
                    {number && <span className="eyebrow__number">{number}</span>}
                    {label}
                </span>
                {link && (
                    <Link href={link} className="text-link section-head__link">
                        {linkLabel}
                        <ArrowUpRight size={14} />
                    </Link>
                )}
            </div>
            <div className="section-head__body">
                <h2 className="section-head__title" id={titleId}>
                    {title}
                </h2>
                {intro && <p className="section-head__intro">{intro}</p>}
            </div>
        </Reveal>
    );
}
