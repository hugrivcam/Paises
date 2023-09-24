import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styles: [
    `.spinner-container{
      align-items:center;
      background-color: black;
      border-radius: 20px;
      bottom: 15px;
      color: cyan;
      display: flex;
      padding: 5px 10px;
      position: fixed;
      right:15 px;
      box-shadow: 5px 3px 5px rgba(0,0,100,0.5)
    }`,
    `
    span{
      margin-right: 20px;      
    }
    `
  ]
})
export class LoadingSpinnerComponent implements OnInit {
  ngOnInit(): void {
    console.log("LOADER HERE");
  }

}
