function Featured() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h3 className="text-3xl font-bold text-center mb-12">Our Specials</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-amber-200 flex items-center justify-center text-amber-800 text-6xl">
                        🍕
                    </div>
                    <div className="p-6">
                        <h4 className="text-xl font-bold mb-2">Margherita Pizza</h4>
                        <p className="text-gray-600 mb-4">Fresh tomatoes, mozzarella, and basil on our signature crust</p>
                        <p className="text-amber-600 font-bold text-lg">$14.99</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-amber-200 flex items-center justify-center text-amber-800 text-6xl">
                        🍝
                    </div>
                    <div className="p-6">
                        <h4 className="text-xl font-bold mb-2">Carbonara Pasta</h4>
                        <p className="text-gray-600 mb-4">Creamy egg sauce with pancetta and parmesan cheese</p>
                        <p className="text-amber-600 font-bold text-lg">$16.99</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-amber-200 flex items-center justify-center text-amber-800 text-6xl">
                        🥩
                    </div>
                    <div className="p-6">
                        <h4 className="text-xl font-bold mb-2">Grilled Steak</h4>
                        <p className="text-gray-600 mb-4">Premium cut with roasted vegetables and red wine sauce</p>
                        <p className="text-amber-600 font-bold text-lg">$24.99</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Featured;