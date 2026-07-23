import useStrings from '@/i18n';

function LoadingText({ message }) {
    const s = useStrings();
    return <p className="text-muted-foreground text-center py-8">{message || s.loading}</p>;
}

export default LoadingText;