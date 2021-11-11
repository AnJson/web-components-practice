import './my-follow-game-tile/'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      font-size: 10px;
    }

    #board {
      padding: 2rem 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: .5em;
    }
  </style>
  <div id="board">
    
  </div>
`

customElements.define('my-follow-game-board',
  class extends HTMLElement {
    #content
    #tilesArray
    #pattern
    #clickCount = 0
    #level = 1

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#content = this.shadowRoot.querySelector('div')
      this.#tilesArray = this.#addTiles()
    }

    connectedCallback () {
      this.shadowRoot.addEventListener('selected-tile', event => {
        this.isCorrectTile(event.detail.id)
        this.#incrementClick()
      })

      this.#tilesArray.forEach(element => this.#content.appendChild(element))
    }

    isCorrectTile (id) {
      console.log(id === this.#pattern[this.#clickCount])
    }

    #incrementClick () {
      this.#clickCount += 1
    }

    #addTiles () {
      const array = []
      for (let i = 0; i < 16; i++) {
        const tile = document.createElement('my-follow-game-tile')
        tile.id = i

        array.push(tile)
      }

      return array
    }
  })
