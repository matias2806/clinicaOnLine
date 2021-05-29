export class Dia {
    public trabaja:boolean=true;
    public dia:string="";
    public inicia:number=8;
    public finaliza:number=14;
    public inicioRange?:any=8;
    public finalizaRange?:any=19;

    constructor (trabaja:boolean, dia:string, inicia:number,finaliza:number){
        this.trabaja=trabaja;
        this.dia=dia;
        this.inicia=inicia;
        this.finaliza=finaliza;
    }
    
}
