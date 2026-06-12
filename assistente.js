// ===== ABILINHO - ASSISTENTE INTELIGENTE AGRINHO =====
// Conecta com o modelo Ollama local para respostas sobre agricultura

var OLLAMA_URL = 'http://localhost:11434/api/chat';
var MODELO = 'qwen2.5:1.5b';

var SYSTEM_PROMPT = 'Você é o Abilinho se apresente como Abilinho, um assistente virtual simpático e especializado em agricultura, horta, plantas, agronegócio e sustentabilidade. ' +
    'Você faz parte do sistema HortaViva e ajuda agricultores familiares e amadores. ' +
    'Responda sempre em português do Brasil de forma clara, prática e amigável. ' +
    'Use emojis ocasionalmente para tornar a conversa mais agradável. ' +
    'Quando possível, dê dicas práticas, receitas naturais e soluções sustentáveis. ' +
    'Se a pergunta não for sobre agricultura/plantas/horta, responda educadamente que seu foco é nessa área.';

// Histórico de mensagens para contexto
var historicoMensagens = [
    { role: 'system', content: SYSTEM_PROMPT }
];

// ===== FUNÇÕES DO CHAT =====

function enviarMensagem() {
    var input = document.getElementById('chat-input');
    var texto = input.value.trim();
    if (!texto) return;

    // Adiciona mensagem do usuário na tela
    adicionarMensagemUI('usuario', texto);
    input.value = '';
    autoResize(input);

    // Adiciona ao histórico
    historicoMensagens.push({ role: 'user', content: texto });

    // Mostra indicador de digitação
    mostrarDigitando();
    atualizarStatusAvatar('pensando', 'Pensando...');

    // Envia para a API do Ollama
    chamarOllama(texto);
}

function enviarSugestao(texto) {
    var input = document.getElementById('chat-input');
    input.value = texto;
    enviarMensagem();
}

function chamarOllama() {
    var btnEnviar = document.getElementById('btn-enviar');
    btnEnviar.disabled = true;

    fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: MODELO,
            messages: historicoMensagens,
            stream: false
        })
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Erro na API: ' + response.status);
        }
        return response.json();
    })
    .then(function(data) {
        removerDigitando();
        var resposta = data.message.content;

        // Adiciona ao histórico
        historicoMensagens.push({ role: 'assistant', content: resposta });

        // Mostra na tela
        adicionarMensagemUI('assistente', resposta);
        atualizarStatusAvatar('online', 'Pronto para ajudar!');
        animarAvatarSorriso();
    })
    .catch(function(erro) {
        console.error('Erro ao chamar Ollama:', erro);
        removerDigitando();

        var msgErro = 'Desculpe, não consegui me conectar ao servidor de IA local. 😔\n\n' +
            'Verifique se o Ollama está rodando:\n' +
            '• Execute: ollama serve\n' +
            '• Modelo: ' + MODELO + '\n' +
            '• URL: ' + OLLAMA_URL;

        adicionarMensagemUI('assistente', msgErro, true);
        atualizarStatusAvatar('offline', 'Sem conexão com o Ollama');
    })
    .finally(function() {
        btnEnviar.disabled = false;
    });
}

// ===== INTERFACE DO CHAT =====

