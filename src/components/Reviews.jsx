import AnimateIn from '@/components/AnimateIn';
import { StaggerChildren, StaggerItem } from '@/components/StaggerChildren';
import useStrings from '@/i18n';

function StarRating({ rating }) {
    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={i < rating ? 'text-primary' : 'text-border'}>★</span>
            ))}
        </div>
    );
}

function ReviewCard({ review }) {
    return (
        <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors duration-500">
            <StarRating rating={review.rating} />
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">"{review.text}"</p>
            <div className="mt-4 pt-4 border-t border-border">
                <p className="text-foreground font-medium" style={{ fontFamily: 'var(--font-serif)' }}>{review.name}</p>
                <p className="text-muted-foreground text-xs mt-1">{review.date}</p>
            </div>
        </div>
    );
}

function Reviews() {
    const s = useStrings();

    return (
        <section id="reviews" className="bg-background py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <AnimateIn>
                    <p className="text-primary uppercase tracking-[0.3em] text-sm text-center mb-2">{s.reviewsSubtitle}</p>
                    <h3 className="text-4xl font-bold text-center mb-12 text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
                        {s.reviewsTitle}
                    </h3>
                </AnimateIn>
                <StaggerChildren staggerDelay={0.2}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {s.reviews.map((review) => (
                            <StaggerItem key={review.name}>
                                <ReviewCard review={review} />
                            </StaggerItem>
                        ))}
                    </div>
                </StaggerChildren>
            </div>
        </section>
    );
}

export default Reviews;