import debounce from "./debounce.js"
export default class Slide {
constructor(slide, wrapper){
  this.slide = document.querySelector(slide)
  this.wrapper = document.querySelector(wrapper)
  this.distancia = {
    posicaoFinal: 0,
    inicioX: 0,
    movimento: 0
  }
  this.ativoClasse = 'ativa'
}

transition(ativo){
  this.slide.style.transition = ativo ? 'transform .5s' : ''
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
  let tipoMovimento;
  if (e.type === 'mousedown'){
    e.preventDefault()
    this.distancia.inicioX = e.clientX
    tipoMovimento = 'mousemove'
  }else{
    this.distancia.inicioX = e.changedTouches[0].clientX
    tipoMovimento = 'touchmove'
  }
  this.wrapper.addEventListener(tipoMovimento, this.movendo)
  this.transition(false)
}

movendo(e){
  const posicaoPointer = (e.type === 'mousemove') ? e.clientX : e.changedTouches[0].clientX; 
  const ultimaPosicao = this.atualizandoPosicao(posicaoPointer)
  this.movendoSlide(ultimaPosicao)
}

terminandoMover(e){
  const tipoMovimento = (e.type === 'mouseup') ? 'mousemove' : 'touchmove'
  this.wrapper.removeEventListener(tipoMovimento, this.movendo)
  this.distancia.posicaoFinal = this.distancia.movimentoPosicao
  this.transition(true)
  this.changeSlideNoFinal()
}

changeSlideNoFinal(){
  if(this.distancia.movimento > 120 && this.index.next !== null){
    this.ativoSlideProximo()
  }else if(this.distancia.movimento < 120 && this.index.prev !== null){
    this.ativoSlideAnterior()
  } else{
    this.chageSlide(this.index.active)
  }
  console.log(this.distancia.movimento)
}

addEventoSlide(){
  this.wrapper.addEventListener('mousedown', this.comeco)
  this.wrapper.addEventListener('touchstart', this.comeco)
  this.wrapper.addEventListener('mouseup', this.terminandoMover)
  this.wrapper.addEventListener('touchend', this.terminandoMover)
}

//Configuração de Slides
slidePosition(slide){
  const margin = (this.wrapper.offsetWidth - slide.offsetWidth)/ 2
  return -(slide.offsetLeft - margin)
}

slideConfig(){
  this.slideArray = [...this.slide.children].map((element) => {
    const posicao = this.slidePosition(element)
    return {
      posicao,
      element
    }
  })
}

slideIndexNavegacao(index){
  const ultimo = this.slideArray.length - 1
  this.index ={
    prev: index ? index - 1 : null,
    active: index,
    next: index === ultimo ? null : index + 1
  }
}

chageSlide(index){
  const slideAtivo = this.slideArray[index]
  this.movendoSlide(slideAtivo.posicao)
  this.slideIndexNavegacao(index)
  this.distancia.posicaoFinal = slideAtivo.posicao
  this.changeAtivoClasse()
}

changeAtivoClasse(){
  this.slideArray.forEach(item => item.element.classList.remove(this.ativoClasse))
  this.slideArray[this.index.active].element.classList.add(this.ativoClasse)
}

ativoSlideAnterior(){
  if(this.index.prev !== null){
    this.chageSlide(this.index.prev)
  }
}

ativoSlideProximo(){
  if(this.index.next !== null){
    this.chageSlide(this.index.next)
  }
}

seAcontecerResize(){
  setTimeout(() =>{
    this.slideConfig()
    this.chageSlide(this.index.active)
  }, 500)
}

addResizeEvento(){
  window.addEventListener('resize', this.seAcontecerResize)
}

bindEventos() {
  this.comeco = this.comeco.bind(this)
  this.movendo = this.movendo.bind(this)
  this.terminandoMover = this.terminandoMover.bind(this)
  this.seAcontecerResize = debounce(this.seAcontecerResize.bind(this), 200)
}

  init(){
    this.bindEventos()
    this.transition(true)
    this.addEventoSlide()
    this.slideConfig()
    this.addResizeEvento()
    return this
  }
}