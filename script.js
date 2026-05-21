/* ============================================
   CAROL BONETTI — JavaScript
   Interactions, Animations & Data
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // LOADING SCREEN
  // ============================
  const loadingScreen = document.getElementById('loadingScreen');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('loaded');
    }, 1200);
  });

  // Fallback
  setTimeout(() => {
    loadingScreen.classList.add('loaded');
  }, 3000);

  // ============================
  // TYPING EFFECT — Hero Title (only effect on the site)
  // ============================
  const heroTitle = document.getElementById('heroTitle');
  const titleText = 'Arquitetura que traduz o seu estilo de viver';
  const words = titleText.split(' ');
  let wordIndex = 0;
  let charIndex = 0;
  let currentText = '';
  let typingStarted = false;

  function startHeroTyping() {
    if (typingStarted) return;
    typingStarted = true;

    setTimeout(() => {
      heroTitle.innerHTML = '<span class="typed-cursor"></span>';

      function typeChar() {
        if (wordIndex < words.length) {
          const currentWord = words[wordIndex];
          if (charIndex < currentWord.length) {
            currentText += currentWord[charIndex];
            heroTitle.innerHTML = currentText + '<span class="typed-cursor"></span>';
            charIndex++;
            // Slow, sophisticated speed: 70-120ms per char
            const delay = 70 + Math.random() * 50;
            setTimeout(typeChar, delay);
          } else {
            // End of word, add space and pause briefly
            wordIndex++;
            charIndex = 0;
            if (wordIndex < words.length) {
              currentText += ' ';
              heroTitle.innerHTML = currentText + '<span class="typed-cursor"></span>';
              // Subtle pause between words: 120-200ms
              const wordPause = 120 + Math.random() * 80;
              setTimeout(typeChar, wordPause);
            } else {
              // Typing complete, fade out cursor
              setTimeout(() => {
                heroTitle.textContent = titleText;
              }, 2500);
            }
          }
        }
      }

      typeChar();
    }, 1600);
  }

  // Start typing after loading
  setTimeout(startHeroTyping, 1500);

  // ============================
  // SCROLL PROGRESS BAR
  // ============================
  const progressBar = document.getElementById('progressBar');

  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.height = progress + '%';
  }

  // ============================
  // HEADER SCROLL EFFECT
  // ============================
  const header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // ============================
  // MOBILE MENU
  // ============================
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ============================
  // REVEAL ON SCROLL
  // ============================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================
  // COUNTER ANIMATION
  // ============================
  const statNumbers = document.querySelectorAll('.essencia-stat-number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      if (target >= 1000) {
        el.textContent = '+' + current.toLocaleString('pt-BR');
      } else {
        el.textContent = '+' + current;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ============================
  // PARALLAX EFFECT
  // ============================
  const parallaxImages = document.querySelectorAll('.parallax-img');

  function updateParallax() {
    parallaxImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const offset = (centerY - viewCenter) * 0.05;
      img.style.transform = `translateY(${offset}px)`;
    });
  }

  // ============================
  // VIDEO CARD INTERACTION
  // ============================
  const videoCards = document.querySelectorAll('.video-card');

  videoCards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
    });

    card.addEventListener('touchstart', () => {
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { passive: true });
  });

  // ============================
  // PROJECT DETAIL
  // ============================
  const projectData = [
    {
      title: 'Residência Serena',
      meta: 'Sala de Estar  ·  Projeto Residencial  ·  2024',
      text: 'A sala de estar da Residência Serena nasceu do desejo de criar um espaço onde o silêncio e o conforto coexistem em perfeita harmonia. Tons neutros e materiais naturais foram cuidadosamente selecionados para envolver a família em uma atmosfera de serenidade e acolhimento. Cada móvel foi escolhido não apenas pela sua forma, mas pela sensação que proporciona ao toque e ao olhar. A luz natural, filtrada pelas amplas janelas, desenha ao longo do dia diferentes cenários que acompanham o ritmo da vida doméstica.',
      hero: 'MIDIA/project_living.png',
      gallery: ['MIDIA/project_kitchen.png']
    },
    {
      title: 'Suíte Aurora',
      meta: 'Dormitório  ·  Projeto Residencial  ·  2024',
      text: 'A Suíte Aurora foi concebida como um refúgio íntimo, onde o descanso se torna uma experiência sensorial. A paleta de cores suaves e os tecidos naturais criam uma envolvência de tranquilidade que convida a desacelerar. A iluminação foi desenhada para acompanhar os momentos do dia, com luzes quentes que acolhem ao entardecer e a claridade suave que desperta pela manhã. O resultado é um espaço que vai além do funcional, tornando-se um verdadeiro santuário pessoal.',
      hero: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      gallery: ['MIDIA/project_bathroom.png']
    },
    {
      title: 'Cozinha Essencial',
      meta: 'Gastronomia  ·  Projeto Residencial  ·  2023',
      text: 'A Cozinha Essencial foi concebida como o coração pulsante de um lar onde as refeições se tornam momentos de encontro e celebração. O mármore da ilha central, a madeira dos armários e a iluminação pendente criam um conjunto que é tão funcional quanto esteticamente envolvente. Cada detalhe foi pensado para que o ato de cozinhar se torne uma experiência prazerosa e compartilhada.',
      hero: 'MIDIA/project_kitchen.png',
      gallery: ['MIDIA/project_living.png']
    },
    {
      title: 'Residência Origami',
      meta: 'Tour Completo  ·  Projeto Residencial  ·  2024',
      text: 'A Residência Origami é um projeto que se desdobra em camadas, revelando a cada espaço a identidade e o cuidado que foram depositados em sua concepção. Inspirada pela delicadeza e pela precisão das formas, a residência integra ambientes que fluem naturalmente entre si, criando uma experiência de viver que é ao mesmo tempo ampla e intimista. Materiais nobres e texturas orgânicas dialogam com a luz natural, compondo uma sinfonia visual que acolhe e inspira.',
      hero: 'MIDIA/project_exterior.png',
      gallery: ['MIDIA/project_living.png', 'MIDIA/project_kitchen.png']
    },
    {
      title: 'Espaço Contemplação',
      meta: 'Banheiro  ·  Projeto Residencial  ·  2023',
      text: 'O Espaço Contemplação redefine a relação com o banho, transformando-o em um ritual de cuidado e presença. Pedras naturais, madeira e iluminação difusa compõem um ambiente onde cada detalhe foi pensado para envolver os sentidos. A banheira independente se torna o ponto focal de um espaço que convida a desacelerar, enquanto os materiais orgânicos criam uma conexão sutil com a natureza.',
      hero: 'MIDIA/project_bathroom.png',
      gallery: ['MIDIA/project_exterior.png']
    },
    {
      title: 'Fachada Solstício',
      meta: 'Exterior  ·  Projeto Residencial  ·  2024',
      text: 'A Fachada Solstício é a primeira impressão de um lar pensado para dialogar com a natureza. Linhas contemporâneas se encontram com materiais naturais como pedra e madeira, criando uma presença que é ao mesmo tempo marcante e acolhedora. Os grandes panos de vidro revelam a vida interior da residência, enquanto o paisagismo cuidadosamente curado cria uma transição suave entre o mundo externo e a intimidade do lar.',
      hero: 'MIDIA/project_exterior.png',
      gallery: ['MIDIA/project_office.png']
    }
  ];

  const projectOverlay = document.getElementById('projectDetail');
  const projectClose = document.getElementById('projectDetailClose');
  const projectItems = document.querySelectorAll('.exp-item');

  projectItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.project);
      const data = projectData[index];
      if (!data) return;

      document.getElementById('projectDetailHero').src = data.hero;
      document.getElementById('projectDetailTitle').textContent = data.title;
      document.getElementById('projectDetailMeta').textContent = data.meta;
      document.getElementById('projectDetailText').textContent = data.text;

      const gallery = document.getElementById('projectDetailGallery');
      gallery.innerHTML = '';
      data.gallery.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = data.title;
        img.loading = 'lazy';
        gallery.appendChild(img);
      });

      projectOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  projectClose.addEventListener('click', () => {
    projectOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // ============================
  // CURADORIA DETAIL
  // ============================
  const articleData = [
    {
      tag: 'Estilo de vida',
      title: 'Ambientes que contam histórias e despertam sensações',
      hero: 'MIDIA/project_office.png',
      text: `<p>Existe uma dimensão da arquitetura que vai além do visível. É aquela que se revela nos detalhes mais sutis, na maneira como a luz desenha sombras sobre uma parede, no toque de um tecido, no perfume discreto que habita cada ambiente. São essas sensações invisíveis que transformam um espaço em um lugar com alma.</p>
<p>Quando pensamos em criar moradas, não projetamos apenas paredes e móveis. Construímos cenários para a vida acontecer. Cada canto de uma residência é um convite para viver com mais presença, para desacelerar e perceber a beleza que existe no cotidiano.</p>
<p>A verdadeira sofisticação não grita. Ela se manifesta na simplicidade bem resolvida, na escolha precisa de cada material, na proporção entre cheios e vazios. Um ambiente verdadeiramente elegante é aquele que faz você sentir em casa no instante em que atravessa a porta.</p>
<p>A arquitetura autoral nasce da escuta. Da compreensão profunda de que cada família tem um ritmo, uma história, um modo de viver que merece ser honrado. É esse olhar sensível que transforma projetos em experiências e casas em lares que acolhem e inspiram.</p>`
    },
    {
      tag: 'Sensações',
      title: 'A luz natural como matéria-prima da arquitetura',
      hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      text: `<p>A luz natural é, sem dúvida, a matéria-prima mais valiosa da arquitetura. Ela transforma espaços, altera percepções e influencia profundamente o modo como nos sentimos em um ambiente. Um mesmo cômodo pode parecer completamente diferente ao longo do dia, revelando nuances e texturas que a luz artificial jamais conseguiria reproduzir.</p>
<p>Na concepção de um projeto residencial, a orientação solar não é apenas uma questão técnica. É uma decisão que impacta diretamente a qualidade de vida dos moradores. A luz da manhã que entra suave pela suíte, o sol quente da tarde que aquece a sala de estar, o entardecer dourado que se derrama pela varanda.</p>
<p>A relação entre luz e sombra é fundamental para criar profundidade e interesse visual. Quando bem dimensionadas, as aberturas de uma residência funcionam como molduras naturais que enquadram paisagens e convidam a natureza para dentro de casa.</p>
<p>Projetar com sensibilidade à luz natural é criar ambientes que vibram com a passagem do tempo, que mudam de humor com as estações e que oferecem a seus moradores o prazer de viver conectados ao ritmo da natureza.</p>`
    },
    {
      tag: 'Inspiração',
      title: 'Texturas que acolhem e definem a alma do ambiente',
      hero: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
      text: `<p>As texturas são a linguagem silenciosa dos ambientes. Enquanto as cores capturam o olhar, as texturas despertam o toque, criando uma experiência que vai além do visual. Um ambiente verdadeiramente sofisticado é aquele que convida todos os sentidos a participar.</p>
<p>Madeira, linho, pedra natural, cerâmica artesanal, veludo. Cada material carrega consigo uma história, uma temperatura, uma sensação única. A combinação cuidadosa dessas texturas é o que confere personalidade e profundidade a um espaço, tornando-o inconfundível.</p>
<p>Na arquitetura autoral, a escolha dos materiais nunca é aleatória. É um processo de curadoria minuciosa, onde cada textura é selecionada não apenas pela sua estética, mas pela sensação que proporciona. O frescor de um piso de pedra nos dias quentes, o calor de um tecido natural nas noites frias.</p>
<p>Criar ambientes com alma é saber equilibrar o rústico e o sofisticado, o natural e o refinado. É encontrar nos contrastes uma harmonia que surpreende e, ao mesmo tempo, acolhe. Essa é a essência de um espaço que transcende o decorativo e se torna verdadeiramente memorável.</p>`
    }
  ];

  const curadoriaOverlay = document.getElementById('curadoriaDetail');
  const curadoriaClose = document.getElementById('curadoriaDetailClose');
  const curadoriaCards = document.querySelectorAll('.curadoria-card');

  curadoriaCards.forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.dataset.article);
      const data = articleData[index];
      if (!data) return;

      document.getElementById('curadoriaDetailHero').src = data.hero;
      document.getElementById('curadoriaDetailTag').textContent = data.tag;
      document.getElementById('curadoriaDetailTitle').textContent = data.title;
      document.getElementById('curadoriaDetailText').innerHTML = data.text;

      curadoriaOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      curadoriaOverlay.scrollTop = 0;
    });
  });

  curadoriaClose.addEventListener('click', () => {
    curadoriaOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close overlays with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectOverlay.classList.contains('active')) {
        projectOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (curadoriaOverlay.classList.contains('active')) {
        curadoriaOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // ============================
  // SMOOTH SCROLL
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = header.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================
  // FORM HANDLING
  // ============================
  const form = document.getElementById('contatoForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Mensagem enviada';
    btn.style.background = 'var(--color-olive)';
    setTimeout(() => {
      btn.textContent = 'Enviar mensagem';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });

  // ============================
  // SCROLL EVENT HANDLER
  // ============================
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgressBar();
        updateHeader();
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial calls
  updateHeader();
  updateProgressBar();

});
