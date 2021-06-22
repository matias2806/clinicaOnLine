import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as ChartJs from 'chart.js';
import { chart } from 'highcharts';


@Component({
  selector: 'app-page-graficos',
  templateUrl: './page-graficos.component.html',
  styleUrls: ['./page-graficos.component.scss']
})
export class PageGraficosComponent implements OnInit, AfterViewInit {



  @ViewChild('myCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  public context: any;
  // private contexto!: CanvasRenderingContext2D;

  aux: Chart | any;
  chart: any = [];
  myctx: any;


  options = {};

  datos = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };



  DATA_COUNT = 5;
  NUMBER_CFG = { count: this.DATA_COUNT, min: 0, max: 100 };

  data3 = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        // data: Utils.numbers(this.NUMBER_CFG),
        data: [2, 5, 77, 5, 3],
        // backgroundColor: Object.values(Utils.CHART_COLORS),
        backgroundColor: Object.values(['#4dc9f6',
          '#f67019',
          '#f53794',
          '#537bc4',
          '#acc236',
          '#166a8f',
          '#00a950',
          '#58595b'])
      }
    ]
  };

  config = {
    type: 'pie',
    data: this.data3,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Pie Chart'
        }
      }
    },
  };



  constructor() {
    
  }

  ngAfterViewInit(): void {


    // throw new Error('Method not implemented.');
    // console.log(typeof(this.canvasRef));
    // this.context = this.canvasRef.nativeElement.getContext('2d');
    // console.log(typeof(this.context));

    // console.log(this.canvasRef);
    // console.log(this.context);

    // this.chart = new Chart(this.context, {
    //   type: 'pie',
    //   data: this.datos,
    //   options: this.options,
    // });
  }

  async ngOnInit() {
    this.chart = new Chart(this.context, {
      type: 'pie',
      data: this.data3,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Pie Chart'
          }
        }
      },
    });
  }


  grafico(numero: number) {
    // console.log("ENTRO");
    // console.log(typeof(this.aux));
    // console.log(typeof(this.canvasRef));
    // this.chart = new Chart(this.myctx, {
    //   type: "pie",
    //   data: this.datos,
    //   options: this.options,
    // });



    //NO ENTRA AL IF POR EL UNDEFINED
    // this.cargarGrafico1();
    // if (this.canvasRef != undefined) {
    //   console.log("PASA");
    //   this.myctx = this.canvasRef.nativeElement.getContext('2d');
    //   console.log(this.canvasRef);

    //   this.chart = new Chart(this.myctx, {
    //     type: "pie",
    //     data: this.datos,
    //     options: {
    //       scales: {
    //         x: {
    //           type: 'linear'
    //         },
    //         y: {
    //           type: 'linear'
    //         }
    //       }
    //     }
    //   });
    //   console.log(this.chart);
    // }
  }

  cargarGrafico1() {
    // console.log(this.chart);
    // if (this.canvasRef != undefined) {
    //   this.myctx = this.canvasRef.nativeElement.getContext('2d');

    // }
    // // var ctx = document.getElementById("gráfico").getContext("2d");
    // this.chart = new Chart(this.myctx, {
    //   type: 'pie',
    //   data: this.datos,
    //   options: {
    //     responsive: true,
    //     plugins: {
    //       legend: {
    //         position: 'top',
    //       },
    //       title: {
    //         display: true,
    //         text: 'Chart.js Pie Chart'
    //       }
    //     }
    //   },
    // });

    // console.log(this.chart);




    // this.chart = new Chart('prueba',{
    //   type:'pie',
    //   data:this.datos,
    // });
    // console.log(this.chart);
  }



}
