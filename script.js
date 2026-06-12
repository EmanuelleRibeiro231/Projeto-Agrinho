// ===== HORTA VIVA - SISTEMA DE GERENCIAMENTO DE HORTA =====
// Todas as funções e variáveis estão em português
// Utiliza o mini banco de dados IndexedDB (arquivo banco.js)

// ===== DADOS DAS PLANTAS (base de conhecimento) =====
var dadosPlantas = {
    alface: { nome: "Alface", emoji: "🥬", diasColheita: 45, irrigacao: "diária", adubo: "NPK 10-10-10 a cada 15 dias", categoria: "folhosa" },
    rucula: { nome: "Rúcula", emoji: "🥬", diasColheita: 30, irrigacao: "diária", adubo: "Composto orgânico a cada 20 dias", categoria: "folhosa" },
    couve: { nome: "Couve", emoji: "🥬", diasColheita: 60, irrigacao: "a cada 2 dias", adubo: "Húmus de minhoca mensal", categoria: "folhosa" },
    espinafre: { nome: "Espinafre", emoji: "🥬", diasColheita: 40, irrigacao: "diária", adubo: "NPK 10-10-10 a cada 15 dias", categoria: "folhosa" },
    agriao: { nome: "Agrião", emoji: "🥬", diasColheita: 35, irrigacao: "abundante diária", adubo: "Composto orgânico semanal", categoria: "folhosa" },
    chicoria: { nome: "Chicória", emoji: "🥬", diasColheita: 50, irrigacao: "diária", adubo: "NPK 10-10-10 a cada 20 dias", categoria: "folhosa" },
    salsinha: { nome: "Salsinha", emoji: "🌿", diasColheita: 60, irrigacao: "a cada 2 dias", adubo: "Composto orgânico mensal", categoria: "tempero" },
    cebolinha: { nome: "Cebolinha", emoji: "🌿", diasColheita: 55, irrigacao: "a cada 2 dias", adubo: "Húmus de minhoca mensal", categoria: "tempero" },
    manjericao: { nome: "Manjericão", emoji: "🌿", diasColheita: 50, irrigacao: "diária", adubo: "Composto orgânico a cada 15 dias", categoria: "tempero" },
    "hortelã": { nome: "Hortelã", emoji: "🌿", diasColheita: 40, irrigacao: "diária", adubo: "Composto orgânico mensal", categoria: "tempero" },
    tomate: { nome: "Tomate", emoji: "🍅", diasColheita: 90, irrigacao: "diária pela manhã", adubo: "NPK 4-14-8 a cada 15 dias", categoria: "fruto" },
    pimentao: { nome: "Pimentão", emoji: "🫑", diasColheita: 100, irrigacao: "diária", adubo: "NPK 4-14-8 a cada 15 dias", categoria: "fruto" },
    pepino: { nome: "Pepino", emoji: "🥒", diasColheita: 50, irrigacao: "diária", adubo: "Composto orgânico a cada 20 dias", categoria: "fruto" },
    abobrinha: { nome: "Abobrinha", emoji: "🥒", diasColheita: 55, irrigacao: "a cada 2 dias", adubo: "NPK 10-10-10 a cada 20 dias", categoria: "fruto" },
    berinjela: { nome: "Berinjela", emoji: "🍆", diasColheita: 100, irrigacao: "a cada 2 dias", adubo: "NPK 4-14-8 mensal", categoria: "fruto" },
    quiabo: { nome: "Quiabo", emoji: "🌱", diasColheita: 70, irrigacao: "a cada 2 dias", adubo: "Composto orgânico mensal", categoria: "fruto" },
    morango: { nome: "Morango", emoji: "🍓", diasColheita: 80, irrigacao: "diária leve", adubo: "NPK 4-14-8 a cada 15 dias", categoria: "fruto" },
    pimenta: { nome: "Pimenta", emoji: "🌶️", diasColheita: 90, irrigacao: "a cada 2 dias", adubo: "NPK 4-14-8 mensal", categoria: "fruto" },
    cenoura: { nome: "Cenoura", emoji: "🥕", diasColheita: 80, irrigacao: "a cada 2 dias", adubo: "NPK 4-14-8 na preparação do solo", categoria: "raiz" },
    beterraba: { nome: "Beterraba", emoji: "🟣", diasColheita: 70, irrigacao: "a cada 2 dias", adubo: "Composto orgânico na preparação", categoria: "raiz" },
    rabanete: { nome: "Rabanete", emoji: "🔴", diasColheita: 25, irrigacao: "diária leve", adubo: "Composto orgânico leve", categoria: "raiz" },
    mandioca: { nome: "Mandioca", emoji: "🥔", diasColheita: 270, irrigacao: "semanal", adubo: "NPK 4-14-8 no plantio", categoria: "raiz" }
};

// ===== SISTEMA DE PLANTAS COMPANHEIRAS =====
// Baseado em técnicas reais de consórcio/policultivo
var plantasCompanheiras = {
    alface: { amigas: ["cenoura", "rabanete", "morango", "cebolinha", "beterraba"], inimigas: ["salsinha"] },
    rucula: { amigas: ["tomate", "cenoura", "alface"], inimigas: ["morango"] },
    couve: { amigas: ["cebolinha", "manjericao", "beterraba", "salsinha"], inimigas: ["morango"] },
    espinafre: { amigas: ["morango", "alface", "rabanete", "couve"], inimigas: ["beterraba"] },
    agriao: { amigas: ["cenoura", "beterraba"], inimigas: [] },
    chicoria: { amigas: ["cenoura", "tomate", "alface"], inimigas: [] },
    salsinha: { amigas: ["tomate", "cebolinha", "cenoura", "rabanete"], inimigas: ["alface"] },
    cebolinha: { amigas: ["cenoura", "tomate", "alface", "morango", "beterraba"], inimigas: [] },
    manjericao: { amigas: ["tomate", "pimentao", "pepino", "berinjela"], inimigas: [] },
    "hortelã": { amigas: ["tomate", "couve", "berinjela"], inimigas: ["salsinha"] },
    tomate: { amigas: ["manjericao", "cebolinha", "salsinha", "cenoura", "rucula"], inimigas: ["pepino", "beterraba", "couve"] },
    pimentao: { amigas: ["manjericao", "tomate", "cenoura", "cebolinha"], inimigas: ["berinjela"] },
    pepino: { amigas: ["manjericao", "rabanete", "alface", "cebolinha"], inimigas: ["tomate", "salsinha"] },
    abobrinha: { amigas: ["manjericao", "cebolinha", "rabanete"], inimigas: ["pepino", "beterraba"] },
    berinjela: { amigas: ["manjericao", "salsinha", "hortelã"], inimigas: ["pimentao", "tomate"] },
    quiabo: { amigas: ["pepino", "alface", "cebolinha"], inimigas: [] },
    morango: { amigas: ["alface", "espinafre", "cebolinha", "rabanete"], inimigas: ["couve", "rucula"] },
    pimenta: { amigas: ["manjericao", "cenoura", "cebolinha"], inimigas: ["berinjela"] },
    cenoura: { amigas: ["cebolinha", "alface", "tomate", "salsinha", "rabanete"], inimigas: ["hortelã"] },
    beterraba: { amigas: ["alface", "cebolinha", "couve", "agriao"], inimigas: ["tomate", "espinafre"] },
    rabanete: { amigas: ["cenoura", "alface", "espinafre", "pepino", "morango"], inimigas: [] },
    mandioca: { amigas: ["cebolinha", "abobrinha"], inimigas: [] }
};

// ===== FUNÇÕES DE ARMAZENAMENTO (usa o banco de dados) =====
function salvarPlantas(plantas) {
    // Salva no localStorage como backup rápido
    localStorage.setItem('horta_plantas', JSON.stringify(plantas));
}

function carregarPlantas() {
    // Carrega do localStorage (sincronizado com o banco)
    var dados = localStorage.getItem('horta_plantas');
    if (dados) {
        var plantas = JSON.parse(dados);
        // Filtra plantas inválidas (sem dados correspondentes)
        var plantasValidas = [];
        for (var i = 0; i < plantas.length; i++) {
            if (plantas[i] && plantas[i].nome && dadosPlantas[plantas[i].nome]) {
                plantasValidas.push(plantas[i]);
            }
        }
        return plantasValidas;
    }
    return [];
}

// Sincroniza localStorage com o banco de dados IndexedDB
function sincronizarComBanco() {
    if (!bancoDados) return;

    buscarTodasPlantas().then(function(plantasDoBanco) {
        localStorage.setItem('horta_plantas', JSON.stringify(plantasDoBanco));
    });
}

// ===== FUNÇÕES DE DATA =====
function calcularDiasPassados(dataPlantio) {
    var hoje = new Date();
    var plantio = new Date(dataPlantio);
    var diferenca = hoje - plantio;
    return Math.floor(diferenca / (1000 * 60 * 60 * 24));
}

function formatarData(data) {
    var partes = data.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
}

function calcularDataColheita(dataPlantio, diasColheita) {
    var data = new Date(dataPlantio);
    data.setDate(data.getDate() + diasColheita);
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    return dia + '/' + mes + '/' + ano;
}

