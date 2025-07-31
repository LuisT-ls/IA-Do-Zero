/**
 * Módulo específico para o tópico de Fundamentos da Inteligência Artificial
 * Funcionalidades: navegação, interações, destaques e animações
 */

// Configurações do módulo
const FUNDAMENTOS_CONFIG = {
  // Seletor para elementos interativos
  selectors: {
    cards: '.card',
    timelineItems: '.timeline-year',
    sectionHeaders: 'h2, h3',
    navigationLinks: '.breadcrumb a',
    themeToggle: '#theme-toggle'
  },

  // Classes CSS para animações
  classes: {
    highlight: 'highlight-section',
    animate: 'animate-on-scroll',
    interactive: 'interactive-element'
  },

  // Configurações de animação
  animation: {
    duration: 300,
    delay: 100,
    threshold: 0.1
  }
}

/**
 * Classe principal do módulo de fundamentos
 */
class FundamentosModule {
  constructor() {
    this.isInitialized = false
    this.currentSection = null
    this.observer = null

    this.init()
  }

  /**
   * Inicializa o módulo
   */
  init() {
    if (this.isInitialized) return

    try {
      this.setupEventListeners()
      this.setupIntersectionObserver()
      this.addInteractiveFeatures()
      this.setupNavigation()
      this.setupProgressTracking()

      this.isInitialized = true
      console.log('✅ Módulo de Fundamentos da IA inicializado com sucesso')
    } catch (error) {
      console.error('❌ Erro ao inicializar módulo de fundamentos:', error)
    }
  }

  /**
   * Configura os event listeners
   */
  setupEventListeners() {
    // Mapeamento de cards para modais
    this.cardModalMap = {
      'Assistente Virtual': 'modalAssistenteVirtual',
      'Carros Autônomos': 'modalCarrosAutonomos',
      'IA Fraca': 'modalIAFraca',
      'IA Forte': 'modalIAForte',
      'IA Geral': 'modalIAGeral',
      'Machine Learning': 'modalMachineLearning',
      'Processamento de Linguagem Natural (NLP)': 'modalNLP',
      'Visão Computacional': 'modalVisaoComputacional',
      Robótica: 'modalRobotica',
      'Raciocínio Automatizado': 'modalRaciocinioAutomatizado',
      'Integração de Áreas': 'modalIntegracaoAreas',
      'Teste de Turing': 'modalTesteTuring',
      'Conferência de Dartmouth': 'modalDartmouth',
      'Deep Blue vence Kasparov': 'modalDeepBlue',
      'Avanço com Redes Neurais Profundas': 'modalRedesNeurais',
      'IA Generativa': 'modalIAGenerativa',
      'Próximos Capítulos': 'modalProximosCapitulos'
    }

    // Event listener para cards interativos
    document
      .querySelectorAll(FUNDAMENTOS_CONFIG.selectors.cards)
      .forEach(card => {
        // Adiciona cursor pointer para indicar que é clicável
        card.style.cursor = 'pointer'

        card.addEventListener('click', this.handleCardClick.bind(this))
        card.addEventListener('mouseenter', this.handleCardHover.bind(this))
        card.addEventListener('mouseleave', this.handleCardLeave.bind(this))
      })

    // Event listener para itens da timeline
    document
      .querySelectorAll(FUNDAMENTOS_CONFIG.selectors.timelineItems)
      .forEach(item => {
        item.addEventListener('click', this.handleTimelineClick.bind(this))
      })

    // Event listener para navegação por seções
    document
      .querySelectorAll(FUNDAMENTOS_CONFIG.selectors.sectionHeaders)
      .forEach(header => {
        header.addEventListener('click', this.handleSectionClick.bind(this))
      })

    // Event listener para mudança de tema
    const themeToggle = document.querySelector(
      FUNDAMENTOS_CONFIG.selectors.themeToggle
    )
    if (themeToggle) {
      themeToggle.addEventListener('click', this.handleThemeChange.bind(this))
    }
  }

