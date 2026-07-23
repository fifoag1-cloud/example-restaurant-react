import { Button } from '@/components/ui/button';
import LoadingText from '@/components/LoadingText';
import MenuItemCategoryGroup from './MenuItemCategoryGroup';
import useStrings from '@/i18n';
import MenuItemForm from "@/pages/admin/MenuItemForm.jsx";

function MenuSection({ menuItems, showForm, editingItem, onShowForm, onSetEditingItem, onSave, onToggleFeatured, onDelete, topLevelCategories, categories }) {
    const s = useStrings();

    const groupedItems = menuItems.reduce((acc, item) => {
        const key = item.categoryId || 'uncategorized';
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});

    const getCategoryName = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : s.categoryUncategorized;
    };

    const displayOrder = [...topLevelCategories.sort((a, b) => a.sortOrder - b.sortOrder)];
    if (groupedItems['uncategorized']) {
        displayOrder.push({ id: 'uncategorized', name: s.categoryUncategorized });
    }

    const categoriesWithItems = displayOrder.filter(cat => groupedItems[cat.id]);

    return (
        <div>
            {showForm && (
                <MenuItemForm
                    editingItem={editingItem}
                    onSave={onSave}
                    onCancel={() => { onShowForm(false); onSetEditingItem(null); }}
                    topLevelCategories={topLevelCategories}
                    categories={categories}
                />
            )}

            <div className="flex justify-end mb-4">
                <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => { onShowForm(true); onSetEditingItem(null); }}>
                    {s.adminAddMenuItem}
                </Button>
            </div>

            {menuItems.length === 0 ? (
                <LoadingText message={s.adminNoMenuItems} />
            ) : (
                <div className="space-y-6">
                    {categoriesWithItems.map((cat) => (
                        <MenuItemCategoryGroup
                            key={cat.id}
                            categoryName={cat.name}
                            items={groupedItems[cat.id]}
                            categories={categories}
                            onToggleFeatured={onToggleFeatured}
                            onEdit={(item) => { onShowForm(true); onSetEditingItem(item); }}
                            onDelete={onDelete}
                            s={s}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MenuSection;