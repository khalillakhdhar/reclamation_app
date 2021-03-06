import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Accueil',  icon: 'design_app', class: '' },
    { path: '/profile', title: 'Profile',  icon:'users_single-02', class: '' },

    { path: '/reclamation', title: 'Reclamation',  icon:'ui-1_bell-53', class: '' },

    { path: '/utilisateurs', title: 'Utilisateurs',  icon:'design_bullet-list-67', class: '' },
    { path: '/connexion', title: 'Déconnexion',  icon:'objects_spaceship', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    if(localStorage.length==0)
    window.location.replace("connexion");
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
