import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database';

export class Bank extends Model {
    public id!: number;
    public status!: string;
    public nome!: string;
    public versao!: string;
}

Bank.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
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
    createdAt: false,
    updatedAt: false,
});
