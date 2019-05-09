import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {

  constructor() { }

  calendarPlugins = [dayGridPlugin, timeGridPlugin];
  header = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridWeek'
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

  minTimeEmpresa = "08:00";
  maxTimeEmpresa = "22:00";

  ngOnInit() {
  }

}
