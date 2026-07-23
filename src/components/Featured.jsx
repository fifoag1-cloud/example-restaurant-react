import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimateIn from '@/components/AnimateIn';
import { StaggerChildren, StaggerItem } from '@/components/StaggerChildren';
import LoadingText from '@/components/LoadingText';
import useStrings from '@/i18n';

function Featured() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const s = useStrings();

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu/featured`);
                if (response.ok) setItems(await response.json());
            } catch (err) {
                console.error('Failed to fetch featured items:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    if (loading) return <section id="featured" className="bg-background py-20"><LoadingText /></section>;

    if (items.length === 0) {
        return (
            <section id="featured" className="bg-background py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <AnimateIn>
                        <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-2">{s.featuredSubtitle}</p>
                        <h3 className="text-4xl font-bold text-center mb-4 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
                            {s.featuredTitle}
                        </h3>
                    </AnimateIn>
                    <p className="text-muted-foreground text-center">{s.featuredEmpty}</p>
                </div>
            </section>
        );
    }

    return (
        <section id="featured" className="bg-background py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <AnimateIn>
                    <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-2">{s.featuredSubtitle}</p>
                    <h3 className="text-4xl font-bold text-center mb-12 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
                        {s.featuredTitle}
                    </h3>
                </AnimateIn>
                <StaggerChildren staggerDelay={0.15}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <StaggerItem key={item.id}>
                                <MenuCard item={item} />
                            </StaggerItem>
                        ))}
                    </div>
                </StaggerChildren>
                <AnimateIn delay={0.5}>
                    <div className="text-center mt-12">
                        <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
                            <Link to="/menu">{s.featuredViewMenuButton}</Link>
                        </Button>
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
}

function MenuCard({ item }) {
    return (
        <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500">
            <div className="h-52 bg-primary/10 flex items-center justify-center text-6xl overflow-hidden">
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                    <span className="group-hover:scale-110 transition-transform duration-500">🍽️</span>
                )}
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>{item.name}</h4>
                    <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
        </div>
    );
}

export default Featured;