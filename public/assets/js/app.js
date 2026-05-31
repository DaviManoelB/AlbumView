let albums = [];
let artista = [];

async function carregarDados() {
  try {

    const dadosAlbum = await fetch("http://localhost:3000/albums");
    const dadosArtista = await fetch("http://localhost:3000/artista");

    albums = await dadosAlbum.json();
    artista = await dadosArtista.json();

    carregaAlbumNovo();
    carregaAlbumFav();
    carregaArtista();
    carregaCarousel();
    carregaAlbumDetalhes();

  } catch (erro) {
      console.error("Erro ao carregar a API:", erro);
  }
}

function carregaAlbumNovo() {
  albums.sort((a, b) => a.nome.localeCompare(b.nome));
  let container = document.getElementById("album-novo-cards");
  if(!container) return;
  let html = "";

  for (const item of albums) {
    html += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">

        <div class="card h-100 shadow-sm album-card">

          <a href="detalhes.html?id=${item.id}">
            <img 
              src="${item.capa}" 
              class="card-img-top" 
              alt="Capa do álbum ${item.nome}">
          </a>

          <div class="card-body text-center">

            <h5 class="card-title">
              ${item.nome}
            </h5>

            <p class="card-text">
              ${item.artista}<br>
              ${item.ano}
            </p>

          </div>

        </div>

      </div>
    `;
  }

  container.innerHTML = html;
}

function carregaAlbumFav() {
  let container = document.getElementById("album-top-cards");
  if (!container) return;
  let html = "";

  for (const item of albums) {
    if(item.fav === "1"){
        html += `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">

            <div class="card h-100 shadow-sm album-card">

              <a href="detalhes.html?id=${item.id}">
                <img 
                  src="${item.capa}" 
                  class="card-img-top" 
                  alt="Capa do álbum ${item.nome}">
              </a>

              <div class="card-body text-center">

                <h5 class="card-title">
                  ${item.nome}
                </h5>

                <p class="card-text">
                  ${item.artista}<br>
                  ${item.ano}
                </p>

              </div>

            </div>

          </div>
        `;
    }
    
  }

  container.innerHTML = html;
}

function carregaArtista() {
    let container = document.getElementById("artista-cards");
    if(!container) return;
    let html = "";

    const artistasOrdenados = [...artista].sort((a, b) => {
        return Number(b.vizualizacoes) - Number(a.vizualizacoes);
    });

    for (const item of artistasOrdenados.slice(0,5)) {
        html += `
            <div class="artista-card grid d-flex align-items-center mb-3">
                <img src="${item.foto}" class="foto rounded-circle me-3" alt="Foto do artista ${item.nome}">
                <div class="artista-texto">
                    <strong>${item.nome}</strong><br>
                    ${item.vizualizacoes} Visualizações
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

function carregaAlbumDetalhes() {
  const detalhesContainer = document.getElementById("detalhes-capa");
  if (!detalhesContainer) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const album = albums.find(item => item.id === id);

  const detalhesNome = document.getElementById("detalhes-nome");
  const detalhesArtista = document.getElementById("detalhes-artista");
  const detalhesAno = document.getElementById("detalhes-ano");
  const detalhesGenero = document.getElementById("detalhes-genero");
  const detalhesNumMusica = document.getElementById("detalhes-numMusica");
  const detalhesMusicas = document.getElementById("detalhes-musicas");

  if (!album) {
    if (detalhesMusicas) {
      detalhesMusicas.innerHTML = `
        <li class="list-group-item text-danger">
          Álbum não encontrado. <a href="index.html">Voltar</a>
        </li>
      `;
    }
    if (detalhesNome) detalhesNome.textContent = "Álbum não encontrado";
    return;
  }
  carregaArtistaDetalhe(album);
  detalhesContainer.src = album.capa;
  detalhesContainer.alt = `Capa do álbum ${album.nome}`;
  if (detalhesNome) detalhesNome.textContent = album.nome;
  if (detalhesArtista) detalhesArtista.textContent = album.artista;
  if (detalhesAno) detalhesAno.textContent = album.ano;
  if (detalhesGenero) detalhesGenero.textContent = album.genero;
  if (detalhesNumMusica) detalhesNumMusica.textContent = album.numMusica;

  if (detalhesMusicas) {
    detalhesMusicas.innerHTML = album.musicas.map((musica, index) => `
      <li class="list-group-item">
        ${index + 1}. ${musica.nome}
      </li>
    `).join("");
  }
}

function carregaCarousel() {

    const carouselInner = document.getElementById("carousel-inner");
    const indicators = document.getElementById("carousel-indicators");

    if (!carouselInner || !indicators) return;

    let htmlCarousel = "";
    let htmlIndicators = "";

    const albumsAleatorios = [...albums]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    albumsAleatorios.forEach((album, index) => {

        htmlIndicators += `
            <button 
                type="button" 
                data-bs-target="#bannerCarousel" 
                data-bs-slide-to="${index}" 
                class="${index === 0 ? "active" : ""}">
            </button>
        `;

        htmlCarousel += `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
                
                <img 
                    src="${album.capa}" 
                    class="d-block w-100" 
                    alt="${album.nome}">

                <div class="carousel-caption">
                    <h2>${album.nome}</h2>
                    <p>${album.artista} • ${album.ano}</p>

                    <a href="detalhes.html?id=${album.id}" class="btn btn-light">
                        Ver Álbum
                    </a>
                </div>

            </div>
        `;
    });

    indicators.innerHTML = htmlIndicators;
    carouselInner.innerHTML = htmlCarousel;
}

function albumAleatorio() {
    return Math.floor(Math.random() * albums.length);
}

function abrirAlbumAleatorio() {
  if (albums.length === 0) return;
  console.log("chamou abrir aleatorio");
  const indiceAleatorio = albumAleatorio();
  const album = albums[indiceAleatorio];
  window.location.href = `detalhes.html?id=${album.id}`;
  console.log("passou mudar tela");
}

function pesquisarAlbum() {
  event.preventDefault();
  let nome = document.getElementById('formNome');
  const albumJson = albums.find(item => item.nome.toLowerCase() === nome.value.toLowerCase());
  if(albumJson){
    window.location.href = `detalhes.html?id=${albumJson.id}`;
  } else{
    alert("Album não encontrado");
  }
}

function carregaArtistaDetalhe(album) {

  const nome = album.artista;

  const artistaEncontrado = artista.find(
    item => item.nome.toLowerCase() === nome.toLowerCase()
  );

  const fotoArtista = document.getElementById("fotoArtista");
  const descricaoArtista = document.getElementById("descricaoArtista");

  if (!fotoArtista || !descricaoArtista) return;

  if (artistaEncontrado) {

    fotoArtista.src = artistaEncontrado.foto;
    fotoArtista.alt = artistaEncontrado.nome;

    descricaoArtista.textContent =
      artistaEncontrado.sobre || "Sem descrição disponível.";

  } else {

    descricaoArtista.textContent = "Artista não encontrado";

  }
}
window.addEventListener("DOMContentLoaded", carregarDados);
