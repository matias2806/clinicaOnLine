import { Directive, ElementRef, OnInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMostrarEstado]'
})
export class MostrarEstadoDirective {

  constructor(private el: ElementRef) { }

  
  @Input() colorBase!: string;
  @Input('appMostrarEstado')resaltarColor: string | undefined;

  ngOnInit() {
    
    this.resaltar()
  }

  private resaltar(): void {
    
    if(this.resaltarColor == "PENDIENTE"){
      this.el.nativeElement.style.backgroundColor = '#D9F146'; //amarillo
      console.log(this.resaltarColor, " Amarillo");
    }
    if(this.resaltarColor == "CANCELADO"){
      this.el.nativeElement.style.backgroundColor = '#de2837'; //rojo
      console.log(this.resaltarColor, " rojo");
    }
    if(this.resaltarColor == "ACEPTADO"){
      this.el.nativeElement.style.backgroundColor = '#3f9121'; //verde
      console.log(this.resaltarColor, " verde");
    }
    if(this.resaltarColor == "FINALIZADO"){
      this.el.nativeElement.style.backgroundColor = '#8F5FEF'; //lila
      console.log(this.resaltarColor, " lila");
    }
    else{
      this.el.nativeElement.style.backgroundColor = '#EF5F9C'; //rosa
      console.log(this.resaltarColor, " rosa");
    }
  }
}
