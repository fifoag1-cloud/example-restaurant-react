import MenuItemCard from "@/pages/admin/MenuItemCard.jsx";

function MenuItemCategoryGroup({ categoryName, items, categories, onToggleFeatured, onEdit, onDelete, s }) {
    return (
        <div>
            {/* Category header */}
            <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-foreground font-semibold text-sm">
                    {categoryName}
                </h3>
                <span className="text-muted-foreground text-xs">
          ({items.length})
        </span>
            </div>

            {/* Item cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <MenuItemCard
                        key={item.id}
                        item={item}
                        categories={categories}
                        onToggleFeatured={onToggleFeatured}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default MenuItemCategoryGroup;