// ===== GEOLOCALIZAÇÃO E CLIMA =====
function obterLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(posicao) {
                var latitude = posicao.coords.latitude;
                var longitude = posicao.coords.longitude;
                buscarClima(latitude, longitude);
            },
            function(erro) {
                // Se não conseguir localização, usa dados simulados
                mostrarClimaSimulado();
            }
        );
    } else {
        mostrarClimaSimulado();
    }
}

function buscarClima(latitude, longitude) {
    // Protótipo: simula dados de clima baseado na localização
    // Em produção, usaria API como OpenWeatherMap
    mostrarClimaSimulado();
}

function mostrarClimaSimulado() {
    // Simula dados de clima para o protótipo
    var temperatura = Math.floor(Math.random() * 15) + 18; // 18-32°C
    var umidade = Math.floor(Math.random() * 40) + 45; // 45-84%
    var chuvaOpcoes = ["Sem chuva", "Chuva leve", "Possível chuva", "Ensolarado"];
    var chuva = chuvaOpcoes[Math.floor(Math.random() * chuvaOpcoes.length)];
    var vento = Math.floor(Math.random() * 20) + 5; // 5-24 km/h

    var elTemperatura = document.getElementById('temperatura');
    var elUmidade = document.getElementById('umidade');
    var elChuva = document.getElementById('chuva');
    var elVento = document.getElementById('vento');
    var elCidade = document.getElementById('nome-cidade');

    if (elTemperatura) elTemperatura.textContent = temperatura + '°C';
    if (elUmidade) elUmidade.textContent = umidade + '%';
    if (elChuva) elChuva.textContent = chuva;
    if (elVento) elVento.textContent = vento + ' km/h';
    if (elCidade) elCidade.textContent = 'Sua Região';

    // Salva dados do clima para gerar alertas
    var dadosClima = {
        temperatura: temperatura,
        umidade: umidade,
        chuva: chuva,
        vento: vento
    };
    localStorage.setItem('horta_clima', JSON.stringify(dadosClima));

    // Gera alertas logo após atualizar o clima para garantir sincronia
    mostrarAlertas();
}

// ===== CADASTRO DE PLANTAS =====
function cadastrarPlanta(evento) {
    evento.preventDefault();

    var nomePlanta = document.getElementById('nome-planta').value;
    var dataPlantio = document.getElementById('data-plantio').value;
    var localizacao = document.getElementById('localizacao').value;
    var quantidade = document.getElementById('quantidade').value;
    var observacoes = document.getElementById('observacoes').value;

    if (!nomePlanta || !dataPlantio || !localizacao) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    // Verifica se já existe planta nesse local
    var plantas = carregarPlantas();
    for (var v = 0; v < plantas.length; v++) {
        if (plantas[v].localizacao === localizacao) {
            alert('⚠️ Esse local já está ocupado por: ' + dadosPlantas[plantas[v].nome].nome + '!\nEscolha outro local ou remova a planta existente.');
            return;
        }
    }

    var novaPlanta = {
        id: Date.now(),
        nome: nomePlanta,
        dataPlantio: dataPlantio,
        localizacao: localizacao,
        quantidade: parseInt(quantidade),
        observacoes: observacoes,
        dataCadastro: new Date().toISOString()
    };

    // Salva no localStorage (funciona sempre)
    plantas.push(novaPlanta);
    salvarPlantas(plantas);

    // Tenta salvar no banco de dados IndexedDB também
    if (bancoDados) {
        inserirPlanta(novaPlanta).catch(function(erro) {
            console.log('Erro banco:', erro);
        });
        registrarHistorico({
            plantaId: novaPlanta.id,
            tipo: 'cadastro',
            descricao: 'Planta cadastrada: ' + dadosPlantas[nomePlanta].nome
        }).catch(function() {});
    }

    // Mostra mensagem de sucesso
    var mensagem = document.getElementById('mensagem-sucesso');
    mensagem.classList.remove('escondido');
    setTimeout(function() {
        mensagem.classList.add('escondido');
    }, 3000);

    // Limpa formulário
    document.getElementById('formulario-planta').reset();

    // Atualiza locais ocupados e lista
    atualizarLocaisOcupados();
    mostrarListaPlantas();
}

// Marca locais ocupados no dropdown de localização
function atualizarLocaisOcupados() {
    var selectLocal = document.getElementById('localizacao');
    if (!selectLocal) return;

    var plantas = carregarPlantas();
    var locaisOcupados = {};
    for (var i = 0; i < plantas.length; i++) {
        locaisOcupados[plantas[i].localizacao] = plantas[i].nome;
    }

    var opcoes = selectLocal.querySelectorAll('option');
    for (var j = 0; j < opcoes.length; j++) {
        var opcao = opcoes[j];
        var valor = opcao.value;
        if (!valor) continue;

        if (locaisOcupados[valor]) {
            var nomeOcupante = dadosPlantas[locaisOcupados[valor]] ? dadosPlantas[locaisOcupados[valor]].nome : locaisOcupados[valor];
            opcao.disabled = true;
            opcao.textContent = opcao.textContent.replace(/ — .*$/, '') + ' — 🚫 ' + nomeOcupante;
        } else {
            opcao.disabled = false;
            opcao.textContent = opcao.textContent.replace(/ — .*$/, '');
        }
    }

    // Atualiza dica
    var dica = document.getElementById('dica-localizacao');
    var totalOcupados = Object.keys(locaisOcupados).length;
    var totalLocais = 24; // 4 canteiros x 6 posições
    if (dica) {
        dica.textContent = '📍 ' + (totalLocais - totalOcupados) + ' de ' + totalLocais + ' posições disponíveis';
    }
}

// ===== EXIBIÇÃO DE PLANTAS CADASTRADAS =====
function mostrarListaPlantas() {
    var plantas = carregarPlantas();
    var container = document.getElementById('lista-plantas');

    if (!container) return;

    if (plantas.length === 0) {
        container.innerHTML = '<p class="sem-plantas">Nenhuma planta cadastrada ainda.</p>';
        return;
    }

    var html = '';
    for (var i = 0; i < plantas.length; i++) {
        var planta = plantas[i];
        var info = dadosPlantas[planta.nome];
        var diasPassados = calcularDiasPassados(planta.dataPlantio);
        var diasRestantes = Math.max(info.diasColheita - diasPassados, 0);
        var porcentagem = Math.min((diasPassados / info.diasColheita) * 100, 100);
        var status = determinarStatus(diasPassados, info.diasColheita);
        var dataColheita = calcularDataColheita(planta.dataPlantio, info.diasColheita);

        html += '<div class="planta-card" onclick="abrirDetalhamento(' + planta.id + ')">';
        html += '  <div class="planta-info">';
        html += '    <span class="emoji">' + info.emoji + '</span>';
        html += '    <div class="planta-detalhes">';
        html += '      <h3>' + info.nome + '</h3>';
        html += '      <p>Plantio: ' + formatarData(planta.dataPlantio) + ' | Local: ' + planta.localizacao + '</p>';
        html += '      <p>Dias: ' + diasPassados + '/' + info.diasColheita + ' | Qtd: ' + planta.quantidade + '</p>';
        html += '    </div>';
        html += '  </div>';
        html += '  <div>';
        html += '    <span class="planta-status ' + status.classe + '">' + status.texto + '</span>';
        html += '    <button class="botao-remover" onclick="event.stopPropagation(); removerPlanta(' + planta.id + ')">Remover</button>';
        html += '  </div>';
        html += '</div>';

        // Painel de detalhamento (escondido por padrão)
        html += '<div class="painel-detalhe escondido" id="detalhe-' + planta.id + '">';
        html += '  <div class="detalhe-cabecalho">';
        html += '    <h3>' + info.emoji + ' Detalhes - ' + info.nome + '</h3>';
        html += '    <button class="botao-fechar" onclick="event.stopPropagation(); fecharDetalhamento(' + planta.id + ')">✕</button>';
        html += '  </div>';
        html += '  <div class="detalhe-conteudo">';
        html += '    <div class="detalhe-grid">';
        html += '      <div class="detalhe-item"><span class="detalhe-label">📅 Data do Plantio</span><span class="detalhe-valor">' + formatarData(planta.dataPlantio) + '</span></div>';
        html += '      <div class="detalhe-item"><span class="detalhe-label">📍 Localização</span><span class="detalhe-valor">' + planta.localizacao + '</span></div>';
        html += '      <div class="detalhe-item"><span class="detalhe-label">📊 Dias Passados</span><span class="detalhe-valor">' + diasPassados + ' de ' + info.diasColheita + ' dias</span></div>';
        html += '      <div class="detalhe-item"><span class="detalhe-label">🌾 Previsão Colheita</span><span class="detalhe-valor">' + dataColheita + '</span></div>';
        html += '      <div class="detalhe-item"><span class="detalhe-label">⏳ Dias Restantes</span><span class="detalhe-valor">' + (diasRestantes > 0 ? diasRestantes + ' dias' : 'Pronta!') + '</span></div>';
        html += '      <div class="detalhe-item"><span class="detalhe-label">🔢 Quantidade</span><span class="detalhe-valor">' + planta.quantidade + ' unidade(s)</span></div>';
        html += '      <div class="detalhe-item"><span class="detalhe-label">💧 Irrigação</span><span class="detalhe-valor">' + info.irrigacao + '</span></div>';
        html += '      <div class="detalhe-item"><span class="detalhe-label">🧪 Adubação</span><span class="detalhe-valor">' + info.adubo + '</span></div>';
        html += '      <div class="detalhe-item"><span class="detalhe-label">🏷️ Categoria</span><span class="detalhe-valor">' + info.categoria + '</span></div>';
        html += '    </div>';
        html += '    <div class="detalhe-progresso">';
        html += '      <span>Progresso: ' + Math.round(porcentagem) + '%</span>';
        html += '      <div class="barra-progresso"><div class="progresso" style="width:' + porcentagem + '%"></div></div>';
        html += '    </div>';
        if (planta.observacoes) {
            html += '    <div class="detalhe-obs"><strong>📝 Observações:</strong> ' + planta.observacoes + '</div>';
        }
        // Sugestões de cuidado baseadas no status
        html += '    <div class="detalhe-sugestoes">';
        html += '      <strong>💡 Sugestões:</strong>';
        if (porcentagem >= 100) {
            html += '      <p class="sugestao-urgente">⚠️ Colheita atrasada! Colha o quanto antes para não perder qualidade.</p>';
        } else if (porcentagem >= 80) {
            html += '      <p class="sugestao-atencao">🔔 Quase pronta! Prepare-se para a colheita nos próximos dias.</p>';
        } else {
            html += '      <p class="sugestao-normal">🌱 Crescendo bem. Mantenha a irrigação ' + info.irrigacao + ' e adube com ' + info.adubo + '.</p>';
        }
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
    }

    container.innerHTML = html;
}

