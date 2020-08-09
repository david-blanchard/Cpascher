class Promo {
  static showPopin () {
    const screenLayout = document.createElement('div')
    screenLayout.id = 'screen-layout'
    document.body.appendChild(screenLayout)

    const frameLayout = document.createElement('div')
    frameLayout.setAttribute('class', 'frame-layout')
    frameLayout.innerHTML =
            `
    <div class="popin-box">
        <div id="close"><a id="closePopinCta" href="#">X</a></div>
        <div id="banner-message">
            <p>
            Merci d'avoir accepté les cookies !
            </p>
            <p>
            Une offre exceptionnelle* vous attends sur la <strong>Collection&nbsp;Henri&nbsp;Potier</strong> !
            </p>

            <button id="gotItCta" class="popin-cta go" >J'en profite</button>

            <p style="font-size:smaller;">
                * Offre non cumulable, dans la limite des stocks disponibles.
            </p>
        </div>
    
    </div>
`
    document.body.appendChild(frameLayout)

    const gotItCta = document.querySelector('#gotItCta')
    gotItCta.onclick = function () {
      Promo.removePopin()
      window.location.href = 'search?q=potier'
    }

    const closePopinCta = document.querySelector('#closePopinCta')
    closePopinCta.onclick = function () {
      Promo.removePopin()
    }
  }

  static removePopin () {
    const frameLayout = document.querySelector('.frame-layout')
    document.body.removeChild(frameLayout)
    const screenLayout = document.querySelector('#screen-layout')
    document.body.removeChild(screenLayout)
  }
}

export default Promo
