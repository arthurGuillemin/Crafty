import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalogue from './pages/Catalogue/Catalogue';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Catalogue />} />
      </Routes>
    </Router>
  );
}

export default App;
