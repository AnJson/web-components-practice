# mFm - My Favourite Movies

## Syfte

Syftet med mFm är att inspirera och få inspiration om filmer. Användaren ska kunna spara sina favoritfilmer i en lista och ge dem eget betyg. Användaren ska även kunna se sina vänners favoritfilmer och deras betyg. Det ska också finnas en topplista från imdb och sökmöjlighet mot imdb:s api.

## Filstruktur, Workflow och Kodstandard

### Filstruktur

Endast __en__ _.html_-fil används och den ligger i _src_-mappen. 

_Javascript_-filer ligger i _js_-mappen och där hittas ingångsfilen(`index.js`) för projektet. Alla web-komponenter ligger i _components_-mappen där en mapp för varje komponent skapas. I komponentens mapp skapas komponenten i en fil som heter `index.js`, skulle komponenten byggas upp av fler mindre komponenter så skapas dessa i egna filer i samma mapp och importeras till komponentens `index.js`.

_Css_ för respektive komponent skrivs i web-komponenten och endast en global css-fil finns i _css_-mappen.

### Workflow

_Collaborators_ jobbar individuellt i branches som döps efter standarden _name/feature_, tex _anders/loader_.
När utvecklaren är nöjd med sin _feature_ och anser den vara klar görs en _Pull request_ på _github.com_ där man väljer en eller fler personer som får göra en _review_ och bedöma om pull request ska godkännas, justeras eller avvisas. Det räcker att __en__ person gör en _review_ men genom att kryssa i fler personer för review kan vem som helst av dessa göra den.

### Kodstandard

Projektet följer kursen kodstandarden för _1dv025_ och använder lint för att säkerställa att den följs.


## Kravspecifkation

Siten ska (minst) uppfylla följande krav:

1. En top-25 lista för ___filmer___ från imdb baserat på imdbs rating. Denna ska visa _thumbnail-image_, titel, år och rating. Man ska även kunna lägga till/ta bort filmen i _favoritlistan_.
2. Det ska finnas en favorit-lista där mina markerade favoritfilmer visas. Denna lista ska visa _thumbnail-image_, titel, år, imdb-rating och _min egen rating_.
3. _Min egen rating_ ska illustreras (ex en stapel/bar/cirkel) där användaren kan öka(fylla i) eller minska ifyllnaden i illustrationen genom knappar.
4. En sökfunktion där sökning av filmer görs mot imdbs-api och visar resultaten i en lista med _thumbnail-image_, titel, år, imdb-rating och möjligheten att lägga till filmen i _favoritlistan_.

__Kraven på projektet är grundläggande krav, att utveckla fler funktioner för de olika komponenterna uppmuntras!__


## Grafisk profil och design

### CSS

I _global.css_ sätts projektets globala inställningar för css.

_font-size_ är inställd globalt på 10px och i komponenter används enheten ___rem___ för att att ge en responsiv storlek på tex _text_, _marginaler_, _padding_, _width_ osv.

_font-family_ sätts även det till standard i _global.css_.

_box-sizing_ är inställd globalt på _border-box_ och alla element i _body_ ärver denna inställning.

### Färger

Bakgrundsfärg på sidan är: rgb(255, 255, 255) / #FFFFFF

Textfärg på brödtext mot vit bakgrund: rgb(46, 46, 46) / #2E2E2E

Textfärg på större rubriker mot vit bakgrund: rgb(110, 113, 119) / #6E7177

Textfärg på brödtext mot mörk bakgrund: rgb(255, 255, 255) / #FFFFFF

Profilens identitet och grundfärg är: rgb(58, 194, 238) / #3AC2EE

Accentfärg som används för att betona är: rgb(255, 175, 97) / #FFAF61

### Typografi

Rubriker (h1-h4) har typsnittet _Ubuntu_ och _font-weight: 600_.

Brödtext (p, ul, ol, dl) har typsnittet _Crimson Text_ och _font-weight: 400_.


## Teknisk specifikation

Sidan är en single-page-application (SPA) som innebär att det endast finns __en__ _.html_-fil där innehållet renderas dynamiskt med hjälp av javascript.

Innehållet ska byggas upp av återanvändbara _web-components_.
