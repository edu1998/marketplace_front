import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { EmpresaService } from 'src/app/_servicios/empresa/empresa.service';
import { Observable, identity } from 'rxjs';
import { MatCheckboxChange, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatListItem, MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material';
import { CitasService } from 'src/app/_servicios/citas/citas.service';

@Component({
  selector: 'app-elegir-servicios',
  templateUrl: './elegir-servicios.component.html',
  styleUrls: ['./elegir-servicios.component.css']
})
export class ElegirServiciosComponent implements OnInit {

  @Input('idEmpresa') idEmpresa: number;
  @Output('serviciosAgregados') Servicios = new EventEmitter<any>();

  constructor(
    private empresaSer: EmpresaService,
    public dialog: MatDialog
  ) {

  }
  serviciosObservable: Observable<any>;
  serviciosAgragados: Array<any>;

  getServicios() {
    this.serviciosObservable = this.empresaSer.getServicios(this.idEmpresa)
  }

  selectServices(servcio: MatCheckboxChange) {
    if (servcio.checked) {
      if (!this.serviciosAgragados.length) {
        this.serviciosAgragados.push(servcio.source.value);
        this.openDialog(servcio.source.value['id'])
        this.Servicios.emit(this.serviciosAgragados)
      } else {
        const result = this.serviciosAgragados.filter(ser => ser.id === servcio.source.value['id']);
        if (!result.length) {
          this.serviciosAgragados.push(servcio.source.value);
          this.Servicios.emit(this.serviciosAgragados)
          this.openDialog(servcio.source.value['id'])
        }
      }
    } else {
      for (let i = 0; i < this.serviciosAgragados.length; i++) {
        if (this.serviciosAgragados[i].id === servcio.source.value['id']) {
          this.serviciosAgragados.splice(i, 1);
          this.Servicios.emit(this.serviciosAgragados)
          break
        }
      }

    }
  }

  openDialog(idServicio): void {
    const dialogRef = this.dialog.open(empleadosServicios, {
      width: '450px',
      data: { idServicio },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.serviciosAgragados[this.serviciosAgragados.length - 1].empleado = result.id
      console.log(this.serviciosAgragados);
      
    });
  }

  ngOnInit() {
    this.serviciosAgragados = [];
    (this.idEmpresa) ? this.getServicios() : null;
  }

}

@Component({
  selector: 'app-empleados-servicios',
  templateUrl: './empleados-servicios.html'
})
export class empleadosServicios {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private citaService: CitasService
  ) {
  }

  empleadoSelect: any = false


  public empleadosPorServicio: Array<any>

  onNoClick(): void {
    this.dialogRef.close(this.empleadoSelect);
  }

  getEmpleaodosPorServicio() {
    this.citaService.getEmpleadosPorServicio(this.data.idServicio).subscribe(
      {
        next: (data) => {
          this.empleadosPorServicio = data;
        }
      }
    )
  }
  handleSelection(event: MatSelectionListChange) {
    if (event.option.selected) {
      this.empleadoSelect = event.source.selectedOptions.selected[0].value;
      event.source.deselectAll();
      event.option._setSelected(true);

    }
  }
  ngOnInit(): void {
    this.getEmpleaodosPorServicio();
  }

}