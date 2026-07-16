/* ========================================================
   Sistema Web de Visualização dos Resultados
   Arquivo: script.js
   Contém: geração dos indicadores sociais, gráficos de
   movimentação portuária e toda a lógica de renderização.
   ======================================================== */

function gerarId(texto) {
  return texto.replace(/[^a-zA-Z0-9]/g, "");
}

/* ========= BASE DE DADOS ========= */
const diagnostico = {
  Saúde: {
    "Pré-natal insuficiente (%)": {
      geral: "66,63",
      detalhado: {
        "Residencial Paraíso": "55,0",
        "Vila Embratel": "61,29",
        "Anjo da Guarda": "61,73",
        Fumacê: "64,1",
        "São Raimundo e Vila Ariri": "64,69",
        Gancharia: "65,26",
        Gapara: "65,91",
        "Sá Viana e Jambeiro": "67,31",
        "Vila Mauro Fecury 2": "67,44",
        "Vila Mauro Fecury 1": "70,99",
        "Vila Maranhão": "72,66",
        "Vila Nova": "74,17",
        "Alto da Esperança": "75,86",
        "Vila Bacanga": "77,03",
        "Camboa dos Frades e Ilhinha": "25,0",
        Jacamim: "60,0",
        "Cajueiro e Mãe Chica": "62,5",
        "Vila Collier": "72,43",
        "Estiva / Samara": "74,27",
        "Porto Grande": "76,0",
      },
    },
    "Mortalidade câncer colo do útero": {
      geral: "15",
      detalhado: {
        "Residencial Paraíso": "1",
        "São Raimundo e Vila Ariri": "1",
        "Vila Bacanga": "1",
        "Vila Mauro Fecury 2": "1",
        "Vila Nova": "1",
        "Anjo da Guarda": "3",
        "Sá Viana e Jambeiro": "3",
        "Vila Embratel": "3",
        "Porto Grande": "1",
      },
    },
  },
  "Vulnerabilidade Social": {
    "Extrema pobreza (%)": {
      geral: "9,27",
      detalhado: {
        Fumacê: "4,04",
        "Anjo da Guarda": "6,27",
        Gancharia: "6,39",
        "Vila Embratel": "6,41",
        "Vila Bacanga": "6,76",
        "Residencial Paraíso": "7,65",
        "Vila Nova": "9,95",
        "Vila Mauro Fecury 1": "10,3",
        "Vila Mauro Fecury 2": "10,57",
        "Sá Viana e Jambeiro": "10,58",
        "São Raimundo e Vila Ariri": "11,13",
        Gapara: "12,6",
        "Vila Maranhão": "12,85",
        "Alto da Esperança": "13,27",
        "Vila Collier": "9,24",
        "Camboa dos Frades e Ilhinha": "12,47",
        "Porto Grande": "14,23",
        "Estiva / Samara": "21,35",
        Jacamim: "22,56",
        "Cajueiro e Mãe Chica": "24,0",
      },
    },
    "Aglomerados subnormais (%)": {
      geral: "47,19",
      detalhado: {
        Gancharia: "38,11",
        "Vila Mauro Fecury 1": "88,36",
        Gapara: "90,07",
        "Vila Embratel": "93,09",
        "Sá Viana e Jambeiro": "94,31",
        "Alto da Esperança": "100,0",
        "Residencial Paraíso": "100,0",
        "Vila Mauro Fecury 2": "100,0",
        "Vila Nova": "100,0",
      },
    },
  },
  Infraestrutura: {
    "Domicílios sem rede de água (%)": {
      geral: "27,87",
      detalhado: {
        "Vila Bacanga": "3,97",
        "Vila Mauro Fecury 2": "4,41",
        "Anjo da Guarda": "4,85",
        Fumacê: "5,37",
        Gancharia: "12,08",
        "São Raimundo e Vila Ariri": "19,79",
        "Sá Viana e Jambeiro": "21,01",
        "Vila Nova": "21,57",
        "Vila Mauro Fecury 1": "22,03",
        "Vila Embratel": "31,65",
        "Alto da Esperança": "65,45",
        "Vila Maranhão": "67,38",
        Gapara: "68,59",
        "Residencial Paraíso": "83,78",
        "Estiva / Samara": "37,02",
        "Vila Collier": "51,06",
        "Camboa dos Frades e Ilhinha": "80,14",
        "Cajueiro e Mãe Chica": "95,83",
        "Porto Grande": "99,48",
        Jacamim: "99,51",
      },
    },
  },
  Educação: {
    "Escolas sem internet (%)": {
      geral: "67,8",
      detalhado: {
        Fumacê: "0",
        "Sá Viana e Jambeiro": "0",
        "Anjo da Guarda": "33,33",
        "Vila Bacanga": "33,33",
        "Vila Embratel": "42,86",
        "Alto da Esperança": "50,0",
        "Vila Maranhão": "60,0",
        Gancharia: "75,0",
        Gapara: "100,0",
        "São Raimundo e Vila Ariri": "100,0",
        "Vila Mauro Fecury 1": "100,0",
        "Vila Nova": "100,0",
        "Vila Collier": "85,71",
        "Estiva / Samara": "100,0",
        Jacamim: "100,0",
        "Porto Grande": "100,0",
      },
    },
    "Abandono Ensino Médio (%)": {
      geral: "13,39",
      detalhado: {
        "Vila Bacanga": "3,69",
        "Vila Nova": "4,95",
        "Vila Embratel": "6,12",
        "Vila Collier": "6,78",
        "Estiva / Samara": "8,44",
        "Anjo da Guarda": "16,34",
        "Vila Maranhão": "23,58",
        "São Raimundo e Vila Ariri": "30,23",
        "Sá Viana e Jambeiro": "31,68",
      },
    },
    "Analfabetismo 10-14 anos (%)": {
      geral: "4,26",
      detalhado: {
        Gancharia: "2,13",
        "Alto da Esperança": "2,36",
        "Anjo da Guarda": "2,57",
        "Vila Embratel": "2,91",
        "Vila Bacanga": "3,07",
        Fumacê: "3,6",
        "São Raimundo e Vila Ariri": "4,17",
        "Vila Mauro Fecury 2": "4,9",
        "Vila Nova": "4,99",
        Gapara: "5,04",
        "Sá Viana e Jambeiro": "5,04",
        "Vila Mauro Fecury 1": "6,14",
        "Vila Maranhão": "6,7",
        "Residencial Paraíso": "7,97",
        "Porto Grande": "3,39",
        "Camboa dos Frades e Ilhinha": "4,76",
        Jacamim: "6,06",
        "Estiva / Samara": "7,25",
        "Vila Collier": "7,63",
        "Cajueiro e Mãe Chica": "8,93",
      },
    },
  },
};