function determinarStatus(diasPassados, diasColheita) {
    var porcentagem = (diasPassados / diasColheita) * 100;

    if (porcentagem >= 100) {
        return { texto: "🌾 Colheita!", classe: "status-colheita" };
    } else if (porcentagem >= 80) {
        return { texto: "⚠️ Quase pronta", classe: "status-atencao" };
    } else {
        return { texto: "🌱 Crescendo", classe: "status-crescendo" };
    }
}

// ===== DETALHAMENTO DA PLANTA =====
function abrirDetalhamento(id) {
    // Fecha todos os outros painéis abertos
    var paineis = document.querySelectorAll('.painel-detalhe');
    for (var i = 0; i < paineis.length; i++) {
        if (paineis[i].id !== 'detalhe-' + id) {
            paineis[i].classList.add('escondido');
        }
    }

    // Abre/fecha o painel clicado
    var painel = document.getElementById('detalhe-' + id);
    if (painel) {
        painel.classList.toggle('escondido');
        // Rola suavemente até o painel se estiver abrindo
        if (!painel.classList.contains('escondido')) {
            painel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function fecharDetalhamento(id) {
    var painel = document.getElementById('detalhe-' + id);
    if (painel) {
        painel.classList.add('escondido');
    }
}

function removerPlanta(id) {
    if (confirm('Tem certeza que deseja remover esta planta?')) {
        // Remove do localStorage (funciona sempre)
        var plantas = carregarPlantas();
        plantas = plantas.filter(function(p) { return p.id !== id; });
        salvarPlantas(plantas);

        // Tenta remover do banco também
        if (bancoDados) {
            deletarPlanta(id).catch(function() {});
            registrarHistorico({
                plantaId: id,
                tipo: 'remocao',
                descricao: 'Planta removida do sistema'
            }).catch(function() {});
        }

        mostrarListaPlantas();
        atualizarLocaisOcupados();
        // Atualiza dashboard se estiver nessa pagina
        if (document.getElementById('lista-alertas')) {
            atualizarDashboard();
        }
    }
}

// ===== ALERTAS =====
function gerarAlertas() {
    var plantas = carregarPlantas();
    var clima = JSON.parse(localStorage.getItem('horta_clima') || '{}');
    var alertas = [];

    for (var i = 0; i < plantas.length; i++) {
        var planta = plantas[i];
        var info = dadosPlantas[planta.nome];
        if (!info) continue;
        var diasPassados = calcularDiasPassados(planta.dataPlantio);
        var diasRestantes = info.diasColheita - diasPassados;

        // Alerta de colheita
        if (diasRestantes <= 0) {
            alertas.push({
                tipo: "colheita",
                icone: "🌾",
                titulo: info.nome + " pronta para colheita!",
                mensagem: "Plantada em " + formatarData(planta.dataPlantio) + " no " + planta.localizacao + ". Já passou do período ideal de colheita.",
                planta: planta
            });
        } else if (diasRestantes <= 7) {
            alertas.push({
                tipo: "colheita",
                icone: "🌾",
                titulo: info.nome + " - Colheita em " + diasRestantes + " dias",
                mensagem: "Prepare-se para colher! Local: " + planta.localizacao,
                planta: planta
            });
        }

        // Alerta de irrigação baseado na temperatura atual
        var temp = clima.temperatura || 0;
        if (temp >= 26 && info.irrigacao.indexOf("diária") !== -1) {
            alertas.push({
                tipo: "irrigacao",
                icone: "💧",
                titulo: info.nome + " precisa de água extra!",
                mensagem: "Temperatura de " + temp + "°C detectada. Irrigação recomendada: " + info.irrigacao + ". Local: " + planta.localizacao,
                planta: planta
            });
        } else if (temp >= 30) {
            alertas.push({
                tipo: "irrigacao",
                icone: "💧",
                titulo: info.nome + " - Calor intenso!",
                mensagem: "Temperatura de " + temp + "°C! Todas as plantas precisam de irrigação reforçada. Local: " + planta.localizacao,
                planta: planta
            });
        }

        // Alerta de irrigação quando não chove
        if (clima.chuva === "Sem chuva" || clima.chuva === "Ensolarado") {
            if (info.categoria === "folhosa") {
                alertas.push({
                    tipo: "irrigacao",
                    icone: "💧",
                    titulo: "Irrigar " + info.nome + " hoje!",
                    mensagem: "Sem previsão de chuva. Folhosas precisam de irrigação frequente. Local: " + planta.localizacao,
                    planta: planta
                });
            }
        }

        // Alerta de adubação conforme necessidade de cada planta
        var intervaloAdubo = obterIntervaloAdubacao(info.adubo);
        if (diasPassados > 0 && intervaloAdubo > 0) {
            var diasDesdeUltimaAdubacao = diasPassados % intervaloAdubo;
            // Alerta quando está no dia ou até 2 dias depois do período ideal
            if (diasDesdeUltimaAdubacao <= 2) {
                alertas.push({
                    tipo: "adubo",
                    icone: "🧪",
                    titulo: "Hora de adubar " + info.nome + "!",
                    mensagem: "Recomendação: " + info.adubo + ". Local: " + planta.localizacao,
                    planta: planta
                });
            }
            // Alerta preventivo 3 dias antes
            else if (intervaloAdubo - diasDesdeUltimaAdubacao <= 3) {
                alertas.push({
                    tipo: "adubo",
                    icone: "🧪",
                    titulo: info.nome + " - Adubação em breve",
                    mensagem: "Faltam " + (intervaloAdubo - diasDesdeUltimaAdubacao) + " dia(s) para adubar. Prepare: " + info.adubo + ". Local: " + planta.localizacao,
                    planta: planta
                });
            }
        }

        // Alerta de adubação no plantio (para plantas que precisam no solo)
        if (diasPassados <= 3 && info.adubo.indexOf("plantio") !== -1) {
            alertas.push({
                tipo: "adubo",
                icone: "🧪",
                titulo: info.nome + " - Adubar no plantio!",
                mensagem: "Esta planta precisa de adubação na preparação do solo. Use: " + info.adubo + ". Local: " + planta.localizacao,
                planta: planta
            });
        }

        // Alerta de atenção por vento forte
        if (clima.vento > 18 && (info.categoria === "fruto" || info.nome === "Tomate")) {
            alertas.push({
                tipo: "atencao",
                icone: "⚠️",
                titulo: info.nome + " - Proteger do vento!",
                mensagem: "Vento forte (" + clima.vento + " km/h). Verifique as estacas e proteções. Local: " + planta.localizacao,
                planta: planta
            });
        }

        // Alerta de umidade baixa
        if (clima.umidade && clima.umidade < 50) {
            alertas.push({
                tipo: "irrigacao",
                icone: "💧",
                titulo: info.nome + " - Umidade baixa!",
                mensagem: "Umidade do ar em " + clima.umidade + "%. Considere irrigar com mais frequência. Local: " + planta.localizacao,
                planta: planta
            });
        }
    }

    return alertas;
}

// Extrai o intervalo de adubação em dias a partir da descrição
function obterIntervaloAdubacao(textoAdubo) {
    if (textoAdubo.indexOf("semanal") !== -1) return 7;
    if (textoAdubo.indexOf("a cada 15 dias") !== -1) return 15;
    if (textoAdubo.indexOf("a cada 20 dias") !== -1) return 20;
    if (textoAdubo.indexOf("mensal") !== -1) return 30;
    if (textoAdubo.indexOf("plantio") !== -1 || textoAdubo.indexOf("preparação") !== -1) return 0; // só no plantio
    return 30; // padrão mensal
}

function mostrarAlertas() {
    var alertas = gerarAlertas();
    var container = document.getElementById('lista-alertas');

    if (!container) return;

    if (alertas.length === 0) {
        var plantas = carregarPlantas();
        if (plantas.length === 0) {
            container.innerHTML = '<p class="sem-alertas">Nenhuma planta cadastrada ainda. Cadastre suas plantas para receber alertas!</p>';
        } else {
            container.innerHTML = '<p class="sem-alertas">✅ Tudo em ordem! Nenhum alerta no momento.</p>';
        }
        return;
    }

    var html = '';
    for (var i = 0; i < alertas.length; i++) {
        var alerta = alertas[i];
        html += '<div class="alerta-item ' + alerta.tipo + '">';
        html += '  <span class="alerta-icone">' + alerta.icone + '</span>';
        html += '  <div class="alerta-texto">';
        html += '    <strong>' + alerta.titulo + '</strong>';
        html += '    <small>' + alerta.mensagem + '</small>';
        html += '  </div>';
        html += '</div>';
    }

    container.innerHTML = html;
}

// ===== MAPA DA HORTA =====
function atualizarMapaHorta() {
    var plantas = carregarPlantas();
    var canteiros = ['A', 'B', 'C', 'P'];
    var posicoesPorCanteiro = 6;

    for (var c = 0; c < canteiros.length; c++) {
        var canteiro = canteiros[c];
        var container = document.getElementById('espacos-' + canteiro);
        if (!container) continue;

        var html = '';
        for (var pos = 1; pos <= posicoesPorCanteiro; pos++) {
            var codigo = canteiro + pos;
            var plantaNoLocal = null;

            // Procura planta nessa posição
            for (var i = 0; i < plantas.length; i++) {
                if (plantas[i].localizacao === codigo) {
                    plantaNoLocal = plantas[i];
                    break;
                }
            }

            if (plantaNoLocal) {
                var info = dadosPlantas[plantaNoLocal.nome];
                if (!info) { html += '<div class="espaco-novo vazio"><span class="espaco-vazio-icone">?</span><span class="espaco-codigo">' + codigo + '</span></div>'; continue; }
                var diasPassados = calcularDiasPassados(plantaNoLocal.dataPlantio);
                var porcentagem = Math.min((diasPassados / info.diasColheita) * 100, 100);
                var statusClasse = '';
                var statusTexto = '';

                if (porcentagem >= 100) {
                    statusClasse = 'mapa-colheita';
                    statusTexto = 'Colher!';
                } else if (porcentagem >= 80) {
                    statusClasse = 'mapa-atencao';
                    statusTexto = Math.round(porcentagem) + '%';
                } else {
                    statusClasse = 'mapa-crescendo';
                    statusTexto = Math.round(porcentagem) + '%';
                }

                html += '<div class="espaco-novo ocupado ' + statusClasse + '" title="' + info.nome + ' - ' + codigo + '">';
                html += '  <span class="espaco-emoji">' + info.emoji + '</span>';
                html += '  <span class="espaco-nome">' + info.nome + '</span>';
                html += '  <span class="espaco-status">' + statusTexto + '</span>';
                html += '  <span class="espaco-codigo">' + codigo + '</span>';
                html += '</div>';
            } else {
                html += '<div class="espaco-novo vazio">';
                html += '  <span class="espaco-vazio-icone">+</span>';
                html += '  <span class="espaco-codigo">' + codigo + '</span>';
                html += '</div>';
            }
        }
        container.innerHTML = html;
    }
}

// ===== RESUMO DO DASHBOARD =====
function atualizarResumo() {
    var plantas = carregarPlantas();
    var totalPlantas = plantas.length;
    var prontasColheita = 0;
    var precisamCuidado = 0;
    var saudaveis = 0;

    for (var i = 0; i < plantas.length; i++) {
        var planta = plantas[i];
        var info = dadosPlantas[planta.nome];
        if (!info) continue;
        var diasPassados = calcularDiasPassados(planta.dataPlantio);
        var porcentagem = (diasPassados / info.diasColheita) * 100;

        if (porcentagem >= 100) {
            prontasColheita++;
        } else if (porcentagem >= 80) {
            precisamCuidado++;
        } else {
            saudaveis++;
        }
    }

    var elTotal = document.getElementById('total-plantas');
    var elColheita = document.getElementById('prontas-colheita');
    var elCuidado = document.getElementById('precisam-cuidado');
    var elSaudaveis = document.getElementById('plantas-saudaveis');

    if (elTotal) elTotal.textContent = totalPlantas;
    if (elColheita) elColheita.textContent = prontasColheita;
    if (elCuidado) elCuidado.textContent = precisamCuidado;
    if (elSaudaveis) elSaudaveis.textContent = saudaveis;
}

// ===== PAINEL ADMIN - ALERTAS DETALHADOS =====
function mostrarAlertasDetalhados(filtro) {
    var plantas = carregarPlantas();
    var container = document.getElementById('alertas-detalhados');

    if (!container) return;

    if (plantas.length === 0) {
        container.innerHTML = '<p class="sem-alertas">Nenhuma planta cadastrada. Vá para a página de cadastro para adicionar plantas.</p>';
        return;
    }

    var html = '';
    for (var i = 0; i < plantas.length; i++) {
        var planta = plantas[i];
        var info = dadosPlantas[planta.nome];
        var diasPassados = calcularDiasPassados(planta.dataPlantio);
        var porcentagem = Math.min((diasPassados / info.diasColheita) * 100, 100);
        var diasRestantes = Math.max(info.diasColheita - diasPassados, 0);

        html += '<div class="alerta-detalhado">';
        html += '  <h3>' + info.emoji + ' ' + info.nome + ' - ' + planta.localizacao + '</h3>';
        html += '  <div class="info-linha"><span>Data plantio:</span><span>' + formatarData(planta.dataPlantio) + '</span></div>';
        html += '  <div class="info-linha"><span>Dias passados:</span><span>' + diasPassados + ' de ' + info.diasColheita + ' dias</span></div>';
        html += '  <div class="info-linha"><span>Previsão colheita:</span><span>' + calcularDataColheita(planta.dataPlantio, info.diasColheita) + '</span></div>';
        html += '  <div class="info-linha"><span>Irrigação:</span><span>' + info.irrigacao + '</span></div>';
        html += '  <div class="info-linha"><span>Adubação:</span><span>' + info.adubo + '</span></div>';
        html += '  <div class="info-linha"><span>Quantidade:</span><span>' + planta.quantidade + ' unidade(s)</span></div>';
        html += '  <div class="barra-progresso"><div class="progresso" style="width: ' + porcentagem + '%"></div></div>';
        html += '  <div class="info-linha"><span>Progresso:</span><span>' + Math.round(porcentagem) + '%</span></div>';
        html += '</div>';
    }

    container.innerHTML = html;
}

function mostrarCronograma() {
    var plantas = carregarPlantas();
    var container = document.getElementById('cronograma');

    if (!container) return;

    if (plantas.length === 0) {
        container.innerHTML = '<p class="sem-alertas">Nenhuma planta cadastrada ainda.</p>';
        return;
    }

    // Ordena por data de colheita
    var plantasOrdenadas = plantas.slice().sort(function(a, b) {
        var infoA = dadosPlantas[a.nome];
        var infoB = dadosPlantas[b.nome];
        var diasRestantesA = infoA.diasColheita - calcularDiasPassados(a.dataPlantio);
        var diasRestantesB = infoB.diasColheita - calcularDiasPassados(b.dataPlantio);
        return diasRestantesA - diasRestantesB;
    });

    var html = '';
    for (var i = 0; i < plantasOrdenadas.length; i++) {
        var planta = plantasOrdenadas[i];
        var info = dadosPlantas[planta.nome];
        var diasRestantes = Math.max(info.diasColheita - calcularDiasPassados(planta.dataPlantio), 0);
        var dataColheita = calcularDataColheita(planta.dataPlantio, info.diasColheita);

        html += '<div class="item-cronograma">';
        html += '  <span class="data-colheita">' + dataColheita + '</span>';
        html += '  <span>' + info.emoji + ' ' + info.nome + '</span>';
        html += '  <span>' + planta.localizacao + '</span>';
        if (diasRestantes === 0) {
            html += '  <span class="planta-status status-colheita">Pronta!</span>';
        } else {
            html += '  <span class="planta-status status-crescendo">' + diasRestantes + ' dias</span>';
        }
        html += '</div>';
    }

    container.innerHTML = html;
}

// ===== FILTRO DE ALERTAS =====
function filtrarAlertas(tipo) {
    // Atualiza botões
    var botoes = document.querySelectorAll('.botao-filtro');
    for (var i = 0; i < botoes.length; i++) {
        botoes[i].classList.remove('ativo');
    }
    event.target.classList.add('ativo');

    // Filtra alertas (no protótipo mostra todos)
    mostrarAlertasDetalhados(tipo);
}

// ===== AÇÕES RÁPIDAS =====
function marcarIrrigacao() {
    var plantas = carregarPlantas();
    if (plantas.length === 0) {
        alert('Nenhuma planta cadastrada para registrar irrigação.');
        return;
    }

    // Registra irrigação no banco de dados para todas as plantas
    var dataHora = new Date().toLocaleString('pt-BR');
    var promessas = [];
    for (var i = 0; i < plantas.length; i++) {
        promessas.push(registrarHistorico({
            plantaId: plantas[i].id,
            tipo: 'irrigacao',
            descricao: 'Irrigação realizada em ' + dataHora
        }));
    }

    Promise.all(promessas).then(function() {
        alert('💧 Irrigação registrada no banco de dados!\nData: ' + dataHora + '\nPlantas irrigadas: ' + plantas.length);
    });
}

function marcarAdubacao() {
    var plantas = carregarPlantas();
    if (plantas.length === 0) {
        alert('Nenhuma planta cadastrada para registrar adubação.');
        return;
    }

    var dataHora = new Date().toLocaleString('pt-BR');
    var promessas = [];
    for (var i = 0; i < plantas.length; i++) {
        promessas.push(registrarHistorico({
            plantaId: plantas[i].id,
            tipo: 'adubacao',
            descricao: 'Adubação realizada em ' + dataHora
        }));
    }

    Promise.all(promessas).then(function() {
        alert('🧪 Adubação registrada no banco de dados!\nData: ' + dataHora + '\nPlantas adubadas: ' + plantas.length);
    });
}

// ===== EXPORTAR E IMPORTAR REGISTROS EM ARQUIVO =====
function exportarRegistros() {
    // Exporta do banco de dados completo
    exportarBanco().then(function(dados) {
        if (dados.plantas.length === 0) {
            alert('Nenhuma planta cadastrada para salvar!');
            return;
        }

        var conteudo = JSON.stringify(dados, null, 2);
        var blob = new Blob([conteudo], { type: 'application/json' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'horta_registros_' + new Date().toISOString().split('T')[0] + '.json';
        link.click();

        alert('✅ Banco de dados exportado com sucesso!\nPlantas: ' + dados.plantas.length + '\nRegistros de histórico: ' + dados.historico.length);
    });
}

function importarRegistros(evento) {
    var arquivo = evento.target.files[0];

    if (!arquivo) return;

    var leitor = new FileReader();
    leitor.onload = function(e) {
        try {
            var dados = JSON.parse(e.target.result);

            if (!dados.plantas || !Array.isArray(dados.plantas)) {
                alert('❌ Arquivo inválido! Não contém registros de plantas.');
                return;
            }

            if (confirm('Deseja substituir os dados atuais pelos do arquivo?\n\nO arquivo contém ' + dados.plantas.length + ' planta(s).')) {
                // Importa para o banco de dados IndexedDB
                importarParaBanco(dados).then(function() {
                    // Sincroniza com localStorage
                    salvarPlantas(dados.plantas);
                    alert('✅ Banco de dados importado com sucesso!\n' + dados.plantas.length + ' planta(s) carregada(s).');
                    location.reload();
                }).catch(function(erro) {
                    console.error('Erro ao importar:', erro);
                    alert('❌ Erro ao importar dados para o banco.');
                });
            }
        } catch (erro) {
            alert('❌ Erro ao ler o arquivo. Verifique se é um arquivo JSON válido.');
        }
    };
    leitor.readAsText(arquivo);

    // Limpa o input para permitir importar o mesmo arquivo novamente
    evento.target.value = '';
}

function limparDados() {
    if (confirm('⚠️ Tem certeza que deseja apagar TODOS os dados do banco?\n\nEssa ação não pode ser desfeita!')) {
        // Limpa o banco de dados IndexedDB
        limparBancoCompleto().then(function() {
            localStorage.removeItem('horta_plantas');
            localStorage.removeItem('horta_clima');
            alert('🗑️ Banco de dados limpo completamente.');
            location.reload();
        });
    }
}

// ===== MODAL - PLANTAS POR CATEGORIA =====
function mostrarPlantasPorCategoria(categoria) {
    var plantas = carregarPlantas();
    var plantasFiltradas = [];
    var titulo = '';

    for (var i = 0; i < plantas.length; i++) {
        var planta = plantas[i];
        var info = dadosPlantas[planta.nome];
        if (!info) continue;
        var diasPassados = calcularDiasPassados(planta.dataPlantio);
        var porcentagem = (diasPassados / info.diasColheita) * 100;

        if (categoria === 'todas') {
            plantasFiltradas.push(planta);
        } else if (categoria === 'colheita' && porcentagem >= 100) {
            plantasFiltradas.push(planta);
        } else if (categoria === 'cuidado' && porcentagem >= 80 && porcentagem < 100) {
            plantasFiltradas.push(planta);
        } else if (categoria === 'saudavel' && porcentagem < 80) {
            plantasFiltradas.push(planta);
        }
    }

    if (categoria === 'todas') titulo = '🌱 Todas as Plantas';
    else if (categoria === 'colheita') titulo = '🌾 Prontas para Colheita';
    else if (categoria === 'cuidado') titulo = '⚠️ Precisam de Cuidado';
    else if (categoria === 'saudavel') titulo = '✅ Plantas Saudáveis';

    var modal = document.getElementById('modal-plantas');
    var tituloEl = document.getElementById('modal-titulo');
    var listaEl = document.getElementById('modal-lista-plantas');

    tituloEl.textContent = titulo;

    if (plantasFiltradas.length === 0) {
        listaEl.innerHTML = '<p class="sem-alertas">Nenhuma planta nesta categoria.</p>';
    } else {
        var html = '';
        for (var j = 0; j < plantasFiltradas.length; j++) {
            var p = plantasFiltradas[j];
            var inf = dadosPlantas[p.nome];
            var dias = calcularDiasPassados(p.dataPlantio);
            var diasRest = Math.max(inf.diasColheita - dias, 0);
            var pct = Math.min((dias / inf.diasColheita) * 100, 100);

            html += '<div class="modal-planta-item">';
            html += '  <div class="modal-planta-info">';
            html += '    <span class="modal-emoji">' + inf.emoji + '</span>';
            html += '    <div>';
            html += '      <strong>' + inf.nome + '</strong>';
            html += '      <p>📍 ' + p.localizacao + ' | Qtd: ' + p.quantidade + '</p>';
            html += '    </div>';
            html += '  </div>';
            html += '  <div class="modal-planta-detalhes">';
            if (categoria === 'cuidado') {
                html += '    <p class="modal-alerta">💧 Irrigação: ' + inf.irrigacao + '</p>';
                html += '    <p class="modal-alerta">🧪 Adubo: ' + inf.adubo + '</p>';
                html += '    <p class="modal-alerta">⏳ Faltam ' + diasRest + ' dias para colheita</p>';
            } else if (categoria === 'colheita') {
                html += '    <p class="modal-alerta">🌾 Pronta! Colha o quanto antes.</p>';
            } else {
                html += '    <p>📅 ' + dias + '/' + inf.diasColheita + ' dias (' + Math.round(pct) + '%)</p>';
            }
            html += '    <div class="barra-progresso"><div class="progresso" style="width:' + pct + '%"></div></div>';
            html += '  </div>';
            html += '</div>';
        }
        listaEl.innerHTML = html;
    }

    modal.classList.remove('escondido');
}

function fecharModalPlantas() {
    var modal = document.getElementById('modal-plantas');
    if (modal) modal.classList.add('escondido');
}

function fecharModal(evento) {
    if (evento.target.id === 'modal-plantas') {
        fecharModalPlantas();
    }
}

// ===== SISTEMA INTELIGENTE DA HORTA =====

// Calcula a nota de saúde individual de uma planta (0-100)
function calcularSaudePlanta(planta) {
    var info = dadosPlantas[planta.nome];
    if (!info) return 0;

    var diasPassados = calcularDiasPassados(planta.dataPlantio);
    var porcentagem = (diasPassados / info.diasColheita) * 100;
    var clima = JSON.parse(localStorage.getItem('horta_clima') || '{}');
    var nota = 100;

    // Penalidade: planta passou do ponto de colheita
    if (porcentagem >= 100) {
        var atraso = porcentagem - 100;
        nota -= Math.min(atraso * 2, 40);
    }

    // Penalidade: temperatura ruim
    var temp = clima.temperatura || 25;
    if (temp > 32) nota -= 15;
    else if (temp > 28) nota -= 5;
    if (temp < 15) nota -= 20;

    // Penalidade: umidade baixa
    if (clima.umidade && clima.umidade < 40) nota -= 15;
    else if (clima.umidade && clima.umidade < 50) nota -= 5;

    // Penalidade: vento forte para frutas
    if (clima.vento > 20 && info.categoria === "fruto") nota -= 10;

    // Penalidade: conflito com planta inimiga no mesmo canteiro
    var canteiro = planta.localizacao.charAt(0);
    var plantas = carregarPlantas();
    for (var i = 0; i < plantas.length; i++) {
        if (plantas[i].id === planta.id) continue;
        if (plantas[i].localizacao.charAt(0) === canteiro) {
            var comp = plantasCompanheiras[planta.nome];
            if (comp && comp.inimigas.indexOf(plantas[i].nome) !== -1) {
                nota -= 15;
            }
        }
    }

    // Bônus: planta companheira no mesmo canteiro
    for (var j = 0; j < plantas.length; j++) {
        if (plantas[j].id === planta.id) continue;
        if (plantas[j].localizacao.charAt(0) === canteiro) {
            var comp2 = plantasCompanheiras[planta.nome];
            if (comp2 && comp2.amigas.indexOf(plantas[j].nome) !== -1) {
                nota += 5;
                break; // max 1 bônus
            }
        }
    }

    return Math.max(0, Math.min(100, Math.round(nota)));
}

// Calcula a saúde geral da horta
function calcularSaudeGeral() {
    var plantas = carregarPlantas();
    if (plantas.length === 0) return { nota: 0, nivel: 'vazia' };

    var somaNotas = 0;
    for (var i = 0; i < plantas.length; i++) {
        somaNotas += calcularSaudePlanta(plantas[i]);
    }
    var media = Math.round(somaNotas / plantas.length);

    var nivel;
    if (media >= 85) nivel = 'excelente';
    else if (media >= 70) nivel = 'boa';
    else if (media >= 50) nivel = 'regular';
    else nivel = 'critica';

    return { nota: media, nivel: nivel };
}

// Detecta conflitos entre plantas companheiras
function detectarConflitos() {
    var plantas = carregarPlantas();
    var conflitos = [];
    var sinergias = [];

    for (var i = 0; i < plantas.length; i++) {
        var p1 = plantas[i];
        var comp = plantasCompanheiras[p1.nome];
        if (!comp) continue;
        var canteiro1 = p1.localizacao.charAt(0);

        for (var j = i + 1; j < plantas.length; j++) {
            var p2 = plantas[j];
            var canteiro2 = p2.localizacao.charAt(0);

            if (canteiro1 !== canteiro2) continue;

            var info1 = dadosPlantas[p1.nome];
            var info2 = dadosPlantas[p2.nome];
            if (!info1 || !info2) continue;

            if (comp.inimigas.indexOf(p2.nome) !== -1) {
                conflitos.push({
                    planta1: info1.emoji + ' ' + info1.nome,
                    planta2: info2.emoji + ' ' + info2.nome,
                    canteiro: 'Canteiro ' + canteiro1,
                    dica: 'Separe em canteiros diferentes para melhor crescimento.'
                });
            }
            if (comp.amigas.indexOf(p2.nome) !== -1) {
                sinergias.push({
                    planta1: info1.emoji + ' ' + info1.nome,
                    planta2: info2.emoji + ' ' + info2.nome,
                    canteiro: 'Canteiro ' + canteiro1
                });
            }
        }
    }

    return { conflitos: conflitos, sinergias: sinergias };
}

// Gera agenda inteligente de tarefas do dia
function gerarAgendaDiaria() {
    var plantas = carregarPlantas();
    var clima = JSON.parse(localStorage.getItem('horta_clima') || '{}');
    var tarefas = [];

    for (var i = 0; i < plantas.length; i++) {
        var planta = plantas[i];
        var info = dadosPlantas[planta.nome];
        if (!info) continue;
        var diasPassados = calcularDiasPassados(planta.dataPlantio);
        var diasRestantes = Math.max(info.diasColheita - diasPassados, 0);
        var intervaloAdubo = obterIntervaloAdubacao(info.adubo);

        // Colheita urgente
        if (diasRestantes === 0) {
            tarefas.push({
                prioridade: 1,
                icone: '🌾',
                acao: 'Colher ' + info.nome,
                local: planta.localizacao,
                urgencia: 'urgente',
                detalhe: 'Passou do período ideal. Colha agora!'
            });
        }

        // Irrigação
        var precisaIrrigar = false;
        if (info.irrigacao.indexOf('diária') !== -1) {
            precisaIrrigar = true;
        } else if (info.irrigacao.indexOf('2 dias') !== -1 && diasPassados % 2 === 0) {
            precisaIrrigar = true;
        } else if (info.irrigacao.indexOf('semanal') !== -1 && diasPassados % 7 === 0) {
            precisaIrrigar = true;
        }

        if (precisaIrrigar) {
            var prioridadeIrrigacao = 2;
            if (clima.temperatura > 28) prioridadeIrrigacao = 1;
            if (clima.chuva === 'Chuva leve' || clima.chuva === 'Possível chuva') prioridadeIrrigacao = 3;

            tarefas.push({
                prioridade: prioridadeIrrigacao,
                icone: '💧',
                acao: 'Irrigar ' + info.nome,
                local: planta.localizacao,
                urgencia: prioridadeIrrigacao === 1 ? 'alta' : 'normal',
                detalhe: info.irrigacao + (clima.temperatura > 28 ? ' (calor: reforçar)' : '')
            });
        }

        // Adubação
        if (intervaloAdubo > 0 && diasPassados > 0) {
            var diasDesdeAdubo = diasPassados % intervaloAdubo;
            if (diasDesdeAdubo <= 1) {
                tarefas.push({
                    prioridade: 2,
                    icone: '🧪',
                    acao: 'Adubar ' + info.nome,
                    local: planta.localizacao,
                    urgencia: 'normal',
                    detalhe: info.adubo
                });
            }
        }

        // Verificação de estacas para tomate/pimentão com vento
        if (clima.vento > 15 && (planta.nome === 'tomate' || planta.nome === 'pimentao')) {
            tarefas.push({
                prioridade: 2,
                icone: '🪴',
                acao: 'Verificar estacas - ' + info.nome,
                local: planta.localizacao,
                urgencia: 'alta',
                detalhe: 'Vento de ' + clima.vento + ' km/h. Proteja os caules.'
            });
        }
    }

    // Ordena por prioridade
    tarefas.sort(function(a, b) { return a.prioridade - b.prioridade; });
    return tarefas;
}

// ===== SISTEMA DE TAREFAS CONCLUÍDAS =====
function gerarIdTarefa(tarefa) {
    // Gera um ID único baseado na ação + local (estável por dia)
    return (tarefa.acao + '_' + tarefa.local).replace(/[^a-zA-Z0-9]/g, '_');
}

function carregarTarefasConcluidas() {
    var hoje = new Date().toISOString().split('T')[0];
    var dados = localStorage.getItem('horta_tarefas_' + hoje);
    if (dados) return JSON.parse(dados);
    return {};
}

function salvarTarefasConcluidas(tarefas) {
    var hoje = new Date().toISOString().split('T')[0];
    localStorage.setItem('horta_tarefas_' + hoje, JSON.stringify(tarefas));
    // Limpa tarefas de dias anteriores (mantém só hoje e ontem)
    limparTarefasAntigas();
}

function limparTarefasAntigas() {
    var hoje = new Date();
    var ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);
    var hojeStr = hoje.toISOString().split('T')[0];
    var ontemStr = ontem.toISOString().split('T')[0];

    for (var i = 0; i < localStorage.length; i++) {
        var chave = localStorage.key(i);
        if (chave && chave.indexOf('horta_tarefas_') === 0) {
            var data = chave.replace('horta_tarefas_', '');
            if (data !== hojeStr && data !== ontemStr) {
                localStorage.removeItem(chave);
            }
        }
    }
}

function marcarTarefaConcluida(tarefaId, botao) {
    var tarefas = carregarTarefasConcluidas();

    if (tarefas[tarefaId]) {
        // Desmarcar
        delete tarefas[tarefaId];
    } else {
        // Marcar como concluída
        tarefas[tarefaId] = new Date().toLocaleTimeString('pt-BR');
    }

    salvarTarefasConcluidas(tarefas);

    // Atualiza visual sem recarregar tudo
    var item = botao.closest('.tarefa-item');
    if (tarefas[tarefaId]) {
        item.classList.add('tarefa-concluida');
        botao.classList.add('checked');
        botao.innerHTML = '✅';
        botao.title = 'Desmarcar';
    } else {
        item.classList.remove('tarefa-concluida');
        botao.classList.remove('checked');
        botao.innerHTML = '⬜';
        botao.title = 'Marcar como feita';
    }

    // Atualiza contador no badge
    atualizarBadgeTarefas();
}

function atualizarBadgeTarefas() {
    var badge = document.querySelector('.badge-tarefas');
    if (!badge) return;

    var todos = document.querySelectorAll('.tarefa-item');
    var concluidas = document.querySelectorAll('.tarefa-item.tarefa-concluida');
    var pendentes = todos.length - concluidas.length;
    badge.textContent = pendentes + '/' + todos.length;

    // Mostra mensagem se todas concluídas
    var msgCompleta = document.querySelector('.sem-tarefas');
    if (pendentes === 0 && !msgCompleta) {
        var lista = document.querySelector('.lista-tarefas-inteligente');
        if (lista) {
            var msg = document.createElement('p');
            msg.className = 'sem-tarefas msg-todas-feitas';
            msg.textContent = '✅ Todas as tarefas de hoje foram concluídas! 🎉';
            lista.parentNode.insertBefore(msg, lista);
        }
    } else if (pendentes > 0) {
        var msgExistente = document.querySelector('.msg-todas-feitas');
        if (msgExistente) msgExistente.remove();
    }
}

// Renderiza o painel inteligente no dashboard
function renderizarPainelInteligente() {
    var container = document.getElementById('painel-inteligente');
    if (!container) return;

    var plantas = carregarPlantas();
    if (plantas.length === 0) {
        container.innerHTML = '<p class="sem-alertas">Cadastre plantas para ativar o diagnóstico inteligente.</p>';
        return;
    }

    try {
    var saude = calcularSaudeGeral();
    var compatibilidade = detectarConflitos();
    var agenda = gerarAgendaDiaria();

    var html = '';

    // ===== Indicador de Saúde =====
    var corGauge = saude.nivel === 'excelente' ? '#28a745' :
                   saude.nivel === 'boa' ? '#5cb85c' :
                   saude.nivel === 'regular' ? '#f0ad4e' : '#dc3545';
    var emojiSaude = saude.nivel === 'excelente' ? '🌟' :
                     saude.nivel === 'boa' ? '😊' :
                     saude.nivel === 'regular' ? '😐' : '😟';

    html += '<div class="inteligente-saude">';
    html += '  <div class="gauge-container">';
    html += '    <svg class="gauge-svg" viewBox="0 0 120 70">';
    html += '      <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke="#e0e0e0" stroke-width="10" stroke-linecap="round"/>';
    var angulo = (saude.nota / 100) * 180;
    var rad = angulo * Math.PI / 180;
    var x = 60 - 50 * Math.cos(rad);
    var y = 65 - 50 * Math.sin(rad);
    var largeArc = angulo > 180 ? 1 : 0;
    html += '      <path d="M 10 65 A 50 50 0 ' + largeArc + ' 1 ' + x.toFixed(1) + ' ' + y.toFixed(1) + '" fill="none" stroke="' + corGauge + '" stroke-width="10" stroke-linecap="round" class="gauge-progress"/>';
    html += '    </svg>';
    html += '    <div class="gauge-texto">';
    html += '      <span class="gauge-numero">' + saude.nota + '</span>';
    html += '      <span class="gauge-label">' + emojiSaude + ' ' + saude.nivel.charAt(0).toUpperCase() + saude.nivel.slice(1) + '</span>';
    html += '    </div>';
    html += '  </div>';
    html += '  <p class="gauge-descricao">Saúde geral da horta baseada em clima, cuidados e compatibilidade</p>';
    html += '</div>';

    // ===== Agenda Inteligente =====
    var tarefasConcluidas = carregarTarefasConcluidas();
    var tarefasPendentes = 0;
    for (var tp = 0; tp < agenda.length; tp++) {
        var idTarefa = gerarIdTarefa(agenda[tp]);
        if (!tarefasConcluidas[idTarefa]) tarefasPendentes++;
    }

    html += '<div class="inteligente-agenda">';
    html += '  <h4>📋 Tarefas de Hoje <span class="badge-tarefas">' + tarefasPendentes + '/' + agenda.length + '</span></h4>';
    if (agenda.length === 0) {
        html += '  <p class="sem-tarefas">Nenhuma tarefa pendente. Horta em dia! 🎉</p>';
    } else {
        if (tarefasPendentes === 0) {
            html += '  <p class="sem-tarefas">✅ Todas as tarefas de hoje foram concluídas! 🎉</p>';
        }
        html += '  <div class="lista-tarefas-inteligente">';
        var maxTarefas = Math.min(agenda.length, 8);
        for (var t = 0; t < maxTarefas; t++) {
            var tarefa = agenda[t];
            var tarefaId = gerarIdTarefa(tarefa);
            var feita = tarefasConcluidas[tarefaId] ? true : false;
            var classeFeita = feita ? ' tarefa-concluida' : '';
            html += '    <div class="tarefa-item urgencia-' + tarefa.urgencia + classeFeita + '" id="tarefa-' + t + '">';
            html += '      <button class="tarefa-check' + (feita ? ' checked' : '') + '" onclick="marcarTarefaConcluida(\'' + tarefaId + '\', this)" title="' + (feita ? 'Desmarcar' : 'Marcar como feita') + '">';
            html += '        ' + (feita ? '✅' : '⬜');
            html += '      </button>';
            html += '      <span class="tarefa-icone">' + tarefa.icone + '</span>';
            html += '      <div class="tarefa-info">';
            html += '        <strong>' + tarefa.acao + '</strong>';
            html += '        <small>📍 ' + tarefa.local + ' — ' + tarefa.detalhe + '</small>';
            html += '      </div>';
            html += '      <span class="tarefa-urgencia urgencia-tag-' + tarefa.urgencia + '">' + tarefa.urgencia + '</span>';
            html += '    </div>';
        }
        if (agenda.length > 8) {
            html += '  <p class="mais-tarefas">+ ' + (agenda.length - 8) + ' tarefas adicionais</p>';
        }
        html += '  </div>';
    }
    html += '</div>';

    // ===== Plantas Companheiras =====
    html += '<div class="inteligente-companheiras">';
    html += '  <h4>🤝 Compatibilidade entre Plantas</h4>';

    if (compatibilidade.conflitos.length > 0) {
        html += '  <div class="companheiras-secao conflitos-secao">';
        html += '    <h5>❌ Conflitos Detectados (' + compatibilidade.conflitos.length + ')</h5>';
        for (var c = 0; c < compatibilidade.conflitos.length; c++) {
            var conf = compatibilidade.conflitos[c];
            html += '    <div class="conflito-item">';
            html += '      <p><strong>' + conf.planta1 + '</strong> ✕ <strong>' + conf.planta2 + '</strong></p>';
            html += '      <small>📍 ' + conf.canteiro + ' — ' + conf.dica + '</small>';
            html += '    </div>';
        }
        html += '  </div>';
    }

    if (compatibilidade.sinergias.length > 0) {
        html += '  <div class="companheiras-secao sinergias-secao">';
        html += '    <h5>✅ Combinações Benéficas (' + compatibilidade.sinergias.length + ')</h5>';
        for (var s = 0; s < Math.min(compatibilidade.sinergias.length, 5); s++) {
            var sin = compatibilidade.sinergias[s];
            html += '    <div class="sinergia-item">';
            html += '      <p>' + sin.planta1 + ' 💚 ' + sin.planta2 + '</p>';
            html += '      <small>📍 ' + sin.canteiro + '</small>';
            html += '    </div>';
        }
        if (compatibilidade.sinergias.length > 5) {
            html += '  <p class="mais-tarefas">+ ' + (compatibilidade.sinergias.length - 5) + ' combinações</p>';
        }
        html += '  </div>';
    }

    if (compatibilidade.conflitos.length === 0 && compatibilidade.sinergias.length === 0) {
        html += '  <p class="sem-alertas">Adicione mais plantas para ver a compatibilidade entre elas.</p>';
    }

    html += '</div>';

    container.innerHTML = html;
    } catch (erro) {
        console.error('Erro ao renderizar painel inteligente:', erro);
        container.innerHTML = '<p class="sem-alertas">Erro ao carregar diagnóstico. Recarregue a página.</p>';
    }
}

// ===== GUIA DE COMPATIBILIDADE DE PLANTAS =====
function inicializarGuiaCompatibilidade() {
    var select = document.getElementById('filtro-planta');
    if (!select) return;

    // Preenche o select com as plantas disponíveis
    var chaves = Object.keys(plantasCompanheiras);
    for (var i = 0; i < chaves.length; i++) {
        var chave = chaves[i];
        var info = dadosPlantas[chave];
        if (info) {
            var option = document.createElement('option');
            option.value = chave;
            option.textContent = info.emoji + ' ' + info.nome;
            select.appendChild(option);
        }
    }

    // Renderiza todas as plantas inicialmente
    mostrarCompatibilidade();
}

function mostrarCompatibilidade() {
    var select = document.getElementById('filtro-planta');
    var container = document.getElementById('tabela-compatibilidade');
    if (!select || !container) return;

    var filtro = select.value;
    var html = '';

    var chaves = filtro ? [filtro] : Object.keys(plantasCompanheiras);

    for (var i = 0; i < chaves.length; i++) {
        var chave = chaves[i];
        var companheira = plantasCompanheiras[chave];
        var info = dadosPlantas[chave];
        if (!companheira || !info) continue;

        html += '<div class="compat-card">';
        html += '<div class="compat-card-header">';
        html += '<span class="emoji">' + info.emoji + '</span>';
        html += '<h4>' + info.nome + '</h4>';
        html += '</div>';

        // Amigas
        html += '<div class="compat-lista">';
        html += '<h5 class="amigas">✅ Boas companheiras</h5>';
        html += '<div class="compat-tags">';
        if (companheira.amigas.length > 0) {
            for (var j = 0; j < companheira.amigas.length; j++) {
                var amigaInfo = dadosPlantas[companheira.amigas[j]];
                var nomeAmiga = amigaInfo ? amigaInfo.nome : companheira.amigas[j];
                var emojiAmiga = amigaInfo ? amigaInfo.emoji : '🌱';
                html += '<span class="compat-tag amiga">' + emojiAmiga + ' ' + nomeAmiga + '</span>';
            }
        } else {
            html += '<span class="compat-tag nenhuma">Sem dados registrados</span>';
        }
        html += '</div></div>';

        // Inimigas
        html += '<div class="compat-lista">';
        html += '<h5 class="inimigas">❌ Evitar próximas</h5>';
        html += '<div class="compat-tags">';
        if (companheira.inimigas.length > 0) {
            for (var k = 0; k < companheira.inimigas.length; k++) {
                var inimigaInfo = dadosPlantas[companheira.inimigas[k]];
                var nomeInimiga = inimigaInfo ? inimigaInfo.nome : companheira.inimigas[k];
                var emojiInimiga = inimigaInfo ? inimigaInfo.emoji : '🌱';
                html += '<span class="compat-tag inimiga">' + emojiInimiga + ' ' + nomeInimiga + '</span>';
            }
        } else {
            html += '<span class="compat-tag nenhuma">Nenhum conflito conhecido</span>';
        }
        html += '</div></div>';

        html += '</div>';
    }

    container.innerHTML = html;
}

// ===== ATUALIZAÇÃO DO DASHBOARD =====
function atualizarDashboard() {
    try {
        obterLocalizacao(); // já chama mostrarAlertas() após atualizar clima
    } catch (e) { console.error('Erro em obterLocalizacao:', e); }
    try {
        atualizarMapaHorta();
    } catch (e) { console.error('Erro em atualizarMapaHorta:', e); }
    try {
        atualizarResumo();
    } catch (e) { console.error('Erro em atualizarResumo:', e); }
    try {
        renderizarPainelInteligente();
    } catch (e) { console.error('Erro em renderizarPainelInteligente:', e); }
    try {
        inicializarGuiaCompatibilidade();
    } catch (e) { console.error('Erro em inicializarGuiaCompatibilidade:', e); }
}

// ===== INICIALIZAÇÃO =====
function inicializar() {
    // Tenta abrir o banco de dados
    try {
        abrirBanco().then(function() {
            console.log('Banco de dados conectado!');

            // Sincroniza dados do banco com localStorage
            buscarTodasPlantas().then(function(plantasDoBanco) {
                if (plantasDoBanco.length > 0) {
                    salvarPlantas(plantasDoBanco);
                } else if (carregarPlantas().length === 0) {
                    cadastrarExemplos();
                }
                carregarPagina();
            }).catch(function() {
                if (carregarPlantas().length === 0) {
                    cadastrarExemplos();
                }
                carregarPagina();
            });
        }).catch(function() {
            console.log('Banco indisponivel, usando localStorage');
            if (carregarPlantas().length === 0) {
                cadastrarExemplos();
            }
            carregarPagina();
        });
    } catch (erro) {
        // Se IndexedDB não funcionar, usa só localStorage
        console.log('IndexedDB nao suportado, usando localStorage');
        if (carregarPlantas().length === 0) {
            cadastrarExemplos();
        }
        carregarPagina();
    }
}

function carregarPagina() {
    // Verifica qual página está aberta e executa as funções corretas
    var pagina = window.location.pathname.split('/').pop();

    if (pagina === 'index.html' || pagina === '' || pagina === '/') {
        // Dashboard
        atualizarDashboard();
    } else if (pagina === 'cadastro.html') {
        // Página de cadastro
        var formulario = document.getElementById('formulario-planta');
        if (formulario) {
            formulario.addEventListener('submit', cadastrarPlanta);
        }
        // Define data padrão como hoje
        var campoData = document.getElementById('data-plantio');
        if (campoData) {
            var hoje = new Date().toISOString().split('T')[0];
            campoData.value = hoje;
        }
        atualizarLocaisOcupados();
        mostrarListaPlantas();
    } else if (pagina === 'painel.html') {
        // Painel administrativo
        obterLocalizacao();
        mostrarAlertasDetalhados('todos');
        mostrarCronograma();
    }
}

// ===== DADOS DE EXEMPLO =====
// Cadastra plantas de exemplo para demonstração do sistema
function cadastrarExemplos() {
    var plantas = carregarPlantas();

    // Só cadastra se não tiver nenhuma planta ainda
    if (plantas.length > 0) return;

    // Data de hoje para calcular datas passadas
    var hoje = new Date();

    // Função auxiliar para subtrair dias da data atual
    function dataMenosDias(dias) {
        var data = new Date(hoje);
        data.setDate(data.getDate() - dias);
        return data.toISOString().split('T')[0];
    }

    var exemplos = [
        // 🌾 PRONTAS PARA COLHEITA (passaram do prazo)
        {
            id: 1001,
            nome: 'alface',
            dataPlantio: dataMenosDias(50), // Alface leva 45 dias - já passou!
            localizacao: 'A1',
            quantidade: 5,
            observacoes: 'Alface crespa - pronta para colher',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1002,
            nome: 'rabanete',
            dataPlantio: dataMenosDias(30), // Rabanete leva 25 dias - já passou!
            localizacao: 'B2',
            quantidade: 10,
            observacoes: 'Rabanete vermelho - passou do ponto',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1003,
            nome: 'rucula',
            dataPlantio: dataMenosDias(35), // Rúcula leva 30 dias - já passou!
            localizacao: 'A3',
            quantidade: 8,
            observacoes: 'Rúcula para salada',
            dataCadastro: new Date().toISOString()
        },

        // ⚠️ PRECISAM DE ATENÇÃO (80-99% do tempo)
        {
            id: 1004,
            nome: 'espinafre',
            dataPlantio: dataMenosDias(34), // Espinafre leva 40 dias - faltam 6 dias
            localizacao: 'B1',
            quantidade: 6,
            observacoes: 'Espinafre quase pronto - ficar de olho',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1005,
            nome: 'pepino',
            dataPlantio: dataMenosDias(43), // Pepino leva 50 dias - faltam 7 dias
            localizacao: 'C1',
            quantidade: 3,
            observacoes: 'Pepino japonês - verificar tamanho',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1006,
            nome: 'agriao',
            dataPlantio: dataMenosDias(30), // Agrião leva 35 dias - faltam 5 dias
            localizacao: 'P1',
            quantidade: 4,
            observacoes: 'Agrião precisa de muita água',
            dataCadastro: new Date().toISOString()
        },

        // 🌱 CRESCENDO (precisam de cuidados regulares)
        {
            id: 1007,
            nome: 'tomate',
            dataPlantio: dataMenosDias(20), // Tomate leva 90 dias - ainda tem muito
            localizacao: 'C2',
            quantidade: 4,
            observacoes: 'Tomate cereja - precisa de estaca',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1008,
            nome: 'cenoura',
            dataPlantio: dataMenosDias(15), // Cenoura leva 80 dias
            localizacao: 'B3',
            quantidade: 12,
            observacoes: 'Cenoura nantes - solo arenoso',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1009,
            nome: 'manjericao',
            dataPlantio: dataMenosDias(10), // Manjericão leva 50 dias
            localizacao: 'P2',
            quantidade: 2,
            observacoes: 'Manjericão para tempero',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1010,
            nome: 'couve',
            dataPlantio: dataMenosDias(8), // Couve leva 60 dias
            localizacao: 'A2',
            quantidade: 3,
            observacoes: 'Couve manteiga - adubar com húmus',
            dataCadastro: new Date().toISOString()
        },

        // 🌾 MAIS PRONTAS PARA COLHEITA
        {
            id: 1011,
            nome: 'chicoria',
            dataPlantio: dataMenosDias(55), // Chicória leva 50 dias
            localizacao: 'A4',
            quantidade: 4,
            observacoes: 'Chicória crespa - colher urgente',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1012,
            nome: 'cebolinha',
            dataPlantio: dataMenosDias(60), // Cebolinha leva 55 dias
            localizacao: 'P3',
            quantidade: 6,
            observacoes: 'Cebolinha verde para tempero',
            dataCadastro: new Date().toISOString()
        },

        // ⚠️ MAIS COM ATENÇÃO
        {
            id: 1013,
            nome: 'salsinha',
            dataPlantio: dataMenosDias(52), // Salsinha leva 60 dias - faltam 8 dias
            localizacao: 'P4',
            quantidade: 3,
            observacoes: 'Salsinha lisa - quase no ponto',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1014,
            nome: 'abobrinha',
            dataPlantio: dataMenosDias(47), // Abobrinha leva 55 dias - faltam 8 dias
            localizacao: 'C3',
            quantidade: 2,
            observacoes: 'Abobrinha italiana - verificar tamanho dos frutos',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1015,
            nome: 'hortelã',
            dataPlantio: dataMenosDias(35), // Hortelã leva 40 dias - faltam 5 dias
            localizacao: 'B4',
            quantidade: 2,
            observacoes: 'Hortelã para chá e sucos',
            dataCadastro: new Date().toISOString()
        },

        // 🌱 MAIS CRESCENDO
        {
            id: 1016,
            nome: 'morango',
            dataPlantio: dataMenosDias(25), // Morango leva 80 dias
            localizacao: 'C4',
            quantidade: 8,
            observacoes: 'Morango doce - proteger dos pássaros',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1017,
            nome: 'pimentao',
            dataPlantio: dataMenosDias(18), // Pimentão leva 100 dias
            localizacao: 'C5',
            quantidade: 3,
            observacoes: 'Pimentão verde e vermelho',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1018,
            nome: 'beterraba',
            dataPlantio: dataMenosDias(12), // Beterraba leva 70 dias
            localizacao: 'B5',
            quantidade: 6,
            observacoes: 'Beterraba para suco e salada',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1019,
            nome: 'berinjela',
            dataPlantio: dataMenosDias(30), // Berinjela leva 100 dias
            localizacao: 'C6',
            quantidade: 2,
            observacoes: 'Berinjela roxa - precisa de sol forte',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1020,
            nome: 'pimenta',
            dataPlantio: dataMenosDias(5), // Pimenta leva 90 dias
            localizacao: 'A5',
            quantidade: 4,
            observacoes: 'Pimenta dedo-de-moça - recém plantada',
            dataCadastro: new Date().toISOString()
        }
    ];

    // Salva no localStorage primeiro (funciona sempre)
    salvarPlantas(exemplos);

    // Tenta salvar no banco de dados IndexedDB também
    if (bancoDados) {
        var promessas = [];
        for (var i = 0; i < exemplos.length; i++) {
            promessas.push(inserirPlanta(exemplos[i]));
        }
        Promise.all(promessas).then(function() {
            console.log('Exemplos salvos no banco');
        }).catch(function() {
            console.log('Exemplos salvos apenas no localStorage');
        });
    }
}

// Executa quando a página carrega
document.addEventListener('DOMContentLoaded', inicializar);
