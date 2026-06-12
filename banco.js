// ===== MINI BANCO DE DADOS - HORTA VIVA =====
// Usa IndexedDB do navegador (banco de dados real)
// Funciona como um banco com tabelas, igual MySQL/PostgreSQL porém local

var NOME_BANCO = 'HortaVivaDB';
var VERSAO_BANCO = 1;
var bancoDados = null;

// ===== ABRIR CONEXÃO COM O BANCO =====
function abrirBanco() {
    return new Promise(function(resolver, rejeitar) {
        var requisicao = indexedDB.open(NOME_BANCO, VERSAO_BANCO);

        // Cria as tabelas quando o banco é criado pela primeira vez
        requisicao.onupgradeneeded = function(evento) {
            var db = evento.target.result;

            // Tabela: plantas
            if (!db.objectStoreNames.contains('plantas')) {
                var tabelaPlantas = db.createObjectStore('plantas', { keyPath: 'id' });
                tabelaPlantas.createIndex('nome', 'nome', { unique: false });
                tabelaPlantas.createIndex('localizacao', 'localizacao', { unique: false });
                tabelaPlantas.createIndex('dataPlantio', 'dataPlantio', { unique: false });
            }

            // Tabela: historico (irrigações, adubações, etc)
            if (!db.objectStoreNames.contains('historico')) {
                var tabelaHistorico = db.createObjectStore('historico', { keyPath: 'id', autoIncrement: true });
                tabelaHistorico.createIndex('plantaId', 'plantaId', { unique: false });
                tabelaHistorico.createIndex('tipo', 'tipo', { unique: false });
                tabelaHistorico.createIndex('data', 'data', { unique: false });
            }

            // Tabela: configuracoes
            if (!db.objectStoreNames.contains('configuracoes')) {
                db.createObjectStore('configuracoes', { keyPath: 'chave' });
            }
        };

        requisicao.onsuccess = function(evento) {
            bancoDados = evento.target.result;
            resolver(bancoDados);
        };

        requisicao.onerror = function(evento) {
            console.error('Erro ao abrir banco de dados:', evento.target.error);
            rejeitar(evento.target.error);
        };
    });
}

// ===== OPERAÇÕES CRUD - PLANTAS =====

// CRIAR - Inserir uma nova planta
function inserirPlanta(planta) {
    return new Promise(function(resolver, rejeitar) {
        var transacao = bancoDados.transaction(['plantas'], 'readwrite');
        var tabela = transacao.objectStore('plantas');
        var requisicao = tabela.add(planta);

        requisicao.onsuccess = function() {
            resolver(planta);
        };

        requisicao.onerror = function(evento) {
            rejeitar(evento.target.error);
        };
    });
}

// LER - Buscar todas as plantas
function buscarTodasPlantas() {
    return new Promise(function(resolver, rejeitar) {
        var transacao = bancoDados.transaction(['plantas'], 'readonly');
        var tabela = transacao.objectStore('plantas');
        var requisicao = tabela.getAll();

        requisicao.onsuccess = function(evento) {
            resolver(evento.target.result);
        };

        requisicao.onerror = function(evento) {
            rejeitar(evento.target.error);
        };
    });
}

// LER - Buscar planta por ID
function buscarPlantaPorId(id) {
    return new Promise(function(resolver, rejeitar) {
        var transacao = bancoDados.transaction(['plantas'], 'readonly');
        var tabela = transacao.objectStore('plantas');
        var requisicao = tabela.get(id);

        requisicao.onsuccess = function(evento) {
            resolver(evento.target.result);
        };

        requisicao.onerror = function(evento) {
            rejeitar(evento.target.error);
        };
    });
}

// ATUALIZAR - Atualizar dados de uma planta
function atualizarPlanta(planta) {
    return new Promise(function(resolver, rejeitar) {
        var transacao = bancoDados.transaction(['plantas'], 'readwrite');
        var tabela = transacao.objectStore('plantas');
        var requisicao = tabela.put(planta);

        requisicao.onsuccess = function() {
            resolver(planta);
        };

        requisicao.onerror = function(evento) {
            rejeitar(evento.target.error);
        };
    });
}

// DELETAR - Remover uma planta
function deletarPlanta(id) {
    return new Promise(function(resolver, rejeitar) {
        var transacao = bancoDados.transaction(['plantas'], 'readwrite');
        var tabela = transacao.objectStore('plantas');
        var requisicao = tabela.delete(id);

        requisicao.onsuccess = function() {
            resolver(true);
        };

        requisicao.onerror = function(evento) {
            rejeitar(evento.target.error);
        };
    });
}

// ===== OPERAÇÕES CRUD - HISTÓRICO =====