/* ========= RENDERIZAÇÃO DOS INDICADORES SOCIAIS ========= */
function renderizarIndicadoresSociais() {
  const container = document.getElementById("conteudo");

  Object.entries(diagnostico).forEach(([tema, indicadores]) => {
    const section = document.createElement("div");
    section.className = "section";
    section.innerHTML = `<h2>${tema}</h2>`;

    const grid = document.createElement("div");
    grid.className = "grid";
    section.appendChild(grid);
    container.appendChild(section);

    Object.entries(indicadores).forEach(([nome, dados], i) => {
      const idGrafico = gerarId(tema + nome + i);

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="card-title">${nome}</div>

        <div class="card-value">
          ${dados.geral}
        </div>

        <div class="graph" id="${idGrafico}"></div>

        <div class="fonte-grafico">
          Fonte: Diagnóstico Itaqui-Bacanga —
          Instituto de Cidadania Empresarial do Maranhão
          & Empresa Maranhense de Administração Portuária
          (EMAP), 2014.
        </div>
      `;
      grid.appendChild(card);

      requestAnimationFrame(() => {
        const locais = Object.keys(dados.detalhado);
        const valores = Object.values(dados.detalhado).map((v) =>
          typeof v === "string" ? Number(v.replace(",", ".")) : Number(v),
        );

        const altura = 260 + locais.length * 12;
        const rotacao = locais.length > 5 ? -45 : 0;
        const margemBottom = locais.length > 5 ? 120 : 50;

        Plotly.newPlot(
          idGrafico,
          [
            {
              x: locais,
              y: valores,
              type: "bar",
              text: valores,
              textposition: "outside",
              marker: { opacity: 0.9 },
            },
          ],
          {
            autosize: true,
            height: altura,
            bargap: 0.02,
            margin: { l: 40, r: 20, t: 20, b: margemBottom },
            xaxis: { tickangle: rotacao, automargin: true },
            yaxis: { rangemode: "tozero", automargin: true },
          },
          { displayModeBar: false, responsive: true },
        );
      });
    });
  });
}

/* ========= MOVIMENTAÇÃO PORTUÁRIA ========= */
function renderizarMovimentacaoPortuaria() {
  const anos = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
    2022, 2023, 2024,
  ];
  const navios = [
    696, 807, 805, 760, 832, 859, 766, 777, 763, 828, 909, 979, 998, 1043, 986,
  ];
  const carga = [
    12673195, 14001748, 15753758, 15310430, 18021144, 21824774, 16898774,
    19113973, 22403221, 25171460, 25337152, 31064139, 33610776, 36419648,
    34038877,
  ];

  // converter para milhões
  const cargaMilhoes = carga.map((valor) => valor / 1000000);

  // =========================
  // GRÁFICO NAVIOS
  // =========================
  Plotly.newPlot(
    "grafico_navios",
    [
      {
        x: anos,
        y: navios,
        type: "bar",
      },
    ],
    {
      title: "Navios Atracados por Ano",

      xaxis: {
        title: "Ano",

        tickmode: "array",
        tickvals: anos,
        ticktext: anos,
        tickangle: -45,
      },

      yaxis: {
        title: "Quantidade",
      },

      margin: {
        b: 80,
      },
    },
    {
      responsive: true,
      displayModeBar: false,
    },
  );

  // =========================
  // GRÁFICO CARGA
  // =========================
  Plotly.newPlot(
    "grafico_carga",
    [
      {
        x: anos,
        y: cargaMilhoes,
        type: "bar",
      },
    ],
    {
      title: "Movimentação de Carga por Ano",

      xaxis: {
        title: "Ano",

        tickmode: "array",
        tickvals: anos,
        ticktext: anos,
        tickangle: -45,
      },

      yaxis: {
        title: "Milhões de Toneladas",
      },

      margin: {
        b: 80,
      },
    },
    {
      responsive: true,
      displayModeBar: false,
    },
  );
}

/* ========= INICIALIZAÇÃO ========= */
document.addEventListener("DOMContentLoaded", () => {
  renderizarIndicadoresSociais();
  renderizarMovimentacaoPortuaria();
});
