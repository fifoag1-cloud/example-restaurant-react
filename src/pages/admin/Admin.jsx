import { useState } from 'react';
import useReservations from '@/hooks/useReservations';
import useMenuItems from '@/hooks/useMenuItems';
import useCategories from '@/hooks/useCategories';
import LoadingText from '@/components/LoadingText';
import ReservationsTable from './ReservationsTable';
import MenuSection from './MenuSection';
import CategorySection from './CategorySection';
import useStrings from '@/i18n';

function Admin() {
    const [activeTab, setActiveTab] = useState('reservations');
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const { reservations, loading: reservationsLoading, updateStatus, deleteReservation } = useReservations();
    const { menuItems, loading: menuLoading, saveMenuItem, toggleFeatured, deleteMenuItem } = useMenuItems();
    const { categories, topLevelCategories, loading: categoriesLoading, getSubcategories, saveCategory, updateCategory, deleteCategory, reorderCategory, getNextSortOrder } = useCategories();
    const s = useStrings();

    const handleSaveMenuItem = async (payload, editingId) => {
        await saveMenuItem(payload, editingId);
        setShowForm(false);
        setEditingItem(null);
    };

    const handleDeleteReservation = (id) => {
        deleteReservation(id, s.adminDeleteReservationConfirm);
    };

    const handleDeleteMenuItem = (id) => {
        deleteMenuItem(id, s.adminDeleteMenuConfirm);
    };

    const getLoading = () => {
        if (activeTab === 'reservations') return reservationsLoading;
        if (activeTab === 'menu') return menuLoading;
        return categoriesLoading;
    };

    return (
        <div className="bg-background min-h-screen pt-24 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
                    {s.adminTitle}
                </h2>
                <div className="flex border-b border-border mb-6">
                    <button onClick={() => setActiveTab('reservations')} className={`px-6 py-3 font-semibold ${activeTab === 'reservations' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                        {s.adminReservationsTab}
                    </button>
                    <button onClick={() => { setActiveTab('menu'); setShowForm(false); setEditingItem(null); }} className={`px-6 py-3 font-semibold ${activeTab === 'menu' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                        {s.adminMenuTab}
                    </button>
                    <button onClick={() => setActiveTab('categories')} className={`px-6 py-3 font-semibold ${activeTab === 'categories' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                        {s.categoryTitle}
                    </button>
                </div>
                {getLoading() ? <LoadingText /> : (
                    activeTab === 'reservations' ? (
                        <ReservationsTable reservations={reservations} onUpdateStatus={updateStatus} onDelete={handleDeleteReservation} />
                    ) : activeTab === 'menu' ? (
                        <MenuSection menuItems={menuItems} showForm={showForm} editingItem={editingItem} onShowForm={setShowForm} onSetEditingItem={setEditingItem} onSave={handleSaveMenuItem} onToggleFeatured={toggleFeatured} onDelete={handleDeleteMenuItem} topLevelCategories={topLevelCategories} categories={categories} />
                    ) : (
                        <CategorySection topLevelCategories={topLevelCategories} categories={categories} getSubcategories={getSubcategories} saveCategory={saveCategory} updateCategory={updateCategory} deleteCategory={deleteCategory} reorderCategory={reorderCategory} getNextSortOrder={getNextSortOrder} />
                    )
                )}
            </div>
        </div>
    );
}

export default Admin;