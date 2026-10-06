import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
} from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    RouterLink,
  ],
})
export class InicioPage implements OnInit {
  oscuro = localStorage.getItem('modo') === 'oscuro';

  ngOnInit(): void {
    if (this.oscuro) {
      document.documentElement.classList.add('ion-palette-dark');
    }
  }

  cambiarTema(): void {
    this.oscuro = !this.oscuro;
    document.documentElement.classList.toggle('ion-palette-dark', this.oscuro);
    localStorage.setItem('modo', this.oscuro ? 'oscuro' : 'claro');
  }
}
