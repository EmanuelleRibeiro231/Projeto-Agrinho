# 🌱 HortaViva - Sistema de Gerenciamento de Horta Familiar

## Sobre o Projeto

O **HortaViva** é um protótipo de sistema web para gerenciamento de hortas familiares, com foco no **equilíbrio entre produção agrícola e preservação do meio ambiente**. O sistema permite cadastrar plantas, acompanhar o crescimento, receber alertas de cuidados e visualizar o mapeamento da horta.

Este projeto foi desenvolvido como protótipo educacional para o tema **Agrinho 2026 - Agricultura Familiar**.

---

## Funcionalidades

### 📊 Dashboard (index.html)
- Visualização do clima da região (temperatura, umidade, chuva, vento)
- Alertas ativos sobre as plantas (colheita, irrigação, adubação)
- Mapa visual da horta com localização de cada planta
- Resumo geral (total de plantas, prontas para colheita, precisam de cuidado)

### 🌿 Cadastro de Plantas (cadastro.html)
- Registro de plantas com nome, data de plantio, localização e quantidade
- Opções variadas: folhosas, frutos, legumes, raízes, temperos
- Lista de plantas cadastradas com status de crescimento
- Remoção de plantas do sistema

### ⚙️ Painel Administrativo (painel.html)
- Alertas detalhados por planta com barra de progresso
- Cronograma de colheita organizado por data
- Sugestões de cuidados baseados no clima
- Filtros por tipo de alerta
- Ações rápidas (registrar irrigação, adubação)

---

## Como Usar

1. Abra o arquivo `index.html` em qualquer navegador moderno
2. Navegue até "Cadastrar Planta" para adicionar suas plantas
3. Volte ao Dashboard para ver alertas e o mapa da horta
4. Use o Painel Admin para controle detalhado

---

## Tecnologias Utilizadas

- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização e responsividade
- **JavaScript** - Lógica do sistema e interatividade
- **LocalStorage** - Armazenamento dos dados no navegador

---

## Estrutura de Arquivos

```
📁 Agrinho/
├── 📄 index.html        → Dashboard principal
├── 📄 cadastro.html     → Página de cadastro de plantas
├── 📄 painel.html       → Painel administrativo
├── 📄 style.css         → Estilos visuais
├── 📄 script.js         → Lógica e funções do sistema
└── 📄 README.md         → Documentação (este arquivo)
```

---

## ⚠️ Este é um Protótipo!

Este sistema é um **protótipo funcional** que demonstra o conceito. Em uma implementação completa, o sistema poderia incluir:

### 🤖 Inteligência Artificial
- IA para análise de imagens das plantas (detectar pragas e doenças)
- Chatbot para tirar dúvidas sobre cultivo
- Previsão de produtividade baseada em dados históricos
- Recomendações personalizadas de cultivo

### 🔌 Arduino e IoT (Internet das Coisas)
- Sensores de umidade do solo em cada canteiro
- Irrigação automática ativada por sensores
- Monitoramento de temperatura e luminosidade em tempo real
- Alertas automáticos via SMS ou notificação push
- Controle de estufa automatizado

### 🌐 APIs e Integrações
- API de clima real (OpenWeatherMap, INMET)
- Geolocalização precisa para dados regionais
- Banco de dados online para múltiplos usuários
- Integração com calendário agrícola da EMBRAPA

### 📱 Melhorias Futuras
- Aplicativo mobile (Android/iOS)
- Notificações push no celular
- Câmera para registro fotográfico das plantas
- Relatórios de produtividade mensal
- Compartilhamento entre agricultores da comunidade

---

## Conceito: Equilíbrio entre Produção e Meio Ambiente

O HortaViva promove práticas sustentáveis:

- **Adubação orgânica**: Prioriza compostagem e húmus de minhoca
- **Controle natural de pragas**: Sugere métodos sem agrotóxicos
- **Uso consciente da água**: Alertas baseados no clima evitam desperdício
- **Planejamento de cultivo**: Otimiza o uso do espaço da horta
- **Agricultura familiar**: Valoriza a produção local e saudável

---

## Autores

Protótipo desenvolvido para fins educacionais - Agrinho 2026

---

## Licença

Projeto educacional de código aberto para uso acadêmico.
