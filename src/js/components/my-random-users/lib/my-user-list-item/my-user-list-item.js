const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
    }
    #list-item {
      height: 8rem;
      padding: .5rem 0;
      border-bottom: 1px solid #ccc;
      display: flex;
      width: 100%;
      font-family: 'Crimson Text', serif;
      font-weight: 400;
      font-size: 1.6rem;
      box-sizing: border-box;
      background-color: var(--color-enlighten);
    }

    #image {
      margin-right: 1rem;
    }

    #data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  </style>
  <li id="list-item">
    <img id="image">
    <div id="data">
      <div id="name"></div>
      <div id="location"></div>
    </div>
  </li>
`

customElements.define('my-user-list-item',
  /**
   * Custom element my-user-list-item.
   *
   **/
  class extends HTMLElement {
    /**
     * Image-element.
     */
    #imageElement

    /**
     * Name-element.
     */
    #nameElement

    /**
     * Location-element.
     */
    #locationElement

    /**
     * Users from api.
     *
     * @type {object} - Object with user-data.
     */
    #data

    /**
     * Create instance of my-user-list-item and attach shadowDOM.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#imageElement = this.shadowRoot.querySelector('#image')
      this.#nameElement = this.shadowRoot.querySelector('#name')
      this.#locationElement = this.shadowRoot.querySelector('#location')
    }

    /**
     * Get data-field.
     *
     * @returns {object} - Returns a copy of the data-field.
     */
    get data () {
      return { ...this.#data }
    }

    /**
     * Set data-field.
     */
    set data (data) {
      if (!Array.isArray(data) && typeof data === 'object') {
        this.#data = data
      }
    }

    /**
     * Set the text-content and src for the image, triggered when element is mounted to the DOM.
     *
     */
    connectedCallback () {
      this.#imageElement.setAttribute('src', this.#data.image)
      this.#nameElement.textContent = this.#data.name
      this.#locationElement.textContent = `${this.#data.city}, ${this.#data.country}`
    }
  })
