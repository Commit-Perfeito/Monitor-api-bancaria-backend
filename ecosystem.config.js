// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'monitor-api',
      script: 'dist/server.js', // ⚠️ MUDE ISSO: Qual é o seu script principal? (Ex: app.js, dist/index.js)

      // --- Configuração de Logs ---
      output: './logs/out.log', // Caminho para logs de saída padrão
      error: './logs/error.log', // Caminho para logs de erro

      // Combina todos os logs de instâncias clusterizadas em um só arquivo

      merge_logs: true,

      // Adiciona um timestamp (data/hora) em cada linha do log
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
