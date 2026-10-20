import { useEffect, useState } from 'react';
import { site } from '../data/portfolio';

export default function LocalTime({ showZone = false, className = '' }) {
    const [time, setTime] = useState(null);

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: site.timezone,
        });

        const tick = () => setTime(formatter.format(new Date()));

        tick();
        const interval = window.setInterval(tick, 30_000);

        return () => window.clearInterval(interval);
    }, []);

    return (
        <span className={`local-time ${className}`} title={`Waktu lokal di ${site.city}`}>
            <time>{time ?? '--:--'}</time>
            {showZone && <span className="local-time__zone">WIB</span>}
        </span>
    );
}
