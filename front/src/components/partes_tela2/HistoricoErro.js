import './HistoricoErro.css';
import ListarErro from './ListarErro';

function HistoricoErro() {
  const testeLista =[ '00:00','00:05','00:10','00:15','00:20','00:25','00:30','00:35','00:40','00:45' ]

    return (
      <div className='Historico_erro' >
        <p>Historico de Erro</p>
        <hr></hr>
        <ListarErro itens = {testeLista} />
      </div>
    );
  }
  
  export default HistoricoErro;