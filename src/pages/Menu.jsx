import { useState, useEffect } from 'react';
import AnimateIn from '@/components/AnimateIn';
import { StaggerChildren, StaggerItem } from '@/components/StaggerChildren';
import LoadingText from '@/components/LoadingText';
import Footer from '../components/Footer';
import useStrings from '@/i18n';

function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [topLevelCategories, setTopLevelCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const s = useStrings();
    const API = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [menuRes, catRes, topRes] = await Promise.all([
                    fetch(`${API}/api/menu`),
                    fetch(`${API}/api/categories`),
                    fetch(`${API}/api/categories/top-level`)
                ]);
                if (menuRes.ok) setMenuItems(await menuRes.json());
                if (catRes.ok) setCategories(await catRes.json());
                if (topRes.ok) setTopLevelCategories(await topRes.json());
            } catch (err) {
                console.error('Failed to fetch data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getSubcategories = (parentId) => categories.filter(c => c.parentId === parentId);
    const getItemsForCategory = (categoryId) => menuItems.filter(item => item.categoryId === categoryId && !item.subcategoryId);
    const getItemsForSubcategory = (subcategoryId) => menuItems.filter(item => item.subcategoryId === subcategoryId);

    return (
        <>
            <section className="bg-background pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <AnimateIn>
                        <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-2">{s.menuSubtitle}</p>
                        <h2 className="text-5xl font-bold text-center mb-4 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
                            {s.menuTitle}
                        </h2>
                        <p className="text-muted-foreground text-center mb-12">{s.menuDescription}</p>
                    </AnimateIn>
                    {loading ? <LoadingText /> : menuItems.length === 0 ? (
                        <p className="text-muted-foreground text-center">{s.menuEmpty}</p>
                    ) : (
                        <div className="space-y-12">
                            {topLevelCategories.map(category => {
                                const directItems = getItemsForCategory(category.id);
                                const subcategories = getSubcategories(category.id);
                                if (directItems.length === 0 && subcategories.every(sub => getItemsForSubcategory(sub.id).length === 0)) return null;

                                return (
                                    <div key={category.id}>
                                        <AnimateIn>
                                            <h3 className="text-2xl font-bold text-primary mb-6 uppercase tracking-wider" style={{ fontFamily: 'var(--font-serif)' }}>
                                                {category.name}
                                            </h3>
                                        </AnimateIn>

                                        {/* Direct items (no subcategory) */}
                                        {directItems.length > 0 && (
                                            <StaggerChildren staggerDelay={0.08}>
                                                <div className="space-y-6">
                                                    {directItems.map(item => (
                                                        <StaggerItem key={item.id}>
                                                            <MenuItemRow item={item} />
                                                        </StaggerItem>
                                                    ))}
                                                </div>
                                            </StaggerChildren>
                                        )}

                                        {/* Items grouped by subcategory */}
                                        {subcategories.map(sub => {
                                            const subItems = getItemsForSubcategory(sub.id);
                                            if (subItems.length === 0) return null;
                                            return (
                                                <div key={sub.id} className="mt-8">
                                                    <AnimateIn>
                                                        <h4 className="text-lg font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                                                            {sub.name}
                                                        </h4>
                                                    </AnimateIn>
                                                    <StaggerChildren staggerDelay={0.08}>
                                                        <div className="space-y-6">
                                                            {subItems.map(item => (
                                                                <StaggerItem key={item.id}>
                                                                    <MenuItemRow item={item} />
                                                                </StaggerItem>
                                                            ))}
                                                        </div>
                                                    </StaggerChildren>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}

                            {/* Items without a category */}
                            {getItemsForCategory(null).length > 0 && (
                                <div>
                                    <AnimateIn>
                                        <h3 className="text-2xl font-bold text-primary mb-6 uppercase tracking-wider" style={{ fontFamily: 'var(--font-serif)' }}>
                                            {s.menuOther}
                                        </h3>
                                    </AnimateIn>
                                    <StaggerChildren staggerDelay={0.08}>
                                        <div className="space-y-6">
                                            {getItemsForCategory(null).map(item => (
                                                <StaggerItem key={item.id}>
                                                    <MenuItemRow item={item} />
                                                </StaggerItem>
                                            ))}
                                        </div>
                                    </StaggerChildren>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}

function MenuItemRow({ item }) {
    return (
        <div className="group flex justify-between items-start border-b border-border pb-6 hover:border-primary/30 transition-colors duration-500">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>
                    {item.name}
                    {item.featured && <span className="text-primary ml-2 text-sm">⭐</span>}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
            </div>
            <span className="text-primary font-bold ml-8">${item.price.toFixed(2)}</span>
        </div>
    );
}

export default Menu;