import { Link } from 'react-router-dom';
import './Card.css';
import PropTypes from 'prop-types'

function Card({ NomeBanco, Versao }) {

    return (
      <div className='card'>
        <div className='lado-lado'>
          <div className='informacao'>
            <h2>{NomeBanco}</h2>
            <p className='versao'>{Versao} </p>
          </div>
          <div className='informacao'>
            <p>ON</p>  
          </div>
        </div>
        <button className='btn_Detalhe' > 
            <Link to="/Grafico" >Detalhes</Link>
        </button> 
      </div>
    );
}

Card.propTypes = {
  NomeBanco : PropTypes.string.isRequired,
  Versao : PropTypes.string,
}

Card.defaultProps = {
  Versao : '"Unica"'
}

export default Card;