import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type NavLink = {
  title: string;
  route: string;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  navLinks = signal<NavLink[]>([
    {
      title: 'Pages',
      route: '/pages',
    }
  ]);
}
