import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonFooter,
} from '@ionic/angular';

import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonFooter,
  ],
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);

  // Uso signal porque si no, la pagina no se actualiza al llegar los datos
  productos = signal<Product[]>([]);
  cargando = signal(false);
  error = signal('');
  total = signal(0);

  pagina = 1;
  porPagina = 10;

  verTarjetas = false;
  oscuro = localStorage.getItem('modo') === 'oscuro';

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando.set(true);
    this.error.set('');

    const saltar = (this.pagina - 1) * this.porPagina;

    this.productService.getProducts(this.porPagina, saltar).subscribe({
      next: (respuesta: ProductsResponse) => {
        this.productos.set(respuesta.products);
        this.total.set(respuesta.total);
        this.cargando.set(false);
      },
      error: (fallo) => {
        console.log(fallo);
        this.error.set('No se han podido cargar los productos.');
        this.cargando.set(false);
      },
    });
  }

  totalPaginas(): number {
    return Math.ceil(this.total() / this.porPagina);
  }

  paginaAnterior(): void {
    this.pagina = this.pagina - 1;
    this.cargarProductos();
  }

  paginaSiguiente(): void {
    this.pagina = this.pagina + 1;
    this.cargarProductos();
  }

  // Cuenta que pidio el cliente: unidades x precio menos el descuento
  stockValorado(product: Product): number {
    const descuento = product.price * (product.discountPercentage / 100);
    return product.stock * (product.price - descuento);
  }

  valorDelStock(): number {
    let total = 0;
    for (const product of this.productos()) {
      total = total + this.stockValorado(product);
    }
    return total;
  }

  valoracionMedia(): number {
    const lista = this.productos();
    if (lista.length === 0) {
      return 0;
    }
    let suma = 0;
    for (const product of lista) {
      suma = suma + product.rating;
    }
    return suma / lista.length;
  }

  cambiarTema(): void {
    this.oscuro = !this.oscuro;
    document.documentElement.classList.toggle('ion-palette-dark', this.oscuro);
    localStorage.setItem('modo', this.oscuro ? 'oscuro' : 'claro');
  }
}
