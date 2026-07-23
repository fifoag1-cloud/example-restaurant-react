import { useState, useEffect } from 'react';

function useMenuItems() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const API = import.meta.env.VITE_API_BASE_URL;

    const fetchMenuItems = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/menu`);
            if (res.ok) setMenuItems(await res.json());
        } catch (err) {
            console.error('Failed to fetch menu items:', err);
        } finally {
            setLoading(false);
        }
    };

    const saveMenuItem = async (payload, editingId) => {
        let res;
        if (editingId) {
            res = await fetch(`${API}/api/menu/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            res = await fetch(`${API}/api/menu`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }
        if (!res.ok) throw new Error('Save failed');
        const savedItem = await res.json();
        if (editingId) {
            setMenuItems(prev => prev.map(m => m.id === savedItem.id ? savedItem : m));
        } else {
            setMenuItems(prev => [...prev, savedItem]);
        }
    };

    const toggleFeatured = async (id) => {
        try {
            const res = await fetch(`${API}/api/menu/${id}/featured`, { method: 'PATCH' });
            if (res.ok) {
                const updated = await res.json();
                setMenuItems(prev => prev.map(m => m.id === id ? updated : m));
            }
        } catch (err) {
            console.error('Failed to toggle featured:', err);
        }
    };

    const deleteMenuItem = async (id, confirmMessage) => {
        if (!window.confirm(confirmMessage)) return;
        try {
            const res = await fetch(`${API}/api/menu/${id}`, { method: 'DELETE' });
            if (res.ok) setMenuItems(prev => prev.filter(m => m.id !== id));
        } catch (err) {
            console.error('Failed to delete menu item:', err);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    return { menuItems, loading, saveMenuItem, toggleFeatured, deleteMenuItem };
}

export default useMenuItems;