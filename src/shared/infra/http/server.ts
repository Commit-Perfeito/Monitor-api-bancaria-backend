//Executando aplicação como um serviço passando porta
import { app } from './app';
import { AppDataSource } from '../../../data-source';
import { container } from 'tsyringe';
import { RequestApiBackgroundService } from '@modules/api/useCases/requestApiBackground/requestApiBackground.service';

const Requestbackground = container.resolve(RequestApiBackgroundService);

AppDataSource.initialize()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(' ');
      console.log('************************');
      console.log(`Servidor rodando na porta ${port}`);

      // Se quiser ativar background automático:
      Requestbackground.execute();
      setInterval(() => Requestbackground.execute(), 300000);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o banco de dados:', error);
  });
