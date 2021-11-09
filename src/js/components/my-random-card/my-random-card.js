import { Deck } from './lib/Deck'
import { PlayingCard } from './lib/PlayingCard.js'
import './lib/my-deal-button/'
import './lib/my-playing-card/'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      height: 80vh;
    }

    #container {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 3rem 0;
    }

    .flip-in {
      animation: flip-in .4s;
    }

    @keyframes flip-in {
      0% {
        transform: translate(40em, -100em);
      }
      100% {
        transform: translate(0, 0) rotate(-360deg);
      }
    }
  </style>
  <div id="container">
    <my-deal-button id="deal-button" text="deal card"></my-deal-button>
    <div id="card-hand"></div>
  </div>
`

customElements.define('my-random-card',
  /**
   * Custom element my-random-card.
   *
   **/
  class extends HTMLElement {
    /**
     * Deck-array containing PlayingCards.
     *
     * @type {PlayingCard[]} - Array of PlayingCards.
     */
    #deck

    /**
     * Discarded-cards-array containing PlayingCards.
     *
     * @type {PlayingCard[]} - Array of PlayingCards.
     */
    #discardedCards = []

    /**
     * Cardhand-element.
     */
    #cardHand

    /**
     * Button-element.
     */
    #dealButton

    /**
     * Attach open shadow-dom.
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#deck = Deck.create()
      Deck.shuffle(this.#deck)

      this.#cardHand = this.shadowRoot.querySelector('#card-hand')
      this.#dealButton = this.shadowRoot.querySelector('#deal-button')
    }

    /**
     * Add event-listeners when element is connected to the DOM.
     */
    connectedCallback () {
      this.shadowRoot.addEventListener('deal-card', () => {
        this.#dealCard()
      })

      this.shadowRoot.addEventListener('reshuffle', () => {
        this.#reshuffleDeck()
      })
    }

    /**
     * Deal card to users hand.
     */
    #dealCard () {
      while (this.#cardHand.lastChild) {
        this.#cardHand.removeChild(this.#cardHand.lastChild)
      }

      const card = this.#deck.pop()
      this.#discardedCards.push(card)
      const cardElement = document.createElement('my-playing-card')
      cardElement.setAttribute('suit', card.suitName)
      cardElement.setAttribute('rank', card.rank)
      cardElement.classList.add('flip-in')
      this.#cardHand.appendChild(cardElement)

      if (!this.#deck.length) {
        this.#dealButton.setAttribute('empty', true)
      }
    }

    /**
     * Reshuffle discarded cards into the deck.
     */
    #reshuffleDeck () {
      this.#deck.push(...this.#discardedCards)
      this.#discardedCards.length = 0
      this.#dealButton.removeAttribute('empty')
    }
  })
