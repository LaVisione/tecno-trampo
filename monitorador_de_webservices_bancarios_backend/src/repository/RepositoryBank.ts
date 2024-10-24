import { Bank } from "../models/Bank";

export class RepositoryBank{

    public static async initBanks() {
        const bancos = [
        { nome: 'Banco do Brasil', versao: 'v2' },
        { nome: 'Itaú', versao: 'v2' },
        { nome: 'Itaú', versao: 'Francesa' },
        { nome: 'Sicoob', versao: 'v2' },
        { nome: 'Sicoob', versao: 'v3' },
        { nome: 'Sicredi', versao: 'v2' },
        { nome: 'Sicredi', versao: 'v3' },
        { nome: 'Caixa', versao: 'Único' },
        { nome: 'Santander', versao: 'v2' },
        { nome: 'Banrisul', versao: 'Único' },
        { nome: 'Inter', versao: 'Único' }
        ];
    
    
        for (const banco of bancos) {
            await Bank.findOrCreate({
                where: { nome: banco.nome, versao: banco.versao },
                defaults: { status: null }
            });
        }
    }

    public async updateById(id: number, status: string) {
        try {
            console.log("\nCHEGOU NA BANK-REPOSITORY");
            const [updatedRows] = await Bank.update(
                { status },           
                { where: { id } }
            );
        } catch (error) {
            console.error(`Erro ao atualizar o banco com ID ${id}:`, error);
            throw new Error('Erro ao realizar atualização do status do Banco, valide os logs');
        }
    }

    /*public  async getAllOrderedById() {
        try {
            const bancos = await Bank.findAll({
                order: [
                    ['id', 'ASC']  // Ordena pelo id em ordem crescente
                ]
            });
            return bancos;
        } catch (error) {
            console.error("Erro ao buscar bancos:", error);
            throw new Error('Erro ao buscar bancos ordenados, valide os logs');
        }
    }*/
    
}