
const STORAGE_KEY = "wre_briefing_residencial_v1";

const steps = [
  {
    title: "Dados do cliente e do projeto",
    description: "Vamos começar com algumas informações para identificar o projeto e conhecer o imóvel.",
    fields: [
      { id: "cliente", label: "Nome completo", type: "text", required: true, full: true },
      { id: "email", label: "E-mail", type: "email", required: true },
      { id: "telefone", label: "Telefone / WhatsApp", type: "tel", required: true },
      { id: "projeto", label: "Nome ou identificação do projeto", type: "text", required: true, full: true },
      { id: "tipoImovel", label: "Qual é o tipo de imóvel?", type: "select", required: true, options: ["Casa térrea", "Sobrado", "Casa em condomínio", "Apartamento", "Chácara / casa de campo", "Outro"] },
      { id: "situacao", label: "Em que situação está o imóvel?", type: "select", required: true, options: ["Terreno adquirido, ainda sem construção", "Construção iniciada", "Imóvel pronto para reforma", "Imóvel em construção", "Outro"] },
      { id: "localizacao", label: "Cidade e endereço ou localização do imóvel", type: "text", required: true, full: true },
      { id: "area", label: "Área aproximada do terreno ou imóvel (m²)", type: "text" },
      { id: "prazo", label: "Existe uma previsão para iniciar ou concluir a obra?", type: "text" }
    ]
  },
  {
    title: "Família e estilo de vida",
    description: "Queremos entender quem vai utilizar os espaços e como é a rotina de vocês.",
    fields: [
      { id: "moradores", label: "Quantas pessoas irão morar no imóvel?", type: "number", required: true },
      { id: "adultos", label: "Quantos adultos?", type: "number" },
      { id: "criancas", label: "Há crianças? Se sim, quais as idades?", type: "text" },
      { id: "idosos", label: "Há idosos ou pessoas com necessidades específicas de acessibilidade?", type: "select", options: ["Não", "Sim", "Talvez no futuro", "Prefiro conversar com o arquiteto"] },
      { id: "pets", label: "Possuem animais de estimação?", type: "select", options: ["Não", "Sim, cachorro(s)", "Sim, gato(s)", "Sim, outros animais"] },
      { id: "rotina", label: "Como é a rotina da família dentro de casa?", type: "textarea", full: true },
      { id: "receber", label: "Costumam receber visitas?", type: "select", options: ["Frequentemente", "Às vezes", "Raramente"] },
      { id: "homeOffice", label: "Alguém trabalha ou estuda em casa?", type: "select", options: ["Sim", "Não", "Eventualmente"] },
      { id: "habitos", label: "Quais atividades e hábitos gostaria que o projeto considerasse?", type: "textarea", full: true }
    ]
  },
  {
    title: "Ambientes e distribuição",
    description: "Selecione os ambientes desejados e conte como imagina a organização da casa.",
    fields: [
      { id: "quartos", label: "Quantos dormitórios deseja?", type: "select", required: true, options: ["1", "2", "3", "4", "5 ou mais", "Preciso de orientação"] },
      { id: "suites", label: "Quantas suítes deseja?", type: "select", options: ["Nenhuma", "1", "2", "3", "4 ou mais", "Preciso de orientação"] },
      { id: "banheiros", label: "Quantos banheiros, incluindo lavabos?", type: "select", options: ["1", "2", "3", "4 ou mais", "Preciso de orientação"] },
      { id: "garagem", label: "Quantas vagas de garagem?", type: "select", options: ["1", "2", "3", "4 ou mais", "Não preciso"] },
      { id: "ambientes", label: "Quais ambientes deseja incluir?", type: "checkbox", full: true, options: ["Sala de estar", "Sala de jantar", "Cozinha integrada", "Cozinha separada", "Despensa", "Lavanderia", "Escritório", "Closet", "Varanda / sacada", "Área gourmet", "Churrasqueira", "Piscina", "Academia", "Brinquedoteca", "Sala de TV / cinema", "Depósito", "Jardim", "Horta", "Outro"] },
      { id: "integracao", label: "Prefere ambientes integrados ou separados?", type: "select", options: ["Ambientes integrados", "Ambientes separados", "Uma combinação dos dois", "Preciso de orientação"] },
      { id: "prioridade", label: "Quais são os três ambientes mais importantes para você?", type: "textarea", full: true },
      { id: "necessidades", label: "Existe alguma necessidade especial de espaço ou distribuição?", type: "textarea", full: true }
    ]
  },
  {
    title: "Estilo arquitetônico",
    description: "Esta etapa ajuda a identificar as referências visuais e a atmosfera que você deseja para sua casa.",
    fields: [
      { id: "estilo", label: "Quais estilos mais combinam com você?", type: "checkbox", full: true, options: ["Contemporâneo", "Moderno", "Minimalista", "Industrial", "Rústico", "Clássico", "Neoclássico", "Escandinavo", "Tropical", "Outro", "Ainda não sei"] },
      { id: "cores", label: "Quais cores gostaria de ver no projeto?", type: "textarea", full: true },
      { id: "evitarCores", label: "Existe alguma cor ou acabamento que não gostaria de utilizar?", type: "textarea", full: true },
      { id: "fachada", label: "Como imagina a fachada da casa?", type: "textarea", full: true },
      { id: "referencias", label: "Você possui referências de casas, ambientes ou projetos de que gosta?", type: "textarea", full: true },
      { id: "personalidade", label: "Em poucas palavras, como gostaria que sua casa fosse percebida?", type: "textarea", full: true }
    ]
  },
  {
    title: "Instalações e sistemas",
    description: "Vamos conhecer suas preferências para conforto, iluminação, climatização e instalações.",
    fields: [
      { id: "chuveiro", label: "Qual sistema de aquecimento de água prefere?", type: "select", options: ["Chuveiro elétrico", "Aquecimento a gás", "Aquecimento solar", "Aquecimento central", "Ainda não sei / preciso de orientação"] },
      { id: "aguaQuente", label: "Deseja água quente em quais pontos?", type: "checkbox", options: ["Chuveiros", "Torneiras dos banheiros", "Torneira da cozinha", "Lavanderia", "Todos os pontos", "Ainda não sei"] },
      { id: "ar", label: "Pretende instalar ar-condicionado?", type: "select", options: ["Sim, em todos os quartos e salas", "Sim, em alguns ambientes", "Não", "Deixar infraestrutura preparada", "Ainda não sei"] },
      { id: "energia", label: "Possui preferência sobre o sistema elétrico?", type: "select", options: ["Instalação convencional", "Preparar para automação", "Sistema de automação completo", "Preciso de orientação"] },
      { id: "iluminacao", label: "Que tipo de iluminação prefere?", type: "checkbox", options: ["Luz indireta", "Iluminação decorativa", "Luz técnica e funcional", "Luz natural abundante", "Automação de iluminação", "Ainda não sei"] },
      { id: "automacao", label: "Tem interesse em automação residencial?", type: "select", options: ["Sim, automação completa", "Sim, em alguns sistemas", "Não", "Quero conhecer as possibilidades"] },
      { id: "seguranca", label: "Deseja prever sistemas de segurança?", type: "checkbox", options: ["Câmeras", "Alarme", "Fechadura eletrônica", "Vídeo porteiro", "Sensores", "Ainda não sei"] },
      { id: "instalacoesObs", label: "Alguma outra necessidade relacionada às instalações?", type: "textarea", full: true }
    ]
  },
  {
    title: "Sustentabilidade e eficiência",
    description: "Existem soluções que podem trazer economia, conforto e melhor aproveitamento dos recursos naturais.",
    fields: [
      { id: "solar", label: "Tem interesse em energia solar fotovoltaica?", type: "select", options: ["Sim", "Não", "Deixar preparado para instalação futura", "Preciso de orientação"] },
      { id: "chuva", label: "Gostaria de aproveitar água da chuva?", type: "select", options: ["Sim", "Não", "Talvez", "Preciso de orientação"] },
      { id: "ventilacao", label: "Qual a importância da ventilação natural?", type: "select", options: ["Muito importante", "Importante", "Não é prioridade", "Preciso de orientação"] },
      { id: "luzNatural", label: "Gostaria de priorizar iluminação natural nos ambientes?", type: "select", options: ["Sim, em todos os ambientes possíveis", "Sim, nos ambientes principais", "Sem preferência"] },
      { id: "sustentabilidade", label: "Quais soluções sustentáveis gostaria de considerar?", type: "checkbox", full: true, options: ["Painéis solares", "Captação de água da chuva", "Reutilização de água", "Telhado verde", "Paisagismo com espécies nativas", "Materiais sustentáveis", "Ventilação cruzada", "Aproveitamento da luz natural", "Ainda não sei"] },
      { id: "sustentabilidadeObs", label: "Outras observações sobre sustentabilidade e economia?", type: "textarea", full: true }
    ]
  },
  {
    title: "Materiais e acabamentos",
    description: "Vamos entender suas preferências de materiais, manutenção e investimento nos acabamentos.",
    fields: [
      { id: "piso", label: "Qual tipo de piso prefere?", type: "checkbox", options: ["Porcelanato", "Cerâmica", "Madeira", "Vinílico", "Cimento queimado", "Pedra natural", "Ainda não sei"] },
      { id: "bancadas", label: "Tem preferência para bancadas?", type: "checkbox", options: ["Granito", "Mármore", "Quartzo", "Superfície ultracompacta", "Madeira", "Ainda não sei"] },
      { id: "esquadrias", label: "Qual material prefere para esquadrias?", type: "select", options: ["Alumínio", "PVC", "Madeira", "Sem preferência", "Preciso de orientação"] },
      { id: "manutencao", label: "Qual sua preferência em relação à manutenção?", type: "select", options: ["Materiais de baixa manutenção", "Aceito manutenção periódica", "Prioridade para estética", "Preciso de orientação"] },
      { id: "acabamentos", label: "Existe algum material ou acabamento que gostaria muito de utilizar?", type: "textarea", full: true },
      { id: "restricoes", label: "Existe algum material que não gostaria de utilizar?", type: "textarea", full: true },
      { id: "investimento", label: "Como prefere equilibrar estética, durabilidade e custo?", type: "select", options: ["Priorizar durabilidade", "Priorizar custo-benefício", "Priorizar estética", "Equilibrar os três fatores", "Quero orientação do arquiteto"] }
    ]
  },
  {
    title: "Mobiliário, equipamentos e tecnologia",
    description: "Os móveis e equipamentos influenciam diretamente no planejamento dos espaços.",
    fields: [
      { id: "moveis", label: "Pretende utilizar móveis planejados?", type: "select", options: ["Sim, na maior parte da casa", "Sim, em alguns ambientes", "Não", "Ainda não sei"] },
      { id: "eletros", label: "Quais equipamentos devem ser considerados no projeto?", type: "checkbox", full: true, options: ["Geladeira convencional", "Geladeira side by side", "Cooktop", "Fogão", "Forno elétrico", "Micro-ondas", "Coifa", "Lava-louças", "Máquina de lavar", "Secadora", "Adega", "TV", "Projetor", "Outros"] },
      { id: "tecnologia", label: "Quais recursos tecnológicos gostaria de incluir?", type: "checkbox", full: true, options: ["Internet cabeada", "Wi-Fi em toda a casa", "Som ambiente", "Home theater", "Automação de cortinas", "Fechadura digital", "Carregador para veículo elétrico", "Ainda não sei"] },
      { id: "moveisExistentes", label: "Possui móveis ou equipamentos que deseja aproveitar?", type: "textarea", full: true },
      { id: "equipamentosObs", label: "Existe algum equipamento especial que precisa ser previsto?", type: "textarea", full: true }
    ]
  },
  {
    title: "Observações e referências finais",
    description: "Chegamos à última etapa! Aqui você pode compartilhar qualquer informação importante que ainda não apareceu nas perguntas.",
    fields: [
      { id: "sonho", label: "O que não pode faltar na sua casa dos sonhos?", type: "textarea", full: true },
      { id: "preocupacoes", label: "Existe alguma preocupação ou dificuldade que gostaria que o arquiteto considerasse?", type: "textarea", full: true },
      { id: "prioridadesFinais", label: "Quais são suas principais prioridades para este projeto?", type: "textarea", full: true },
      { id: "observacoesFinais", label: "Deseja deixar alguma outra observação?", type: "textarea", full: true },
      { id: "confirmacao", label: "Confirmo que as informações preenchidas representam minhas necessidades e preferências neste momento.", type: "checkbox", required: true, options: ["Sim, confirmo"], full: true }
    ]
  }
];

