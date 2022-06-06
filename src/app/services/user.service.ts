import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverUrl: string = "http://localhost:3000";


  constructor(private httpClient : HttpClient) { }
  public addUser(user,img:File){
    let formData = new FormData();
formData.append('name',user.name);
formData.append('email',user.email);
formData.append('password',user.password);
formData.append('tel',user.tel);
formData.append('role',user.role);
formData.append('speciality',user.speciality);
formData.append('experience',user.experience);
formData.append('status',user.status);
formData.append('zone',user.zone);
formData.append('declanations',user.declanations);
formData.append('availability',user.availability);
formData.append('likes',user.likes);
formData.append('dislikes',user.dislikes);
formData.append('img',img);
    return this.httpClient.post<{message : any}>(this.serverUrl + '/api/addUser',formData);
  }
  
  public deleteUser(id){
    return this.httpClient.delete<{message : any}>(this.serverUrl + `/api/deleteUser/${id}`);
  }
  public getClients(){
    return this.httpClient.get<{clients : any}>(this.serverUrl + '/api/getClients');
  }
  public getPending(){
    return this.httpClient.get<{techs:any}>(this.serverUrl + '/api/getPending')
  }
  public approve(tech){
    return this.httpClient.put<{message:any}>(this.serverUrl + `/api/approve/${tech._id}`,tech);
  }
  public getTechs(){
    return this.httpClient.get<{techs : any}>(this.serverUrl + '/api/getTechs');
  }
  public getAdmins(){
    return this.httpClient.get<{admins : any }>(this.serverUrl + '/api/getAdmins');
  }
  public login(user){
    return this.httpClient.post<{message : any , userFound:any}>(this.serverUrl + '/api/login',user);
  }
  public getUser(userId){
    return this.httpClient.get<{user:any}>(`${this.serverUrl + '/api/users'}/${userId}`); 
  }
  public editLogs(user){
    return this.httpClient.put<{message:any}>(this.serverUrl + `/api/editLogs/${user._id}`,user);
  }
  public like(id){
    return this.httpClient.get<{message:any}>(this.serverUrl + `/api/like/${id}`);
  }
  public dislike(id){
    return this.httpClient.get<{message:any}>(this.serverUrl + `/api/dislike/${id}`);
  }
  public sendCode(mail,code){
    return this.httpClient.get<{message:any}>(this.serverUrl + `/api/retrieve/${mail}/${code}`);
  }
  public changePwd(email,pwd){
    return this.httpClient.get<{message:any}>(this.serverUrl + `/api/changePwd/${email}/${pwd}`);
  }
  
 
  
}
