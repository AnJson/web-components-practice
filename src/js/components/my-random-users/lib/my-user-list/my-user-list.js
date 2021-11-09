import '../my-user-list-item'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
    }

    #user-list {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }
  </style>
  <ul id="user-list"></ul>
`
customElements.define('my-user-list',
  /**
   * Custom element my-user-list.
   *
   **/
  class extends HTMLElement {
    /**
     * User-list element.
     */
    #userList

    /**
     * Users from api.
     *
     * @type {object[]} - Array of user-objects from api.
     */
    #users

    /**
     * Create instance of my-user-list and attach shadowDOM.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#userList = this.shadowRoot.querySelector('#user-list')
    }

    /**
     * Get users-field.
     *
     * @returns {object[]} - Returns a copy of the users-field.
     */
    get users () {
      return Array.from(this.#users)
    }

    /**
     * Set users-field.
     */
    set users (data) {
      if (Array.isArray(data) && data.every(el => typeof el === 'object' && !Array.isArray(el))) {
        this.#users = data
      }
    }

    /**
     * Attributes to watch.
     *
     * @returns {string[]} - Array of attributes being watched.
     */
    static get observedAttributes () {
      return ['fetch-status']
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
          for (const { name, location, picture } of this.#users) {
            const item = document.createElement('my-user-list-item')
            item.data = {
              name: `${name.first} ${name.last}`,
              image: picture.medium,
              city: location.city,
              country: location.country
            }
            item.setAttribute('updated', true)
            this.#userList.appendChild(item)
          }
        }
      }
    }
  })
