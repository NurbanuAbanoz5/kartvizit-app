import { Inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CardItem } from '../models/card-item';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CardService {


 cards ! : CardItem[];
 filteredCards !: CardItem[];


  constructor( 

    @Inject('apiUrl') private apiUrl :string,
     
    private http : HttpClient 


  ) { }

  
  getCards():void{

    this.http.get<CardItem[]>(this.apiUrl+'/cards') /* interface içindekileri dön 23.08.2023*/
    .subscribe((res:CardItem[])=> {
          
      this.cards=res;
      this.filteredCards = res;

    });
  }

  
  addCard(card:CardItem){

    return this.http.post(this.apiUrl + '/cards',card );
    
  }

  updateCard(card:CardItem, cardId : number){

    return this.http.put(this.apiUrl + '/cards/'+ cardId,card );
    
  }

  deleteCard(cardId : number){

    return this.http.delete(this.apiUrl + '/cards/'+ cardId);


  }



}
