import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalogue from './pages/Catalogue/Catalogue';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProductDetail from './pages/ProductDetails/ProductDetails';
import Profil from './pages/Profil/Profil';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  );
}

export default App;