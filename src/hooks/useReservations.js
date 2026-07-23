import { useState, useEffect } from 'react';

function useReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const API = import.meta.env.VITE_API_BASE_URL;

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/reservations`);
            if (res.ok) setReservations(await res.json());
        } catch (err) {
            console.error('Failed to fetch reservations:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`${API}/api/reservations/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
            }
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const deleteReservation = async (id, confirmMessage) => {
        if (!window.confirm(confirmMessage)) return;
        try {
            const res = await fetch(`${API}/api/reservations/${id}`, { method: 'DELETE' });
            if (res.ok) setReservations(prev => prev.filter(r => r.id !== id));
        } catch (err) {
            console.error('Failed to delete reservation:', err);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return { reservations, loading, updateStatus, deleteReservation };
}

export default useReservations;