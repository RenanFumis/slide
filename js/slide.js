export default class Slide{
constructor(slide, wrapper){
  this.slide = document.querySelector(slide)
  this.wrapper = document.querySelector(wrapper)

}

comeco(e){
  e.preventDefault()
 
  this.wrapper.addEventListener('mousemove', this.movendo)
}

movendo(e){
 
}

terminandoMover(e){
  this.wrapper.removeEventListener('mousemove', this.movendo)
 
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