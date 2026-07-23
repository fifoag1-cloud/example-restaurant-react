import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimateIn from '@/components/AnimateIn';
import useStrings from '@/i18n';

function Hero() {
    const s = useStrings();

    return (
        <section id="hero" className="relative bg-background min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 z-10" />
            <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="max-w-xl pt-20">
                    <AnimateIn delay={0.1}>
                        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">{s.heroSubtitle}</p>
                    </AnimateIn>
                    <AnimateIn delay={0.2}>
                        <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                            {s.heroTitle}
                        </h2>
                    </AnimateIn>
                    <AnimateIn delay={0.3}>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            {s.heroDescription}
                        </p>
                    </AnimateIn>
                    <AnimateIn delay={0.4}>
                        <div className="flex space-x-4">
                            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                                <Link to="/reservation">{s.heroReserveButton}</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-border text-foreground hover:bg-accent/10">
                                <Link to="/menu">{s.heroViewMenuButton}</Link>
                            </Button>
                        </div>
                    </AnimateIn>
                    <AnimateIn delay={0.5}>
                        <div className="mt-12 flex items-center space-x-6 text-muted-foreground text-sm">
                            <div>
                                <p className="text-foreground font-medium">{s.heroHours}</p>
                                <p>{s.heroHoursValue}</p>
                            </div>
                            <div className="h-8 w-px bg-border" />
                            <div>
                                <p className="text-foreground font-medium">{s.heroLocation}</p>
                                <p>{s.heroLocationValue}</p>
                            </div>
                        </div>
                    </AnimateIn>
                </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center">
                <div className="grid grid-cols-2 gap-3 p-8">
                    <div className="h-48 w-48 bg-card rounded-lg flex items-center justify-center text-6xl">🍕</div>
                    <div className="h-48 w-48 bg-card rounded-lg flex items-center justify-center text-6xl mt-8">🥩</div>
                    <div className="h-48 w-48 bg-card rounded-lg flex items-center justify-center text-6xl -mt-8">🍝</div>
                    <div className="h-48 w-48 bg-card rounded-lg flex items-center justify-center text-6xl">🍷</div>
                </div>
            </div>
        </section>
    );
}

export default Hero;