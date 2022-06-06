import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  serverUrl: string = "http://localhost:3000";

  constructor(private http:HttpClient) { }
  
  public addOrder(order){
    return this.http.post<{message:any}>(this.serverUrl + '/api/addOrder',order);
  }
  public getPending(){
    return this.http.get<{orders:any,message:any}>(this.serverUrl + '/api/getOrders');
  }
  public approve(order:any){
    return this.http.put<{message : any }>(this.serverUrl + `/api/approveOrder/${order._id}`,order);
  }
  public getOrder(id){
    return this.http.get<{order:any,message:any}>(this.serverUrl + `/api/getOrder/${id}`);
  }
  public deleteOrder(id){
    return this.http.delete<{message : any}>(this.serverUrl + `/api/deleteOrder/${id}`);
  }
  public rateOrder(id,feed,feedBack){
    return this.http.get<{message:any}>(this.serverUrl + `/api/rateOrder/${id}/${feed}/${feedBack}`);
  }
}