  /**
   * Configura o Intersection Observer para animações
   */
  setupIntersectionObserver() {
    const options = {
      threshold: FUNDAMENTOS_CONFIG.animation.threshold,
      rootMargin: '0px 0px -50px 0px'
    }

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target)
          this.updateProgress(entry.target)
        }
      })
    }, options)

    // Observa elementos para animação
    document
      .querySelectorAll(FUNDAMENTOS_CONFIG.selectors.cards)
      .forEach(card => {
        this.observer.observe(card)
      })
  }

  /**
   * Adiciona funcionalidades interativas
   */
  addInteractiveFeatures() {
    // Adiciona tooltips aos cards
    this.addTooltips()

    // Adiciona indicadores de progresso
    this.addProgressIndicators()

    // Adiciona funcionalidade de busca rápida
    this.addQuickSearch()

    // Adiciona navegação por teclado
    this.addKeyboardNavigation()
  }

  /**
   * Configura a navegação
   */
  setupNavigation() {
    // Cria menu de navegação rápida
    this.createQuickNav()

    // Adiciona breadcrumb dinâmico
    this.updateBreadcrumb()

    // Configura links internos
    this.setupInternalLinks()
  }

  /**
   * Configura o rastreamento de progresso
   */
  setupProgressTracking() {
    // Cria barra de progresso
    this.createProgressBar()

    // Inicia rastreamento
    this.trackProgress()
  }

  /**
   * Manipula clique nos cards
   */
  handleCardClick(event) {
    const card = event.currentTarget
    const title = card.querySelector('.card-title')?.textContent

    if (title && this.cardModalMap) {
      this.openCardModal(title, card)
      this.highlightCard(card)
    }
  }

  /**
   * Abre o modal correspondente ao card clicado
   */
  openCardModal(title, card) {
    const modalId = this.cardModalMap[title]

    if (modalId) {
      const modal = document.getElementById(modalId)
      if (modal && typeof bootstrap !== 'undefined') {
        const bootstrapModal = new bootstrap.Modal(modal)
        bootstrapModal.show()
      } else {
        console.warn(`Modal não encontrado: ${modalId}`)
      }
    } else {
      console.warn(`Modal não mapeado para: ${title}`)
    }
  }

  /**
   * Manipula hover nos cards
   */
  handleCardHover(event) {
    const card = event.currentTarget
    card.classList.add('card-hover')
    this.addHoverEffect(card)

    // Adiciona efeito de escala e sombra
    card.style.transform = 'scale(1.02)'
    card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
    card.style.transition = 'all 0.2s ease'
  }

  /**
   * Manipula saída do hover nos cards
   */
  handleCardLeave(event) {
    const card = event.currentTarget
    card.classList.remove('card-hover')
    this.removeHoverEffect(card)

    // Remove efeitos de escala e sombra
    card.style.transform = 'scale(1)'
    card.style.boxShadow = ''
  }

  /**
   * Manipula clique nos itens da timeline
   */
  handleTimelineClick(event) {
    const item = event.currentTarget
    const year = item.textContent

    this.showTimelineDetails(year, item)
    this.highlightTimelineItem(item)
  }

  /**
   * Manipula clique nas seções
   */
  handleSectionClick(event) {
    const header = event.currentTarget
    const sectionId = this.generateSectionId(header.textContent)

    this.scrollToSection(sectionId)
    this.highlightSection(header)
  }

  /**
   * Manipula mudança de tema
   */
  handleThemeChange() {
    // Aguarda a mudança de tema ser aplicada
    setTimeout(() => {
      this.updateThemeSpecificElements()
    }, 100)
  }

  /**
   * Anima elemento quando entra na viewport
   */
  animateElement(element) {
    element.classList.add(FUNDAMENTOS_CONFIG.classes.animate)

    setTimeout(() => {
      element.style.opacity = '1'
      element.style.transform = 'translateY(0)'
    }, FUNDAMENTOS_CONFIG.animation.delay)
  }

  /**
   * Atualiza progresso baseado na seção atual
   */
  updateProgress(element) {
    const section = this.getCurrentSection(element)
    if (section && section !== this.currentSection) {
      this.currentSection = section
      this.updateProgressBar(section)
    }
  }

  /**
   * Adiciona tooltips aos cards
   */
  addTooltips() {
    document
      .querySelectorAll(FUNDAMENTOS_CONFIG.selectors.cards)
      .forEach(card => {
        const title = card.querySelector('.card-title')?.textContent
        if (title) {
          card.setAttribute('title', `Clique para saber mais sobre ${title}`)
          card.setAttribute('data-bs-toggle', 'tooltip')
          card.setAttribute('data-bs-placement', 'top')
        }
      })

    // Inicializa tooltips do Bootstrap
    if (typeof bootstrap !== 'undefined') {
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      )
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
      })
    }
  }

  /**
   * Adiciona indicadores de progresso
   */
  addProgressIndicators() {
    const sections = document.querySelectorAll('section')
    sections.forEach((section, index) => {
      const indicator = document.createElement('div')
      indicator.className = 'progress-indicator'
      indicator.setAttribute('data-section', index)
      indicator.innerHTML = `<span class="indicator-dot"></span>`

      section.appendChild(indicator)
    })
  }

  /**
   * Adiciona busca rápida
   */
  addQuickSearch() {
    const searchContainer = document.createElement('div')
    searchContainer.className = 'quick-search-container position-fixed'
    searchContainer.style.cssText = 'top: 20px; right: 20px; z-index: 1000;'

    searchContainer.innerHTML = `
      <div class="input-group input-group-sm">
        <input type="text" class="form-control" placeholder="Buscar no conteúdo..." id="quickSearch">
        <button class="btn btn-outline-secondary" type="button">
          <i class="fas fa-search"></i>
        </button>
      </div>
    `

    document.body.appendChild(searchContainer)

    // Event listener para busca
    const searchInput = document.getElementById('quickSearch')
    if (searchInput) {
      searchInput.addEventListener('input', this.handleQuickSearch.bind(this))
    }
  }

  /**
   * Adiciona navegação por teclado
   */
  addKeyboardNavigation() {
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case 'ArrowDown':
          this.navigateToNextSection()
          break
        case 'ArrowUp':
          this.navigateToPreviousSection()
          break
        case 'Home':
          this.scrollToTop()
          break
        case 'End':
          this.scrollToBottom()
          break
      }
    })
  }

  /**
   * Cria navegação rápida
   */
  createQuickNav() {
    const sections = document.querySelectorAll('section')

    // Cria container principal que será o trigger
    const navTrigger = document.createElement('div')
    navTrigger.className = 'quick-nav-trigger position-fixed d-none d-lg-block'
    navTrigger.style.cssText =
      'top: 50%; left: 0; transform: translateY(-50%); z-index: 1000; width: 20px; height: 100px; cursor: pointer; transition: all 0.3s ease;'

    // Adiciona ícone ao trigger
    navTrigger.innerHTML =
      '<i class="fas fa-chevron-right text-muted" style="font-size: 1.2rem; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); transition: all 0.3s ease;"></i>'
    navTrigger.setAttribute(
      'title',
      'Navegação Rápida - Passe o mouse para abrir'
    )
    navTrigger.setAttribute('aria-label', 'Abrir navegação rápida')

    // Cria container da navegação
    const navContainer = document.createElement('nav')
    navContainer.className = 'quick-nav position-fixed d-none d-lg-block'
    navContainer.style.cssText =
      'top: 50%; left: 20px; transform: translateY(-50%); z-index: 1000; max-width: 250px; opacity: 0; visibility: hidden; transition: all 0.3s ease;'

    // Adiciona título à navegação
    const navTitle = document.createElement('h6')
    navTitle.className = 'text-muted mb-3 text-center'
    navTitle.innerHTML = '<i class="fas fa-list me-2"></i>Navegação Rápida'
    navContainer.appendChild(navTitle)

    const navList = document.createElement('ul')
    navList.className = 'list-unstyled'

    sections.forEach((section, index) => {
      const header = section.querySelector('h2, h3')
      if (header) {
        const navItem = document.createElement('li')
        navItem.className = 'mb-2'
        navItem.innerHTML = `
          <button class="btn btn-sm btn-outline-primary quick-nav-btn w-100 text-start" data-section="${index}" title="${header.textContent}">
            ${header.textContent}
          </button>
        `
        navList.appendChild(navItem)
      }
    })

    navContainer.appendChild(navList)

    // Adiciona elementos ao DOM
    document.body.appendChild(navTrigger)
    document.body.appendChild(navContainer)

    // Event listeners para hover
    navTrigger.addEventListener('mouseenter', () => {
      navContainer.style.opacity = '1'
      navContainer.style.visibility = 'visible'
      navTrigger.querySelector('i').classList.remove('text-muted')
      navTrigger.querySelector('i').classList.add('text-primary')
      navTrigger.style.left = '10px'
      navTrigger.querySelector('i').classList.remove('fa-chevron-right')
      navTrigger.querySelector('i').classList.add('fa-chevron-left')
    })

    navContainer.addEventListener('mouseenter', () => {
      navContainer.style.opacity = '1'
      navContainer.style.visibility = 'visible'
      navTrigger.querySelector('i').classList.remove('text-muted')
      navTrigger.querySelector('i').classList.add('text-primary')
      navTrigger.style.left = '10px'
      navTrigger.querySelector('i').classList.remove('fa-chevron-right')
      navTrigger.querySelector('i').classList.add('fa-chevron-left')
    })

    navTrigger.addEventListener('mouseleave', () => {
      navContainer.style.opacity = '0'
      navContainer.style.visibility = 'hidden'
      navTrigger.querySelector('i').classList.remove('text-primary')
      navTrigger.querySelector('i').classList.add('text-muted')
      navTrigger.style.left = '0'
      navTrigger.querySelector('i').classList.remove('fa-chevron-left')
      navTrigger.querySelector('i').classList.add('fa-chevron-right')
    })

    navContainer.addEventListener('mouseleave', () => {
      navContainer.style.opacity = '0'
      navContainer.style.visibility = 'hidden'
      navTrigger.querySelector('i').classList.remove('text-primary')
      navTrigger.querySelector('i').classList.add('text-muted')
      navTrigger.style.left = '0'
      navTrigger.querySelector('i').classList.remove('fa-chevron-left')
      navTrigger.querySelector('i').classList.add('fa-chevron-right')
    })

    // Event listeners para navegação rápida
    navContainer.addEventListener('click', event => {
      if (event.target.classList.contains('quick-nav-btn')) {
        const sectionIndex = event.target.getAttribute('data-section')
        this.scrollToSectionByIndex(sectionIndex)
      }
    })

    // Cria botão para mostrar/esconder navegação em dispositivos móveis
    this.createMobileNavToggle()
  }

  /**
   * Cria botão de toggle para navegação móvel
   */
  createMobileNavToggle() {
    const toggleButton = document.createElement('button')
    toggleButton.className = 'btn btn-primary position-fixed d-lg-none'
    toggleButton.style.cssText = 'top: 20px; left: 20px; z-index: 1002;'
    toggleButton.innerHTML = '<i class="fas fa-bars"></i>'
    toggleButton.setAttribute('aria-label', 'Mostrar navegação rápida')
    toggleButton.title = 'Navegação Rápida'

    // Cria modal para navegação móvel
    const mobileNavModal = document.createElement('div')
    mobileNavModal.className = 'modal fade'
    mobileNavModal.id = 'mobileNavModal'
    mobileNavModal.innerHTML = `
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-list me-2"></i>Navegação Rápida
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div id="mobileNavList"></div>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(toggleButton)
    document.body.appendChild(mobileNavModal)

    // Preenche a lista de navegação móvel
    this.populateMobileNavList()

    // Event listener para abrir modal
    toggleButton.addEventListener('click', () => {
      if (typeof bootstrap !== 'undefined') {
        const modal = new bootstrap.Modal(mobileNavModal)
        modal.show()
      }
    })
  }

  /**
   * Preenche a lista de navegação móvel
   */
  populateMobileNavList() {
    const sections = document.querySelectorAll('section')
    const mobileNavList = document.getElementById('mobileNavList')

    if (mobileNavList) {
      const navList = document.createElement('div')
      navList.className = 'list-group list-group-flush'

      sections.forEach((section, index) => {
        const header = section.querySelector('h2, h3')
        if (header) {
          const navItem = document.createElement('button')
          navItem.className =
            'list-group-item list-group-item-action text-start'
          navItem.setAttribute('data-section', index)
          navItem.textContent = header.textContent

          navItem.addEventListener('click', () => {
            this.scrollToSectionByIndex(index)
            // Fecha o modal
            const modal = bootstrap.Modal.getInstance(
              document.getElementById('mobileNavModal')
            )
            if (modal) {
              modal.hide()
            }
          })

          navList.appendChild(navItem)
        }
      })

      mobileNavList.appendChild(navList)
    }
  }

  /**
   * Cria barra de progresso
   */
  createProgressBar() {
    const progressContainer = document.createElement('div')
    progressContainer.className = 'progress-container position-fixed'
    progressContainer.style.cssText =
      'top: 0; left: 0; width: 100%; height: 4px; z-index: 1001;'

    progressContainer.innerHTML = `
      <div class="progress-bar bg-primary" id="readingProgress" style="width: 0%; transition: width 0.3s ease;"></div>
    `

    document.body.appendChild(progressContainer)
  }

  /**
   * Rastreia progresso de leitura
   */
  trackProgress() {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.body.offsetHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      const progressBar = document.getElementById('readingProgress')
      if (progressBar) {
        progressBar.style.width = scrollPercent + '%'
      }
    })
  }

  /**
   * Mostra detalhes do card
   */
  showCardDetails(title, card) {
    // Cria modal com detalhes
    const modal = document.createElement('div')
    modal.className = 'modal fade'
    modal.id = 'cardModal'

    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p>Detalhes expandidos sobre ${title}...</p>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(modal)

    // Mostra modal
    if (typeof bootstrap !== 'undefined') {
      const modalInstance = new bootstrap.Modal(modal)
      modalInstance.show()
    }
  }

  /**
   * Destaca card
   */
  highlightCard(card) {
    card.style.transform = 'scale(1.05)'
    card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)'

    setTimeout(() => {
      card.style.transform = 'scale(1)'
      card.style.boxShadow = ''
    }, 500)
  }

  /**
   * Adiciona efeito hover
   */
  addHoverEffect(card) {
    card.style.transition = 'all 0.3s ease'
    card.style.transform = 'translateY(-5px)'
  }

  /**
   * Remove efeito hover
   */
  removeHoverEffect(card) {
    card.style.transform = 'translateY(0)'
  }

  /**
   * Mostra detalhes da timeline
   */
  showTimelineDetails(year, item) {
    console.log(`Detalhes do ano ${year}`)
    // Implementar lógica específica para cada ano
  }

  /**
   * Destaca item da timeline
   */
  highlightTimelineItem(item) {
    item.style.transform = 'scale(1.2)'
    item.style.zIndex = '10'

    setTimeout(() => {
      item.style.transform = 'scale(1)'
      item.style.zIndex = ''
    }, 300)
  }

  /**
   * Gera ID para seção
   */
  generateSectionId(text) {
    return text.toLowerCase().replace(/[^a-z0-9]/g, '-')
  }

  /**
   * Rola para seção
   */
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  /**
   * Destaca seção
   */
  highlightSection(header) {
    header.style.color = '#007bff'
    header.style.transition = 'color 0.3s ease'

    setTimeout(() => {
      header.style.color = ''
    }, 1000)
  }

  /**
   * Atualiza elementos específicos do tema
   */
  updateThemeSpecificElements() {
    const isDark = document.body.getAttribute('data-theme') === 'dark'

    // Atualiza cores dos elementos interativos
    document.querySelectorAll('.quick-nav-btn').forEach(btn => {
      btn.className = isDark
        ? 'btn btn-sm btn-outline-light'
        : 'btn btn-sm btn-outline-primary'
    })
  }

  /**
   * Obtém seção atual
   */
  getCurrentSection(element) {
    const section = element.closest('section')
    return section ? section.querySelector('h2, h3')?.textContent : null
  }

  /**
   * Atualiza barra de progresso
   */
  updateProgressBar(section) {
    const progressBar = document.getElementById('readingProgress')
    if (progressBar) {
      // Calcula progresso baseado na seção
      const sections = document.querySelectorAll('section')
      const currentIndex = Array.from(sections).findIndex(
        s => s.querySelector('h2, h3')?.textContent === section
      )

      const progress = ((currentIndex + 1) / sections.length) * 100
      progressBar.style.width = progress + '%'
    }
  }

  /**
   * Manipula busca rápida
   */
  handleQuickSearch(event) {
    const searchTerm = event.target.value.toLowerCase()
    const cards = document.querySelectorAll(FUNDAMENTOS_CONFIG.selectors.cards)

    cards.forEach(card => {
      const text = card.textContent.toLowerCase()
      if (text.includes(searchTerm)) {
        card.style.display = 'block'
        card.style.opacity = '1'
      } else {
        card.style.display = 'none'
        card.style.opacity = '0.3'
      }
    })
  }

  /**
   * Navega para próxima seção
   */
  navigateToNextSection() {
    const sections = document.querySelectorAll('section')
    const currentSection = this.getCurrentVisibleSection()
    const nextIndex = (currentSection + 1) % sections.length

    sections[nextIndex].scrollIntoView({ behavior: 'smooth' })
  }

  /**
   * Navega para seção anterior
   */
  navigateToPreviousSection() {
    const sections = document.querySelectorAll('section')
    const currentSection = this.getCurrentVisibleSection()
    const prevIndex =
      currentSection > 0 ? currentSection - 1 : sections.length - 1

    sections[prevIndex].scrollIntoView({ behavior: 'smooth' })
  }

  /**
   * Rola para o topo
   */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /**
   * Rola para o final
   */
  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  /**
   * Obtém seção atualmente visível
   */
  getCurrentVisibleSection() {
    const sections = document.querySelectorAll('section')
    const scrollPosition = window.pageYOffset + window.innerHeight / 2

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      const sectionTop = section.offsetTop
      const sectionBottom = sectionTop + section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        return i
      }
    }

    return 0
  }

  /**
   * Rola para seção por índice
   */
  scrollToSectionByIndex(index) {
    const sections = document.querySelectorAll('section')
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' })
    }
  }

  /**
   * Atualiza breadcrumb
   */
  updateBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb')
    if (breadcrumb) {
      const currentSection = this.getCurrentSection(document.activeElement)
      if (currentSection) {
        const activeItem = breadcrumb.querySelector('.active')
        if (activeItem) {
          activeItem.textContent = currentSection
        }
      }
    }
  }

  /**
   * Configura links internos
   */
  setupInternalLinks() {
    // Implementar navegação entre seções relacionadas
  }
}

// Inicializa o módulo quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new FundamentosModule()
  })
} else {
  new FundamentosModule()
}

// Exporta para uso em outros módulos
export default FundamentosModule
