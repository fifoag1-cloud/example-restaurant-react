import { useState } from 'react';
import { Button } from '@/components/ui/Button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import useStrings from '@/i18n/index.js';

function MenuItemForm({ editingItem, onSave, onCancel, topLevelCategories, categories }) {
    const [formData, setFormData] = useState({
        name: editingItem?.name || '',
        description: editingItem?.description || '',
        price: editingItem?.price?.toString() || '',
        imageUrl: editingItem?.imageUrl || '',
        featured: editingItem?.featured || false,
        categoryId: editingItem?.categoryId?.toString() || '',
        subcategoryId: editingItem?.subcategoryId?.toString() || ''
    });
    const [formStatus, setFormStatus] = useState('idle');
    const s = useStrings();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (value) => {
        setFormData(prev => ({ ...prev, categoryId: value, subcategoryId: '' }));
    };

    const handleSubcategoryChange = (value) => {
        setFormData(prev => ({ ...prev, subcategoryId: value }));
    };

    const handleFeaturedChange = (checked) => {
        setFormData(prev => ({ ...prev, featured: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('loading');
        const payload = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            imageUrl: formData.imageUrl,
            featured: formData.featured,
            categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
            subcategoryId: formData.subcategoryId ? parseInt(formData.subcategoryId) : null
        };
        try {
            await onSave(payload, editingItem?.id);
            setFormStatus('idle');
        } catch (err) {
            console.error('Failed to save:', err);
            setFormStatus('error');
        }
    };

    const availableSubcategories = formData.categoryId
        ? categories.filter(c => c.parentId === parseInt(formData.categoryId))
        : [];

    return (
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
                {editingItem ? s.adminEditMenuItem : s.adminNewMenuItem}
            </h3>
            {formStatus === 'error' && (
                <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm border border-destructive/20">{s.adminSaveFailed}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="text-muted-foreground">{s.adminNameLabel}</Label>
                        <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Margherita Pizza" className="bg-background border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary" />
                    </div>
                    <div>
                        <Label className="text-muted-foreground">{s.adminPriceLabel}</Label>
                        <Input name="price" type="number" value={formData.price} onChange={handleChange} required step="0.01" min="0" placeholder="14.99" className="bg-background border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="text-muted-foreground">{s.adminNameLabel}</Label>
                        <Select value={formData.categoryId} onValueChange={handleCategoryChange}>
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
                    {availableSubcategories.length > 0 && (
                        <div>
                            <Label className="text-muted-foreground">{s.categorySubLabel}</Label>
                            <Select value={formData.subcategoryId} onValueChange={handleSubcategoryChange}>
                                <SelectTrigger className="bg-background border-border text-foreground focus:border-primary">
                                    <SelectValue placeholder={s.categorySelectSubcategory} />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableSubcategories.map(sub => (
                                        <SelectItem key={sub.id} value={sub.id.toString()}>
                                            {sub.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                <div>
                    <Label className="text-muted-foreground">{s.adminDescriptionLabel}</Label>
                    <Textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Fresh tomatoes, mozzarella, and basil" className="bg-background border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary" />
                </div>
                <div>
                    <Label className="text-muted-foreground">{s.adminImageUrlLabel}</Label>
                    <Input name="imageUrl" type="url" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/pizza.jpg" className="bg-background border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary" />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="featured" checked={formData.featured} onCheckedChange={handleFeaturedChange} />
                    <Label htmlFor="featured" className="text-muted-foreground cursor-pointer">{s.adminFeaturedLabel}</Label>
                </div>
                <div className="flex space-x-3">
                    <Button type="submit" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={formStatus === 'loading'}>
                        {formStatus === 'loading' ? s.adminSaving : (editingItem ? s.adminUpdateButton : s.adminAddButton)}
                    </Button>
                    <Button type="button" variant="secondary" onClick={onCancel}>{s.adminCancelFormButton}</Button>
                </div>
            </form>
        </div>
    );
}

export default MenuItemForm;