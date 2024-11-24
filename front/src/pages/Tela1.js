import './Tela1.css';
import Card from '../components/partes_tela1/Card';

function Tela1() {

    return (
      <div className='tela1'>
        <div className='Lado-lado' >
          <Card NomeBanco = "BB" />
          <Card NomeBanco = "ITAU" Versao = "V2" />
          <Card NomeBanco = "ITAU" Versao = "Francesa" />
          <Card NomeBanco = "SICOOB" Versao = "V2" />
          <Card NomeBanco = "SICOOB" Versao = "V3" />
        </div>
        <div className='Lado-lado' >
          <Card NomeBanco = "SICRED" Versao = "V2" />
          <Card NomeBanco = "SICRED" Versao = "V3" />
          <Card NomeBanco = "CAIXA" />
          <Card NomeBanco = "SANTANDER" />
          <Card NomeBanco = "BARISUL" />
        </div>
        <div className='Lado-lado' >
          <Card NomeBanco = "INTER"  />
        </div>
      </div>
    );
  }
  
  export default Tela1;