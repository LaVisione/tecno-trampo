import './ListarErro.css';

function ListarErro( { itens } ) {

    return ( 
      <div className='listar_erro' >
        {itens.length > 0 ? (
          itens.map ((item, index) => (
            <>
            <div className='item_lista'>
              <div className='ponto_vermelho' ></div>
              <div className='data-hora'>
                <p key={index}>00/00 - {item}</p>
              </div>
            </div>
            </>
        ))) : (
          <p> nenhum erro encontardo </p>
        )}

      </div>
    );
  }
  
  export default ListarErro;