# Branch `manutencao` — página "Em manutenção" do site do CERE

Esta é uma branch **órfã**: ela não compartilha histórico com a `main` e contém apenas a página
de manutenção. Isso é proposital — enquanto o Pages estiver servindo esta branch, nenhuma página
do site real fica acessível.

Arquivos:

- `index.html` — a página (auto-contida: CSS inline, sem dependência de `css/style.css`).
- `404.html` — cópia idêntica, para que links antigos (`/sobre/`, `/pesquisa/`, …) também caiam
  na página de manutenção em vez do 404 genérico do GitHub Pages.

## Como ligar a manutenção

GitHub > **Settings** > **Pages** > *Build and deployment* > Source: **Deploy from a branch** >
Branch: **`manutencao`** / **`/ (root)`** > **Save**.

Leva cerca de 1 minuto para propagar.

## Como desligar

Mesma tela, trocar a branch de volta para **`main`** / **`/ (root)`** > **Save**.

Alternar não exige nenhum commit — esta branch fica parada no repositório entre um período de
manutenção e outro. Ao editar o texto da página, edite os **dois** arquivos (`index.html` e
`404.html`), que devem permanecer idênticos.

## Atenção

Se a reescrita do site em Astro (`refactor/refazendo-site-em-framework-de-mercado`) for mergeada,
a fonte do Pages passa a ser **GitHub Actions** e este toggle por branch deixa de funcionar.
Nesse caso a página continua válida, mas o liga/desliga precisará virar um `workflow_dispatch`
ou uma variável de repositório no workflow de deploy.
