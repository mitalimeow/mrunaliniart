import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArtPage from './pages/ArtPage';
import CommissionsPage from './pages/CommissionsPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminLayout from './components/AdminLayout';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminArtPage from './pages/AdminArtPage';
import AdminCommissionsPage from './pages/AdminCommissionsPage';
import Footer from './components/Footer';

/* ─── Public Layouts ───────────────────────────────────── */

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

function CommissionsLayout() {
  return (
    <div className="min-h-screen w-full relative">
      <Navbar />
      <main><CommissionsPage /></main>
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
        <Route path="/commissions" element={<CommissionsLayout />} />
        <Route path="/contact" element={<ContactLayout />} />

        {/* Admin login — no sidebar */}
        <Route path="/mniwal-admin" element={<AdminLoginPage />} />

        {/* Admin panel — persistent sidebar layout */}
        <Route path="/mniwal-admin" element={<AdminLayout />}>
          <Route path="enquiries" element={<AdminDashboardPage />} />
          <Route path="art" element={<AdminArtPage />} />
          <Route path="commissions" element={<AdminCommissionsPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="/:page" element={<HomeLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
