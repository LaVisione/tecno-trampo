import './Tela2.css';
import HistoricoErro from '../components/partes_tela2/HistoricoErro';
import Grafico from '../components/partes_tela2/Grafico';

function Tela2() {

    return (
      <div className='tela2'>
        <HistoricoErro />
        <Grafico />
      </div>
    );
  }
  
  export default Tela2;