const projects = document.querySelectorAll(".project");
const previewImage = document.getElementById("project-preview");
const workDetailPanel = document.getElementById("work-detail-panel");

// HOVER en proyecto: cambia imagen + resetea cualquier detalle
projects.forEach((project) => {
  project.addEventListener("mouseenter", () => {
    const newImage = project.getAttribute("data-image");
    if (!previewImage) return;

    // ocultar detalle (si hubiera uno visible)
    if (workDetailPanel) {
      workDetailPanel.style.opacity = "0";
      workDetailPanel.innerHTML = "";
    }

    // restaurar opacidad normal de la imagen
    previewImage.style.opacity = "0";

    // quitar posibles clases anteriores
    previewImage.classList.remove(
      "preview-makita",
      "preview-scores",
      "preview-whisky",
      "preview-2tired",
      "preview-soundart"
    );

    setTimeout(() => {
      // cambiar imagen
      previewImage.src = newImage;

      // añadir clase según el proyecto activo
      if (project.classList.contains("offset-1")) {
        previewImage.classList.add("preview-makita");
      } else if (project.classList.contains("offset-2")) {
        previewImage.classList.add("preview-scores");
      } else if (project.classList.contains("offset-3")) {
        previewImage.classList.add("preview-whisky");
      } else if (project.classList.contains("offset-4")) {
        previewImage.classList.add("preview-2tired");
      } else if (project.classList.contains("offset-5")) {
        previewImage.classList.add("preview-soundart");
      }

      // fade in
      previewImage.style.opacity = "1";
    }, 200);
  });

  // CLICK: acordeón (abrir/cerrar descripción)
  project.addEventListener("click", () => {
    const accordion = project.querySelector(".project-accordion");
    if (!accordion) return;

    const isOpen =
      accordion.style.maxHeight && accordion.style.maxHeight !== "0px";

    // cerrar todos los demás antes de abrir este (acordeón exclusivo)
    projects.forEach((other) => {
      const otherAccordion = other.querySelector(".project-accordion");
      if (otherAccordion && otherAccordion !== accordion) {
        otherAccordion.style.maxHeight = "0px";
      }
    });

    if (isOpen) {
      // cerrar este
      accordion.style.maxHeight = "0px";
    } else {
      // abrir este (altura = scrollHeight del contenido)
      accordion.style.maxHeight = accordion.scrollHeight + "px";
    }
  });
});

// CLICK en work-item: mostrar detalle encima de la imagen
const workItems = document.querySelectorAll(".work-item");

workItems.forEach((work) => {
  work.addEventListener("click", (event) => {
    // evitar que el click también dispare el toggle del accordion
    event.stopPropagation();

    const workId = work.getAttribute("data-work-id");
    if (!workId || !workDetailPanel || !previewImage) return;

    // generar contenido según el workId
    const detailHtml = getWorkDetailHtml(workId);

    // atenuar un poco la imagen, pero no eliminarla
    previewImage.style.opacity = "0.2";

    // mostrar el detalle encima
    workDetailPanel.style.opacity = "0";
    workDetailPanel.innerHTML = detailHtml;
    setTimeout(() => {
      workDetailPanel.style.opacity = "1";
    }, 100);
  });
});

