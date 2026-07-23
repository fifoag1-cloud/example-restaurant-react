import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function ReservationGroup({ dateLabel, reservations, isPast, statusVariant, onUpdateStatus, onDelete, s }) {
    const headerColor = isPast ? 'text-muted-foreground' : 'text-foreground';

    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Date header */}
            <div className="px-6 py-3 bg-background border-b border-border">
                <p className={`${headerColor} font-semibold text-sm`}>{dateLabel}</p>
            </div>

            {/* Table */}
            <table className="w-full">
                <thead>
                <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[25%]">{s.adminTableName}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">{s.adminTableTime}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[10%]">{s.adminTableGuests}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">{s.adminTableStatus}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[35%]">{s.adminTableActions}</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-border">
                {reservations.map((r) => (
                    <tr key={r.id} className="hover:bg-background/50 transition-colors">
                        <td className="px-6 py-4 text-foreground">{r.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{r.time}</td>
                        <td className="px-6 py-4 text-muted-foreground">{r.guests}</td>
                        <td className="px-6 py-4">
                            <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
                        </td>
                        <td className="px-6 py-4 space-x-2">
                            {r.status === s.statusPending && (
                                <Button size="sm" variant="success" onClick={() => onUpdateStatus(r.id, s.statusConfirmed)}>
                                    {s.adminConfirmButton}
                                </Button>
                            )}
                            {r.status !== s.statusCancelled && (
                                <Button size="sm" variant="warning" onClick={() => onUpdateStatus(r.id, s.statusCancelled)}>
                                    {s.adminCancelButton}
                                </Button>
                            )}
                            <Button size="sm" variant="destructive" onClick={() => onDelete(r.id)}>
                                {s.adminDeleteButton}
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReservationGroup;