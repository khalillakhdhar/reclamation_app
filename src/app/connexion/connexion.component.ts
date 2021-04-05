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
  users:Utilisateur[];
  etat=false;
  constructor( private userService:UserService) { }

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
      console.log(this.users);

    });


  }
  connexion()
  {
    for(let us of this.users)
    {
      if((us.login==this.user.login)&&(us.mdp==this.user.mdp))
      {
        this.etat=true;
        localStorage.setItem("id",us.id);
        localStorage.setItem("grade",us.grade);
        window.location.replace("");
      }



    }
    if(this.etat==false)
    alert("compte inconnu!");



  }

}
