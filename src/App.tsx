import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projection from './pages/Projection';
import Control from './pages/Control';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projection" element={<Projection />} />
        <Route path="/control" element={<Control />} />
      </Routes>
    </HashRouter>
  );
}
