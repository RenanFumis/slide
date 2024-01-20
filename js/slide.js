export default class Slide {
constructor(slide, wrapper){
  this.slide = document.querySelector(slide)
  this.wrapper = document.querySelector(wrapper)
  this.distancia = {
    posicaoFinal: 0,
    inicioX: 0,
    movimento: 0
  }
}

  movendoSlide(distanciaX){
    this.distancia.movimentoPosicao = distanciaX
    this.slide.style.transform = `translate3D(${distanciaX}px, 0px, 0px)`
  }

atualizandoPosicao(clientX){
  this.distancia.movimento = (this.distancia.inicioX - clientX)* 1.6
  return this.distancia.posicaoFinal - this.distancia.movimento
}

comeco(e){
  e.preventDefault()
  this.distancia.inicioX = e.clientX
  this.wrapper.addEventListener('mousemove', this.movendo)
}

movendo(e){
  const ultimaPosicao = this.atualizandoPosicao(e.clientX)
  this.movendoSlide(ultimaPosicao)
}

terminandoMover(e){
  this.wrapper.removeEventListener('mousemove', this.movendo)
  this.distancia.posicaoFinal = this.distancia.movimentoPosicao
 
}

addEventoSlide(){
  this.wrapper.addEventListener('mousedown', this.comeco)
  this.wrapper.addEventListener('mouseup', this.terminandoMover)
  
}

bindEventos() {
  this.comeco = this.comeco.bind(this)
  this.movendo = this.movendo.bind(this)
  this.terminandoMover = this.terminandoMover.bind(this)

}


init(){
  this.bindEventos()
  this.addEventoSlide()
  return this
}

}