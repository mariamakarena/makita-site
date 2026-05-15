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
              <a href="https://projectspacefestival.berlin/2024/project-spaces/new-fears" target="_blank">
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
    switch (workId) {
      case "scores-work1":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Rush Hour</h2>
            <div class="work-detail-meta">
              2026 · Residency · Sound design and live score · India
            </div>
            <p class="work-detail-text">
              Site-specific performance developed in collaboration with performer July Weber at Forplay Society, featuring sound design and live score.
Part of “The Gift That Keeps on Giving”, curated by Voindevoin and Aether Sofia for Kochi Biennale.
            </p>
            <div class="work-detail-media">
              <img src="assets/images/scores-rushhour-1.jpg" alt="Rush Hour 1" />
              <img src="assets/images/scores-rushhour-2.jpg" alt="Rush Hour 2" />
            </div>
          </div>
        `;

      case "scores-work2":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Perreando/Hardcore</h2>
            <div class="work-detail-meta">
              2025 · Score and sound design · Germany
            </div>
            <p class="work-detail-text">
              Sound design and original score for Brig Huezo’s PERREANDO/HARDCORE, a 90-min performance merging traumacore aesthetics, horror, and gaming culture.
An immersive sonic landscape blending shoegaze, reggaeton and nu-metal to echo the piece’s tension between tenderness, monstrosity and embodied resistance.
            </p>
            <div class="work-detail-media">
              <img src="assets/images/scores-perreando-1.jpg" alt="Perreando Hardcore 1" />
              <img src="assets/images/scores-perreando-2.jpg" alt="Perreando Hardcore 2" />
            </div>
            <p class="work-detail-text" style="margin-top: 4px;">
              <a href="https://tanzhaus-nrw.de/en/event/2025/11/perreandohardcore" target="_blank">
                More about PERREANDO/HARDCORE
              </a>
            </p>
          </div>
        `;

      case "scores-work3":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">The gym of Hope</h2>
            <div class="work-detail-meta">
              2025 · Residency · Experimental film and live score · Thailand
            </div>
            <p class="work-detail-text">
             Residency supported by Goethe-Institut and Tanzfabrik Berlin; experimental film developed with Beer Yingsuwannachai and July Weber, exploring hope as a physical and speculative practice through a hybrid road movie.
Parallel live score for a performance linked to the film, presented in Bangkok.
            </p>
             <div class="work-detail-media work-detail-media--full">
             <img src="assets/images/scores-gym-1.jpg" alt="The gym of Hope 1" />
          <iframe title="vimeo-player" src="https://player.vimeo.com/video/1080487076?h=db8f63873a" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>" 
     
            </div>
            <p class="work-detail-text" style="margin-top: 12px;">
              <a href="https://www.goethe.de/en/kul/foe/int/ikf/024/goh.html#accordion_toggle_26149021_2" target="_blank">
                More about "The Gym of Hope"
              </a>
            </p>
            <p class="work-detail-text" style="margin-top: 4px;">
              <a href="https://www.tanzfabrik-berlin.de/en/events/2767" target="_blank">
                And more...)
              </a>
            </p>
          </div>
        `;

      case "scores-work4":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">7 trumpets</h2>
            <div class="work-detail-meta">
              2024 · Residency · Sound design and live score · Tokyo, Japan
            </div>
            <p class="work-detail-text">
             Residency at TOKAS, Tokyo; live sound design and score for a performance with July Weber, exploring communication with extraterrestrial bodies through movement, sculpture and resonance.
An evolving sound journey interacting with movement and material objects, translating gestures into speculative sonic codes.
            </p>
            <div class="work-detail-media">
              <img src="assets/images/scores-7trumpets-1.jpg" alt="7 trumpets 1" style="width: 100%; max-width: 100%;" />
             </div>
          </div>
        `;

      case "scores-work5":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Screenshots</h2>
            <div class="work-detail-meta">
              2023/2024 · Residency · Sound design and live score · Hong Kong
            </div>
            <p class="work-detail-text">
             Developed in collaboration with July Weber during the residency at Tomorrow Maybe Gallery, Eaton Hong Kong; live electronic soundscapes embodying and dialoguing with shifting “fear-characters.”
