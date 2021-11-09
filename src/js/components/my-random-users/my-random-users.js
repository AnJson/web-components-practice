import './lib/my-user-container'
import './lib/my-fetching-button'
import '../my-loader'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      box-sizing: border-box;
    }

    #wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 80vh;
      min-height: 50rem;
      box-sizing: border-box;
    }

    #user-container {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
    }

    #user-container::-webkit-scrollbar {
      width: 0.6rem;
    }

    #user-container::-webkit-scrollbar-track {
      background-color: var(--color-main-dark);
    }

    #user-container::-webkit-scrollbar-thumb {
      width: 0.6rem;
      background-color: var(--color-second-dark);
    }
  </style>
  <div id="wrapper">
    <my-user-container id="user-container"></my-user-container>
    <my-fetching-button text="Fetch users"></my-fetching-button>
  </div>
`

customElements.define('my-random-users',
  /**
   * Custom element my-users.
   *
   **/
  class extends HTMLElement {
    /**
     * User-container element.
     */
    #userContainer

    /**
     * Create instance of my-users and attach shadowDOM.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#userContainer = this.shadowRoot.querySelector('#user-container')
    }

    /**
     * Add event-listeners when element is connected to the DOM.
     */
    connectedCallback () {
      this.shadowRoot.addEventListener('fetch-users', () => {
        this.#fetchUsers()
      })
    }

    /**
     * Fetch users from api and set attributes on user-container to show loader and user-list.
     *
     */
    #fetchUsers () {
      this.#userContainer.setAttribute('loading', true)
      this.#userContainer.removeAttribute('fetch-status')
      this.#userContainer.removeAttribute('failed')

      window.fetch('https://randomuser.me/api/?inc=name,location,picture&results=20')
        .then(response => response.json())
        .then(data => {
          this.#userContainer.removeAttribute('loading')
          this.#userContainer.users = data.results
          this.#userContainer.setAttribute('fetch-status', 'success')
        })
        .catch((err) => {
          console.error(err.message)
          this.#userContainer.removeAttribute('loading')
          this.#userContainer.setAttribute('failed', true)
        })
    }
  })
