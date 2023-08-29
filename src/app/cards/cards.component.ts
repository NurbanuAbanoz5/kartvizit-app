import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { CardModalComponent } from './card-modal/card-modal.component';
import {CardService}  from '../services/card.service'
import { CardItem } from '../models/card-item';

 
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  
cards !: CardItem[];

  constructor(
    public dialog: MatDialog,
    public cardService : CardService
    
    
    ) {}

    ngOnInit() {
      
      this.cardService.getCards();
    }



  openAddCardModal() {
    this.dialog.open(CardModalComponent , {
      width : '400px', /* o açılan yeni kartvizit ekleme kısmının genişliğini ayarladım. */
     
    });

    
  
    

       
}

   

 


  /* kaç gündür aradığım hata fonksiyonu çağırmamışım :( 24.08.2023 de buldum dün burada bırakmıştım. bir de api 
    adresini https yaptım.*/
}


