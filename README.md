# Sobre
Com essa ferramenta é possível acompanhar os valores de ações de várias empresas que estão disponíveis na bolsa de valores, bem como visualizar e comparar com outras ações.
Outro recurso interessante é a possibilidade de projetar ganhos com compras.


# Executar a aplicação

Siga as etapas:
   - Faça o download do repositório;
   - Abra o terminal na pasta do download;
   - Instale as dependências para o frontend;

 ```sh
cd client
npm install
```

✅ Instale as dependências para o backend:

 ```sh
cd ..
cd API
npm install
```

Depois de todas as dependências instaladas, vamos iniciar a aplicação, execute: 

 ```sh
npm start
```
⚠️Será executado simultaneamente os serviços de:
   - API;
   - Frontend;
   - Criação do webpack da API e frontend;

# Executar o teste - BackEnd

Navegue até a pasta API e execute o comando:

 ```sh
mocha
```

O teste verifica o retorno e o conteúdo das informações de cada rota.
Ele é executado a cada 15 segundos pois existe um limite de requisições que podem ser feitas ao endpoint: https://www.alphavantage.co

# Executar o teste - FrontEnd

Navegue até a pasta client e execute o comando:

 ```sh
npm test
```

Em cada página da aplicação, o teste pesquisa por palavras chaves especificas, como por exemplo as utilizadas em textInputs e ou buttons