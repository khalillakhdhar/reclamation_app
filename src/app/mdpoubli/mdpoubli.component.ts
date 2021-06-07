import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../classes/utilisateur';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-mdpoubli',
  templateUrl: './mdpoubli.component.html',
  styleUrls: ['./mdpoubli.component.css']
})
export class MdpoubliComponent implements OnInit {

  user:Utilisateur;
  users:Utilisateur[];
  etat=false;
  constructor( private userService:UserService) { }

  ngOnInit(): void {
    this.user=new Utilisateur();
    localStorage.clear();
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
         question: e.payload.doc.data()["question"],



        };
      });
      console.log(this.users);

    });


  }
  connexion()
  {
    for(let us of this.users)
    {
      if((us.question==this.user.question))
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
