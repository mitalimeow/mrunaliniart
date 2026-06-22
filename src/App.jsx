import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';

/* ─── Home layout ─── */
function HomeLayout() {
  return (
    <div className="min-h-screen w-full relative">
      <Navbar />
      <main>
        <HomePage />
      </main>
    </div>
  );
}

/* ─── About layout ─── */
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
        {/* Placeholder for future pages */}
        <Route path="/:page" element={<HomeLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
