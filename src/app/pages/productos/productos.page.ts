import { Component, OnInit, computed, inject, signal } from '@angular/core';
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
  IonCardContent,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonFooter,
} from '@ionic/angular';

import { Product, ProductsResponse, valorStock } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductoCardComponent } from '../../components/producto-card/producto-card.component';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

const PRODUCTOS_POR_PAGINA = 10;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    ProductoCardComponent,
    ThemeToggleComponent,
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
    IonCardContent,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonFooter,
  ],
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);

  // Angular 22 arranca sin zone.js: usamos signals para que la vista
  // se actualice cuando llega la respuesta de la API.
  products = signal<Product[]>([]);
  total = signal(0);
  loading = signal(false);
  error = signal('');
  page = signal(1);

  /** Cómo se muestran los productos: en tabla o en tarjetas (dashboard). */
  vista = signal<'tarjetas' | 'tabla'>('tabla');

  readonly pageSize = PRODUCTOS_POR_PAGINA;

  /** Función pura del modelo, expuesta para la tabla. */
  valorStock = valorStock;

  /** Datos del resumen de arriba del dashboard. */
  valorInventario = computed(() =>
    this.products().reduce((suma, p) => suma + valorStock(p), 0),
  );

  valoracionMedia = computed(() => {
    const lista = this.products();
    if (lista.length === 0) {
      return 0;
    }
    return lista.reduce((suma, p) => suma + p.rating, 0) / lista.length;
  });

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.total() / this.pageSize));
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.error.set('');

    const skip = (this.page() - 1) * this.pageSize;

    this.productService.getProducts(this.pageSize, skip).subscribe({
      next: (response: ProductsResponse) => {
        this.products.set(response.products);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.error.set('No se han podido cargar los productos.');
        this.loading.set(false);
      },
    });
  }

  cambiarVista(vista: string): void {
    this.vista.set(vista === 'tabla' ? 'tabla' : 'tarjetas');
  }

  paginaAnterior(): void {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.loadProducts();
    }
  }

  paginaSiguiente(): void {
    if (this.page() < this.totalPaginas) {
      this.page.update((p) => p + 1);
      this.loadProducts();
    }
  }
}
