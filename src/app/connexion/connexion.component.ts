import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../classes/utilisateur';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  user:Utilisateur;
  constructor( private userService:UserService) { }

  ngOnInit(): void {
    this.user=new Utilisateur();
  }
  connexion()
  {

    
  }

}
