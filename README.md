# Portfólio Marsvpial (Carol Condeço)

## Como adicionar novos projetos (para quem não sabe programar)

1. **Crie uma nova pasta para o projeto**
   - Vá até a pasta `projetos`.
   - Crie uma nova pasta com o nome do seu projeto (exemplo: `meu novo projeto`).

2. **Adicione as imagens do projeto**
   - Dentro da pasta do seu projeto, crie uma subpasta chamada `images`.
   - Coloque todas as imagens do projeto dentro dessa pasta `images`.

3. **Adicione a descrição do projeto**
   - Dentro da pasta do seu projeto, crie uma subpasta chamada `desc`.
   - Dentro da pasta `desc`, crie um arquivo chamado `descProj.txt`.
   - Escreva a descrição do projeto nesse arquivo.

4. **Atualize os arquivos de configuração**
   - Abra o arquivo `projects.json` e adicione o nome do seu projeto na lista (mantenha as aspas e a vírgula, exemplo: `"meu novo projeto",`).
   - Abra o arquivo `images.json` e adicione uma nova linha para o seu projeto, seguindo o padrão dos outros projetos. Exemplo:
     ```json
     "meu novo projeto": ["imagem1.jpg", "imagem2.png"],
     ```
     (Coloque os nomes exatos dos arquivos de imagem que você colocou na pasta `images`.)

5. **Pronto!**
   - Salve tudo e recarregue a página no navegador. Seu novo projeto aparecerá automaticamente.

---

## Como funciona o código

- O site lê os nomes dos projetos do arquivo `projects.json`.
- Para cada projeto, ele lê as imagens do arquivo `images.json` e a descrição do arquivo `descProj.txt`.
- O grid é montado dinamicamente usando JavaScript, então não precisa mexer no código para adicionar projetos.
- Quando você passa o mouse sobre um projeto, aparecem todas as imagens dele e a descrição aparece no lugar do nome do próximo projeto.
- Ao sair com o mouse, tudo volta ao normal.
- O código está otimizado para ser rápido, usando cache para não ficar lendo os arquivos toda hora.

---

Espero que te ajude amor ❤️
