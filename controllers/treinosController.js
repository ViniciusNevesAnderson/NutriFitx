import { Objetivo } from "../models/objetivo.js";

const treinosController = {
  mostrarTreinos: async (req, res) => {
    try {
      const objetivos = await Objetivo.findAll({
        where: { usuarioId: req.session.user.id },
        order: [["dataCriacao", "DESC"]],
      });

      let objetivoAtual = null;

      for (let obj of objetivos) {
        const dataFinal = new Date(obj.dataCriacao);
        dataFinal.setDate(dataFinal.getDate() + obj.semanas * 7);
        if (new Date() <= dataFinal) {
          objetivoAtual = obj;
          break;
        }
      }

      const objetivo = objetivoAtual || objetivos[0] || null;

      let status = null;
      if (objetivo) {
        const dataFinal = new Date(objetivo.dataCriacao);
        dataFinal.setDate(dataFinal.getDate() + objetivo.semanas * 7);
        status = new Date() <= dataFinal ? "Em andamento" : "Finalizado";
      }

      let treinosObjetivo = {};

      if (objetivo) {
        switch (objetivo.nome?.trim()) {
          case "Emagrecimento": {
            const diasDesejados = objetivo.semanas;
            const diasAtividade = objetivo.atividadeFrequencia || 0;
            const tipoAtividade = objetivo.atividadeTipo || "Atividade livre";
            let treinosSelecionados = [];
            let atividadesSelecionadas = [];

            if (diasDesejados === 1) {
              treinosSelecionados = [
                [
                  "Treino completo (Corpo todo + Cárdio):",
                  "Agachamento com halteres – 3x12",
                  "Flexão de braço – 3x10",
                  "Remada unilateral – 3x12",
                  "Elevação lateral – 3x12",
                  "Prancha – 4x30 seg",
                  "Supino Reto – 3x12",
                  "20 Minutos de esteira ou caminhada"
                ]
              ];
            } else if (diasDesejados === 2) {
              treinosSelecionados = [
                [
                  "Treino 1 – Corpo inferior + Abdômen:",
                  "Leg press – 4x12",
                  "Cadeira extensora – 3x15",
                  "Cadeira abdutora – 3x15",
                  "Stiff com halteres – 3x12",
                  "Panturrilha em pé – 3x20",
                  "Abdominais: prancha 30 seg + crunch 15 rep",
                  "Aeróbico: 20–30 min caminhada / bike / esteira"
                ],
                [
                  "Treino 2 – Corpo superior + Metabólico:",
                  "Supino reto ou flexão – 3x12",
                  "Puxada frente – 3x12",
                  "Remada baixa – 3x12",
                  "Desenvolvimento com halteres – 3x12",
                  "Elevação lateral – 12 rep",
                  "Treino Metabólico (Circuito intenso):",
                  "Agachamento – 15 rep",
                  "Flexão – 12 rep",
                  "Burpee – 10 rep",
                  "Abdominal prancha – 30 seg",
                  "Corrida estacionária – 40 seg",
                  "Aeróbico: 20–30 min caminhada / bike / esteira"
                ]
              ];
            } else if (diasDesejados === 3) {
              treinosSelecionados = [
                [
                  "Treino 1 – Full Body + Cárdio",
                  "Agachamento com halteres – 3x12",
                  "Flexão de braço – 3x10–12 ",
                  "Remada unilateral – 3x12",
                  "Elevação lateral – 3x12",
                  "Stiff com halteres – 3x12",
                  "Prancha – 3x30 seg",
                  "Aeróbico: 20–30 min caminhada / bike / esteira"
                ],
                [
                  "Treino 2 – Pernas + Abdômen + Cardio",
                  "Leg press – 4x12",
                  "Cadeira extensora – 3x15",
                  "Cadeira abdutora – 3x15",
                  "Panturrilha em pé – 3x20",
                  "Abdominais: prancha 30 seg + crunch 15 rep",
                  "Aeróbico: 20–30 min de caminhada rápida, corrida leve ou bike"
                ],
                [
                  "Treino 3 – Superiores + Treino Metabólico",
                  "Supino reto ou flexão – 3x12",
                  "Puxada frente – 3x12",
                  "Desenvolvimento com halteres – 3x12",
                  "Remada baixa – 3x12",
                  "Elevação lateral – 12 rep",
                  "Treino Metabólico (Circuito intenso):",
                  "Agachamento – 15 rep",
                  "Flexão – 12 rep",
                  "Burpee – 10 rep",
                  "Abdominal prancha – 30 seg",
                  "Corrida estacionária – 40 seg",
                  "Aeróbico: 20–30 min caminhada / bike / esteira"
                ]
              ];
            } else if (diasDesejados === 4) {
              treinosSelecionados = [
                [
                  "Treino 1 – Circuito Corpo todo",
                  "Agachamento com halteres – 3x12",
                  "Flexão de braço – 3x10",
                  "Remada unilateral – 3x12",
                  "Elevação lateral – 3x12",
                  "Prancha – 3x30 seg",
                  "Aeróbico: 20–30 min caminhada / bike / esteira"
                ],
                [
                  "Treino 2 – Pernas e glúteos",
                  "Leg press – 4x12",
                  "Cadeira extensora – 3x15",
                  "Cadeira abdutora – 3x15",
                  "Stiff com halteres – 3x12",
                  "Panturrilha em pé – 3x20",
                  "Aeróbico: 20–30 min de caminhada rápida ou bike após o treino"
                ],
                [
                  "Treino 3 – Superiores + Abdômen",
                  "Puxada frente – 3x12",
                  "Remada baixa – 3x12",
                  "Supino reto – 3x12",
                  "Desenvolvimento com halteres – 3x12",
                  "Abdominais: supra + infra + prancha – 3x10-12",
                  "Aeróbico: 15–20 min (corrida, escada ou corda)"
                ],
                [
                  "Treino 4 – Treino metabólico (circuito intenso)",
                  "Agachamento – 3x15",
                  "Flexão – 3x12",
                  "Burpee – 3x10",
                  "Abdominal prancha – 3x30 seg",
                  "Aeróbico: 20–30 min caminhada / bike / esteira"
                ]
              ];
            } else if (diasDesejados === 5) {
              treinosSelecionados = [
                [
                  "Treino 1 – Circuito Corpo todo",
                  "Agachamento com halteres – 3x12",
                  "Flexão de braço – 3x10",
                  "Remada unilateral – 3x12",
                  "Elevação lateral – 3x12",
                  "Prancha – 3x30 seg",
                  "Aeróbico: 20–30 min caminhada / bike / esteira"
                ],
                [
                  "Treino 2 – Pernas e glúteos",
                  "Leg press – 4x12",
                  "Cadeira extensora – 3x15",
                  "Cadeira abdutora – 3x15",
                  "Stiff com halteres – 3x12",
                  "Panturrilha em pé – 3x20",
                  "Aeróbico: 20–30 min de caminhada rápida ou bike após o treino"
                ],
                [
                  "Treino 3 – Descanso ativo",
                  "Caminhada leve, alongamento ou mobilidade (20 a 30 min)"
                ],
                [
                  "Treino 4 – Superiores + Abdômen",
                  "Puxada frente – 3x12",
                  "Remada baixa – 3x12",
                  "Supino reto – 3x12",
                  "Desenvolvimento com halteres – 3x12",
                  "Abdominais: supra + infra + prancha – 3x10-12",
                  "Aeróbico: 15–20 min (corrida, escada ou corda)"
                ],
                [
                  "Treino 5 – Treino metabólico (circuito intenso)",
                  "Agachamento – 3x15",
                  "Flexão – 3x12",
                  "Burpee – 3x10",
                  "Abdominal prancha – 3x30 seg",
                  "Aeróbico: 20–30 min caminhada / bike / esteira"
                ]
              ];
            }

          if (diasAtividade > 0 && tipoAtividade.trim() !== "") {
              for (let i = 1; i <= diasAtividade; i++) {
                atividadesSelecionadas.push([
                  `Atividade ${i} – ${tipoAtividade}`,
                  `${tipoAtividade.toLowerCase()}`,
                ]);
              }
            }

            treinosObjetivo = {
              descricao: "Treino intenso em circuito combinando exercícios cardiovasculares e de força, visando queima de calorias e aumento do metabolismo.",
              frequencia:
                diasAtividade > 0
                  ? `${diasDesejados}x por semana + ${diasAtividade} atividades (${tipoAtividade})`
                  : `${diasDesejados}x por semana`,
              duracao: "50–65 minutos",
              descanso: "30 a 60 segundos.",
              dias: [...treinosSelecionados, ...(atividadesSelecionadas || [])],
            };
            break;
          }

          case "Ganho de Massa Magra": {
            const diasDesejados = objetivo.semanas;
            const diasAtividade = objetivo.atividadeFrequencia || 0;
            const tipoAtividade = objetivo.atividadeTipo || "Atividade livre";
            let treinosSelecionados = [];
            let atividadesSelecionadas = [];

            if (diasDesejados === 1) {
              treinosSelecionados = [
                [
                  "Treino 1 – Corpo inteiro",
                  "Supino reto com barra – 3x10",
                  "Puxada frente pegada aberta – 3x10",
                  "Agachamento livre – 3x10",
                  "Desenvolvimento com halteres – 3x10",
                  "Elevação lateral – 2x12",
                  "Tríceps corda – 2x12",
                  "Rosca direta com barra – 2x12",
                  "Prancha isométrica – 3x30 seg"
                ]
              ];
            } else if (diasDesejados === 2) {
              treinosSelecionados = [
                [
                  "Treino 1 – Parte Superior",
                  "Supino reto com barra – 3x10",
                  "Supino inclinado com halteres – 3x10",
                  "Puxada frente pegada aberta – 3x10",
                  "Desenvolvimento com halteres – 3x10",
                  "Elevação lateral – 2x12",
                  "Tríceps corda – 2x12",
                  "Rosca direta com barra – 2x12"
                ],
                [
                  "Treino 2 – Parte Inferior (Pernas e Abdômen)",
                  "Agachamento livre – 3x10",
                  "Leg press – 3x10",
                  "Cadeira extensora – 3x12",
                  "Mesa flexora – 3x12",
                  "Panturrilha sentado ou em pé – 3x15",
                  "Prancha isométrica – 3x30 seg",
                  "Abdômen infra + supra – 3 séries"
                ]
              ];
            } else if (diasDesejados === 3) {
              treinosSelecionados = [
                [
                   "Treino 1 – Peito, Ombros e Tríceps",
                    "Supino reto com barra – 4x8",
                    "Supino inclinado com halteres – 3x10",
                    "Crossover na polia – 3x12",
                    "Desenvolvimento com halteres – 4x10",
                    "Elevação lateral – 3x12",
                    "Tríceps testa com barra W – 3x10",
                    "Tríceps corda – 3x12"
                ],
                [
                  "Treino 2 – Costas e Bíceps",
                  "Puxada frente pegada aberta – 4x10",
                  "Remada curvada ou máquina – 4x8",
                  "Puxada fechada ou serrote – 3x12",
                  "Rosca direta com barra – 3x10",
                  "Rosca alternada com halteres – 3x12"
                ],
                [
                  "Treino 3 – Pernas e Abdômen",
                  "Agachamento livre ou guiado – 4x8",
                  "Leg press – 3x10",
                  "Cadeira extensora – 3x12",
                  "Mesa flexora – 3x12",
                  "Panturrilha sentado ou em pé – 4x15",
                  "Prancha isométrica – 3x30 seg",
                  "Abdômen infra + supra – 3 séries"
                ]
              ];
            } else if (diasDesejados === 4) {
              treinosSelecionados = [
                [
                  "Treino 1 – Superior (Peito, Ombros e Tríceps)",
                  "Supino reto com barra – 4x8",
                  "Supino inclinado com halteres – 3x10",
                  "Crossover na polia ou crucifixo – 3x12",
                  "Desenvolvimento com halteres – 4x10",
                  "Elevação lateral – 3x12",
                  "Tríceps testa com barra W – 3x10",
                  "Tríceps corda – 3x12"
                ],
                [
                   "Treino 2 – Inferior (Pernas e Abdômen)",
                  "Agachamento livre ou guiado – 4x8",
                  "Leg press – 3x10",
                  "Cadeira extensora – 3x12",
                  "Mesa flexora – 3x12",
                  "Panturrilha sentado ou em pé – 4x15",
                  "Prancha isométrica – 3x30 seg",
                  "Abdômen prancha + supra – 3 séries"
                ],
                [
                  "Treino 3 – Costas + Biceps",
                  "Puxada frente – 3x12",
                  "Remada baixa – 3x12",
                  "Supino reto – 3x12",
                  "Desenvolvimento com halteres leve – 3x12",
                  "Abdominais: supra + infra + prancha – 3x10",
                  "Aeróbico: 10–20 min (corrida, escada ou corda)"
                ],
                [
                  "Treino 4 – Full Body leve / Metabólico",
                  "Agachamento – 3x12",
                  "Supino reto – 3x12",
                  "Remada baixa – 3x12",
                  "Elevação lateral – 2x15",
                  "Abdômen prancha + supra – 3 séries"
                ]
              ];
            } else if (diasDesejados === 5) {
              treinosSelecionados = [
                [
                  "Treino 1 – Superior (Peito e Tríceps)",
                  "Supino reto com barra – 4x8",
                  "Supino inclinado com halteres – 3x10",
                  "Crossover na polia ou crucifixo – 3x12",
                  "Tríceps testa com barra W – 3x10",
                  "Tríceps corda ou mergulho no banco – 3x12"
                ],
                [
                  "Treino 2 – Superior (Costas e Bíceps)",
                  "Puxada frente pegada aberta – 4x10",
                  "Remada curvada ou máquina – 4x8",
                  "Puxada fechada ou serrote – 3x12",
                  "Rosca direta com barra – 3x10",
                  "Rosca alternada com halteres – 3x12"
                ],
                [
                  "Treino 3 – Pernas (Completo)",
                  "Agachamento livre ou guiado – 4x8",
                  "Leg press – 3x10",
                  "Cadeira extensora – 3x12",
                  "Mesa flexora – 3x12",
                  "Panturrilha sentado ou em pé – 4x15"
                ],
                [
                  "Treino 4 – Ombros + Abdômen",
                  "Desenvolvimento com halteres – 4x10",
                  "Elevação lateral – 3x12",
                  "Elevação frontal – 3x12",
                  "Encolhimento de ombros – 3x15",
                  "Prancha isométrica – 3x30 seg",
                  "Abdominal infra – 3x15"
                ],
                [
                  "Treino 5 – Corpo todo (Full Body leve ou técnicas)",
                  "Agachamento – 3x12",
                  "Supino reto – 3x12",
                  "Remada baixa – 3x12",
                  "Elevação lateral – 2x15",
                  "Abdômen prancha + supra – 3 séries"
                ]
              ];
            }

          if (diasAtividade > 0 && tipoAtividade.trim() !== "") {
              for (let i = 1; i <= diasAtividade; i++) {
                atividadesSelecionadas.push([
                  `Atividade ${i} – ${tipoAtividade}`,
                  `${tipoAtividade.toLowerCase()}`,
                ]);
              }
            }

            treinosObjetivo = {
              descricao: "Treino voltado ao ganho de massa muscular, força e volume, com intensidade moderada a alta.",
              frequencia:
                diasAtividade > 0
                  ? `${diasDesejados}x por semana + ${diasAtividade} atividades (${tipoAtividade})`
                  : `${diasDesejados}x por semana`,
              duracao: "60–75 minutos",
              descanso: "60–90 segundos",
              dias: [...treinosSelecionados, ...(atividadesSelecionadas || [])],
            };
            break;
          }

          case "Controle da Saúde Corporal": {
            const diasDesejados = objetivo.semanas;
            const diasAtividade = objetivo.atividadeFrequencia || 0;
            const tipoAtividade = objetivo.atividadeTipo || "Atividade livre";
            let treinosSelecionados = [];
            let atividadesSelecionadas = [];

            if (diasDesejados === 1) {
              treinosSelecionados = [
                [
                  "Treino 1 – Corpo inteiro",
                  "Supino reto com barra leve – 3x10",
                  "Puxada frente pegada aberta leve – 3x10",
                  "Agachamento livre – 3x10",
                  "Desenvolvimento com halteres – 3x10",
                  "Tríceps corda – 2x12",
                  "Rosca direta com barra leve – 2x12",
                  "Prancha – 3x30 seg",
                  "Aeróbico: 10–20 min caminhada / bike / esteira"
                ]
              ];
            } else if (diasDesejados === 2) {
              treinosSelecionados = [
                [
                  "Treino 1 – Parte Superior",
                  "Supino reto com barra leve – 3x10",
                  "Supino inclinado com halteres leve – 3x10",
                  "Puxada frente pegada aberta leve – 3x10",
                  "Desenvolvimento com halteres leve – 3x10",
                  "Elevação lateral leve – 2x12",
                  "Tríceps corda – 2x12",
                  "Rosca direta com barra leve – 2x12"
                ],
                [
                  "Treino 2 – Corpo inferior + Abdômen:",
                  "Leg press leve – 4x12",
                  "Cadeira extensora – 3x12",
                  "Cadeira abdutora – 3x12",
                  "Stiff com halteres – 3x12",
                  "Panturrilha em pé – 3x12",
                  "Abdominais: prancha 3x30 seg",
                  "Aeróbico: 10–20 min caminhada / bike / esteira"
                ]
              ];
            } else if (diasDesejados === 3) {
              treinosSelecionados = [
                [
                  "Treino 1 – Full Body + Cárdio",
                  "Agachamento com halteres leve – 3x12",
                  "Flexão de braço – 3x10–12 ",
                  "Tríceps corda – 2x12",
                  "Elevação lateral leve – 3x12",
                  "Rosca direta com barra leve – 2x12",
                  "Prancha – 3x30 seg",
                  "Cárdio: 10–20 min caminhada / bike / esteira"
                ],
                [
                  "Treino 2 – Parte Superior",
                  "Supino reto com barra leve – 3x10",
                  "Supino inclinado com halteres leve – 3x10",
                  "Puxada frente pegada aberta leve – 3x10",
                  "Desenvolvimento com halteres leve – 3x10",
                  "Elevação lateral leve – 2x12",
                  "Tríceps corda – 2x12",
                  "Rosca direta com barra leve – 2x12"
                ],
                [
                  "Treino 3 – Corpo inferior + Abdômen:",
                  "Leg press leve – 4x12",
                  "Cadeira extensora – 3x12",
                  "Cadeira abdutora – 3x12",
                  "Stiff com halteres – 3x12",
                  "Panturrilha em pé – 3x12",
                  "Abdominais: prancha 3x30 seg",
                  "Cárdio: 5–15 min caminhada / bike / esteira"
                ]
              ];
            } else if (diasDesejados === 4) {
              treinosSelecionados = [
                [
                  "Treino 1 – Superior (Peito, Ombros e Tríceps)",
                  "Supino reto com barra leve – 4x8",
                  "Supino inclinado com halteres leve – 3x10",
                  "Crossover na polia ou crucifixo leve – 3x12",
                  "Desenvolvimento com halteres leve – 4x10",
                  "Elevação lateral leve – 3x12",
                  "Tríceps testa com barra W leve – 3x10",
                  "Tríceps corda – 3x12",
                  "Aeróbico: 10–20 min caminhada / bike / esteira"
                ],
                [
                  "Treino 2 – Inferior (Pernas e Abdômen)",
                  "Agachamento livre ou guiado – 4x8",
                  "Leg press leve – 3x10",
                  "Cadeira extensora – 3x12",
                  "Mesa flexora leve – 3x12",
                  "Panturrilha sentado ou em pé – 4x15",
                  "Prancha isométrica – 3x30 seg",
                  "Abdôminal supra – 3x10"
                ],
                [
                  "Treino 3 – Superior (Costas e Bíceps)",
                  "Puxada frente pegada aberta leve – 4x10",
                  "Remada curvada ou máquina leve – 4x8",
                  "Rosca direta com barra leve – 3x10",
                  "Rosca alternada com halteres leve – 3x12",
                  "Abdominal infra – 3x15"
                ],
                [
                  "Treino 4 – Full Body leve / Metabólico",
                  "Agachamento leve – 3x12",
                  "Supino reto leve – 3x12",
                  "Remada baixa – 3x12",
                  "Elevação lateral leve – 2x15",
                  "Rosca alternada com halteres leve 3x12",
                  "Abdominal prancha – 3x30 seg",
                  "Aeróbico: 10–20 min caminhada / bike / esteira"
                ]
              ];
            } else if (diasDesejados === 5) {
              treinosSelecionados = [
                [
                  "Treino 1 – Full Body leve / Metabólico",
                  "Puxada frente – 3x12",
                  "Remada baixa – 3x12",
                  "Supino reto – 3x12",
                  "Desenvolvimento com halteres – 3x12",
                  "Abdominais: supra + infra – 3x12",
                  "Aeróbico: 10–20 min (corrida, escada ou corda)"
                ],
                [
                  "Treino 2 – Superior (Costas e Bíceps)",
                  "Puxada frente pegada aberta – 4x10",
                  "Remada curvada ou máquina – 4x8",
                  "Puxada fechada ou serrote – 3x12",
                  "Rosca direta com barra – 3x10",
                  "Rosca alternada com halteres – 3x12"
                ],
                [
                  "Treino 3 – Pernas e glúteos",
                  "Leg press leve– 4x12",
                  "Cadeira extensora – 3x15",
                  "Cadeira abdutora – 3x15",
                  "Stiff com halteres leve– – 3x12",
                  "Panturrilha em pé – 3x20",
                  "Aeróbico: 10–20 min de caminhada rápida ou bike após o treino"
                ],
                [
                  "Treino 4 – Ombros + Abdômen",
                  "Desenvolvimento com halteres leve – 4x10",
                  "Elevação lateral leve – 3x12",
                  "Elevação frontal leve – 3x12",
                  "Encolhimento de ombros – 3x15",
                  "Prancha isométrica – 3x30 seg",
                  "Abdominal infra – 3x15"
                ],
                [
                  "Treino 5 – Corpo todo (Full Body leve ou técnicas)",
                  "Agachamento leve – 3x12",
                  "Supino reto leve – 3x12",
                  "Remada baixa – 3x12",
                  "Elevação lateral – 2x15",
                  "Abdômen prancha + supra – 3 séries"
                ]
              ];
            }

            if (diasAtividade > 0 && tipoAtividade.trim() !== "") {
              for (let i = 1; i <= diasAtividade; i++) {
                atividadesSelecionadas.push([
                  `Atividade ${i} – ${tipoAtividade}`,
                  `${tipoAtividade.toLowerCase()}`,
                ]);
              }
            }

            treinosObjetivo = {
              descricao: "Treino voltado para controle do IMC, usando exercícios mais moderados e diversificados",
              frequencia:
                diasAtividade > 0
                  ? `${diasDesejados}x por semana + ${diasAtividade} atividades (${tipoAtividade})`
                  : `${diasDesejados}x por semana`,
              duracao: "50-60 minutos",
              descanso: "45-60 segundos",
              dias: [...treinosSelecionados, ...(atividadesSelecionadas || [])],
            };
            break;
          }
          
          default:
            console.warn("⚠️ Nenhum case correspondente para:", objetivo.nome);
            treinosObjetivo = { dias: [] };
            break;
        }
      }
        if (treinosObjetivo && Array.isArray(treinosObjetivo.dias)) {
        const limite = Math.min(
          objetivo?.semanas || treinosObjetivo.dias.length,
          treinosObjetivo.dias.length
        );
        treinosObjetivo.dias = treinosObjetivo.dias.slice(0, limite);
      } else {
        treinosObjetivo = { dias: [] };
      }

      let atividades = [];
      if (objetivo?.atividadeTipo && objetivo.atividadeFrequencia > 0) {
        for (let i = 1; i <= objetivo.atividadeFrequencia; i++) {
          atividades.push({
            numero: i,
            tipo: objetivo.atividadeTipo,
          });
        }
      }

      res.render("treinos", {
        layout: "main",
        usuario: req.session.user.usuario,
        status: status || null,
        treinosObjetivo,
        atividades,
      });
    } catch (err) {
      res.render("treinos", {
        layout: "main",
        usuario: req.session.user.usuario,
        error: "Erro ao carregar treinos.",
      });
    }
  },
};

export default treinosController;
