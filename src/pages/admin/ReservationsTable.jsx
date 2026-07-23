import LoadingText from '@/components/LoadingText';
import ReservationSection from './ReservationSection';
import useStrings from '@/i18n';

function ReservationsTable({ reservations, onUpdateStatus, onDelete }) {
    const s = useStrings();

    if (reservations.length === 0) return <LoadingText message={s.adminNoReservations} />;

    const statusVariant = (status) => {
        switch (status) {
            case s.statusPending: return 'secondary';
            case s.statusConfirmed: return 'success';
            case s.statusCancelled: return 'destructive';
            default: return 'outline';
        }
    };

    const today = new Date().toISOString().split('T')[0];
    const past = reservations.filter(r => r.date < today);
    const upcoming = reservations.filter(r => r.date >= today);

    const sortByDateAndTime = (a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
    };

    const pastSorted = [...past].sort(sortByDateAndTime);
    const upcomingSorted = [...upcoming].sort(sortByDateAndTime);

    const groupByDate = (items) =>
        items.reduce((acc, r) => {
            if (!acc[r.date]) acc[r.date] = [];
            acc[r.date].push(r);
            return acc;
        }, {});

    const formatDate = (dateStr) => {
        const date = new Date(dateStr + 'T00:00:00');
        const currentLang = localStorage.getItem('language') || 'en';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return currentLang === 'bs' ? `${day}.${month}.${year}` : `${month}/${day}/${year}`;
    };

    const formatDateLabel = (dateStr) => {
        const label = formatDate(dateStr);
        if (dateStr === today) return `${label} — ${s.adminToday}`;
        return label;
    };

    const pastGroups = groupByDate(pastSorted);
    const upcomingGroups = groupByDate(upcomingSorted);

    return (
        <div className="space-y-6">
            {/* Upcoming - expanded by default */}
            {upcoming.length > 0 && (
                <ReservationSection
                    title={s.adminUpcomingReservations}
                    count={upcoming.length}
                    defaultExpanded={true}
                    groups={upcomingGroups}
                    formatDate={formatDate}
                    formatDateLabel={formatDateLabel}
                    isPast={false}
                    statusVariant={statusVariant}
                    onUpdateStatus={onUpdateStatus}
                    onDelete={onDelete}
                    s={s}
                />
            )}

            {/* Past - collapsed by default */}
            {past.length > 0 && (
                <ReservationSection
                    title={s.adminPastReservations}
                    count={past.length}
                    defaultExpanded={false}
                    groups={pastGroups}
                    formatDate={formatDate}
                    formatDateLabel={formatDate}
                    isPast={true}
                    statusVariant={statusVariant}
                    onUpdateStatus={onUpdateStatus}
                    onDelete={onDelete}
                    s={s}
                />
            )}
        </div>
    );
}

export default ReservationsTable;