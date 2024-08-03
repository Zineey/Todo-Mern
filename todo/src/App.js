import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home.js';
import Navbar from './components/Navbar.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
