# SENSI LAB — Site para GitHub Pages

Site estático inspirado na estrutura de um gerador de sensibilidade: seleção de marca/modelo, estilo de jogo, geração de configuração, cópia, otimização e dicas.

## Arquivos
- `index.html` — estrutura da página
- `styles.css` — visual completo e responsivo
- `script.js` — geração, seleção de aparelho, cópia e interações

## Publicar no GitHub Pages
1. Crie um repositório no GitHub.
2. Envie os três arquivos para a raiz do repositório.
3. Vá em **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde a publicação.

## Importante sobre acesso privado
GitHub Pages é destinado a páginas estáticas publicadas. O JavaScript deste projeto tem uma tela de “Área privada” apenas como barreira de interface. **Não coloque senhas reais, dados de clientes ou informações confidenciais dentro do JavaScript**, porque o código pode ser visto por quem tiver acesso ao site.

Se você precisa que **somente você** consiga abrir o site inteiro, use autenticação no servidor ou uma camada de acesso como Cloudflare Access/Vercel Authentication, em vez de uma senha escrita no JavaScript.

## Alterar a senha visual
No `script.js`, procure:
`const PASSWORD="troque-esta-senha";`

Isso não deve ser tratado como segurança real.

## Observação
O projeto usa uma identidade visual própria inspirada em estética gamer/industrial, sem usar logotipos oficiais ou arquivos proprietários de Free Fire.

## Identidade KNZIN.IP
A versão personalizada usa a identidade visual KNZIN.IP com detalhes neon roxo e os arquivos `knzin-logo.png` e `knzin-hero.png`.
