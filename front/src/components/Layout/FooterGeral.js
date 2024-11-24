import './FooterGeral.css';
import Propaganda from './Propaganda';

function FooterGeral() {

    return (
      <>
      <Propaganda />
      <footer className='footer'>
        <img src="./logo.png" alt="Logo do monitor bancario" />
        <p>Feito com ❤ e café pelos alunos da UniCV</p>
        <p>2024 © todos direitos reservados.</p>
      </footer>
      </>
    );
  }
  
  export default FooterGeral;