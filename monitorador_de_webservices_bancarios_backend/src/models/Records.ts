import { DataTypes, Model } from 'sequelize'; 
import { sequelize } from '../database/database';
import { Bank } from './Bank';


export class Records extends Model{
    public id!: number;
    public id_banco!: number;
    public status_code!: string;
    public mensagem!: string;
    public tempo_resposta!: number;
    public isError!: boolean;
    public jsonb_response!: object;
}

Records.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_banco: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Bank,
            key: 'id',
        }
    },
    status_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mensagem: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tempo_resposta: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    isError: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    jsonb_response: {
        type: DataTypes.JSONB,
        allowNull: true,
    }
},
{
    sequelize,           
    modelName: 'Registros',
    tableName: 'registros',
    createdAt: true,
    updatedAt: false,
})