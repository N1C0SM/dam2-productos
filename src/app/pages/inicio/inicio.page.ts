import { Component } from '@angular/core';
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
export class InicioPage {
  oscuro = false;

  cambiarTema(): void {
    this.oscuro = !this.oscuro;
    document.documentElement.classList.toggle('ion-palette-dark', this.oscuro);
  }
}
