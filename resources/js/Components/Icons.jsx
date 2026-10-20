export function ArrowUpRight({ size = 16, className = '', ...props }) {
    return (
        <svg
            className={`icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="square"
            aria-hidden="true"
            {...props}
        >
            <path d="M3.5 12.5 12.5 3.5M5 3.5h7.5V11" />
        </svg>
    );
}

export function ArrowDown({ size = 16, className = '', ...props }) {
    return (
        <svg
            className={`icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="square"
            aria-hidden="true"
            {...props}
        >
            <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
        </svg>
    );
}

export function ArrowLeft({ size = 16, className = '', ...props }) {
    return (
        <svg
            className={`icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="square"
            aria-hidden="true"
            {...props}
        >
            <path d="M13 8H2.5M6.5 4 2.5 8l4 4" />
        </svg>
    );
}

export function AccentMark({ size = 20, className = '', ...props }) {
    return (
        <svg
            className={`icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            aria-hidden="true"
            {...props}
        >
            <path d="M12 2.2 21.8 12 12 21.8 2.2 12Z" />
            <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
        </svg>
    );
}

export function MenuIcon({ open = false, size = 18, className = '', ...props }) {
    return (
        <svg
            className={`icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="square"
            aria-hidden="true"
            {...props}
        >
            {open ? (
                <>
                    <path d="m3 3 12 12" />
                    <path d="M15 3 3 15" />
                </>
            ) : (
                <>
                    <path d="M2 5h14" />
                    <path d="M2 13h14" />
                </>
            )}
        </svg>
    );
}
