import sql from 'mssql'

// Configuração da conexão
const config = {
    user: 'sa',
    password: 'Rigon216',
    server: 'NOTE-RIGON/SQLEXPRESS', // Pode ser 'localhost' se estiver rodando localmente
    //instanceName : 'SQLEXPRESS',
    database: 'ApiService',
    options: {
        encrypt: false, // Usado se você estiver usando o Azure SQL
        trustServerCertificate: true
    },
    pool : {
        max: 10,
        min: 0,
        idleTimeoutMillis: 3000
    }
};

// Função para conectar ao banco de dados
export async function connectToDatabase() {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

export {sql}
