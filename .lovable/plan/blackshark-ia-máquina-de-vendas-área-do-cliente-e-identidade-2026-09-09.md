# BlackShark IA — Máquina de vendas, área do cliente e identidade do tubarão

Quatro frentes: esconder a área administrativa da página pública, trocar a paleta verde Matrix pelas cores da logomarca (preto, vermelho sangue, prata), reestruturar a home para vender, e criar a área do cliente.

## 1. Área administrativa some da home

- Remove o botão "Área administrativa" do cabeçalho e qualquer menção a painel de licenças no conteúdo público.
- Acesso continua só digitando `/admin` direto no navegador (rota mantida, com `noindex`).
- `robots.txt` bloqueia `/admin` e `/painel`.
- O que aparece na home é o login **do cliente**, não o do administrador.

## 2. Identidade visual: Matrix nas cores do tubarão

Mantém a estética hacker (chuva de caracteres, terminal, scanlines, brilho), na paleta da logo:

- Fundo preto profundo `#050505` / superfície `#0d0d0f`
- Destaque vermelho sangue `#e10600`, hover `#ff2a20`, com brilho
- Prata cromada `#c8ccd2` em títulos e detalhes metálicos
- Texto branco gelo `#f2f4f6`, apoio cinza `#9aa1a9`
- Chuva de caracteres em vermelho com clarões brancos; grade e glows de verde para vermelho/carvão

Tokens no design system (`src/styles.css` e `src/index.css`); login, painel e área do cliente seguem a mesma paleta.

## 3. Home como máquina de vendas

1. **Herói** — promessa em uma frase, subtítulo com resultado prático, botão principal para planos, 3 selos de confiança, arte do tubarão em destaque.
2. **Dor → solução** — "como é hoje" x "como fica com a BlackShark".
3. **Demonstração** — o mock do agente, com legenda "em minutos, não horas".
4. **Recursos** — os 6 cards, com títulos voltados a benefício.
5. **Como funciona** — 4 passos.
6. **Prova social** — 6 depoimentos fictícios (marcados internamente como exemplo) + faixa de números.
7. **Planos** — Diário R$ 20,00 · Quinzenal R$ 49,90 (destaque, "mais vendido") · Mensal R$ 97,00. Cada card com benefícios, preço grande e botão de compra.
8. **FAQ** — 6 perguntas que travam a compra (preço, cancelamento, segurança do código, suporte, requisitos, prazo).
9. **Chamada final** — faixa com um só botão.
10. **Rodapé** — contato, WhatsApp e links legais.

**Notificações de compra**: pop-up discreto no canto inferior esquerdo, aparecendo a cada 20–40 segundos, com nome e cidade fictícios ("Rafael de Campinas ativou o plano Mensal — há 3 minutos"), com botão de fechar e sem repetir a mesma mensagem em sequência. Conteúdo 100% fictício, gerado no navegador.

Extras: botão flutuante de WhatsApp, rolagem suave e âncoras atualizadas.

## 4. Área do cliente

**Login do cliente (`/entrar`)**
- Entrar com e-mail e senha.
- Aba "Criar conta" com nome, e-mail, WhatsApp e senha (com confirmação), validação de formato e força mínima de senha.
- Recuperação de senha por e-mail.

**Painel do cliente (`/minha-conta`, protegido)**
- Card da licença atual: chave (parcialmente oculta, com botão copiar), plano, validade, dias restantes, dispositivos usados.
- **Gerar teste grátis**: botão que cria uma chave de teste (validade curta), disponível uma vez por conta.
- **Renovar**: escolher plano e seguir para o pagamento/WhatsApp; a renovação estende a validade da mesma chave.
- Histórico de licenças e últimas ativações.
- Dados da conta editáveis (nome, WhatsApp) e sair.

## Pontos técnicos

- Home em `src/routes/index.tsx`, dividida em componentes por seção em `src/components/landing/`; notificações em `src/components/SocialProofToasts.tsx`.
- Novas rotas: `src/routes/entrar.tsx` e `src/routes/minha-conta.tsx`, com guarda de sessão do cliente.
- Paleta em tokens; `MatrixRain` recebe cor por prop.
- SEO: título/descrição/OG próprios por rota; JSON-LD de produto e FAQ na home; `noindex` nas rotas de conta e admin.
- **Backend**: o projeto já usa um backend externo com a função `admin-license-api` (só administrador). A área do cliente precisa de endpoints próprios — cadastro de cliente, licença do cliente logado, geração de teste e renovação. Implemento a interface completa e a camada de chamadas (`src/lib/customer-api.ts`); se esses endpoints ainda não existirem no backend, a tela roda em modo demonstração até você liberá-los ou até ativarmos o backend integrado do Lovable.
- Pagamento automático (checkout) segue fora do escopo desta etapa: os botões levam ao WhatsApp com o plano escolhido.
