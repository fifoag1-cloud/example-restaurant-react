import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-2xl font-bold text-amber-600">La Bella</Link>
                    <div className="space-x-6">
                        <Link to="/" className="text-gray-600 hover:text-amber-600">Home</Link>
                        <Link to="/menu" className="text-gray-600 hover:text-amber-600">Menu</Link>
                        <Link to="/reservation" className="text-gray-600 hover:text-amber-600">Reservation</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-amber-600">Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;