function adicionarMensagemUI(tipo, texto, isErro) {
    var container = document.getElementById('chat-mensagens');
    var div = document.createElement('div');
    div.className = 'mensagem ' + tipo;

    var avatar = tipo === 'assistente' ? '<img src="imagens/assistente.png" alt="Abilinho">' : '👤';
    var hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    var balaoClasse = 'msg-balao' + (isErro ? ' msg-erro' : '');
    var htmlTexto = formatarTexto(texto);

    div.innerHTML =
        '<div class="msg-avatar">' + avatar + '</div>' +
        '<div class="msg-conteudo">' +
        '  <div class="' + balaoClasse + '">' + htmlTexto + '</div>' +
        '  <span class="msg-hora">' + hora + '</span>' +
        '</div>';

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function formatarTexto(texto) {
    // Sanitiza o texto para evitar XSS
    var div = document.createElement('div');
    div.textContent = texto;
    var textoSeguro = div.innerHTML;

    // Converte marcações simples para HTML
    var html = textoSeguro
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code style="background:#e8f5e9;padding:2px 5px;border-radius:3px;font-size:0.85em;">$1</code>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n- /g, '</p><li>')
        .replace(/\n\* /g, '</p><li>')
        .replace(/\n(\d+)\. /g, '</p><li>')
        .replace(/\n/g, '<br>');

    // Agrupa listas
    if (html.indexOf('<li>') > -1) {
        html = html.replace(/<\/p><li>/g, '<li>');
        html = '<p>' + html + '</p>';
        html = html.replace(/(<li>.*?)(<\/p>|<p>)/g, '<ul>$1</ul>$2');
        // Simplifica - wrap lis in ul
        var partes = html.split('<li>');
        if (partes.length > 1) {
            html = partes[0] + '<ul>';
            for (var i = 1; i < partes.length; i++) {
                html += '<li>' + partes[i];
            }
            html += '</ul>';
        }
    }

    if (html.indexOf('<p>') === -1) {
        html = '<p>' + html + '</p>';
    }

    return html;
}

function mostrarDigitando() {
    var container = document.getElementById('chat-mensagens');
    var div = document.createElement('div');
    div.className = 'mensagem assistente';
    div.id = 'msg-digitando';
    div.innerHTML =
        '<div class="msg-avatar"><img src="imagens/assistente.png" alt="Abilinho"></div>' +
        '<div class="msg-conteudo">' +
        '  <div class="digitando">' +
        '    <span class="digitando-dot"></span>' +
        '    <span class="digitando-dot"></span>' +
        '    <span class="digitando-dot"></span>' +
        '  </div>' +
        '</div>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;

    // Anima o avatar falando
    animarAvatarFalando(true);
}

function removerDigitando() {
    var el = document.getElementById('msg-digitando');
    if (el) el.remove();
    animarAvatarFalando(false);
}

// ===== ANIMAÇÕES DO AVATAR =====

function atualizarStatusAvatar(status, texto) {
    var statusEl = document.getElementById('avatar-status');
    var chatStatus = document.getElementById('chat-status-texto');

    if (statusEl) {
        statusEl.innerHTML = '<span class="status-dot ' + status + '"></span><span>' + texto + '</span>';
    }
    if (chatStatus) {
        chatStatus.textContent = texto;
    }
}

function animarAvatarFalando(ativo) {
    var boca = document.getElementById('avatar-boca');
    if (boca) {
        if (ativo) {
            boca.classList.add('falando');
            boca.classList.remove('sorrindo');
        } else {
            boca.classList.remove('falando');
        }
    }
}

function animarAvatarSorriso() {
    var boca = document.getElementById('avatar-boca');
    if (boca) {
        boca.classList.add('sorrindo');
        setTimeout(function() {
            boca.classList.remove('sorrindo');
        }, 3000);
    }
}

// ===== UTILITÁRIOS =====

function verificarEnter(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        enviarMensagem();
    }
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

function limparChat() {
    if (!confirm('Limpar toda a conversa com o Abilinho?')) return;

    var container = document.getElementById('chat-mensagens');
    container.innerHTML = '';

    // Reseta histórico mantendo system prompt
    historicoMensagens = [
        { role: 'system', content: SYSTEM_PROMPT }
    ];

    // Mensagem de boas-vindas novamente
    var msgInicial =
        'Conversa limpa! 🧹✨\n\n' +
        'Estou pronto para novas perguntas sobre plantas, horta e agricultura. Como posso ajudar?';
    adicionarMensagemUI('assistente', msgInicial);
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Foca no input
    var input = document.getElementById('chat-input');
    if (input) {
        input.focus();
    }

    // Testa conexão com o Ollama
    testarConexaoOllama();
});

function testarConexaoOllama() {
    fetch('http://localhost:11434/api/tags')
    .then(function(response) {
        if (response.ok) {
            atualizarStatusAvatar('online', 'Conectado ao Ollama');
        } else {
            atualizarStatusAvatar('offline', 'Ollama não responde');
        }
    })
    .catch(function() {
        atualizarStatusAvatar('offline', 'Ollama offline — inicie com "ollama serve"');
    });
}
