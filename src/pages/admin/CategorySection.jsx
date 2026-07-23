import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoadingText from '@/components/LoadingText';
import CategoryForm from './CategoryForm';
import CategoryGroup from './CategoryGroup';
import useStrings from '@/i18n';

function CategorySection({ topLevelCategories, categories, getSubcategories, saveCategory, updateCategory, deleteCategory, reorderCategory, getNextSortOrder }) {
    const [showForm, setShowForm] = useState(false);
    const [showSubForm, setShowSubForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const s = useStrings();

    const sortedCategories = [...topLevelCategories].sort((a, b) => a.sortOrder - b.sortOrder);

    const handleSave = async (payload, editingId) => {
        if (editingId) {
            await updateCategory(editingId, payload);
        } else {
            await saveCategory(payload);
        }
        setShowForm(false);
        setShowSubForm(false);
        setEditingCategory(null);
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        if (category.parentId) {
            setShowSubForm(true);
            setShowForm(false);
        } else {
            setShowForm(true);
            setShowSubForm(false);
        }
    };

    const handleDelete = (id) => {
        deleteCategory(id, s.categoryDeleteConfirm);
    };

    const handleReorder = (categoryId, direction) => {
        reorderCategory(categoryId, direction);
    };

    const nextSortOrder = getNextSortOrder();

    return (
        <div>
            {showForm && (
                <CategoryForm
                    editingCategory={editingCategory?.parentId === null ? editingCategory : null}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditingCategory(null); }}
                    topLevelCategories={topLevelCategories}
                    isSubcategory={false}
                    nextSortOrder={nextSortOrder}
                />
            )}
            {showSubForm && (
                <CategoryForm
                    editingCategory={editingCategory?.parentId ? editingCategory : null}
                    onSave={handleSave}
                    onCancel={() => { setShowSubForm(false); setEditingCategory(null); }}
                    topLevelCategories={topLevelCategories}
                    isSubcategory={true}
                    nextSortOrder={nextSortOrder}
                />
            )}

            <div className="flex space-x-3 mb-4">
                <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => { setShowForm(true); setShowSubForm(false); setEditingCategory(null); }}>
                    {s.categoryAdd}
                </Button>
                {topLevelCategories.length > 0 && (
                    <Button variant="outline" className="border-border text-foreground hover:bg-card" onClick={() => { setShowSubForm(true); setShowForm(false); setEditingCategory(null); }}>
                        {s.categoryAddSub}
                    </Button>
                )}
            </div>

            {sortedCategories.length === 0 ? (
                <LoadingText message={s.categoryNoCategories} />
            ) : (
                <div className="space-y-6">
                    {sortedCategories.map((category, index) => (
                        <CategoryGroup
                            key={category.id}
                            category={category}
                            isFirst={index === 0}
                            isLast={index === sortedCategories.length - 1}
                            subcategories={getSubcategories(category.id)}
                            onReorder={handleReorder}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategorySection;