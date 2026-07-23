import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnimateIn from '@/components/AnimateIn';
import Footer from '../components/Footer';
import useStrings from '@/i18n';

function Reservation() {
    const [formData, setFormData] = useState({ name: '', date: '', time: '', guests: '2' });
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const s = useStrings();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGuestsChange = (value) => {
        setFormData(prev => ({ ...prev, guests: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, guests: parseInt(formData.guests) })
            });
            if (!response.ok) throw new Error(s.reservationError);
            setStatus('success');
            setFormData({ name: '', date: '', time: '', guests: '2' });
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message);
        }
    };

    return (
        <>
            <section className="bg-background pt-32 pb-20">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <AnimateIn direction="left">
                            <div>
                                <p className="text-primary uppercase tracking-[0.3em] text-sm mb-2">{s.reservationSubtitle}</p>
                                <h2 className="text-4xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-serif)' }}>{s.reservationTitle}</h2>
                                <p className="text-muted-foreground mb-8 leading-relaxed">{s.reservationDescription}</p>
                                <div className="space-y-4 text-muted-foreground">
                                    <div><p className="text-foreground font-medium text-sm">{s.reservationPhone}</p><p className="text-sm">{s.reservationPhoneValue}</p></div>
                                    <div><p className="text-foreground font-medium text-sm">{s.reservationEmail}</p><p className="text-sm">{s.reservationEmailValue}</p></div>
                                    <div><p className="text-foreground font-medium text-sm">{s.reservationAddress}</p><p className="text-sm">{s.reservationAddressValue}</p></div>
                                    <div><p className="text-foreground font-medium text-sm">{s.reservationHours}</p><p className="text-sm">{s.reservationHoursValue}</p></div>
                                </div>
                            </div>
                        </AnimateIn>
                        <AnimateIn direction="right" delay={0.2}>
                            <div className="bg-card border border-border rounded-lg p-8">
                                <h3 className="text-xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-serif)' }}>{s.reservationFormTitle}</h3>
                                {status === 'success' && <div className="mb-6 p-4 bg-success/10 text-success rounded-lg text-center border border-success/20">{s.reservationSuccess}</div>}
                                {status === 'error' && <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg text-center border border-destructive/20">{errorMessage}</div>}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label className="text-muted-foreground">{s.reservationNameLabel}</Label>
                                        <Input name="name" value={formData.name} onChange={handleChange} required placeholder={s.reservationNamePlaceholder} className="bg-background border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-muted-foreground">{s.reservationDateLabel}</Label>
                                            <Input name="date" type="date" value={formData.date} onChange={handleChange} required className="bg-background border-border text-foreground focus:border-primary" />
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">{s.reservationTimeLabel}</Label>
                                            <Input name="time" type="time" value={formData.time} onChange={handleChange} required className="bg-background border-border text-foreground focus:border-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">{s.reservationGuestsLabel}</Label>
                                        <Select value={formData.guests} onValueChange={handleGuestsChange}>
                                            <SelectTrigger className="bg-background border-border text-foreground focus:border-primary">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                    <SelectItem key={num} value={num.toString()}>
                                                        {num} {num === 1 ? s.reservationGuestOne : s.reservationGuestsMany}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4" disabled={status === 'loading'}>
                                        {status === 'loading' ? s.reservationSubmitting : s.reservationSubmitButton}
                                    </Button>
                                </form>
                            </div>
                        </AnimateIn>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Reservation;