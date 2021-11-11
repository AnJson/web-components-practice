import './lib/my-follow-game-tile/'
import './lib/my-follow-game-button/'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 10px;
      font-family: sans-serif;
    }

    p {
      font-size: 2em;
    }

    #board {
      padding: 2em 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: .5em;
    }
  </style>
  <div id="board">
    
  </div>
  <p id="message">Play the follow-game!</p>
  <p id="round-text"></p>
  <my-follow-game-button id="button"></my-follow-game-button>
`

customElements.define('my-follow-game-board',
  class extends HTMLElement {
    #boardElement
    #messageElement
    #roundElement
    #buttonElement
    #tilesArray
    #pattern = []
    #clickCount = 0
    #level = 1
    #playersTurn = false

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#boardElement = this.shadowRoot.querySelector('#board')
      this.#messageElement = this.shadowRoot.querySelector('#message')
      this.#roundElement = this.shadowRoot.querySelector('#round-text')
      this.#buttonElement = this.shadowRoot.querySelector('#button')
      this.#tilesArray = this.#addTiles()
    }

    connectedCallback () {
      this.shadowRoot.addEventListener('selected-tile', event => {
        if (this.#playersTurn) {
          this.#tilesArray[event.detail.id].setAttribute('highlight', true)
          this.isCorrectTile(event.detail.id)
          this.#incrementClick()
        }
      })

      this.shadowRoot.addEventListener('start-round', () => {
        this.#buttonElement.setAttribute('disabled', true)
        // Signal watching stage
        // Display Round: n
        this.#setPattern()
        const initialIndex = this.#tilesArray.indexOf(this.#tilesArray[this.#pattern[0]])
        this.#signalPattern(initialIndex)
      })

      this.#tilesArray.forEach(element => this.#boardElement.appendChild(element))
    }

    isCorrectTile (id) {
      // console.log(id === this.#pattern[this.#clickCount])
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

    #setPattern () {
      for (let i = 0; i < this.#level; i++) {
        const index = Math.floor(Math.random() * this.#tilesArray.length)
        this.#pattern.push(index)
      }
      console.log(this.#pattern)
    }

    #signalPattern (id) {
      this.#tilesArray[id].setAttribute('highlight', true)

      if (id < this.#level) {
        setTimeout(() => {
          const nextId = this.#tilesArray.indexOf(this.#pattern[++id])

          this.#signalPattern(nextId)
        }, 1500)
      }
    }
  })
