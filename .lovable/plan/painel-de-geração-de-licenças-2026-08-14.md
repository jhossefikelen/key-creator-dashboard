# Painel de Geração de Licenças

Painel administrativo dark hacker (fundo quase preto, verde neon, fonte mono) para gerar e gerenciar chaves de licença. Nesta etapa tudo roda no frontend, com os dados em memória/localStorage — a integração com banco de dados fica para depois, sem precisar reescrever a tela.

## Telas

**/ (login admin)**
- Tela de acesso em terminal-style: campo de senha, botão "AUTENTICAR", mensagem de erro em vermelho.
- Trava de acesso local (senha temporária definida no código, marcada com TODO). Ao integrar o banco, isso vira login real de verdade.
- Sessão guardada em localStorage para não pedir senha a cada reload.

**/painel (protegido)**
- **Gerador**: escolha de quantidade (1–100), formato do código (XXXX-XXXX-XXXX-XXXX), duração da licença (7 / 30 / 90 dias / vitalícia) e limite de ativações. Botão "GERAR KEYS".
- **Resultado**: bloco de código com as keys recém-geradas, botão copiar tudo e baixar .txt.
- **Tabela de keys**: código, status (ativa / expirada / revogada), validade, ativações usadas, data de criação. Ações por linha: copiar, revogar, excluir.
- **Filtros**: busca por código e filtro por status.
- **Métricas no topo**: total, ativas, revogadas, expiradas.

## Visual

- Tokens no design system: fundo `#0a0f0a`, superfície `#111b11`, primária verde neon `#39ff14`, texto claro `#c7f9cc`.
- Fonte monoespaçada em toda a interface, cantos retos, bordas finas verdes, brilho sutil (glow) em botões e keys.
- Sem gradiente roxo, sem visual SaaS genérico.

## Detalhes técnicos

- Rotas TanStack: `src/routes/index.tsx` (login) e `src/routes/painel.tsx` (painel), com redirecionamento quando não autenticado.
- Estado das keys em um hook `useLicenseKeys` com persistência em `localStorage`, isolando a fonte de dados para trocar por chamadas ao banco depois.
- Geração com `crypto.getRandomValues` (alfabeto sem caracteres ambíguos), verificação de duplicidade.
- Componentes shadcn: Button, Input, Select, Table, Badge, Card, Dialog de confirmação, toasts via sonner.
- Título/meta próprios em cada rota.

## Fora do escopo agora

- Banco de dados, contas de usuário reais e endpoint público de validação de licença — próxima etapa, quando você ativar o backend.
