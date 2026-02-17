import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  close = output<void>();
  modalTitle = input<string>('Modal Title');
  modalContent = input<string>('Modal Content');

  closeModal(): void {
    this.close.emit();
  }
}
