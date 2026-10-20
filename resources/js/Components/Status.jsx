export default function Status({ label, detail, className = '' }) {
    return (
        <span className={`status ${className}`} title={detail || label}>
            <span className="status__dot" aria-hidden="true" />
            <span className="status__label">{label}</span>
        </span>
    );
}
