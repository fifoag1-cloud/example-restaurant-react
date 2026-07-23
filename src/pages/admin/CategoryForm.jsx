import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useStrings from '@/i18n';

function CategoryForm({ editingCategory, onSave, onCancel, topLevelCategories, isSubcategory, nextSortOrder }) {
    const [formData, setFormData] = useState({
        name: editingCategory?.name || '',
        parentId: editingCategory?.parentId?.toString() || '',
        sortOrder: editingCategory?.sortOrder?.toString() || nextSortOrder?.toString() || '0'
    });
    const [formStatus, setFormStatus] = useState('idle');
    const s = useStrings();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleParentChange = (value) => {
        setFormData(prev => ({ ...prev, parentId: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('loading');
        const payload = {
            name: formData.name,
            parentId: isSubcategory ? parseInt(formData.parentId) : null,
            sortOrder: parseInt(formData.sortOrder)
        };
        try {
            await onSave(payload, editingCategory?.id);
            setFormStatus('idle');
        } catch (err) {
            console.error('Failed to save category:', err);
            setFormStatus('error');
        }
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
                {editingCategory ? s.categoryEdit : (isSubcategory ? s.categoryNewSub : s.categoryNew)}
            </h3>
            {formStatus === 'error' && (
                <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm border border-destructive/20">{s.categorySaveFailed}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label className="text-muted-foreground">{s.categoryName}</Label>
                    <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Appetizers" className="bg-background border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary" />
                </div>
                {isSubcategory && (
                    <div>
                        <Label className="text-muted-foreground">{s.categoryParent}</Label>
                        <Select value={formData.parentId} onValueChange={handleParentChange}>
                            <SelectTrigger className="bg-background border-border text-foreground focus:border-primary">
                                <SelectValue placeholder={s.categorySelectCategory} />
                            </SelectTrigger>
                            <SelectContent>
                                {topLevelCategories.map(cat => (
                                    <SelectItem key={cat.id} value={cat.id.toString()}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                <div className="flex space-x-3">
                    <Button type="submit" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={formStatus === 'loading'}>
                        {formStatus === 'loading' ? s.adminSaving : (editingCategory ? s.categoryUpdateButton : s.categoryAddButton)}
                    </Button>
                    <Button type="button" variant="secondary" onClick={onCancel}>{s.adminCancelFormButton}</Button>
                </div>
            </form>
        </div>
    );
}

export default CategoryForm;