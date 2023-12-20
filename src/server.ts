import app from './app';
import { AppDataSource } from './data-source';

(async () =>{
    try{
        await AppDataSource.initialize();
        console.log('Data source initiliazed sucessfully');

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Servidor sendo executado na porta ${port}`);   
        });
    }catch(err){
        console.log('Error durante a inicialização do servidor: ', err);
        
    }
})();