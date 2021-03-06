import { Component, OnInit, Input, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import * as moment from 'moment';
import { EmpresaService } from 'src/app/_servicios/empresa/empresa.service';
import { MatSnackBar } from '@angular/material';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import { CitasService } from 'src/app/_servicios/citas/citas.service';
import { idEmpresOCliente } from '../../_servicios/shared-function.service'
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {

  @Input('idEmpresa') id_empresa: number;
  @Input('idCliente') id_cliente: number;
  @Input('eventos') eventos: Array<any>;
  @Input('serviciosSeleccionados') serviciosSeleccionados: Array<any>;

  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;

  constructor(
    private empresaSer: EmpresaService,
    private snackbar: MatSnackBar,
    private citasService: CitasService,
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

  hiddenDay: Array<[number]>

  views: {
    dayGrid: {}, timeGrid: {}, week: {}, day: {}
  }

  minTimeEmpresa: string;
  maxTimeEmpresa: string;

  validRange = {
    start: moment().add(1, 'day').format('YYYY-MM-DD'),
    end: moment().add(9, 'day').format('YYYY-MM-DD')
  }

  event: EventInput[];

  infoEmpresaGeneral() {
    this.empresaSer.getInfoGeneral(this.id_empresa).subscribe(data => {
      this.hiddenDay = this.configDayHidden(data.dias_atencion)
      this.minTimeEmpresa = data.h_apertura;
      this.maxTimeEmpresa = data.h_cierre;
    })
  }

  anadido: boolean;

  handleDateClick(arg, full: FullCalendarComponent) {
    if (!this.anadido) {
      if (this.eventos.length) {
        const start = moment(arg.dateStr)['_i'];
        const end = moment(start).add(this.addEndEvent(), 'm');
        if (this.validRangeHour(end)) {
          this.anadido = true;
          this.event = this.event.concat({
            title: 'My cita',
            start: moment(start).format('YYYY-MM-DDTHH:mm:ss'),
            end: `${moment(end).format('YYYY-MM-DDTHH:mm:ss')}`,
            id_c: true,
          })
        } else {
          this.snackbar.open('Su cita excede el horario disponible', 'Ok', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          })
        }
      } else {
        this.snackbar.open('Por favor seleccione servicios', 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      }
    } else {
      this.snackbar.open('Evento anadido', 'Ok', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      })
    }
  }

  addEndEvent(): number {
    var total_duracion = 0;
    for (let i = 0; i < this.eventos.length; i++) {
      total_duracion += this.eventos[i].duracion_minutos;
      console.log(total_duracion);

    }
    return total_duracion
  }

  removeEvets() {
    this.event = this.event.filter(even => even.id_c != true);
    this.anadido = false;

  }

  saveCita() {
    let [myEvent]: any = this.event.filter(env => env.id_c === true);

    const dataCita = {
      fecha: myEvent.start,
      cliente_id: this.id_cliente,
      id_empresa: this.id_empresa,
      servicios: this.serviciosSeleccionados
    }

    this.citasService.saveCita(dataCita).subscribe({
      next: (data) => {
        this.event = [];
        this.anadido = false;
        this.citasService.getCitasAgendadas(this.id_empresa).subscribe(data => {
          console.log(data);

          this.event = this.event.concat(data);
        });
        this.snackbar.open('Cita reservada', 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      },
      error: (error: HttpErrorResponse) => {
        this.snackbar.open(error.error.messageError, 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })

  }

  validRangeHour(end) {
    const endEvent = moment(end).format('HH:mm:ss');
    if (endEvent > this.maxTimeEmpresa)
      return false
    else return true;


  }

  configDayHidden(dias) {
    let hiddenDay = [];
    for (const key in dias) {
      if (dias[key] !== true) {
        if (key === 'domingo') hiddenDay.push(0)
        if (key === 'lunes') hiddenDay.push(1)
        if (key === 'martes') hiddenDay.push(2)
        if (key === 'miercoles') hiddenDay.push(3)
        if (key === 'jueves') hiddenDay.push(4)
        if (key === 'viernes') hiddenDay.push(5)
        if (key === 'sabado') hiddenDay.push(6)
      }
    }
    return hiddenDay;
  }

  ngOnInit() {
    this.infoEmpresaGeneral();
    this.citasService.getCitasAgendadas(this.id_empresa).subscribe(data => {
      console.log(data);

      this.event = this.event.concat(data);
    });
    this.event = [];
  }

}
