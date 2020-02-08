import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-receipt-modal',
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.scss']
})
export class ReceiptModalComponent implements OnInit {

  dateAndTime: string;
  @Input() message: string;
  @Output() closeModal = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    this.getCurrentDate();
  }

  formatNumber(num: number) {
    const numSplit = Math.abs(num).toFixed(3).split('.');
    let int = numSplit[0];
    if (int.length > 3) {
        int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }
    const dec = numSplit[1];
    return int + '.' + dec;
  }

  getCurrentDate() {
    const d = new Date();
    const date = ('0' + d.getDate().toString()).slice(-2);
    const month = ('0' + (d.getMonth() + 1).toString()).slice(-2);
    const year = d.getFullYear();
    const hour = ('0' + d.getHours().toString()).slice(-2);
    const min = ('0' + d.getMinutes()).toString().slice(-2);
    const sec = ('0' + d.getSeconds()).toString().slice(-2);
    this.dateAndTime = `${date}-${month}-${year} ${hour}:${min}:${sec}`;
  }

  onClose() {
    this.closeModal.emit();
  }

}
