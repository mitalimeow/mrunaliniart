import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white/85 w-full relative">
      <Navbar />
      <main>
        <Hero />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}

export default App;
