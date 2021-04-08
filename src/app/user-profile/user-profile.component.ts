import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../classes/utilisateur';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id:string;
  grade:string;
  
  user:Utilisateur;
  users:Utilisateur[];
  constructor(private userService:UserService) { }
  
  ngOnInit(): void {
    this.user=new Utilisateur();
    this.id=localStorage.getItem("id");
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
       cin: e.payload.doc.data()["cin"],
       zone: e.payload.doc.data()["zone"],
       login: e.payload.doc.data()["login"],
       mdp: e.payload.doc.data()["mdp"],
       grade: e.payload.doc.data()["grade"],
  
  
  
      };
    });
    for (let u of this.users)
  {
  if((u.id==this.id))
  {
  this.user=u;
  
  }
  console.log("user",this.user);
  
  
  }
  
    console.log("liste",this.users);
  
  });
  
  
  
  }
  update()
  {
    let us=Object.assign({},this.user);
  this.userService.update_User(this.id,us);
  alert("updated successfully");
  
  
  }

}
