import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="relative bg-amber-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <h2 className="text-5xl font-bold mb-4">Welcome to La Bella</h2>
                <p className="text-xl mb-8 text-amber-100">
                    Authentic Italian cuisine made with love and fresh ingredients
                </p>
                <Link
                    to="/reservation"
                    className="bg-white text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition"
                >
                    Make a Reservation
                </Link>
            </div>
        </section>
    );
}

export default Hero;