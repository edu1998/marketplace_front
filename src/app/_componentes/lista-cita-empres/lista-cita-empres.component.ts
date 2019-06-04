import { Component, OnInit, Inject } from '@angular/core';
import { CitasService } from 'src/app/_servicios/citas/citas.service';
import { Observable } from 'rxjs';
import { idEmpresOCliente } from '../../_servicios/shared-function.service'
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-lista-cita-empres',
  templateUrl: './lista-cita-empres.component.html',
  styleUrls: ['./lista-cita-empres.component.css']
})
export class ListaCitaEmpresComponent implements OnInit {

  constructor(
    private citasService: CitasService,
    private dialog: MatDialog
  ) { }

  public obsCitasEmpresa: Observable<any>

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'plus'];

  openDialog(info): void {
    const dialogRef = this.dialog.open(InfoCita, {
      width: '750px',
      data: { info},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("modal close");

    });
  }

  ngOnInit() {
    this.obsCitasEmpresa = this.citasService.getCitasEmpresa(idEmpresOCliente())
  }

}

@Component({
  selector: 'app-info-cita',
  templateUrl: './info-cita.html',
})
export class InfoCita {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close("modal close");
  }

  ngOnInit(): void {
    console.log(this.data.info);
    
  }

}
