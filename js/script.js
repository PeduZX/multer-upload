// Carrega as imagens do servidor
async function carregarImagens() {
  const galeria = document.getElementById("galeria");
  galeria.innerHTML = "";

  const resposta = await fetch("http://localhost:3000/imagens");
  const imagens = await resposta.json();

  imagens.forEach(img => {
    const imgTag = document.createElement("img");
    imgTag.src = `/uploads/${img.nome_arquivo}`;
    imgTag.width = 400;
    imgTag.height = 250;
    galeria.appendChild(imgTag);
  });
}

// Envia o arquivo para o servidor
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(); // mega variavel para armazenar as coisas
  formData.append("arquivo", document.getElementById("arquivo").files[0]);
  
  const resposta = await fetch("http://localhost:3000/uploads", {
    method: "POST",
    body: formData,
  });

  console.log(resposta);

  if (resposta.ok) {
    alert("Upload feito com sucesso!");
    carregarImagens();
  } else {
    alert("Erro ao enviar arquivo.");
  }
});

// Carrega as imagens assim que a página abre
carregarImagens();
