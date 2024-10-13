import { DataTypes, Model } from 'sequelize'; 
import { sequelize } from '../src/database/database';
import { Bancos } from '../models/Bancos';


export class Registros extends Model{
    public id!: number;
    public id_banco!: number;
    public status_code!: string;
    public create_date!: Date;
    public mensagem!: string;
    public tempo_resposta!: number;
    public jsonb_response!: object;
}

Registros.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_banco: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Bancos,
            key: 'id',
        }
    },
    status_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    create_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    mensagem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tempo_resposta: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    jsonb_response: {
        type: DataTypes.JSONB,
        allowNull: false,
    }
},
{
    sequelize,           
    modelName: 'Registros',
    tableName: 'registros',
})