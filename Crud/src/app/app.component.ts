import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contactos } from './models/contactos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Crud';
  
  ContactosArray: Contactos[] = [
    { id: 1, Nombre: "JOSE", Entidad: "Sanitas", Email: "Jose@123.com" },
    { id: 2, Nombre: "Maria", Entidad: "Sura", Email: "Jose345.com" },
    { id: 3, Nombre: "Pedro", Entidad: "Confama", Email: "Jose@567.com" }
  ];

  selectedContactos: Contactos = new Contactos();
  searchText: any;
  filteredContactos!: Contactos[];

  agregaryeditar() {
    if(this.selectedContactos.id === 0) {
      this.selectedContactos.id = this.ContactosArray.length + 1;
      this.ContactosArray.push(this.selectedContactos);
    }
      this.selectedContactos = new Contactos();
  }

  abriryeditar(contacto: Contactos) {
    this.selectedContactos = contacto;
  }

  
  Eliminar() {
    if (confirm("¿Estás seguro de eliminar este contacto?")) {
      this.ContactosArray = this.ContactosArray.filter(x => x !== this.selectedContactos);
      this.selectedContactos = new Contactos();
    }
  }

  aplicarFiltro() {
    if (!this.searchText) {
      this.filteredContactos = [...this.ContactosArray];
    } else {
      this.filteredContactos = this.ContactosArray.filter(contacto =>
        contacto.Nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        contacto.Entidad.toLowerCase().includes(this.searchText.toLowerCase()) ||
        contacto.Email.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  buscar() {
    this.aplicarFiltro();
  }


}
