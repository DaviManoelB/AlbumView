>AlbumView

## Informações Gerais
- Autor: Davi Manoel Bernardes
- Proposta de projeto escolhida: Coleções e itens
- Breve descrição sobre seu projeto: Um site de gerenciamento de albuns de músicas, pesquisa de albuns e visualização das informações.

## Sobre o Site
 - O site foi contruido utilizando html, css e JavaScript e usando o framework Bootstrap.
 - O obejtivo principal é a vizualização de diversos álbuns, com informações sobre o ano de lançamento, gênero, artista e quais suas músicas.
 - Utiliza de Json Server para armazenar os dados dos artistas e álbuns.

## Funcionalidades
 - Pesquisar álbuns: Utilizar a barra de pesquisa para buscar os álbuns cadastrados no site pelo seu nome. Caso não encontre, um alerta avisa ao usuário que o álbum ainda não foi cadastrado. Não diferencia letras maiúsculas de minúsculas.
 - Álbum aleatório: A função mais única do site. Utiliza de gerador de números aleátórios em JS para gerar um número dentre os IDs existentes nos álbuns para abrir detalhes de qualquer álbum cadastrado.
 - Carrossel: Um carrosel feito a partir do Bootstrap, exibindo 3 álbuns quaisquer cadastrados no Json Server, com botão para direcionar a tela de detalhes sobre o álbum.
 - Resposividade com diferentes dispositivos. Desktop, tablets e celulares.

 ## Implementações Futuras
 - Cadastro de usuários. Atualmente não exite tela de login nem nenhuma forma de diferenciar os usuários.
 - Gerenciar albúns favoritos para cada usuário. Atualmente é utlizado uma flag dentro de cada objeto do Json 'album' para exibir os álbuns favoritos. 
 - Integração com API de música para puxa automaticamente os álbuns e artistas. Atualmente é preciso cadastrar no banco manualmente, seja escrevendo diretamente no arquivo db. json ou utilizando o Postman e derivados.

 ## Para rodar o projeto
  **Necessário ter Node.js instalado**
 - Abrir o terminal na pasta root **'AlbumView'**.
 - Rodar o comando: 'npm start' para ativar Json Server.
 - Rodar o arquvio **'index.html'** com a extensão do VS-code, LiveServer, para ativar o front-end.