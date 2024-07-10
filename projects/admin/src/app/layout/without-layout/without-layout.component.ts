import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-without-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './without-layout.component.html',
  styleUrl: './without-layout.component.scss'
})
export class WithoutLayoutComponent {

}
