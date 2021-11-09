const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .black {
      color: #000;
    }

    .red {
      color: rgb(182, 31, 31);
    }

    #card {
      font-size: 10px;
      position: relative;
      perspective: 100em;
      -moz-perspective: 100em;
      height: 30em;
      width: 20em;
      box-sizing: border-box;
    }

    .card-side {
      position: absolute;
      top: 0;
      left: 0;
      height: 30em;
      width: 100%;
      transition: all 1s ease;
      backface-visibility: hidden;
      border-radius: 3px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, .5);
      box-sizing: border-box;
      transform-origin: 50% 50%;
    }

    .card-side--front {
      background-color: #fff;
      transform: rotateY(180deg)
    }

    .card-side--front::after {
      content: "";
      position: absolute;
      top: 6em;
      left: 5em;
      width: calc(100% - 10em);
      height: calc(100% - 12em);
      background-color: rgb(255, 236, 202);
      border-radius: 3px;
    }

    .rank {
      position: absolute;
      display: flex;
      align-items: center;
      line-height: 1;
    }

    #top-rank {
      top: 1.5em;
      left: 1.5em;
    }

    #bottom-rank {
      bottom: 1.5em;
      right: 1.5em;
      transform: rotate(180deg);
    }

    .rank__suit {
      fill: currentColor;
      height: 3em;
      width: 3em;
      backface-visibility: hidden;
    }

    .rank__rank-value {
      font-size: 3.5em;
    }

    .card-side--back {
      background-color: #fff;
      padding: 1em;
      cursor: pointer;
    }

    .card-side--back::after {
      content: "";
      position: absolute;
      top: 1em;
      left: 1em;
      width: calc(100% - 2em);
      height: calc(100% - 2em);
      background-color: rgb(26, 40, 58);
      border-radius: 3px;
    }

    .reveal-front {
      transform: rotateY(0)
    }

    .hide-back {
      transform: rotateY(-180deg)
    }

    .slide-card {
      animation: slide-card .8s forwards;
    }

    @keyframes slide-card {
      50% {
        transform: translateX(50%)
      },
      100% {
        transform: translateX(0)
      }
    }

  </style>
  <div id="card">
    <div class="card-side card-side--front">
      <div class="rank" id="top-rank">
        <span class="rank__rank-value"></span>
        <svg class="rank__suit">
          <use class="rank__svg" />
        </svg>
      </div>
      <div class="rank" id="bottom-rank">
        <span class="rank__rank-value"></span>
        <svg class="rank__suit">
          <use class="rank__svg" />
        </svg>
      </div>
    </div>
    <div class="card-side card-side--back">
    </div>
  </div>
  `

customElements.define('my-playing-card',
  /**
   * Custom element my-playing-card.
   *
   **/
  class extends HTMLElement {
    /**
     * Card-side--back element.
     */
    #cardBack

    /**
     * Card-side--front element.
     */
    #cardFront

    /**
     * Node-list of div-elements containing rank and suit.
     */
     #rankContainers

    /**
     * Node-list of span-elements to show rank.
     */
    #rankValueElements

    /**
     * Node-list of svg-elements for suit.
     */
    #suitElements

    /**
     * Node-list of use-elements inside svg-tags.
     */
    #useElements

    /**
     * Rank of card.
     */
    #rank

    /**
     * Suit of card.
     */
    #suit

    /**
     * Create instance of my-playing-card and attach shadowDOM.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#cardBack = this.shadowRoot.querySelector('.card-side--back')
      this.#cardFront = this.shadowRoot.querySelector('.card-side--front')
      this.#rankContainers = this.shadowRoot.querySelectorAll('.rank')
      this.#rankValueElements = this.shadowRoot.querySelectorAll('.rank__rank-value')
      this.#suitElements = this.shadowRoot.querySelectorAll('.rank__suit')
      this.#useElements = this.shadowRoot.querySelectorAll('.rank__svg')
    }

    /**
     * Set event-listeners, rank and suit.
     */
    connectedCallback () {
      this.#cardBack.addEventListener('click', () => {
        this.#flipCard()
      }, { once: true })

      this.#setSuit(this.getAttribute('suit'))
      this.#setRank(this.getAttribute('rank'))
    }

    /**
     * Flip the card to reveal the front-side.
     */
    #flipCard () {
      const card = this.shadowRoot.querySelector('#card')
      const front = this.shadowRoot.querySelector('.card-side--front')
      const back = this.shadowRoot.querySelector('.card-side--back')

      card.classList.add('slide-card')
      back.classList.add('hide-back')
      front.classList.add('reveal-front')
    }

    /**
     * Set suit-field.
     *
     * @param {string} suit - Suit of the card.
     */
    #setSuit (suit) {
      const formattedSuit = suit.toLowerCase()
      if (formattedSuit === 'clubs' || formattedSuit === 'spades') {
        // Set the color to black and set the path to the correct svg.
        this.#rankContainers.forEach(element => element.classList.add('black'))
        this.#useElements.forEach(element => element.setAttribute('href', new URL(`../src/my-random-card/lib/svg/symbol-defs.svg#icon-${formattedSuit}`, import.meta.url)))
      } else if (formattedSuit === 'hearts' || formattedSuit === 'diamonds') {
        // Set the color to black and set the path to the correct svg.
        this.#rankContainers.forEach(element => element.classList.add('red'))
        this.#useElements.forEach(element => element.setAttribute('href', new URL(`../src/my-random-card/lib/svg/symbol-defs.svg#icon-${formattedSuit}`, import.meta.url)))
      }
    }

    /**
     * Set rank-field.
     *
     * @param {number} rank - Rank of the card.
     */
    #setRank (rank) {
      if (!Number.isNaN(Number(rank)) && Number.isInteger(Number(rank)) && (Number(rank) > 0 && Number(rank) < 15)) {
        switch (Number(rank)) {
          case 1:
            this.#rank = 'A'
            break
          case 11:
            this.#rank = 'J'
            break
          case 12:
            this.#rank = 'D'
            break
          case 13:
            this.#rank = 'K'
            break
          default:
            this.#rank = rank
        }
      }

      this.#rankValueElements.forEach(element => {
        element.textContent = this.#rank
      })
    }
  })
