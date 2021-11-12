const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      font-size: 10px;
    }

    #tile {
      width: 10em;
      height: 10em;
      cursor: pointer;
      transition: opacity .2s;
      box-sizing: border-box;
    }

    .selected {
      box-shadow: 0px 2px 6px rgba(0, 0, 0, .8);
    }
  </style>
  <div id="tile"></div>
`

customElements.define('my-follow-game-tile',
  class extends HTMLElement {
    #color
    #tileElement
    #selectedTileEvent
    #id

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#tileElement = this.shadowRoot.querySelector('#tile')
      this.#color = this.#setBaseColor()
    }

    static get observedAttributes () {
      return ['highlight']
    }

    attributeChangedCallback (name, oldVal, newVal) {
        if (name === 'highlight') {
          if (newVal) {
            this.highlightTile()
          }
        }
    }

    connectedCallback () {
      this.shadowRoot.addEventListener('click', () => {
        this.selectTile()
      })

      this.#selectedTileEvent = new CustomEvent('selected-tile', {
        bubbles: true,
        detail: {
          id: this.#id
        }
      })

      this.colorizeTile()
    }

    set id (value) {
      if (Number.isInteger(Number(value))) {
        this.#id = value
      }
    }

    get id () {
      return this.#id
    }

    selectTile () {
      this.dispatchEvent(this.#selectedTileEvent)
    }

    colorizeTile () {
      this.#tileElement.style.backgroundColor = `rgba(${this.#color[0]}, ${this.#color[1]}, ${this.#color[2]}, .3)`
    }
    
    highlightTile () {
      this.#tileElement.style.backgroundColor = `rgba(${this.#color[0]}, ${this.#color[1]}, ${this.#color[2]}, 1)`
      
      this.#tileElement.classList.toggle('selected')
      setTimeout(() => {
        this.#tileElement.style.backgroundColor = `rgba(${this.#color[0]}, ${this.#color[1]}, ${this.#color[2]}, .3)`

        this.#tileElement.classList.toggle('selected')
      }, 800)
    }
    
    #setBaseColor () {
      const hexColor = Math.floor(Math.random() * 0x2000000).toString(16).padStart(6, '0').match(/.{1,2}/g)
      const rgb = [Number.parseInt(hexColor[0], 16), Number.parseInt(hexColor[1], 16), Number.parseInt(hexColor[2], 16)]

      return rgb
    }
  })
