import { Component } from '@angular/core';
import { CardItem } from 'src/app/models/card-item';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent {



constructor(
  
  private cardService : CardService,
  

){}


search(searchText : string){

  console.log(searchText);
  searchText = searchText.toLowerCase();
  this.cardService.filteredCards = this.cardService.cards.filter(( card : CardItem)=> {
   
    return card.title.toLowerCase().indexOf(searchText) > -1 || (card.name && card.name.toLowerCase().indexOf(searchText)>-1);// her bir kartı dönücek başlığını küçüğe çevirip öyle bir şey var mı bakıp 0 vey a daha büyük index ini dönecek
    

  });


}







}
