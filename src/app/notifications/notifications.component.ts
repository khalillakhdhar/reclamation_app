import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Reclamation } from '../classes/reclamation';
import { Utilisateur } from '../classes/utilisateur';
import { ReclamationService } from '../services/reclamation.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
reclamation:Reclamation;
reclamations:Reclamation[];
user:Utilisateur;
users:Utilisateur[];
id:string;
grade:string;

  constructor(private userService:UserService,private reclamationService:ReclamationService, private toastr: ToastrService) {}

  ngOnInit() {
    this.reclamation=new Reclamation();
    this.reclamations=[];
    this.user=new Utilisateur();
    this.id=localStorage.getItem("id");
    this.read();
    this.readreclamation();
  }
  readreclamation()
  {
    this.reclamationService.read_Reclamations().subscribe(data => {
  
      this.reclamations = data.map(e => {
        return {
         id: e.payload.doc.id,
    
         date_heure: e.payload.doc.data()["date_heure"],
         photo: e.payload.doc.data()["photo"],
         message: e.payload.doc.data()["message"],
         localisation: e.payload.doc.data()["localisation"],
         etat: e.payload.doc.data()["etat"],
         type: e.payload.doc.data()["type"],
         user: e.payload.doc.data()["user"],
    
    
    
        };
      });
      console.log("reclamations",this.reclamations);

  });
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
}
