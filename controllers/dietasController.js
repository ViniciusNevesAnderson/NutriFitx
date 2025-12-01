import { Objetivo } from "../models/objetivo.js";

const getSugestoesMacros = (peso, objetivoNome) => {
    let proteinaMin, proteinaMax;
    let carboMin, carboMax;
    let faixaPeso;

    if (peso >= 50 && peso <= 60) faixaPeso = "50-60";
    else if (peso >= 61 && peso <= 70) faixaPeso = "61-70";
    else if (peso >= 71 && peso <= 80) faixaPeso = "71-80";
    else if (peso >= 81 && peso <= 90) faixaPeso = "81-90";
    else if (peso >= 91 && peso <= 100) faixaPeso = "91-100";
    else if (peso >= 101 && peso <= 110) faixaPeso = "101-110";
    else if (peso >= 111 && peso <= 120) faixaPeso = "111-120";
    else if (peso >= 121 && peso <= 130) faixaPeso = "121-130";
    else faixaPeso = "130+";

    switch (objetivoNome) {
        case "Emagrecimento":
            proteinaMin = (peso * 1.2).toFixed(0);
            proteinaMax = (peso * 2.0).toFixed(0);
            carboMin = (peso * 2.0).toFixed(0);
            carboMax = (peso * 3.0).toFixed(0);
            break;

        case "Ganho de Massa Magra":
            proteinaMin = (peso * 1.6).toFixed(0);
            proteinaMax = (peso * 2.4).toFixed(0);
            carboMin = (peso * 4.0).toFixed(0);
            carboMax = (peso * 6.0).toFixed(0);
            break;

        case "Controle da Saúde Corporal":
            proteinaMin = (peso * 1.4).toFixed(0);
            proteinaMax = (peso * 1.8).toFixed(0);
            carboMin = (peso * 3.0).toFixed(0);
            carboMax = (peso * 4.0).toFixed(0);
            break;

        default:
            return {
                faixa: "N/A",
                proteina: "N/D",
                carboidrato: "N/D",
            };
    }

    return {
        faixa: `${faixaPeso} kg`,
        proteina: `${proteinaMin}g - ${proteinaMax}g`,
        carboidrato: `${carboMin}g - ${carboMax}g`,
    };
};

