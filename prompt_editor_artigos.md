# Prompt para IA: Editor local de artigos (React) com export “copia-e-cola” para o repositório do site

Você é uma IA programadora sênior. Construa um **aplicativo editor local** (fora do site público) para criação/edição de artigos de um site React de uma fraternidade. O editor deve permitir escrever artigos em modo **WYSIWYG**, anexar **imagens/PDFs do computador**, e ao final gerar uma **pasta de exportação** pronta para eu **copiar e colar no repositório do site**.

## Contexto do projeto atual (site)
- O site atual lista artigos lendo um `artigos.json` e renderiza cards com `id`, `titulo`, `imagem`. A rota é `/artigo/:id`.
- Hoje o campo `conteudo` no JSON é HTML (string grande) e é injetado na página (isso é inseguro se houver edição aberta ao público).
- Queremos um sistema **seguro**: o editor roda apenas localmente (não publicado) e o site público só consome o conteúdo já “tratado”.

## Objetivos principais
1. **Editor local** (React) para criar/editar artigos.
2. **Exportar** os arquivos necessários em uma pasta (`/export_bundle`) com a **mesma estrutura** do repositório do site (ou configurável), para “copiar e colar”.
3. **Sem backend**: não haverá API, banco, login etc. O editor é executado localmente na máquina do autor.
4. **Segurança no site público**:
   - Evitar JS arbitrário inserido por conteúdo.
   - Se precisar de interatividade (ex.: “PDF em estilo livro, virando páginas”), isso deve ser feito via **componentes React aprovados**, não via `<script>` livre no texto.

---

## Decisão de formato (recomendação obrigatória)
Use um modelo **híbrido**:

### A) Índice em JSON (para listagem)
Gerar/atualizar um arquivo `artigos.json` com metadados e ponteiro para o conteúdo.
Exemplo de shape recomendado:
```json
[
  {
    "id": 6,
    "slug": "santa-regra-de-sao-bento",
    "titulo": "Santa Regra de São Bento",
    "imagem": "articles/santa-regra-de-sao-bento/images/capa.jpg",
    "resumo": "Breve descrição opcional...",
    "createdAt": "2026-01-17",
    "updatedAt": "2026-01-17",
    "contentType": "mdx"
  }
]
```

### B) Conteúdo por artigo em arquivo separado
Cada artigo deve viver numa pasta:
```
articles/<slug>/
  index.mdx
  images/
  files/
```

**Importante:** o editor deve **copiar** imagens e PDFs selecionados do computador para essas pastas, e atualizar as referências no conteúdo.

---

## Requisitos do Editor (app separado)
### Tech stack do editor
- React + Vite (TypeScript preferencial).
- WYSIWYG: **Tiptap** (ProseMirror) OU alternativa equivalente moderna. Precisa suportar:
  - Títulos, parágrafos, negrito/itálico/sublinhado
  - Listas
  - Links (validação de URL)
  - Imagens (inserção via upload local)
  - Bloco “callout/citação”
  - Bloco “embed aprovado” (YouTube etc. apenas se permitido por whitelist)

### Fluxo do usuário
- Criar artigo: `titulo`, `slug` (auto-gerado + editável), `imagem de capa` (opcional), `resumo` (opcional).
- Editor do corpo: WYSIWYG com toolbar.
- Inserir imagens no corpo:
  - Selecionar arquivo local (jpg/png/webp).
  - Editor copia para `articles/<slug>/images/`.
  - Editor insere no conteúdo uma referência relativa (ex.: `./images/xxx.webp`) ou uma rota relativa à pasta `articles/...`.
  - Opcional: gerar versões otimizadas (webp + resize) com toggle.
- Inserir PDF:
  - Copiar para `articles/<slug>/files/`.
  - Permitir:
    - Link simples para download/visualização
    - OU bloco especial “Flipbook PDF” (ver seção abaixo)

### Edição e persistência do editor
- O editor deve manter um **repositório de trabalho** (workspace) local do editor, por exemplo:
  - `editor_workspace/` (onde ficam drafts e artigos em desenvolvimento)
- Também deve permitir **importar** um bundle existente (para editar algo já criado).

### Exportação “copia-e-cola”
- Botão: **Exportar bundle**.
- Gera uma pasta única, por exemplo:
  - `export_bundle/`
- Dentro dela, colocar exatamente os arquivos que eu devo copiar para o repositório do site:
  - `src/assets/artigos.json` (ou o caminho configurado)
  - `src/content/articles/...` (ou o caminho configurado)
