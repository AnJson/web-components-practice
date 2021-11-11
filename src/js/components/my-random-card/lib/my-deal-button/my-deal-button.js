const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      box-sizing: border-box;
    }

    #deal-button {
      border: 2px solid var(--color-second-dark);
      padding: 1rem 3rem;
      border-radius: 3px;
      background-color: var(--color-main-dark);
      color: #fff;
      font-weight: 800;
      text-transform: uppercase;
      cursor: pointer;
      box-sizing: border-box;
      margin: 2rem 0;
      transition: all 200ms;
    }

    #deal-button:hover {
      background-color: var(--color-main-light);
      color: var(--color-second-dark);
    }

    #deal-button.disabled {
      background-color: var(--color-second-light);
      border: 2px solid var(--color-second-dark);
      color: #000;
    }
  </style>
  <button id="deal-button"></button>
`

customElements.define('my-deal-button',
  /**
   * Custom element my-deal-button.
   *
   **/
  class extends HTMLElement {
    /**
     * Button-element.
     */
    #button

    /**
     * Deal-card event.
     */
    #dealEvent

    /**
     * Reshuffle event.
     */
    #reshuffleEvent

    /**
     * Create instance of my-deal-button and attach shadowDOM.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#dealEvent = new CustomEvent('deal-card',
        {
          bubbles: true,
        })

      this.#reshuffleEvent = new CustomEvent('reshuffle',
        {
          bubbles: true,
        })

      this.#button = this.shadowRoot.querySelector('#deal-button')
    }

    /**
     * Set text on button to text-attribute or default.
     */
    connectedCallback () {
      this.#button.textContent = this.getAttribute('text') ? this.getAttribute('text') : 'Deal'

      this.shadowRoot.addEventListener('click', () => {
        this.#dispatchEvent()
      })
    }

    /**
     * Attributes to watch.
     *
     * @returns {string[]} - Array of attributes being watched.
     */
    static get observedAttributes () {
      return ['empty']
    }

    /**
     * React to changes in watched attributes.
     *
     * @param {*} name - Name of the attribute.
     * @param {*} oldVal - The previous value of the attribute.
     * @param {*} newVal - The new value of the attribute.
     */
    attributeChangedCallback (name, oldVal, newVal) {
      if (oldVal !== newVal) {
        if (newVal) {
          this.#button.classList.add('disabled')
          this.#button.textContent = 'Reshuffle Deck'
        } else {
          this.#button.classList.remove('disabled')
          this.#button.textContent = this.getAttribute('text') ? this.getAttribute('text') : 'Deal'
        }
      }
    }

    /**
     * Dispatch events.
     */
    #dispatchEvent () {
      if (!this.hasAttribute('empty')) {
        this.dispatchEvent(this.#dealEvent)
      } else {
        this.dispatchEvent(this.#reshuffleEvent)
      }
    }

    /**
     * Disable button when out-of-cards-event occurs.
     */
    #disableButton () {
      this.setAttribute('disabled', true)
    }
  })
