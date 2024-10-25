# Sales Dashboard
Dashboard de Análise de Vendas com VueJS e Pug

## O projeto

Dashboard interativo de análise de vendas usando VueJS e Pug. O dashboard deve exibir dados de vendas de uma empresa fictícia, permitindo aos usuários visualizar e interagir com as informações.

## Requisitos

1. Estrutura e Componentes:
    - VueJS 3 com Composition API
    - Pug para os templates
    - Componentes reutilizáveis para gráficos, tabelas e filtros
2. Funcionalidades:
    - Gráfico de vendas por mês (Chart.js)
    - Tabela de produtos vendidos com ordenação e paginação
    - Filtros por data, categoria de produto e região
    - Crie um mapa de calor das vendas por região (vue-leaflet)
3. Estado e Gerenciamento de Dados:
    - Vuex para gerenciamento de estado
    - Chamadas assíncronas para uma API mock (json-server)
4. Otimização e Performance:
    - Lazy loading para componentes e rotas
    - Carregamento de dados otimizado com estratégias como debounce nos filtros

### Configuração

```
- npm install
```

### Rodar localmente

```
- npm run start:db
- npm run serve
```