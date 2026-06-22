import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';

/* ─── Home layout (hero + gallery + footer) ─── */
function HomeLayout() {
  return (
    <div className="min-h-screen w-full relative">
      <Navbar />
      <main>
        <Hero />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}

/* ─── About layout (about page + footer) ─── */
function AboutLayout() {
  return (
    <div className="min-h-screen w-full relative">
      <Navbar />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomeLayout />} />
        <Route path="/about-me" element={<AboutLayout />} />
        {/* Fallback for other nav links (/art, /commissions, /contact) */}
        <Route path="/:page" element={<HomeLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
