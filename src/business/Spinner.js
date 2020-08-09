/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Spinner {
  static show () {
    const screenLayout = document.createElement('div')
    screenLayout.id = 'screen-layout'
    document.body.appendChild(screenLayout)

    const frameLayout = document.createElement('div')
    frameLayout.setAttribute('class', 'frame-layout')
    frameLayout.innerHTML = `
        <div class="redirectMessage">
            <div class="spinner">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
            </div>
        </div>
`
    document.body.appendChild(frameLayout)
  }

  static hide () {
    const frameLayout = document.querySelector('.frame-layout')
    document.body.removeChild(frameLayout)
    const screenLayout = document.querySelector('#screen-layout')
    document.body.removeChild(screenLayout)
  }
}

export default Spinner
