import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, CategoryPage, CartPage } from "./pages/index";
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import { Provider } from 'react-redux';
import store from "./store/store";
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          {/* <Footer /> */}

        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
