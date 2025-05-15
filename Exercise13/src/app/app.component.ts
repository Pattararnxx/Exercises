import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DecimalPipe, NgForOf, NgOptimizedImage, NgStyle} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage, RouterLink, NgStyle, DecimalPipe, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
