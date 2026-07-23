import { Button } from '@/components/ui/Button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import useStrings from '@/i18n/index.js';

function MenuItemCard({ item, categories, onToggleFeatured, onEdit, onDelete }) {
    const s = useStrings();

    const categoryName = categories.find(c => c.id === item.categoryId)?.name || '';
    const subcategoryName = categories.find(c => c.id === item.subcategoryId)?.name || '';

    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors duration-500">
            <div className="h-40 bg-primary/10 flex items-center justify-center text-5xl overflow-hidden">
                {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : '🍽️'}
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="font-bold text-lg text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>{item.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                            {categoryName && <Badge variant="outline" className="text-xs border-border text-muted-foreground">{categoryName}</Badge>}
                            {subcategoryName && <Badge variant="outline" className="text-xs border-primary/30 text-primary">{subcategoryName}</Badge>}
                        </div>
                    </div>
                    <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                    <Badge variant={item.featured ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => onToggleFeatured(item.id)}>
                        {item.featured ? s.adminFeaturedBadge : s.adminNotFeaturedBadge}
                    </Badge>
                    <div className="space-x-2">
                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => onEdit(item)}>{s.adminEditButton}</Button>
                        <Button size="sm" variant="ghostDestructive" onClick={() => onDelete(item.id)}>{s.adminDeleteButtonInline}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuItemCard;