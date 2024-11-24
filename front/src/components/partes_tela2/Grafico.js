import './Grafico.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid  } from 'recharts';

const data = [
    {
      "name": "00:05",
      "pv": 2400,
    },
    {
      "name": "00:05",
      "pv": 2400,
    },
    {
      "name": "00:10",
      "pv": 1398,
    },
    {
      "name": "00:15",
      "pv": 9800,
    },
    {
      "name": "00:20",
      "pv": 3908,
    },
    {
      "name": "00:25",
      "pv": 4800,
    },
    {
      "name": "00:30",
      "pv": 3800,
    },
    {
      "name": "00:35",
      "pv": 4300,
    },
    {
      "name": "00:40",
      "pv": 4300,
    },
    {
      "name": "00:45",
      "pv": 0,
    },
    {
      "name": "00:50",
      "pv": 4300,
    },
    {
      "name": "00:55",
      "pv": 4300,
    },
    {
      "name": "01:00",
      "pv": 5700,
    }

  ]

export default function Grafico () {
    return (
    <div className="Grafico">
      <LineChart width={1050} height={550} data={data}
        margin={{ top: 15, right: 5, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="pv" stroke="#18A3E0" />
      </LineChart>
    </div>
    )
}