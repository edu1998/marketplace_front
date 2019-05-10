import { Component, OnInit, Input, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import * as moment from 'moment';
import { EmpresaService } from 'src/app/_servicios/empresa/empresa.service';
import { MatSnackBar } from '@angular/material';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {

  @Input('idEmpresa') id_empresa: number;
  @Input('eventos') eventos: Array<any>;

  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;

  constructor(
    private empresaSer: EmpresaService,
    private snackbar: MatSnackBar
  ) {
  }

  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  header = {
    left: 'prev,next today',
    center: 'title',
  }

  buttonText = {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Dia',
    list: 'lista'
  }

  views: {
    dayGrid: {}, timeGrid: {}, week: {}, day: {}
  }

  minTimeEmpresa: string;
  maxTimeEmpresa: string;

  validRange = {
    start: moment().add(1, 'day').format('YYYY-MM-DD'),
    end: moment().add(6, 'day').format('YYYY-MM-DD')
  }

  event: EventInput[];

  infoEmpresaGeneral() {
    this.empresaSer.getInfoGeneral(this.id_empresa).subscribe(data => {
      this.minTimeEmpresa = data.h_apertura;
      this.maxTimeEmpresa = data.h_cierre;
    })
  }

  añadido: boolean;

  handleDateClick(arg, full: FullCalendarComponent) {
    if (!this.añadido) {
      if (this.eventos.length) {
        this.añadido = true;
        const start = moment(arg.dateStr)['_i'];
        const end = moment(start).add(this.addEndEvent(), 'm')
        this.event = this.event.concat({
          title: 'My cita',
          start: moment(start).format('YYYY-MM-DDThh:mm:ss'),
          end: `${moment(end).format('YYYY-MM-DDThh:mm:ss')}`
        })
        console.log(full);
      } else {
        this.snackbar.open('Por favor seleccione servicios', 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      }
    } else {
      this.snackbar.open('Evento añadido', 'Ok', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      })
    }
  }

  addEndEvent(): number {
    var total_duracion = 0;
    for (let i = 0; i < this.eventos.length; i++) {
      console.log(this.eventos[i].duracion_minutos);

      total_duracion += this.eventos[i].duracion_minutos;
    }
    return total_duracion

  }

  ngOnInit() {
    this.infoEmpresaGeneral();
    let m = moment().format('YYYY-MM-DDThh:mm:ss');
    this.event = [
      {
        title: 'Agregado',
        start: '2019-05-11T16:00:00',
        backgroundColor: '#d62121',
        color: '#d62121'
      },
    ];
  }

}
