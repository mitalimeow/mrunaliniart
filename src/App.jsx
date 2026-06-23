import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArtPage from './pages/ArtPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import Footer from './components/Footer';

/* ─── Layouts ──────────────────────────────────────────── */

function HomeLayout() {
  return (
    <div className="min-h-screen w-full relative">
      <Navbar />
      <main><HomePage /></main>
    </div>
  );
}

function AboutLayout() {
  return (
    <div className="min-h-screen w-full relative">
      <Navbar />
      <main><AboutPage /></main>
      <Footer />
    </div>
  );
}

function ArtLayout() {
  return (
    <div className="min-h-screen w-full relative">
      <Navbar />
      <main><ArtPage /></main>
    </div>
  );
}

function ContactLayout() {
  return (
    <div className="min-h-screen w-full relative">
      <Navbar />
      <main><ContactPage /></main>
    </div>
  );
}

/* ─── App ──────────────────────────────────────────────── */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomeLayout />} />
        <Route path="/about-me" element={<AboutLayout />} />
        <Route path="/art" element={<ArtLayout />} />
        <Route path="/contact" element={<ContactLayout />} />

        {/* Admin — no navbar/footer */}
        <Route path="/mniwal-admin" element={<AdminLoginPage />} />
        <Route path="/mniwal-admin/enquiries" element={<AdminDashboardPage />} />

        {/* Catch-all */}
        <Route path="/:page" element={<HomeLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
