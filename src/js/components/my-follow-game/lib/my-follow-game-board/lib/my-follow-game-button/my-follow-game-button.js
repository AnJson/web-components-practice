const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      box-sizing: border-box;
    }

    #button {
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

    #button:hover {
      background-color: var(--color-main-light);
      color: var(--color-second-dark);
    }

    #button.disabled {
      background-color: var(--color-second-light);
      border: 2px solid var(--color-second-dark);
      color: #000;
      cursor: default;
    }
  </style>
  <button id="button">Start round</button>
`

customElements.define('my-follow-game-button',
  /**
   * Custom element my-follow-game-button.
   *
   **/
  class extends HTMLElement {
    /**
     * Button-element.
     */
    #button

    /**
     * Custom-event start-round.
     */
    #startRoundEvent

    /**
     * Create instance of my-follow-game-button and attach shadowDOM.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#startRoundEvent = new CustomEvent('start-round',
        {
          bubbles: true,
        })

      this.#button = this.shadowRoot.querySelector('#button')
    }

    /**
     * Set text on button to text-attribute or default.
     */
    connectedCallback () {
      this.shadowRoot.addEventListener('click', () => {
        if (!this.hasAttribute('disabled')) {
          this.dispatchEvent(this.#startRoundEvent)
        }
      })
    }

    /**
     * Attributes to watch.
     *
     * @returns {string[]} - Array of attributes being watched.
     */
    static get observedAttributes () {
      return ['disabled']
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
        if (newVal !== null) {
          this.#button.classList.add('disabled')
        }
      }
    }

    /**
     * Disable button when out-of-cards-event occurs.
     */
    #disableButton () {
      this.setAttribute('disabled', true)
    }
  })
