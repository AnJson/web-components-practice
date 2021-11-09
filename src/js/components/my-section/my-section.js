const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      width: calc(50% - 2rem);
    }

    ::slotted(*) {
      max-width: 100%;
      max-height: 100%;
    }

    #section-container {
      position: relative;
      box-sizing: border-box;
      border-radius: 0px 10px 3px 3px;
      box-shadow: inset 0px 1px 4px rgba(0, 0, 0, .3);
      border-top: 6px solid var(--color-second-dark);
      overflow: hidden;
    }

    #section-label {
      position: relative;
      display: inline-block;
      padding: calc(1.2rem + 6px) 3rem 1.2rem;
      background-color: var(--color-second-dark);
      color: #fff;
      box-sizing: border-box;
      font-size: 1.8rem;
      font-family: 'Ubuntu', sans-serif;
      font-weight: 400;
      border-radius: 10px 10px 0 0;
    }

    #default {
      height: 30vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.8rem;
    }

    @media screen and (max-width: 1024px) {
      :host {
        width: 100%;
      }
    }
  </style>
  <div id="section-label"></div>
  <section id="section-container">
    <slot><div id="default">T.B.A</div></slot>
  </section>
  `

customElements.define('my-section',
  /**
   * Custom element my-section.
   *
   **/
  class extends HTMLElement {
    /**
     * Attach open shadow-dom.
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.shadowRoot.querySelector('#section-label').textContent = this.getAttribute('label') ? this.getAttribute('label') : 'Label'
    }
  })
