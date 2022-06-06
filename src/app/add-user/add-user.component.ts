import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MustMatch } from '../confirmPwd';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm :FormGroup ; 
  user : any = {};
  title:any;
  path:any;
  exists:any;
  imagePreview:any;
  constructor(private formBuilder : FormBuilder,private userService : UserService ,private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      name : ['',[Validators.required , Validators.minLength(6)]],
      email : ['',[Validators.email,Validators.required]],
      password : ['',[Validators.minLength(8),Validators.required]],
      tel  : ['',[Validators.minLength(8),Validators.required]],
      role  : [''],
      speciality  : ['',[Validators.required]],
      experience  : ['',[Validators.required]],
      confirmPwd  : [''],
      zone  : ['',[Validators.required]],
      declanations  : [''],
      availability  : [''],
      img  : ['']
      
    },{
      
        validator : MustMatch("password","confirmPwd")
      
    })
    
    this.path = this.router.url;
    console.log(this.path);
    
    if (this.path == '/addAdmin') {
      this.title = "Ajout Admin"
    } else {
      this.title="S'inscrire"
    }
  }
  onImageSelected(event: Event) {
    //Selection du fichier
    const file = (event.target as HTMLInputElement).files[0];
    // Ajout d'un attribut img dans l'objet Chef
    this.addUserForm.patchValue({ img: file });
    // Mise à jour des valeurs du form
    this.addUserForm.updateValueAndValidity();
    // Creation d'une variable reader pour lire le contenu defichiers
    const reader = new FileReader();
    //Déclenchement du event load lors d'une lecture de fichieravec succès
    reader.onload = () => {
    //affecter le résultat de la lecture dans la variableimagePreview
    this.imagePreview = reader.result as string
    };
    // lecture du contenu du fichier Blob ou File
    reader.readAsDataURL(file);
    }
  
  add(form){
    let spec = this.activatedRoute.snapshot.paramMap.get('spec');
    if (spec) {
      form.role = 'client';
    }else{
      switch (this.path) {
        case '/signup':
          form.role = 'client';
          break;
          case '/addAdmin':
            form.role = 'admin';
            break;
            case '/apply':
              form.role = 'tech',
              form.availability = 'unavailable',
              form.status = 'pending',
              form.likes = 0,
              form.dislikes = 0
         
        default:
          break;
      }
    }
   
    

      this.userService.addUser(form,this.addUserForm.value.img).subscribe(
        (data)=>{
          console.log(data.message);
          if (data.message == '0') {
            this.exists = '0';
          } else {



            let timerInterval

            Swal.fire({
              icon:'success',
              title: 'Compte creé avec succès!',
              
              timer: 2000,
              didOpen: () => {
                const content = Swal.getHtmlContainer()
                const $ = content.querySelector.bind(content)
            
               
                Swal.showLoading()
                
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            })
            


            console.log(spec);
            
            if (spec) {
              this.router.navigate([`login/${spec}`]);  
            } else {
              this.router.navigate(['login']);
            }
            
          }
          
        }
      )
        // this.router.navigate(['login']);
  }
  gotoLogin(){
    this.router.navigate(['login']);
  }

  

}
