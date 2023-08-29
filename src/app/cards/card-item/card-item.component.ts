
import { Component, Input } from '@angular/core';
import {CardItem} from '../../models/card-item'
import { MatCardHeader } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {
       
  @Input() cardItem !: CardItem;

  constructor(

    private dialog : MatDialog
    ){}

  openUpdateModal(cardItem:CardItem){
       
    this.dialog.open(CardModalComponent , {
      
      width : '400px', //genişliğini ayarladık
      data : cardItem  // data gönderdik 
      
     

    })   // kartvizite basınca modal açılacak dolu şekilde açılmasını istiyorum
    //sonra da güncelleme işlemi yaptırılacak 25.08.2023
  }

  

}