const dietasController = {
    mostrarDietas: async (req, res) => {
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
            let dietaObjetivo = {};
            let sugestoesMacros = { faixa: "N/A", proteina: "-", carboidrato: "-"};

            if (objetivo) {
                const dataFinal = new Date(objetivo.dataCriacao);
                dataFinal.setDate(dataFinal.getDate() + (objetivo.semanas * 7));
                status = new Date() <= dataFinal ? "Em andamento" : "Finalizado";

                sugestoesMacros = getSugestoesMacros(objetivo.peso, objetivo.nome);

                switch (objetivo.nome) {
                    case "Emagrecimento":
                        dietaObjetivo = {
                            imagemAlmoco: `
                                <figure><img src="Imagem6.png" alt=""><figcaption>Arroz, feijão, coxa de frango assada, beterraba e polenta com queijo</figcaption></figure>
                                <figure><img src="Imagem17.png" alt=""><figcaption>Frango grelhado, vegetais e salada</figcaption></figure>
                                <figure><img src="Imagem20.png" alt=""><figcaption>Peixe grelhado, salada, vegetais e arrox integral</figcaption></figure>
                                <figure><img src="Imagem19.png" alt=""><figcaption>Frango, abobrinha, arroz e salada</figcaption></figure>
                            `,
                            imagemLanche: `
                            <figure><img src="Imagem12.png" alt=""><figcaption>Castanhas</figcaption></figure>
                            <figure><img src="Imagem11.png" alt=""><figcaption>Iogurte com frutas</figcaption></figure>
                            `,
                            imagemCafe: `
                                <figure><img src="Imagem2.png" alt=""><figcaption>Café com leite, bolo de milho e melão</figcaption></figure>
                                <figure><img src="Imagem14.png" alt=""><figcaption>Torrada, Abacate e Ovo</figcaption></figure>
                                <figure><img src="Imagem4.png" alt=""><figcaption>Café, pão integral com queijo e ameixa</figcaption></figure>
                                <figure><img src="Imagem16.png" alt=""><figcaption>Panquecas com frutas</figcaption></figure>
                            `,

                            titulo: "Prioridade: Déficit Calórico e Saciedade",
                            foco: "Alta Proteína, Carboidrato Controlado, Gordura Leve. Como a dieta atual visa a perda de peso, atente-se em reduzir a quantidade de forma geral, segunido algo semelhante ao que foi posto acima. Foque em uma alimentação rica em frutas, vegetais e proteínas, evite alimentos processados e açúcares e beba bastante água.",
                            refeicoes: [
                                {
                                    nome: "Café da Manhã",
                                    texto: "Inclua ovos, queijo, frutas com fibras (maçã, mamão) e carboidratos integrais como pão ou cuscuz integral."
                                },
                                {
                                    nome: "Almoço / Jantar",
                                    texto: "50% vegetais (folhas, legumes), 25% proteína magra (frango, peixe) e 25% carboidrato complexo (arroz integral, feijão)."
                                },
                                {
                                    nome: "Lanches",
                                    texto: "Iogurte com frutas ou castanhas. Evite açúcar e frituras."
                                }
                            ]
                        };
                        break;

                    case "Ganho de Massa Magra":
                        dietaObjetivo = {
                            imagemAlmoco: `
                                <figure><img src="Imagem7.png" alt=""><figcaption>Arroz, feijão, omelete e jiló refogado</figcaption></figure>
                                <figure><img src="Imagem23.png" alt=""><figcaption>Macarrão, legumes e atum</figcaption></figure>
                                <figure><img src="Imagem27.png" alt=""><figcaption>Arroz, feijão, carne moída e legumes</figcaption></figure>
                                <figure><img src="Imagem28.png" alt=""><figcaption>Arroz, feijão, frango grelhado e batata doce</figcaption></figure>
                            `,
                            imagemLanche: `
                                <figure><img src="Imagem21.png" alt=""><figcaption>Whey com frutas</figcaption></figure>
                                <figure><img src="Imagem13.png" alt=""><figcaption>Iogurte com frutas</figcaption></figure>
                            `,
                            imagemCafe: `
                                <figure><img src="Imagem3.png" alt=""><figcaption>Leite, cuscuz, ovo de galinha e banana</figcaption></figure>
                                <figure><img src="Imagem25.png" alt=""><figcaption>Pão integral, banana, aveia e pasta de amendoim</figcaption></figure>
                                <figure><img src="Imagem26.png" alt=""><figcaption>Barra de cereal com castanhas/nozes</figcaption></figure>
                            `,
                            titulo: "Prioridade: Superávit Calórico e Alta Proteína",
                            foco: "Alta Proteína, Alto Carboidrato, Gordura Moderada. Como a dieta atual visa a hipertrofia, atente-se em aumentar a quantidade de proteína (queijo, leite, ovos...), além de evitar alimentos ultraprocessados e álcool. Priorize tambem um sono de qualidade.",
                            refeicoes: [
                                {
                                    nome: "Café da Manhã",
                                    texto: "Ovos, pão integral, aveia com banana e leite. Adicione pasta de amendoim."
                                },
                                {
                                    nome: "Almoço / Jantar",
                                    texto: "40% carboidrato complexo (arroz, macarrão), 30% proteína (frango, carne) e 30% vegetais."
                                },
                                {
                                    nome: "Lanches",
                                    texto: "Whey com frutas, iogurte e castanhas. Refeições a cada 3 horas."
                                }
                            ]
                        };
                        break;

                    case "Controle da Saúde Corporal":
                        dietaObjetivo = {
                            imagemAlmoco: `
                                <figure><img src="Imagem8.png" alt=""><figcaption>Feijoada, arroz, vinagrete de cebola e tomate, farofa, couve refogada e laranja</figcaption>
                                </figure><figure><img src="Imagem9.png" alt=""><figcaption>Salada de tomate, arroz, feijão, bife grelhado e salada de frutas</figcaption></figure>
                                </figure><figure><img src="Imagem18.png" alt=""><figcaption>Frango grelhado, salada, arroz, feijao e vegetais</figcaption></figure>
                                </figure><figure><img src="Imagem24.png" alt=""><figcaption>Peixe grelhado, legumes e arroz</figcaption></figure>
                            `,
                            imagemLanche: `
                                <figure><img src="Imagem10.png" alt=""><figcaption>Salada de frutas</figcaption>
                                </figure><figure><img src="Imagem12.png" alt=""><figcaption>Castanhas</figcaption></figure>
                            `,
                            imagemCafe: `
                                <figure><img src="Imagem15.png" alt=""><figcaption>Iogurte, frutas, aveia e nozes</figcaption></figure>
                                <figure><img src="Imagem5.png" alt="Café com leite, tapioca e banana"><figcaption>Café com leite, tapioca e banana</figcaption></figure>
                                </figure><figure><img src="Imagem22.png" alt=""><figcaption>Pão integral com ovo mexido</figcaption></figure>
                            `,
                            titulo: "Prioridade: Equilíbrio e Qualidade Nutricional",
                            foco: "Equilíbrio entre Carboidrato, Proteína e Gordura",
                            refeicoes: [
                                {
                                    nome: "Café da Manhã",
                                    texto: "Iogurte natural com frutas e aveia. Café sem açúcar."
                                },
                                {
                                    nome: "Almoço / Jantar",
                                    texto: "40% vegetais, 30% proteína magra e 30% carboidrato integral."
                                },
                                {
                                    nome: "Lanches",
                                    texto: "Frutas, castanhas e pequenas porções de pão integral ou tapioca."
                                }
                            ]
                        };
                        break;
                }
            }

                res.render("dietas", {
                layout: "main",
                usuario: req.session.user.usuario,
                status: status || null,
                objetivoNome: objetivo ? objetivo.nome : "", 
                dietaObjetivo,
                sugestoesMacros
                });

              
        } catch (err) {
            console.error(err);
            res.render("dietas", { layout: "main", usuario: req.session.user.usuario, error: "Erro ao carregar dietas." });
        }
    }
};

export default dietasController;