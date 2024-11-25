import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './Grafico.css';

export default function Grafico() {
  const [data, setData] = useState([]); // Dados do gráfico
  const [selectedBank, setSelectedBank] = useState(null); // Armazena o banco selecionado

  // Obtendo o bancoId diretamente da URL
  useEffect(() => {
    // Pega a parte da URL após o "?" (query string)
    const queryParams = new URLSearchParams(window.location.search);
    const bancoId = queryParams.get('bancoId'); // Obtém o valor de bancoId
    if (bancoId) {
      setSelectedBank(bancoId); // Atualiza o estado com o bancoId
    }
  }, []); // Esse efeito roda apenas uma vez, quando o componente for montado

  useEffect(() => {
    if (selectedBank) {
      // Fazendo a requisição para o backend com o ID do banco selecionado
      axios.get(`http://localhost:3001/api/postgres/${selectedBank}`)
        .then(response => {
          const transformedData = response.data.map(item => ({
            data_registro: new Date(item.data_registro).toLocaleDateString(),
            tempo_resposta: Number(item.tempo_resposta),
            id_banco: Number(item.id_banco),
            nome_banco: String(item.Nome)
          }));
          setData(transformedData);
        })
        .catch(error => {
          console.error('Erro ao buscar os dados:', error);
        });
    }
  }, [selectedBank]); // Atualiza sempre que o bancoId mudar

  const formatYAxisTick = (value) => {
    if (value === 15000) return 'Rápido';
    if (value === 30000) return 'Normal';
    if (value === 45000) return 'Lento';
    if (value === 60000) return 'Erro';
    return '';
  };

  return (
    <div className="Grafico-geral">
      <div className='datas'>
        <button>oi</button>
      </div>
      
      <div className='Grafico'>
        {selectedBank && (
          <p><strong>Banco Selecionado:</strong> {selectedBank}</p>
        )}
        <ResponsiveContainer width="99%" height={489}>
          <LineChart data={data} margin={{ top: 0, right: 0, left: 15, bottom: 0 }}>
            <CartesianGrid />
            <XAxis dataKey="data_registro" height={65} textAnchor="end" angle={-45} interval={0} />
            <YAxis width={90} type="number" stroke='#0F1827' fontSize={20} domain={[0, 60000]} allowDataOverflow={true} tickFormatter={formatYAxisTick} />
            <Tooltip />
            <Line type="monotone" dataKey="tempo_resposta" stroke="#18A3E0" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
