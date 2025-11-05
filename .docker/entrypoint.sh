#!/bin/bash

# Esperar o banco de dados ficar disponível
echo "⏳ Aguardando o banco de dados iniciar..."
# /home/node/app/.docker/wait-for-it.sh db:5432 --timeout=60 --strict -- echo "✅ Banco de dados está pronto!"

ls
# espera migrations e seeds antes de iniciar app
npm run typeorm migration:run
npm run typeorm seed:run

# inicia aplicação
exec node src/shared/infra/http/server.js