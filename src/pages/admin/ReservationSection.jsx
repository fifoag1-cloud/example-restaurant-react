import { useState } from 'react';
import ReservationGroup from './ReservationGroup';

function ReservationSection({ title, count, defaultExpanded, groups, formatDate, formatDateLabel, isPast, statusVariant, onUpdateStatus, onDelete, s }) {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <div className="border border-border rounded-lg">
            {/* Sticky header — part of the card */}
            <div className="sticky top-[88px] z-10 bg-card border-b border-border px-6 py-3 rounded-t-lg">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full flex items-center justify-between"
                >
                    <span className="text-foreground font-semibold text-sm">{title} ({count})</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`text-muted-foreground transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                    >
                        <path d="m6 9 6 6 6-6"/>
                    </svg>
                </button>
            </div>

            {/* Expandable content — inside the same card */}
            <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                    maxHeight: expanded ? '5000px' : '0px',
                    opacity: expanded ? 1 : 0
                }}
            >
                <div className="p-4 space-y-4">
                    {Object.keys(groups).map((date) => (
                        <ReservationGroup
                            key={date}
                            dateLabel={formatDateLabel ? formatDateLabel(date) : formatDate(date)}
                            reservations={groups[date]}
                            isPast={isPast}
                            statusVariant={statusVariant}
                            onUpdateStatus={onUpdateStatus}
                            onDelete={onDelete}
                            s={s}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReservationSection;