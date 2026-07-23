import { Button } from '@/components/ui/button';
import useStrings from '@/i18n';

function CategoryGroup({ category, isFirst, isLast, subcategories, onReorder, onEdit, onDelete }) {
    const s = useStrings();

    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-primary/5">
                <div>
                    <h4 className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>{category.name}</h4>
                </div>
                <div className="flex items-center space-x-1">
                    {/* Reorder arrows */}
                    {!isFirst && (
                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground h-8 w-8 p-0" onClick={() => onReorder(category.id, 'up')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                        </Button>
                    )}
                    {!isLast && (
                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground h-8 w-8 p-0" onClick={() => onReorder(category.id, 'down')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </Button>
                    )}
                    {/* Separator */}
                    <div className="h-4 w-px bg-border mx-1" />
                    {/* Edit/Delete */}
                    <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => onEdit(category)}>
                        {s.adminEditButton}
                    </Button>
                    <Button size="sm" variant="ghostDestructive" onClick={() => onDelete(category.id)}>
                        {s.adminDeleteButtonInline}
                    </Button>
                </div>
            </div>
            {subcategories.length > 0 ? (
                <div className="p-4 border-t border-border">
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">{s.categorySubcategories}</p>
                    <div className="space-y-2">
                        {subcategories.map(sub => (
                            <div key={sub.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                <span className="text-foreground text-sm">{sub.name}</span>
                                <div className="flex items-center space-x-2">
                                    <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground text-xs" onClick={() => onEdit(sub)}>
                                        {s.adminEditButton}
                                    </Button>
                                    <Button size="sm" variant="ghostDestructive" className="text-xs" onClick={() => onDelete(sub.id)}>
                                        {s.adminDeleteButtonInline}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="p-4 border-t border-border">
                    <p className="text-muted-foreground text-sm">{s.categoryNoSubcategories}</p>
                </div>
            )}
        </div>
    );
}

export default CategoryGroup;