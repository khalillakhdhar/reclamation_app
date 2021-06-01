import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Reclamation } from '../classes/reclamation';
import { Utilisateur } from '../classes/utilisateur';
import { ReclamationService } from '../services/reclamation.service';
import { UserService } from '../services/user.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from 'rxjs';
import { MysearchPipe } from '../mysearch.pipe';
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
selectedFile: File = null;
fb = "product";
query="";
downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage,private userService:UserService,private reclamationService:ReclamationService, private toastr: ToastrService) {}

  ngOnInit() {
    this.reclamation=new Reclamation();
    this.reclamations=[];
    this.user=new Utilisateur();
    this.id=localStorage.getItem("id");
    this.grade=localStorage.getItem("grade");
    this.read();
  }
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `/reclamations/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`/reclamations/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }

  readresolue()
  {
    this.reclamationService.read_resolu().subscribe(data => {
  
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
         userid: e.payload.doc.data()["userid"],
    
    
    
        };
      });
      console.log("resolue",this.reclamations);

  });
}
  readreattente()
  {
    this.reclamationService.read_attente().subscribe(data => {
  
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
         userid: e.payload.doc.data()["userid"],
    
    
    
        };
      });
      console.log("attente",this.reclamations);

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
  add()
  {
    this.reclamation.photo=this.fb;
    this.reclamation.date_heure=Date();
    this.reclamation.etat="attente";
    this.reclamation.user=this.user.nom+" "+this.user.prenom;
    this.reclamation.userid=this.user.id;
    let rec=Object.assign({},this.reclamation);
    this.reclamationService.create_NewReclamation(rec);
alert("reclamation ajouté");
  }
  changement(valeur)
  {
this.query=valeur;
this.readreattente();
  }
  changementr(valeur)
  {
this.query=valeur;
this.readresolue();
  }
  update(re)
  {
    this.reclamation=re;
    this.reclamation.etat="resolu";
    let rec=Object.assign({},this.reclamation);
    this.reclamationService.update_Reclamation(this.reclamation.id,rec);
    this.reclamation=new Reclamation();
  }
  supprimer(id)
  {
    if(confirm("vous êtes sûre de vouloir supprimer ?"))
    {
      this.reclamationService.delete_Reclamation(id);   
    }
  }
}
