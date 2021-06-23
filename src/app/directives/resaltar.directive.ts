import { Directive, ElementRef, OnInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {

  constructor(private el: ElementRef) { }

  @Input() colorBase!: string;
  @Input('appResaltar')resaltarColor: (boolean | undefined);
  
  ngOnInit() {
    // const aux = this.el.nativeElement;

    console.log(this.resaltarColor);

    this.resaltar(this.resaltarColor!);
  }

  private resaltar(color: boolean): void {
    if(color == true){
      this.el.nativeElement.style.backgroundColor = '#3f9121'; //verde
    }else{
      this.el.nativeElement.style.backgroundColor = '#de2837'; //rojo
    }
  }


}
