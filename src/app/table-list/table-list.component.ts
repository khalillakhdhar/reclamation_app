import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../classes/utilisateur';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  user:Utilisateur;
  users:Utilisateur[];
    constructor(private userService:UserService) { }
  
    ngOnInit(): void {
      this.user=new Utilisateur();
      this.read();
    }

  read()
  {
  this.userService.read_Users().subscribe(data => {
  
    this.users = data.map(e => {
      return {
        id: e.payload.doc.id,

        nom: e.payload.doc.data()["nom"],
        prenom: e.payload.doc.data()["prenom"],
        login: e.payload.doc.data()["login"],
        mdp: e.payload.doc.data()["mdp"],
        grade: e.payload.doc.data()["grade"],
        zone: e.payload.doc.data()["zone"],
        cin: e.payload.doc.data()["cin"],

  
      };
    });
  
  
    console.log("liste",this.users);
  
  });
  
  
  
  }
  supprimer(id)
  {
    if(confirm("vous voulez supprimer l'utilisateur?"))
    this.userService.delete_User(id);
  }

}
