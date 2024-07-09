const dolar = 5.7;
const euro = 6.12;

const form = document.querySelector(".form1");
const form2 = document.querySelector(".form2");
const moeda1Select = document.getElementById("moeda1");
const moeda1QtdInput = document.getElementById("moeda1__qtd");
const moeda2Select = document.getElementById("moeda2");
const qtd = document.querySelector(".qtd");
const conversao = document.querySelector(".conversao");
const img = document.querySelector("#img_contas");
const limpar = document.querySelector(".card1__link");
const card2 = document.querySelector(".card2");
const mediaQuery = window.matchMedia("(min-width: 1440px)");

function converterMoedas(moeda1, moeda1Qtd, moeda2) {
  const taxasDeConversao = {
    real: { euro: 1 / euro, dolar: 1 / dolar },
    dolar: { real: dolar, euro: 0.93 },
    euro: { real: euro, dolar: 1.07 },
  };

  return taxasDeConversao[moeda1] && taxasDeConversao[moeda1][moeda2]
    ? moeda1Qtd * taxasDeConversao[moeda1][moeda2]
    : null;
}

function atualizarResultado(moeda1, moeda1Qtd, moeda2, resultado) {
  const simbolos = { real: "R$", dolar: "$", euro: "€" };

  if (qtd && conversao) {
    qtd.textContent = `${simbolos[moeda1]}${moeda1Qtd}`;
    conversao.textContent =
      resultado !== null
        ? `${simbolos[moeda2]}${resultado.toFixed(2)}`
        : "Conversão não suportada";

    conversao.style.fontSize = resultado !== null ? "2rem" : "1rem";

    if (resultado === null) {
      moeda1Select.classList.add("erro");
      moeda1QtdInput.classList.add("erro");
      moeda2Select.classList.add("erro");
    } else {
      moeda1Select.classList.remove("erro");
      moeda1QtdInput.classList.remove("erro");
      moeda2Select.classList.remove("erro");
    }
  } else {
    console.error("Elementos qtd ou conversao não encontrados.");
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  form2.classList.remove("hidden");
  img.classList.add("hidden");

  const moeda1 = moeda1Select.value;
  const moeda1Qtd = parseFloat(moeda1QtdInput.value);
  const moeda2 = moeda2Select.value;

  if (!isNaN(moeda1Qtd) && moeda1Qtd > 0) {
    const resultado = converterMoedas(moeda1, moeda1Qtd, moeda2);
    atualizarResultado(moeda1, moeda1Qtd, moeda2, resultado);
  } else {
    console.error("Quantidade inválida.");
    moeda1QtdInput.classList.add("erro");
  }
});

limpar.addEventListener("click", function (event) {
  event.preventDefault();
  location.reload();
});
