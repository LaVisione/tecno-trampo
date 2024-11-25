import './Tela1.css';
import Card from '../components/partes_tela1/Card';

function Tela1() {

    return (
      <div className='tela1'>
        <div className='Lado-lado' >
          <Card NomeBanco = "BB"                       bancoId={1} />
          <Card NomeBanco = "ITAU" Versao = "V2"       bancoId={2} />
          <Card NomeBanco = "ITAU" Versao = "Francesa" bancoId={3} />
          <Card NomeBanco = "SICOOB" Versao = "V2"     bancoId={4} />
          <Card NomeBanco = "SICOOB" Versao = "V3"     bancoId={5} />
        </div>
        <div className='Lado-lado' >
          <Card NomeBanco = "SICRED" Versao = "V2"     bancoId={6} />
          <Card NomeBanco = "SICRED" Versao = "V3"     bancoId={7} />
          <Card NomeBanco = "CAIXA"                    bancoId={8} />
          <Card NomeBanco = "SANTANDER"                bancoId={9} />
          <Card NomeBanco = "BARISUL"                  bancoId={10} />
        </div>
        <div className='Lado-lado' >
          <Card NomeBanco = "INTER"                    bancoId={11} />
        </div>
      </div>
    );
  }
  
  export default Tela1;