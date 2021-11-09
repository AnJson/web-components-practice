import '../my-user-list'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    #container {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 1rem 1rem;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
    }

    p {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 1.8rem;
      font-family: 'Ubuntu', sans-serif;
      transform: translate(-50%, -50%)
    }
  </style>
  <div id="container"></div>
`
customElements.define('my-user-container',
/**
 * Custom element my-user-container.
 */
  class extends HTMLElement {
    /**
     * Container-element.
     */
    #container
    /**
     * Users from api.
     *
     * @type {object[]} - Array of user-objects from api.
     */
    #users

    /**
     * Create instance of my-user-container and attach shadowDOM.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#container = this.shadowRoot.querySelector('#container')
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
      return ['fetch-status', 'loading', 'failed']
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
        const container = this.#container // Set constant to shorten condition-statements.

        if (name === 'loading') {
          while (container.lastChild) {
            container.removeChild(container.lastChild)
          }

          if (newVal) {
            const loader = document.createElement('my-loader')
            container.appendChild(loader)
          }
        }

        if (name === 'fetch-status') {
          const userList = document.createElement('my-user-list')

          if (newVal) {
            while (container.lastChild) {
              container.removeChild(container.lastChild)
            }
            container.appendChild(userList)
            userList.users = this.#users
            userList.setAttribute('fetch-status', newVal)
          } else {
            userList.removeAttribute('fetch-status')
          }
        }

        if (name === 'failed') {
          if (newVal) {
            const output = document.createElement('p')
            output.textContent = 'Something went wrong!'
            container.appendChild(output)
          }
        }
      }
    }
  })