A performative album deconstructing pop culture into immersive sonic landscapes between confrontation, therapy and transformation.
            </p>
            <div class="work-detail-media">
              <img src="assets/images/scores-screenshots-1.jpg" alt="Screenshots 1" />
              <img src="assets/images/scores-screenshots-2.jpg" alt="Screenshots 2" />
            </div>
            <p class="work-detail-text" style="margin-top: 12px;">
              <a href="https://vimeo.com/915520734/50e2742994?fl=pl&fe=vl" target="_blank">
                Watch and hear it here :)
              </a>
            </p>
          </div>
        `;

      case "scores-work5b":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">DLG Malbec</h2>
            <div class="work-detail-meta">
              2024 · Score for short film · Argentina
            </div>
            <p class="work-detail-text">
             Original score for an artistic short film/spot for DLG Malbec by Matías de la Guerra, in collaboration with Revista Plagio.
A sonic piece accompanying a wine-object from the Valles Calchaquíes, blending local identity, art and experimental visual culture.
            </p>
            <div class="work-detail-media">
              <img src="assets/images/performances.jpg" alt="DLG Malbec 1" />
              <img src="assets/images/performances.jpg" alt="DLG Malbec 2" />
            </div>
            <p class="work-detail-text" style="margin-top: 12px;">
              <a href="https://www.youtube.com/watch?v=Q66jWWdMPAI&list=RDQ66jWWdMPAI&start_radio=1" target="_blank">
                Watch and hear here :)
              </a>
            </p>
          </div>
        `;

      case "scores-work6":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Alter Ego</h2>
            <div class="work-detail-meta">
              2023 · Residency · Sound design and live score · Germany
            </div>
            <p class="work-detail-text">
             Invited by Baseline and hosted at Wehrmühle Biesenthal; live sound design and score for July Weber’s Alterego in collaboration with Katrina Bastian and Angelo Petracca.
