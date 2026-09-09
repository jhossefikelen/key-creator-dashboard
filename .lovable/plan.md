# BlackShark IA — Máquina de vendas + identidade do tubarão

Três frentes: esconder a área administrativa da página pública, trocar toda a paleta verde Matrix pelas cores da logomarca (preto, vermelho sangue, prata), e reestruturar a home para vender de verdade.

## 1. Área administrativa some da home

- Remove o botão "Área administrativa" do cabeçalho da página inicial e qualquer menção a painel/licenças no conteúdo público.
- O acesso continua existindo só digitando `/admin` direto no navegador (rota mantida, com `noindex` já ativo).
- `robots.txt` passa a bloquear `/admin` e `/painel`.

## 2. Identidade visual: Matrix em cores do tubarão

Mantém a estética hacker (chuva de caracteres, terminal, scanlines, brilho), mas na paleta da logo:

- Fundo: preto profundo `#050505` / superfície `#0d0d0f`
- Destaque: vermelho sangue `#e10600` com brilho, hover `#ff2a20`
- Secundário: prata/cromado `#c8ccd2` para títulos e detalhes metálicos
- Texto: branco gelo `#f2f4f6`, apoio cinza `#9aa1a9`
- Grade de fundo e brilhos passam de verde para vermelho/carvão

Ajustes: chuva de caracteres em vermelho com clarões brancos, botões primários vermelhos com glow, tokens do design system atualizados em `src/styles.css` e `src/index.css`. Login e painel acompanham a mesma paleta.

## 3. Reestruturação da home como máquina de vendas

Nova ordem da página, com foco em conversão:

1. **Herói** — promessa clara em uma frase, subtítulo com o resultado prático, botão único de ação (WhatsApp / plano), prova rápida (3 selos de confiança) e a arte do tubarão em destaque.
2. **Dor → solução** — bloco curto contrastando "como é hoje" x "como fica com a BlackShark".
3. **Demonstração** — o mock do agente que já existe, agora com legenda de resultado ("em minutos, não horas").
4. **Recursos** — mantém os 6 cards, com títulos voltados a benefício em vez de recurso técnico.
5. **Como funciona** — 4 passos (já existe), enxugado.
6. **Prova social** — 3 depoimentos + faixa de números. Preciso de textos reais seus; enquanto isso entram exemplos marcados como provisórios.
7. **Planos** — cards com preço visível, plano do meio destacado, garantia e botão de ação em cada um.
8. **FAQ** — 6 perguntas que travam a compra (preço, cancelamento, segurança do código, suporte, requisitos, prazo).
9. **Chamada final** — faixa com um só botão.
10. **Rodapé** — contato, WhatsApp e links legais.

Extras de conversão: botão flutuante de WhatsApp em todas as telas, âncoras de navegação atualizadas e rolagem suave.

## Pontos técnicos

- Home continua em `src/routes/index.tsx`, dividida em componentes por seção dentro de `src/components/landing/` para ficar fácil editar depois.
- Paleta em tokens (`src/styles.css`), sem cores fixas espalhadas; `MatrixRain` recebe cor por prop.
- SEO da home: título, descrição, og:title/og:description próprios; JSON-LD de produto/FAQ na home.
- Sem backend nesta etapa: pagamento e checkout seguem fora do escopo.

## Preciso de você

- Preços de cada plano (Diário, Quinzenal, Mensal).
- Depoimentos reais e números (clientes, projetos, tempo economizado), se tiver.

Sem isso, coloco valores e depoimentos de exemplo claramente marcados para você substituir.
