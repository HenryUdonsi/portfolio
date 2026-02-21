import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Hero from './components/hero';
import Works from './components/works';
import ListamApp from './listam/ListamApp';

function Portfolio() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Works />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/listam/*" element={<ListamApp />} />
      </Routes>
    </BrowserRouter>
  );
}