- O editor deve ter uma tela de configurações com:
  - `targetSiteStructure` (paths do repositório de destino)
  - Exemplo:
    - `indexJsonPath`: `src/assets/artigos.json`
    - `articlesRootPath`: `src/content/articles`

**O export deve ser idempotente**: exportar várias vezes não deve duplicar ou quebrar paths.

### Validação
Antes de exportar:
- Validar slug único, id único.
- Validar que referências de imagens/PDF existem.
- Validar links (bloquear `javascript:` e esquemas perigosos).
- Se houver HTML em algum ponto, sanitizar com whitelist.

---

## Interatividade segura: PDF estilo livro (flipbook)
Haverá **um artigo específico** que precisa mostrar um PDF como “livro virando páginas”.

### Proibição
- Não permitir `<script>` arbitrário dentro do conteúdo do artigo.
- Não permitir inline event handlers (`onerror`, `onclick`, etc.).

### Solução exigida
- Implementar um **componente React aprovado** no site público, por exemplo:
  - `<FlipbookPdf src="..." />`
- No editor, fornecer um bloco WYSIWYG “Flipbook PDF” que insere no `index.mdx` algo como:
```mdx
<FlipbookPdf src="./files/regra-sao-bento.pdf" title="Santa Regra de São Bento" />
```
- O componente deve ser responsável por qualquer JS necessário (biblioteca de flipbook, canvas, etc.).
- Se a biblioteca exigir assets adicionais, definir como isso será empacotado no site.

---

## Integração no site público (entregáveis necessários)
Além do editor, produza no bundle o necessário para o site consumir os artigos:

1. **`artigos.json` atualizado** no caminho configurado.
2. Conteúdo por artigo (MDX) + assets locais (imagens/PDFs).
3. Instruções de integração no README:
   - Como o site deve carregar MDX por `slug` (por exemplo com `import.meta.glob` no Vite).
   - Como a rota `/artigo/:id` encontra o item no JSON, resolve o `slug`, e carrega o MDX.
4. Um renderer seguro:
   - Para MDX, renderizar via pipeline do bundler.
   - Se precisar compatibilidade com artigos antigos em HTML string, sanitizar com DOMPurify + whitelist rigorosa.

**Nota:** Se o site hoje só usa `{id,titulo,imagem,conteudo}`, forneça uma estratégia de migração suave:
- manter `conteudo` opcional para legados
- novos artigos usam `contentType: "mdx"` + `slug`

---

## Requisitos de segurança (obrigatórios)
- O editor deve ser **apenas local**, não deve depender de servidor em produção.
- Todo conteúdo exportado deve ser seguro para o site:
  - Proibir JS arbitrário no conteúdo.
  - Sanitizar qualquer HTML remanescente.
  - Links devem ser normalizados (apenas `http`, `https`, `mailto`, `tel`).
- No site público, preferir renderização por MDX/componentes, evitando `dangerouslySetInnerHTML`.
- Se precisar de `dangerouslySetInnerHTML` para legados, usar sanitização forte.

---

## UX mínima do editor (entregar)
- Página “Lista de artigos” (criar, duplicar, editar, apagar).
- Página “Editar artigo” com:
  - Campos de metadados
  - WYSIWYG
  - Painel de assets (imagens/PDFs do artigo)
  - Preview (render MDX em tempo real, incluindo Flipbook placeholder)
- Página “Configurações” de paths do export.
- Botão “Exportar bundle”.

---

## Restrições e detalhes práticos
- O editor deve funcionar em Windows e macOS.
- Não exigir Docker.
- Preferir usar APIs do navegador + Node (via Vite/Node scripts) para copiar arquivos.
- Se necessário para copiar arquivos localmente, pode usar **Electron** OU um app Node/CLI acoplado:
  - Opção preferida: React (UI) + Node scripts para export (rodados pelo próprio projeto).
  - Se escolher Electron, justificar e manter simples.

---

## Entregáveis finais
1. Repositório do editor com:
   - `README.md` com setup, uso, export e integração
   - Código do editor
   - Scripts de export
2. Exemplo de `export_bundle/` gerado com 1–2 artigos demo, incluindo um com PDF flipbook.
3. No README, checklist “copiar e colar” para o repositório do site.

---

## Critérios de aceitação (testes)
- Criar artigo com 2 imagens anexadas localmente → export_bundle contém imagens na pasta do artigo e o MDX referencia corretamente.
- Criar artigo com PDF → export_bundle contém PDF em `files/` e o MDX inclui `<FlipbookPdf />`.
- Export_bundle pode ser copiado para o repo do site e o site compila/roda.
- Links com `javascript:` são bloqueados.
- Não existe forma de inserir `<script>` via editor e exportar isso.
