import { Component, inject } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline } from 'ionicons/icons';

import { ThemeService } from '../../services/theme.service';

addIcons({ moonOutline, sunnyOutline });

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon],
})
export class ThemeToggleComponent {
  theme = inject(ThemeService);
}
