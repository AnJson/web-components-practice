const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      box-sizing: border-box;
    }

    #fetching-button {
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

    #fetching-button:hover {
      background-color: var(--color-main-light);
      color: var(--color-second-dark);
    }
  </style>
  <button id="fetching-button"></button>
`

customElements.define('my-fetching-button',
  /**
   * Custom element my-fetching-button.
   *
   **/
  class extends HTMLElement {
    /**
     * Button-element.
     */
    #button
    /**
     * fetch-users event.
     */
    #fetchingEvent
    /**
     * Create instance of my-fetching-button and attach shadowDOM.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#fetchingEvent = new CustomEvent('fetch-users',
        {
          bubbles: true,
        })

      this.#button = this.shadowRoot.querySelector('#fetching-button')
    }

    /**
     * Set text on button to text-attribute or default.
     */
    connectedCallback () {
      this.#button.textContent = this.getAttribute('text') ? this.getAttribute('text') : 'Submit'

      this.shadowRoot.addEventListener('click', () => {
        this.#clickHandler()
      })
    }

    /**
     * Dispatch fetch-user-event.
     */
    #clickHandler () {
      this.dispatchEvent(this.#fetchingEvent)
    }
  })
