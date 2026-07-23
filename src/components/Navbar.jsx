import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import useStrings from '@/i18n';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const s = useStrings();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    const handleNavClick = (sectionId) => {
        setMobileOpen(false);
        if (window.location.hash !== '#/') {
            window.location.hash = '#/';
            setTimeout(() => scrollToSection(sectionId), 300);
        } else {
            scrollToSection(sectionId);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? 'bg-background/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Brand */}
                    <a href="#/" className="text-2xl font-bold text-foreground cursor-pointer" style={{ fontFamily: 'var(--font-serif)' }}>
                        {s.brandName}
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={() => handleNavClick('hero')} className="text-foreground/80 hover:text-foreground transition-colors text-sm uppercase tracking-wider">
                            {s.navHome}
                        </button>
                        <button onClick={() => handleNavClick('featured')} className="text-foreground/80 hover:text-foreground transition-colors text-sm uppercase tracking-wider">
                            {s.navMenu}
                        </button>
                        <Link to="/reservation" className="text-foreground/80 hover:text-foreground transition-colors text-sm uppercase tracking-wider">
                            {s.navReservation}
                        </Link>
                        <Link to="/admin" className="text-foreground/80 hover:text-foreground transition-colors text-sm uppercase tracking-wider">
                            {s.navAdmin}
                        </Link>
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </div>

                    {/* Desktop Book Button */}
                    <div className="hidden md:block">
                        <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Link to="/reservation">{s.navBookTable}</Link>
                        </Button>
                    </div>

                    {/* Mobile: Hamburger + Book Button */}
                    <div className="flex items-center space-x-2 md:hidden">
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-foreground hover:bg-card">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="4" x2="20" y1="12" y2="12"/>
                                        <line x1="4" x2="20" y1="6" y2="6"/>
                                        <line x1="4" x2="20" y1="18" y2="18"/>
                                    </svg>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-background border-border w-[280px]">
                                <SheetTitle className="text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>{s.brandName}</SheetTitle>
                                <div className="mt-8 space-y-6">
                                    <div className="space-y-4">
                                        <button onClick={() => handleNavClick('hero')} className="text-foreground/80 hover:text-foreground transition-colors text-sm uppercase tracking-wider w-full text-left py-2">
                                            {s.navHome}
                                        </button>
                                        <button onClick={() => handleNavClick('featured')} className="text-foreground/80 hover:text-foreground transition-colors text-sm uppercase tracking-wider w-full text-left py-2">
                                            {s.navMenu}
                                        </button>
                                        <Link to="/reservation" onClick={() => setMobileOpen(false)} className="text-foreground/80 hover:text-foreground transition-colors text-sm uppercase tracking-wider block py-2">
                                            {s.navReservation}
                                        </Link>
                                        <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-foreground/80 hover:text-foreground transition-colors text-sm uppercase tracking-wider block py-2">
                                            {s.navAdmin}
                                        </Link>
                                    </div>
                                    <div className="border-t border-border pt-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground text-xs uppercase tracking-wider">Language</span>
                                            <LanguageSwitcher />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground text-xs uppercase tracking-wider">Theme</span>
                                            <ThemeSwitcher />
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Link to="/reservation">{s.navBookTable}</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;