// Registrar ação no histórico
function registrarHistorico(registro) {
    return new Promise(function(resolver, rejeitar) {
        var transacao = bancoDados.transaction(['historico'], 'readwrite');
        var tabela = transacao.objectStore('historico');
        registro.data = new Date().toISOString();
        var requisicao = tabela.add(registro);

        requisicao.onsuccess = function(evento) {
            registro.id = evento.target.result;
            resolver(registro);
        };

        requisicao.onerror = function(evento) {
            rejeitar(evento.target.error);
        };
    });
}

// Buscar histórico de uma planta
function buscarHistoricoPlanta(plantaId) {
    return new Promise(function(resolver, rejeitar) {
        var transacao = bancoDados.transaction(['historico'], 'readonly');
        var tabela = transacao.objectStore('historico');
        var indice = tabela.index('plantaId');
        var requisicao = indice.getAll(plantaId);

        requisicao.onsuccess = function(evento) {
            resolver(evento.target.result);
        };

        requisicao.onerror = function(evento) {
            rejeitar(evento.target.error);
        };
    });
}

// Buscar todo o histórico
function buscarTodoHistorico() {
    return new Promise(function(resolver, rejeitar) {
        var transacao = bancoDados.transaction(['historico'], 'readonly');
        var tabela = transacao.objectStore('historico');
        var requisicao = tabela.getAll();

        requisicao.onsuccess = function(evento) {
            resolver(evento.target.result);
        };

        requisicao.onerror = function(evento) {
            rejeitar(evento.target.error);
        };
    });
}

// ===== OPERAÇÕES - CONFIGURAÇÕES =====

function salvarConfiguracao(chave, valor) {
    return new Promise(function(resolver, rejeitar) {
        var transacao = bancoDados.transaction(['configuracoes'], 'readwrite');
        var tabela = transacao.objectStore('configuracoes');
        var requisicao = tabela.put({ chave: chave, valor: valor });

        requisicao.onsuccess = function() {
            resolver(true);
        };

        requisicao.onerror = function(evento) {
            rejeitar(evento.target.error);
        };
    });
}

function buscarConfiguracao(chave) {
    return new Promise(function(resolver, rejeitar) {
        var transacao = bancoDados.transaction(['configuracoes'], 'readonly');
        var tabela = transacao.objectStore('configuracoes');
        var requisicao = tabela.get(chave);

        requisicao.onsuccess = function(evento) {
            if (evento.target.result) {
                resolver(evento.target.result.valor);
            } else {
                resolver(null);
            }
        };

        requisicao.onerror = function(evento) {
            rejeitar(evento.target.error);
        };
    });
}

// ===== UTILITÁRIOS DO BANCO =====

// Limpar todas as tabelas
function limparBancoCompleto() {
    return new Promise(function(resolver, rejeitar) {
        var transacao = bancoDados.transaction(['plantas', 'historico', 'configuracoes'], 'readwrite');
        transacao.objectStore('plantas').clear();
        transacao.objectStore('historico').clear();
        transacao.objectStore('configuracoes').clear();

        transacao.oncomplete = function() {
            resolver(true);
        };

        transacao.onerror = function(evento) {
            rejeitar(evento.target.error);
        };
    });
}

// Exportar banco completo para JSON
function exportarBanco() {
    return Promise.all([
        buscarTodasPlantas(),
        buscarTodoHistorico()
    ]).then(function(resultados) {
        return {
            sistema: 'HortaViva',
            versao: VERSAO_BANCO,
            dataExportacao: new Date().toLocaleString('pt-BR'),
            plantas: resultados[0],
            historico: resultados[1]
        };
    });
}

// Importar dados de JSON para o banco
function importarParaBanco(dados) {
    return limparBancoCompleto().then(function() {
        var promessas = [];

        // Importa plantas
        if (dados.plantas && dados.plantas.length > 0) {
            for (var i = 0; i < dados.plantas.length; i++) {
                promessas.push(inserirPlanta(dados.plantas[i]));
            }
        }

        // Importa histórico
        if (dados.historico && dados.historico.length > 0) {
            for (var j = 0; j < dados.historico.length; j++) {
                promessas.push(registrarHistorico(dados.historico[j]));
            }
        }

        return Promise.all(promessas);
    });
}

// Contar registros em uma tabela
function contarRegistros(nomeTabela) {
    return new Promise(function(resolver, rejeitar) {
        var transacao = bancoDados.transaction([nomeTabela], 'readonly');
        var tabela = transacao.objectStore(nomeTabela);
        var requisicao = tabela.count();

        requisicao.onsuccess = function(evento) {
            resolver(evento.target.result);
        };

        requisicao.onerror = function(evento) {
            rejeitar(evento.target.error);
        };
    });
}
