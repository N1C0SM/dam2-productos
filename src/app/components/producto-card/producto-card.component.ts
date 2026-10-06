import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IonCard, IonCardContent, IonBadge } from '@ionic/angular';

import { Product, valorStock } from '../../models/product.model';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.scss'],
  standalone: true,
  imports: [CurrencyPipe, IonCard, IonCardContent, IonBadge],
})
export class ProductoCardComponent {
  product = input.required<Product>();

  valorStock = valorStock;
}
