/**
 * IA Do Zero - JavaScript Principal
 * Funcionalidades: Darkmode, navegação, acessibilidade
 */

;(function () {
  'use strict'

  // ===================================================================
  // GESTÃO DE TEMA (DARKMODE/LIGHTMODE)
  // ===================================================================

  class ThemeManager {
    constructor() {
      this.themeToggle = document.getElementById('theme-toggle')
      this.currentTheme = this.getInitialTheme()
      this.init()
    }

    init() {
      // Aplica o tema inicial sem animação
      this.applyTheme(this.currentTheme, false)
      this.setupEventListeners()
      this.updateButtonState()

      // Adiciona classe para transições após inicialização
      setTimeout(() => {
        document.documentElement.classList.add('theme-transitions')
        document.body.classList.add('theme-transitions')
      }, 100)
    }

    getInitialTheme() {
      // 1. Verifica se há tema salvo no localStorage
      const storedTheme = this.getStoredTheme()
      if (storedTheme) {
        return storedTheme
      }

      // 2. Verifica preferência do sistema
      const systemTheme = this.getSystemTheme()

      // 3. Se não há preferência salva, usa o tema do sistema
      return systemTheme
    }

    getStoredTheme() {
      return localStorage.getItem('theme')
    }

    getSystemTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }

    setStoredTheme(theme) {
      localStorage.setItem('theme', theme)
    }

    applyTheme(theme, withAnimation = true) {
      // Remove classes de transição temporariamente para evitar flicker
      if (!withAnimation) {
        document.documentElement.classList.remove('theme-transitions')
        document.body.classList.remove('theme-transitions')
      }

      // Aplica o tema
      document.documentElement.setAttribute('data-theme', theme)
      document.body.setAttribute('data-theme', theme)
      this.currentTheme = theme
      this.setStoredTheme(theme)

      // Re-adiciona classes de transição após um pequeno delay
      if (!withAnimation) {
        setTimeout(() => {
          document.documentElement.classList.add('theme-transitions')
          document.body.classList.add('theme-transitions')
        }, 50)
      }

      // Atualiza meta theme-color para mobile
      this.updateMetaThemeColor(theme)
    }

    updateMetaThemeColor(theme) {
      let metaThemeColor = document.querySelector('meta[name="theme-color"]')

      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta')
        metaThemeColor.name = 'theme-color'
        document.head.appendChild(metaThemeColor)
      }

      metaThemeColor.content = theme === 'dark' ? '#1a1a1a' : '#ffffff'
    }

    toggleTheme() {
      const newTheme = this.currentTheme === 'light' ? 'dark' : 'light'
      this.applyTheme(newTheme, true)
      this.updateButtonState()
      this.showThemeNotification(newTheme)
    }

    updateButtonState() {
      if (!this.themeToggle) return

      const themeText = this.themeToggle.querySelector('.theme-text')
      const isDark = this.currentTheme === 'dark'

      if (themeText) {
        themeText.textContent = isDark ? 'Modo Claro' : 'Modo Escuro'
      }

      // Adiciona classe de loading temporariamente
      this.themeToggle.classList.add('loading')
      setTimeout(() => {
        this.themeToggle.classList.remove('loading')
      }, 300)

      // Atualiza aria-label para acessibilidade
      this.themeToggle.setAttribute(
        'aria-label',
        isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro'
      )
    }

    showThemeNotification(theme) {
      const message =
        theme === 'dark' ? 'Modo escuro ativado' : 'Modo claro ativado'
      const icon = theme === 'dark' ? '🌙' : '☀️'

      // Cria notificação simples
      this.createNotification(`${icon} ${message}`)
    }

    createNotification(message) {
      const notification = document.createElement('div')
      notification.className = 'theme-notification'
      notification.textContent = message

      // Estilos da notificação
      Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: this.currentTheme === 'dark' ? '#2d2d2d' : '#ffffff',
        color: this.currentTheme === 'dark' ? '#ffffff' : '#000000',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow:
          this.currentTheme === 'dark'
            ? '0 4px 12px rgba(0, 0, 0, 0.5)'
            : '0 4px 12px rgba(0, 0, 0, 0.2)',
        zIndex: '9999',
        fontSize: '14px',
        fontWeight: '500',
        border: `1px solid ${
          this.currentTheme === 'dark' ? '#404040' : '#dee2e6'
        }`,
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backdropFilter: 'blur(10px)'
      })

      document.body.appendChild(notification)

      // Anima entrada
      setTimeout(() => {
        notification.style.transform = 'translateX(0)'
      }, 100)

      // Remove após 3 segundos
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)'
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification)
          }
        }, 300)
      }, 3000)
    }

    setupEventListeners() {
      if (this.themeToggle) {
        this.themeToggle.addEventListener('click', e => {
          e.preventDefault()
          this.toggleTheme()
        })

        // Suporte a teclado
        this.themeToggle.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            this.toggleTheme()
          }
        })
      }

      // Escuta mudanças no sistema
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => {
          if (!this.getStoredTheme()) {
            const newTheme = e.matches ? 'dark' : 'light'
            this.applyTheme(newTheme)
            this.updateButtonState()
          }
        })
    }
  }

  // ===================================================================
  // FUNCIONALIDADES DE ACESSIBILIDADE
  // ===================================================================

  class AccessibilityManager {
    constructor() {
      this.init()
    }

    init() {
      this.setupSkipLinks()
      this.setupFocusManagement()
      this.setupKeyboardNavigation()
    }

    setupSkipLinks() {
      // Adiciona link para pular para o conteúdo principal
      const skipLink = document.createElement('a')
      skipLink.href = '#main-content'
      skipLink.textContent = 'Pular para o conteúdo principal'
      skipLink.className = 'skip-link sr-only sr-only-focusable'

      Object.assign(skipLink.style, {
        position: 'absolute',
        top: '-40px',
        left: '6px',
        zIndex: '1000',
        padding: '8px 16px',
        background: '#007bff',
        color: '#ffffff',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '14px'
      })

      skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px'
      })

      skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px'
      })

      document.body.insertBefore(skipLink, document.body.firstChild)
    }

    setupFocusManagement() {
      // Gerencia foco para elementos dinâmicos
      document.addEventListener('focusin', e => {
        if (e.target.classList.contains('theme-toggle-btn')) {
          e.target.style.outline = '2px solid #007bff'
          e.target.style.outlineOffset = '2px'
        }
      })

      document.addEventListener('focusout', e => {
        if (e.target.classList.contains('theme-toggle-btn')) {
          e.target.style.outline = ''
          e.target.style.outlineOffset = ''
        }
      })
    }

    setupKeyboardNavigation() {
      // Navegação por teclado melhorada
      document.addEventListener('keydown', e => {
        // Ctrl/Cmd + K para alternar tema
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault()
          const themeToggle = document.getElementById('theme-toggle')
          if (themeToggle) {
            themeToggle.click()
          }
        }

        // Escape para fechar modais (se existirem)
        if (e.key === 'Escape') {
          const modals = document.querySelectorAll('.modal.show')
          modals.forEach(modal => {
            const closeBtn = modal.querySelector('[data-bs-dismiss="modal"]')
            if (closeBtn) closeBtn.click()
          })
        }
      })
    }
  }

  // ===================================================================
  // FUNCIONALIDADES DE PERFORMANCE
  // ===================================================================

  class PerformanceManager {
    constructor() {
      this.init()
    }

    init() {
      this.setupLazyLoading()
      this.setupIntersectionObserver()
    }

    setupLazyLoading() {
      // Lazy loading para imagens
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target
              img.src = img.dataset.src
              img.classList.remove('lazy')
              imageObserver.unobserve(img)
            }
          })
        })

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img)
        })
      }
    }

    setupIntersectionObserver() {
      // Animações baseadas em scroll
      if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate-in')
              }
            })
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
          }
        )

        document.querySelectorAll('.card, .animate-on-scroll').forEach(el => {
          animationObserver.observe(el)
        })
      }
    }
  }

  // ===================================================================
  // INICIALIZAÇÃO
  // ===================================================================

  // Aguarda o DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp)
  } else {
    initializeApp()
  }

  function initializeApp() {
    // Inicializa gerenciadores
    const themeManager = new ThemeManager()
    const accessibilityManager = new AccessibilityManager()
    const performanceManager = new PerformanceManager()

    // Adiciona ID ao conteúdo principal para skip links
    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.id = 'main-content'
    }

    // Log de inicialização
    console.log('🚀 IA Do Zero - Aplicação inicializada com sucesso!')
    console.log('📱 Tema atual:', themeManager.currentTheme)
    console.log('♿ Funcionalidades de acessibilidade ativas')
    console.log('⚡ Otimizações de performance aplicadas')

    // Exposição global para debugging (apenas em desenvolvimento)
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ) {
      window.iaDoZero = {
        themeManager,
        accessibilityManager,
        performanceManager
      }
    }
  }
})()
