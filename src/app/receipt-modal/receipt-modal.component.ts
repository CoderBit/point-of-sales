import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-receipt-modal',
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.scss']
})
export class ReceiptModalComponent implements OnInit {

  @Input() message: string;
  @Output() closeModal = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.closeModal.emit();
  }

}
