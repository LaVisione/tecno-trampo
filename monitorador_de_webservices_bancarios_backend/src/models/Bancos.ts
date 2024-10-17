import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../database/database';

export class Bancos extends Model {
    public id!: number;
    public status!: string;
    public nome!: string;
    public versao!: string;
}

Bancos.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    versao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, 
{
    sequelize,           
    modelName: 'Bancos',
    tableName: 'bancos',
    createdAt: true,
    updatedAt: false,
});
