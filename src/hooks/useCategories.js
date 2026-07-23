import { useState, useEffect } from 'react';

function useCategories() {
    const [categories, setCategories] = useState([]);
    const [topLevelCategories, setTopLevelCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const API = import.meta.env.VITE_API_BASE_URL;

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/categories`);
            if (res.ok) setCategories(await res.json());
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTopLevel = async () => {
        try {
            const res = await fetch(`${API}/api/categories/top-level`);
            if (res.ok) setTopLevelCategories(await res.json());
        } catch (err) {
            console.error('Failed to fetch top-level categories:', err);
        }
    };

    const getSubcategories = (parentId) => {
        return categories.filter(c => c.parentId === parentId);
    };

    const saveCategory = async (payload) => {
        const res = await fetch(`${API}/api/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Save failed');
        const saved = await res.json();
        await fetchCategories();
        await fetchTopLevel();
    };

    const updateCategory = async (id, payload) => {
        const res = await fetch(`${API}/api/categories/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Update failed');
        await fetchCategories();
        await fetchTopLevel();
    };

    const deleteCategory = async (id, confirmMessage) => {
        if (!window.confirm(confirmMessage)) return;
        try {
            const res = await fetch(`${API}/api/categories/${id}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchCategories();
                await fetchTopLevel();
            }
        } catch (err) {
            console.error('Failed to delete category:', err);
        }
    };

    const reorderCategory = async (categoryId, direction) => {
        const sorted = [...topLevelCategories].sort((a, b) => a.sortOrder - b.sortOrder);
        const currentIndex = sorted.findIndex(c => c.id === categoryId);
        if (currentIndex === -1) return;

        const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        if (swapIndex < 0 || swapIndex >= sorted.length) return;

        const current = sorted[currentIndex];
        const swapWith = sorted[swapIndex];

        try {
            const [res1, res2] = await Promise.all([
                fetch(`${API}/api/categories/${current.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: current.name, parentId: current.parentId, sortOrder: swapWith.sortOrder })
                }),
                fetch(`${API}/api/categories/${swapWith.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: swapWith.name, parentId: swapWith.parentId, sortOrder: current.sortOrder })
                })
            ]);

            if (!res1.ok || !res2.ok) throw new Error('Reorder failed');
            await fetchCategories();
            await fetchTopLevel();
        } catch (err) {
            console.error('Failed to reorder categories:', err);
        }
    };

    const getNextSortOrder = () => {
        if (topLevelCategories.length === 0) return 0;
        return Math.max(...topLevelCategories.map(c => c.sortOrder)) + 1;
    };

    useEffect(() => {
        fetchCategories();
        fetchTopLevel();
    }, []);

    return { categories, topLevelCategories, loading, getSubcategories, saveCategory, updateCategory, deleteCategory, reorderCategory, getNextSortOrder };
}

export default useCategories;