let currentStep = 0;
let answers = {};
let submitted = false;

const intro = document.getElementById("intro");
const formArea = document.getElementById("formArea");
const successScreen = document.getElementById("successScreen");
const stepForm = document.getElementById("stepForm");
const stepNavigation = document.getElementById("stepNavigation");
const startButton = document.getElementById("startButton");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");

function loadAnswers() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      answers = saved.answers || {};
      submitted = saved.submitted === true;
    }
  } catch (error) {
    console.warn("Não foi possível recuperar o rascunho.", error);
  }
}

function saveAnswers() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      answers,
      submitted: false,
      updatedAt: new Date().toISOString()
    }));

    document.getElementById("saveStatus").textContent = "Rascunho salvo neste dispositivo";
  } catch (error) {
    document.getElementById("saveStatus").textContent = "Não foi possível salvar";
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function renderNavigation() {
  stepNavigation.innerHTML = steps.map((step, index) => `
    <button
      type="button"
      class="step-nav-item ${index === currentStep ? "active" : ""}"
      data-step="${index}"
      ${index > currentStep ? "disabled" : ""}
    >
      <span class="step-number">${index + 1}</span>
      <span>${step.title}</span>
    </button>
  `).join("");

  stepNavigation.querySelectorAll(".step-nav-item").forEach(button => {
    button.addEventListener("click", () => {
      const target = Number(button.dataset.step);
      if (target <= currentStep && validateCurrentStep()) {
        currentStep = target;
        renderStep();
      }
    });
  });
}

function renderField(field) {
  const value = answers[field.id];
  const requiredMark = field.required ? ' <span class="required">*</span>' : "";
  const fullClass = field.full ? "full" : "";

  let control = "";

  if (field.type === "textarea") {
    control = `
      <textarea
        id="${field.id}"
        name="${field.id}"
        placeholder="Escreva sua resposta..."
      >${escapeHTML(value || "")}</textarea>
    `;
  }

  if (field.type === "text" || field.type === "email" || field.type === "tel" || field.type === "number") {
    control = `
      <input
        id="${field.id}"
        name="${field.id}"
        type="${field.type}"
        value="${escapeHTML(value || "")}"
        placeholder="Digite sua resposta"
        ${field.required ? "required" : ""}
        ${field.type === "number" ? 'min="0"' : ""}
      >
    `;
  }

  if (field.type === "select") {
    control = `
      <select id="${field.id}" name="${field.id}" ${field.required ? "required" : ""}>
        <option value="">Selecione uma opção</option>
        ${field.options.map(option => `
          <option value="${escapeHTML(option)}" ${value === option ? "selected" : ""}>
            ${escapeHTML(option)}
          </option>
        `).join("")}
      </select>
    `;
  }

  if (field.type === "checkbox") {
    const selected = Array.isArray(value) ? value : [];

    control = `
      <fieldset>
        <div class="choice-list">
          ${field.options.map(option => `
            <label class="choice-option">
              <input
                type="checkbox"
                name="${field.id}"
                value="${escapeHTML(option)}"
                ${selected.includes(option) ? "checked" : ""}
              >
              <span>${escapeHTML(option)}</span>
            </label>
          `).join("")}
        </div>
      </fieldset>
    `;
  }

  return `
    <div class="field ${fullClass}">
      <label for="${field.id}">${field.label}${requiredMark}</label>
      ${control}
    </div>
  `;
}

function renderStep() {
  const step = steps[currentStep];

  stepForm.innerHTML = `
    <span class="step-kicker">ETAPA ${String(currentStep + 1).padStart(2, "0")}</span>
    <h3 class="step-title">${step.title}</h3>
    <p class="step-description">${step.description}</p>

    <div class="fields-grid">
      ${step.fields.map(renderField).join("")}
    </div>
  `;

  document.getElementById("stepCounter").textContent =
    `Etapa ${currentStep + 1} de ${steps.length}`;

  const percent = Math.round(((currentStep + 1) / steps.length) * 100);
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("progressFill").style.width = `${percent}%`;

  backButton.disabled = currentStep === 0;
  backButton.style.opacity = currentStep === 0 ? "0.45" : "1";

  nextButton.textContent =
    currentStep === steps.length - 1 ? "Revisar e concluir ✓" : "Próxima etapa →";

  renderNavigation();
}

function collectCurrentAnswers() {
  const step = steps[currentStep];

  step.fields.forEach(field => {
    if (field.type === "checkbox") {
      const checked = [...stepForm.querySelectorAll(
        `input[name="${field.id}"]:checked`
      )].map(input => input.value);

      answers[field.id] = checked;
    } else {
      const input = stepForm.querySelector(`[name="${field.id}"]`);
      if (input) answers[field.id] = input.value.trim();
    }
  });

  saveAnswers();
}

function validateCurrentStep() {
  collectCurrentAnswers();

  const step = steps[currentStep];

  for (const field of step.fields) {
    if (!field.required) continue;

    const value = answers[field.id];

    if (field.type === "checkbox") {
      if (!Array.isArray(value) || value.length === 0) {
        alert(`Por favor, responda: ${field.label}`);
        return false;
      }
    } else if (!value) {
      alert(`Por favor, preencha: ${field.label}`);
      const input = stepForm.querySelector(`[name="${field.id}"]`);
      if (input) input.focus();
      return false;
    }

    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      alert("Por favor, informe um e-mail válido.");
      stepForm.querySelector(`[name="${field.id}"]`).focus();
      return false;
    }
  }

  return true;
}

function startBriefing() {
  intro.classList.add("hidden");
  formArea.classList.remove("hidden");
  renderStep();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function finishBriefing() {
  collectCurrentAnswers();

  const confirmed = confirm(
    "Deseja concluir o preenchimento do briefing? Confira suas respostas antes de finalizar."
  );

  if (!confirmed) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      answers,
      submitted: true,
      submittedAt: new Date().toISOString()
    }));

    formArea.classList.add("hidden");
    successScreen.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    alert("Não foi possível registrar a conclusão neste navegador.");
  }
}

startButton.addEventListener("click", startBriefing);

backButton.addEventListener("click", () => {
  collectCurrentAnswers();

  if (currentStep > 0) {
    currentStep--;
    renderStep();
  }
});

nextButton.addEventListener("click", () => {
  if (!validateCurrentStep()) return;

  if (currentStep < steps.length - 1) {
    currentStep++;
    renderStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    finishBriefing();
  }
});

stepForm.addEventListener("change", collectCurrentAnswers);
stepForm.addEventListener("input", collectCurrentAnswers);

loadAnswers();

if (submitted) {
  intro.classList.add("hidden");
  successScreen.classList.remove("hidden");
}
