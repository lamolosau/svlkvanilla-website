document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. NAVIGATION & MENU MOBILE
     ========================================= */
  const marker = document.querySelector(".nav-marker");
  const navContainer = document.querySelector(".nav-links");
  const activeLink = document.querySelector(".nav-links a.active");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinksItems = document.querySelectorAll(".nav-links a, .modded-link");

  // A. Indicateur "Pilule Verte" (PC uniquement)
  function moveIndicator(el) {
    if (marker && el && window.innerWidth > 900) {
      marker.style.left = el.offsetLeft + "px";
      marker.style.width = el.offsetWidth + "px";
      marker.style.opacity = "1";
    }
  }

  if (activeLink) moveIndicator(activeLink);

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("mouseenter", (e) => moveIndicator(e.target));
  });

  if (navContainer) {
    navContainer.addEventListener("mouseleave", () => {
      if (activeLink) moveIndicator(activeLink);
      else if (marker) marker.style.opacity = "0";
    });
  }

  // B. Menu Burger (Mobile)
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Fermer le menu quand on clique sur un lien
    navLinksItems.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // C. Effet Verre au scroll
  const navbar = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* =========================================
     2. SCROLL REVEAL (Apparition pro)
     ========================================= */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

  /* =========================================
     3. TILT 3D CARD EFFECT
     ========================================= */
  const cards = document.querySelectorAll(".objective-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xRot = ((y - rect.height / 2) / rect.height) * -8;
      const yRot = ((x - rect.width / 2) / rect.width) * 8;

      card.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  /* =========================================
     4. COPIER IP
     ========================================= */
  window.copyIP = function () {
    const ip = "svlkvanilla.lakel.dev";
    navigator.clipboard.writeText(ip);

    const feedback = document.getElementById("copy-feedback");
    const ipText = document.getElementById("ip-text");

    if (ipText) {
      const original = ipText.innerText;
      ipText.innerText = "IP Copiée !";
      setTimeout(() => (ipText.innerText = original), 2000);
    }
    if (feedback) {
      feedback.classList.add("visible");
      setTimeout(() => feedback.classList.remove("visible"), 2000);
    }
  };

  /* =========================================
     5. STATUT SERVEUR (API)
     ========================================= */
  const footerCount = document.getElementById("footer-count");
  const statusDot = document.querySelector(".status-dot");

  if (footerCount) {
    fetch("https://api.mcsrvstat.us/3/svlkvanilla.lakel.dev")
      .then((res) => res.json())
      .then((data) => {
        if (data.online) {
          footerCount.innerHTML = `<span style="color:#22c55e">${data.players.online}</span> en ligne`;
          if (statusDot) {
            statusDot.style.background = "#22c55e";
            statusDot.style.boxShadow = "0 0 10px #22c55e";
          }
        } else {
          footerCount.innerText = "Hors ligne";
          if (statusDot) statusDot.style.background = "#ef4444";
        }
      })
      .catch(() => (footerCount.innerText = "Status inconnu"));
  }

  /* =========================================
     6. PORTAL SOUND + ANIMATION
     ========================================= */
  const moddedLink = document.querySelector(".modded-link");
  if (moddedLink) {
    moddedLink.addEventListener("click", (e) => {
      e.preventDefault();
      const sound = new Audio("npsound.mp3");
      sound.volume = 0.2;
      sound.play().catch(() => {});

      document.getElementById("portal-overlay").style.opacity = "1";
      document.body.classList.add("portal-anim");

      setTimeout(() => {
        window.location.href = moddedLink.href;
      }, 9000);
    });
  }

  /* =========================================
     7. FORMULAIRE CANDIDATURE (Discord)
     ========================================= */
  const form = document.getElementById("whitelistForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const btn = document.getElementById("submitBtn");
      const ign = document.getElementById("ign").value;
      const discord = document.getElementById("discord").value;
      const motivation = document.getElementById("motivation").value;

      const webhookURL =
        "https://discord.com/api/webhooks/1451248428922175624/waB--vXMrveEMrlIHTiusofHIiVXJGXt0C0nfbN1TxkjQDEh-3-T4wpp1Uz92ez4jSxB";

      if (webhookURL.includes("TON_ID")) {
        alert(
          "Attention : Tu dois configurer le Webhook dans le fichier script.js !"
        );
        return;
      }

      // Feedback visuel (Chargement)
      const originalBtnText = btn ? btn.innerText : "Envoyer";
      if (btn) {
        btn.innerText = "Envoi en cours...";
        btn.style.opacity = "0.7";
        btn.disabled = true;
      }

      // Construction de l'Embed Discord
      const requestData = {
        username: "Site SVLK",
        embeds: [
          {
            title: "Nouvelle Candidature Whitelist !",
            color: 5763719, // Vert
            fields: [
              {
                name: "🎮 Pseudo Minecraft",
                value: `\`${ign}\``,
                inline: true,
              },
              { name: "💬 Discord", value: `\`${discord}\``, inline: true },
              { name: "📝 Motivations", value: motivation },
            ],
            footer: { text: "Envoyé depuis le site web" },
            timestamp: new Date(),
          },
        ],
      };

      // Envoi
      fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (response.ok) {
            if (btn) {
              btn.innerText = "Candidature Envoyée !";
              btn.style.background = "#22c55e";
            }
            form.reset();
            setTimeout(() => {
              if (btn) {
                btn.innerText = originalBtnText;
                btn.style.background = "";
                btn.style.opacity = "1";
                btn.disabled = false;
              }
            }, 5000);
          } else {
            throw new Error("Erreur Discord");
          }
        })
        .catch((error) => {
          console.error(error);
          if (btn) {
            btn.innerText = "Erreur - Réessaie plus tard";
            btn.style.background = "#ef4444";
            setTimeout(() => {
              btn.innerText = originalBtnText;
              btn.style.background = "";
              btn.disabled = false;
              btn.style.opacity = "1";
            }, 3000);
          }
        });
    });
  }
});
