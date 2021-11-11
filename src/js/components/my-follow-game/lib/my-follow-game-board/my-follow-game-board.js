import './lib/my-follow-game-tile/'
import './lib/my-follow-game-button/'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: flex;
      padding: 2em 0;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-family: sans-serif;
    }

    p {
      font-size: 2em;
    }

    #board {
      width: 35em;
      height: 31em;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: .5em;
    }
  </style>
  <div id="board">
    
  </div>
  <p id="message">Play the follow-game!</p>
  <my-follow-game-button id="button"></my-follow-game-button>
`

customElements.define('my-follow-game-board',
  class extends HTMLElement {
    #boardElement
    #messageElement
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
      this.#buttonElement = this.shadowRoot.querySelector('#button')
      // this.#tilesArray = this.#addTiles()
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
        this.#initRound()
      })

      this.#buttonElement.setAttribute('text', `Start round ${this.#level}`)
    }

    isCorrectTile (id) {
      if (id !== this.#pattern[this.#clickCount]) {
        this.#messageElement.textContent = 'NOOOOOOO! Try again!'
        this.#resetGame()

        setTimeout(() => {
          this.#messageElement.textContent = 'Play the follow-game!'
          this.#buttonElement.setAttribute('text', `Start round ${this.#level}`)
          this.#buttonElement.removeAttribute('disabled')
        }, 1500)
      }

      if (this.#clickCount === this.#pattern.length - 1) {
        this.#levelUp()
      }
    }

    #incrementClick () {
      this.#clickCount += 1
    }

    #addTiles () {
      const array = []
      for (let i = 0; i < 9; i++) {
        const tile = document.createElement('my-follow-game-tile')
        tile.id = i

        array.push(tile)
      }

      return array
    }

    #addTilesToBoard () {
      while (this.#boardElement.lastChild) {
        this.#boardElement.removeChild(this.#boardElement.lastChild)
      }

      this.#tilesArray.forEach(element => this.#boardElement.appendChild(element))
    }

    #setPattern () {
      for (let i = 0; i < this.#level; i++) {
        const index = Math.floor(Math.random() * this.#tilesArray.length)
        this.#pattern.push(index)
      }
    }

    #signalPattern (id = 0) {
      const tilesId = this.#pattern[id]

      this.#tilesArray[tilesId].setAttribute('highlight', true)
    
      const nextId = id + 1

      if (nextId < this.#pattern.length) {
        setTimeout(() => {

          this.#signalPattern(nextId)
        }, 1500)
      }

      if (nextId === this.#level) {
        setTimeout(() => {
          this.#startPlayersTurn()
        }, 1500)
      }
    }

    #startPlayersTurn () {
      this.#messageElement.textContent = 'Follow!'
      this.#playersTurn = true
    }

    #initRound () {
      this.#tilesArray = this.#addTiles()
      this.#addTilesToBoard()

      this.#buttonElement.setAttribute('disabled', true)
      this.#messageElement.textContent = 'Watch!'
      this.#clickCount = 0

      this.#setPattern()
      setTimeout(() => {
        this.#signalPattern()
      }, 1500)
    }

    #resetGame () {
      this.#pattern.length = 0
      this.#level = 1
      this.#playersTurn = false
    }

    #levelUp () {
      this.#level += 1
      this.#pattern.length = 0
      this.#playersTurn = false
      this.#messageElement.textContent = 'CORRECT!'

      setTimeout(() => {
        this.#buttonElement.setAttribute('text', `Start round ${this.#level}`)
        this.#buttonElement.removeAttribute('disabled')
      }, 1000)
    }
  })