A dynamic sonic layer responding to shifting states of euphoria, power and physicality, interacting with bodies, space and the architecture as a living counterpart.
            </p>
            <div class="work-detail-media">
              <img src="assets/images/scores-alterego-1.jpg" alt="Alter Ego 1" />
              <img src="assets/images/scores-alterego-2.jpg" alt="Alter Ego 2" />
            </div>
          </div>
        `;

      case "scores-work7":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Tomar Te</h2>
            <div class="work-detail-meta">
              2022 · Score for Performance · SALTA-ARGENTINA
            </div>
            <p class="work-detail-text">
             Original music for Tomar(te) by Cuerpes Movimiento Experimental, presented in Salta and Buenos Aires.
A sensitive soundscape accompanying a dance-theatre piece on fragmented lives, emotional states and bodies as mirrors of connection.
            </p>
            <div class="work-detail-media">
              <img src="assets/images/performances.jpg" alt="New work 1" />
              <img src="assets/images/performances.jpg" alt="New work 2" />
            </div>
          </div>
        `;

      case "scores-work8":
        return `
            <div class="work-detail">
              <h2 class="work-detail-title">HUSEK</h2>
              <div class="work-detail-meta">
                2021 · Score for feature film · SALTA-ARGENTINA
              </div>
              <p class="work-detail-text">
               Original score composed with Mar Perez for the fiction film Husek by Daniela Seggiaro. Awarded at FIDMarseille and BioBioCine.
A bilingual, intercultural work set in the Chaco Salteño, addressing territorial conflict and indigenous perspectives through a sensitive, atmospheric soundscape. (Available in CINE.AR PLAY)
              </p>
              <div class="work-detail-media">
                <img src="assets/images/scores-husek-1.jpg" alt="Husek 1" />
                <img src="assets/images/scores-husek-2.jpg" alt="Husek 2" />
              </div>
              <p class="work-detail-text" style="margin-top: 12px;">
              <a href="https://vimeo.com/599744976?turnstile=0.mv0dB9xv4wNpdtPLGN7IGiNvZwW6VgotY81tVkOukXCpYe0uRFYpcc7w1Z1g8r1iokOuYH7zc5ETyThkXCy34woY_nGGT9sWi5J5NKe-RLmJ6FbmZ2CID7EZsIdeeAwyEaNwCQDu6jm73gvL-n9RpmHelxDVY1B2Ckpt7DUB4ygPgzwhnXuvfAaJvLDH405kh4Ohi1jeTUVA182lHzmliu3LYpQlELLhQrdVhD6HvJ-AF4PBb2-VJ9Gto7lgAu7TDOUujhF-sCezbu8PT1b0pxxtA8NVa_hdt9Lx_aIUtz_EqqYxb1hS5la696qg3qYgQf-lfvxcitl_nVS2fd_fz9jpbFvLb5SRCZK8FlVDJ4ElCxXlB7E1ZLvumMJpgYp12urcO-FRIuCM5NBzM5dmoACK_bI0s6zHDES7fV7DyGoAXxTfL-Kyn9gk55Ffhkc2tVC5y9q41CfTCZ2-z6Ga3UVLdG43kYVQriG5dLxp1yHr-_QySoYS-Pc0fvNTfTX3oTrhx-ALe45hqx-toGfykOXCu6JOFRTUxHz8n5vseBGw61h6sldcpcOfR9lbxZwnfz8WMunSH8uvZLBPEcQ2cZMFoFarQFYDmDYCe1CADAmgk2BXz-iwgYz1vebpP5kntigKXZHSMwv0zdrCoUmDzauRXyuNXGTfmOk7a2KCWou3w06kVixgURLNmiHDSiWH1NH1lcMCFCIVp5blj3lyniL3c7hEyNp9mOpvEPcHrrx5v811ZLUXkfZjY4jw0cikXCwVvczigi720OEK-_RdRxgayRsZKSy5iYiHiuyKVxPBP91g1xcP-7_TJISu9PCpDKKAoK5iB1E10xsuRr5-H4maHWqhh6PezrPS_hRrt90BriXKo3h-keXzciMhU3Mg9XE5bVC3AYNNlw6A5GU5pFsokS9j99UcOCg3d4lq6iv0E-DZBKa1IIe6dlruhukQ.mpRrAEc0s8RhKL1pUkF-kw.efc50eb14a2f11b6068cc6c11b494c6951840de9f4cb9a38dd4056e1b3edf4a6" target="_blank">
                Trailer here (eng subs)
              </a>
            </p>
            </div>
          `;

      default:
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
  }

  if (workId.startsWith("whisky-")) {
    switch (workId) {
      case "whisky-work2":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Terminal Norte</h2>
            <div class="work-detail-meta">
              2022 · Cast and Music · Argentina
            </div>
            <p class="work-detail-text">
             Original music and on-screen performance with Whisky in the documentary Terminal Norte by Lucrecia Martel, premiered at Berlinale.
Part of an intimate, fire-side gathering of women and dissident artists in northern Argentina, contributing a sound piece shaped by territory, voice and collective presence.(Available in MUBI)
            </p>
            <div class="work-detail-media">
              <img src="assets/images/whisky-terminalnorte-1.jpg" alt="Terminal Norte 1" />
              <img src="assets/images/whisky-terminalnorte-2.jpg" alt="Terminal Norte 2" />
            </div>
             <p class="work-detail-text" style="margin-top: 12px;">
              <a href="https://www.youtube.com/watch?v=1Ek9e8Cy6dw&t=1s" target="_blank">
                Trailer here
              </a>
            </p>
          </div>
        `;

      case "whisky-work3":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Bienal de Musica de Cordoba</h2>
            <div class="work-detail-meta">
              2021 · Live set and Performance · Córdoba, Argentina
            </div>
            <p class="work-detail-text">
             Live music and performance with Whisky at the Bienal de Música de Córdoba in Córdoba, presenting Burning in Hell with live-coded visuals by Kardaver and sharing the stage with Juana Molina.
A transfeminist audiovisual work combining noise, performance and real-time image generation.
            </p>
            <div class="work-detail-media">
              <video
                    src="assets/images/whisky-bienal-1.mp4"
                    controls
                    playsinline
                  ></video>
              <img src="assets/images/whisky-bienal-2.jpg" alt="Bienal de Musica de Cordoba 2" />
            </div>
          </div>
        `;

      case "whisky-work4":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Festival de Arte Queer</h2>
            <div class="work-detail-meta">
              2020 · Videoperformance · Buenos Aires
            </div>
            <p class="work-detail-text">
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
            <div class="work-detail-media">
              <img src="assets/images/whisky.jpg" alt="Festival de Arte Queer 1" />
              <img src="assets/images/whisky.jpg" alt="Festival de Arte Queer 2" />
            </div>
          </div>
        `;

      case "whisky-work5":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Burning in Hell</h2>
            <div class="work-detail-meta">
              2020 · Videoperformance · London
            </div>
            <p class="work-detail-text">
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
            <div class="work-detail-media">
              <img src="assets/images/whisky.jpg" alt="Burning in Hell 1" />
              <img src="assets/images/whisky.jpg" alt="Burning in Hell 2" />
            </div>
          </div>
        `;

      case "whisky-work6":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Mutek Ar</h2>
            <div class="work-detail-meta">
              2019 · Live Set and Performance · Buenos Aires
            </div>
            <p class="work-detail-text">
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
            <div class="work-detail-media">
              <img src="assets/images/whisky.jpg" alt="Mutek Ar 1" />
              <img src="assets/images/whisky.jpg" alt="Mutek Ar 2" />
            </div>
          </div>
        `;

      case "whisky-work7":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Oid nos en el rojas</h2>
            <div class="work-detail-meta">
              2019 · Performance · Argentina
            </div>
            <p class="work-detail-text">
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
            <div class="work-detail-media">
              <img src="assets/images/whisky.jpg" alt="Oid nos en el rojas 1" />
              <img src="assets/images/whisky.jpg" alt="Oid nos en el rojas 2" />
            </div>
          </div>
        `;

      case "whisky-work8":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Perdiendo Aceite</h2>
            <div class="work-detail-meta">
              2019 · Presentación del disco · Salta
            </div>
            <p class="work-detail-text">
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
            <div class="work-detail-media">
              <img src="assets/images/whisky.jpg" alt="Perdiendo Aceite 1" />
              <img src="assets/images/whisky.jpg" alt="Perdiendo Aceite 2" />
            </div>
          </div>
        `;

      case "whisky-work10":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">W+C</h2>
            <div class="work-detail-meta">
              2018 · Live Set and Performance · Salta
            </div>
            <p class="work-detail-text">
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
            <div class="work-detail-media">
              <img src="assets/images/whisky.jpg" alt="W+C 1" />
              <img src="assets/images/whisky.jpg" alt="W+C 2" />
            </div>
          </div>
        `;

      case "whisky-work11":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Extra</h2>
            <div class="work-detail-meta">
              · live sets and radio shows ·
            </div>
            <p class="work-detail-text">
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
            <div class="work-detail-media">
              <img src="assets/images/whisky.jpg" alt="Extra 1" />
              <img src="assets/images/whisky.jpg" alt="Extra 2" />
            </div>
          </div>
        `;

      case "whisky-work12":
        return `
          <div class="work-detail">
            <h2 class="work-detail-title">Music videos & releases</h2>
            <div class="work-detail-meta">
              WHISKY · YouTube · SoundCloud · Bandcamp
            </div>
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
                <a href="https://www.youtube.com/watch?v=_mTUubBi-yM&list=PL5tDugB50AyLO0krO2kW0p4Oy5tmwGR28" target="_blank">
                  YouTube · music videos
                </a>
              </p>
              <p style="margin-top: 8px;">
                <strong>Listen:</strong><br/>
                <a href="https://soundcloud.com/whisky-772016675/peliculas-lesbicas-iii" target="_blank">
                  SoundCloud · mixtapes & tracks
                </a><br/>
                <a href="https://whisky.bandcamp.com/album/old-fashioned" target="_blank">
                  Bandcamp · albums & EPs
                </a>
              </p>
            </div>
          </div>
        `;

      default:
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
