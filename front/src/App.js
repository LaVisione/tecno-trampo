//import logo from './logo.svg';
import './App.css';
import FooterGeral from './components/Layout/FooterGeral';
import NavBar from './components/Layout/NavBar';
import Tela1 from './pages/Tela1';
import Tela2 from './pages/Tela2';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


// eventos = onClick (clicar), onChange(mostrar) e onSubmit(enviar)

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
          <Route exact path="/" element={<Tela1 />} />
          <Route exact path="/Grafico" element={<Tela2 />} />
      </Routes>
      <FooterGeral />
    </Router>
  );
}

export default App;
