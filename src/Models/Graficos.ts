export class DatoGrafico {
    name: string;
    data: number[];

    constructor(name: string, data: number[]) {
        this.name = name;
        this.data = data;
    }
}


export class DatoGraficoPie {

    type = 'pie'
    name: string;
    data: any[] = [];

    constructor(name: string, y: number) {
        this.name = name;
        this.data.push({ name: name, y: y });
    }
}

export class DatoGrafico2 {
    type = 'pie';
    name: string;
    data: number[];

    constructor(name: string, data: number[]) {
        this.name = name;
        this.data = data;
    }
}


export class DatoGrafico3 {
    type = 'pie';
    name: string;
    data: auxiliar[];

    constructor(name: string, data: auxiliar[]) {
        this.name = name;
        this.data = data;
    }
}

export class auxiliar {

    name: string;
    y: number;

    constructor(name: string, y: number) {
        this.name = name;
        this.y = y;
    }
}