// Genera el HTML de detalle para cada work (por ahora placeholders)
function getWorkDetailHtml(workId) {
  // puedes adaptar esto cuando pongas contenidos reales
  if (workId.startsWith("makita-")) {
    switch (workId) {
      case "makita-work1":
        return `
              <div class="work-detail">
                <h2 class="work-detail-title">Kochi Biennale</h2>
                <div class="work-detail-meta">
                  2026 · Live Set · Kochi-Muziris Biennale · Kerala, India
                </div>
                <p class="work-detail-text">
                  Live experimental set blending soundscape and vocals, performed at Armaan Collective during the Kochi Biennale, with Mattancherry’s harbor as backdrop.
                </p>
                <div class="work-detail-media">
                <img src="assets/images/makita-kochi-2.jpg" alt="Kochi Biennale 2" />
                  <video
                    src="assets/images/makita-kochi-1.mov"
                    controls
                    playsinline
                  ></video>
                </div>
              </div>
            `;
      case "makita-work2":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">The Farm</h2>
            <div class="work-detail-meta">
              2024 · Live Sound and Curator · Berlin, Germany
            </div>
            <p class="work-detail-text">
              Co-curated with New Fears for Project Space Festival Berlin 2024; live sound for a durational performance where artists embodied chimeric creatures in an immersive, interactive ecosystem.
            </p>
            <div class="work-detail-media">
              <img src="assets/images/makita-farm-1.jpg" alt="The Farm 1" />
              <img src="assets/images/makita-farm-2.jpg" alt="The Farm 2" />
            </div>
            <p class="work-detail-text" style="margin-top: 12px;">
              <a href="https://projectspacefestival.berlin/project-spaces/new-fears" target="_blank">
                More about "The Farm"
              </a>
            </p>
          </div>
        `;
      case "makita-work3":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Heart Drive</h2>
            <div class="work-detail-meta">
              2024 · Live Set and Curator · Berlin, Germany
            </div>
            <p class="work-detail-text">
              Organized with the support of New Fears Gallery and Berliner Bezirksamt Mitte at Panke; curated and performed in a smoky, intimate program of heart-driven experimental performances.
            </p>
            <div class="work-detail-media">
              <img src="assets/images/makita-heartdrive-1.jpg" alt="Heart Drive 1" />
              <img src="assets/images/makita-heartdrive-2.jpg" alt="Heart Drive 2" />
            </div>
            <p class="work-detail-text" style="margin-top: 12px;">
              <a href="https://www.newfears.net/_files/ugd/94abe5_9361f20e3d524b95bc5fb3656edd1749.pdf" target="_blank">
                More about "Heart Drive"
              </a>
            </p>
          </div>
        `;
      case "makita-work4":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">New Fears Reopening</h2>
            <div class="work-detail-meta">
              2023 · Live Set · Berlin, Germany
            </div>
            <p class="work-detail-text">
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
            <div class="work-detail-media">
              <img src="assets/images/makita-newfears-1.jpg" alt="New Fears 1" />
              <img src="assets/images/makita-newfears-2.jpg" alt="New Fears 2" />
            </div>
          </div>
        `;
      default:
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">${workId}</h2>
            <div class="work-detail-meta">Year · MAKITA</div>
            <p class="work-detail-text">
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
          </div>
        `;
    }
  }

  if (workId.startsWith("scores-")) {
    return `
      <div class="work-detail">
        <h2 class="work-detail-title">${workId}</h2>
        <div class="work-detail-meta">Year · SCORES AND SOUND DESIGN</div>
        <p class="work-detail-text">
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </p>
        <div class="work-detail-media">
          <img src="assets/images/performances.jpg" alt="${workId} image 1" />
          <img src="assets/images/performances.jpg" alt="${workId} image 2" />
        </div>
      </div>
    `;
  }

  if (workId.startsWith("whisky-")) {
    // caso especial: hub de videos y releases
    if (workId === "whisky-work12") {
      return `
        <div class="work-detail">
          <h2 class="work-detail-title">Music videos & releases</h2>
          <div class="work-detail-meta">WHISKY · YouTube · SoundCloud · Bandcamp</div>
          <p class="work-detail-text">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </p>
          <div class="work-detail-media">
            <img src="assets/images/whisky.jpg" alt="Whisky video still 1" />
            <img src="assets/images/whisky.jpg" alt="Whisky video still 2" />
          </div>
          <div class="work-detail-links" style="margin-top: 16px; font-size: 0.85rem;">
            <p>
              <strong>Watch:</strong><br/>
              <a href="https://www.youtube.com/watch?v=_mTUubBi-yM&list=PL5tDugB50AyLO0krO2kW0p4Oy5tmwGR28" target="_blank">YouTube · music videos</a>
            </p>
            <p style="margin-top: 8px;">
              <strong>Listen:</strong><br/>
              <a href="https://soundcloud.com/whisky-772016675/peliculas-lesbicas-iii" target="_blank">SoundCloud · mixtapes & tracks</a><br/>
              <a href="https://whisky.bandcamp.com/album/old-fashioned" target="_blank">Bandcamp · albums & EPs</a>
            </p>
          </div>
        </div>
      `;
    }

    // resto de works de Whisky (2–11) siguen usando el template genérico
    return `
      <div class="work-detail">
        <h2 class="work-detail-title">${workId}</h2>
        <div class="work-detail-meta">Year · WHISKY</div>
        <p class="work-detail-text">
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </p>
        <div class="work-detail-media">
          <img src="assets/images/whisky.jpg" alt="${workId} image 1" />
          <img src="assets/images/whisky.jpg" alt="${workId} image 2" />
        </div>
      </div>
    `;
  }

  if (workId.startsWith("tired-")) {
    return `
      <div class="work-detail">
        <h2 class="work-detail-title">${workId}</h2>
        <div class="work-detail-meta">Year · 2TIRED2FUCK</div>
        <p class="work-detail-text">
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </p>
        <div class="work-detail-media">
          <img src="assets/images/2tired2fuck.jpg" alt="${workId} image 1" />
          <img src="assets/images/2tired2fuck.jpg" alt="${workId} image 2" />
        </div>
      </div>
    `;
  }

  if (workId.startsWith("soundart-")) {
    return `
      <div class="work-detail">
        <h2 class="work-detail-title">${workId}</h2>
        <div class="work-detail-meta">Year · VISUAL AND SOUND ART</div>
        <p class="work-detail-text">
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </p>
        <div class="work-detail-media">
          <img src="assets/images/soundart.jpg" alt="${workId} image 1" />
          <img src="assets/images/soundart.jpg" alt="${workId} image 2" />
        </div>
      </div>
    `;
  }

  // fallback genérico
  return `
    <div class="work-detail">
      <h2 class="work-detail-title">${workId}</h2>
      <div class="work-detail-meta">Year · Work</div>
      <p class="work-detail-text">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </p>
    </div>
  `;
}
