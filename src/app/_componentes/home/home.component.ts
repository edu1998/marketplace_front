import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private matdialog: MatDialog
  ) { }
  direccionEmpresa: string;

  buscarEmpresa() {
    this.matdialog.open(ListaEmpresa, {
      data: { direccion: this.direccionEmpresa },
      width : '700px'
    })
  }
  ngOnInit() {
  }

}

@Component({
  selector: 'lista-empresas',
  templateUrl: 'lista-empresa.modal.html',
})
export class ListaEmpresa {

  constructor(
    public dialogRef: MatDialogRef<ListaEmpresa>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
