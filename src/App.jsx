import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import Admin from './pages/admin/Admin';
import useTheme from './hooks/useTheme';

function App() {
    useTheme();

    return (
        <HashRouter>
            <div className="bg-background min-h-screen" style={{ fontFamily: 'var(--font-sans)' }}>
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/reservation" element={<Reservation />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </main>
            </div>
        </HashRouter>
    );
}

export default App;