import { Link } from 'react-router-dom';
import AnimateIn from '@/components/AnimateIn';
import useStrings from '@/i18n';

function Footer() {
    const s = useStrings();

    return (
        <footer className="bg-background border-t border-border">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <AnimateIn>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-serif)' }}>{s.brandName}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{s.footerBrandDescription}</p>
                        </div>
                    </AnimateIn>
                    <AnimateIn delay={0.1}>
                        <div>
                            <h4 className="text-foreground font-medium mb-4 uppercase tracking-wider text-sm">{s.footerMenuTitle}</h4>
                            <div className="space-y-2">
                                <Link to="/menu" className="text-muted-foreground hover:text-primary transition text-sm">{s.footerMenuStarters}</Link><br />
                                <Link to="/menu" className="text-muted-foreground hover:text-primary transition text-sm">{s.footerMenuMains}</Link><br />
                                <Link to="/menu" className="text-muted-foreground hover:text-primary transition text-sm">{s.footerMenuDesserts}</Link><br />
                            </div>
                        </div>
                    </AnimateIn>
                    <AnimateIn delay={0.2}>
                        <div>
                            <h4 className="text-foreground font-medium mb-4 uppercase tracking-wider text-sm">{s.footerVisitTitle}</h4>
                            <div className="space-y-2 text-muted-foreground text-sm">
                                <p>{s.footerVisitAddress1}</p>
                                <p>{s.footerVisitAddress2}</p>
                                <p>{s.footerVisitPhone}</p>
                            </div>
                        </div>
                    </AnimateIn>
                    <AnimateIn delay={0.3}>
                        <div>
                            <h4 className="text-foreground font-medium mb-4 uppercase tracking-wider text-sm">{s.footerHoursTitle}</h4>
                            <div className="space-y-2 text-muted-foreground text-sm">
                                <p>{s.footerHoursMonThu}</p>
                                <p>{s.footerHoursFriSat}</p>
                                <p>{s.footerHoursSun}</p>
                            </div>
                        </div>
                    </AnimateIn>
                </div>
                <div className="mt-12 pt-8 border-t border-border text-center">
                    <p className="text-muted-foreground text-sm">{s.footerCopyright}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;