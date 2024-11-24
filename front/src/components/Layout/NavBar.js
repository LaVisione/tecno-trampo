import'./NavBar.css';
import Propaganda from './Propaganda';

function NavBar() {

  return (
    <>
    <nav className='nav' >
      <div>
        <button className='btn_voltar' ><a href="."> ← Voltar</a></button>
      </div>
      <div className='logo' ><img src="./logo.png" alt="Logo do monitor bancario" /></div>
    </nav>
    <Propaganda />
    </>
  );
}

export default NavBar;