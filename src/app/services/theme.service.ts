import { Injectable, effect, signal } from '@angular/core';

const CLAVE = 'dam2-productos-tema';

/**
 * Modo claro / oscuro de toda la aplicación.
 * Ionic activa el tema oscuro cuando <html> tiene la clase .dark.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  oscuro = signal(localStorage.getItem(CLAVE) === 'oscuro');

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.oscuro());
      localStorage.setItem(CLAVE, this.oscuro() ? 'oscuro' : 'claro');
    });
  }

  alternar(): void {
    this.oscuro.update((valor) => !valor);
  }
}
