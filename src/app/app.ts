import { Component, input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Modal } from './features/modal/modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Modal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Post-It Task Board');
  isCreditModalVisible = signal<boolean>(false);
  isPrivacyModalVisible = signal<boolean>(false);
  modalTitle: string = '';
  modalContent: string = '';

  toggleCreditModal() {
    this.isCreditModalVisible.update((v) => !v);
    this.modalTitle = 'Credits';
    this.modalContent =
      "The logic and website source codes are the developer's own work and this site operates as a non-commercial fan site. Content will be immediately removed if requested by the rights holder.";
  }

  togglePrivacyModal() {
    this.isPrivacyModalVisible.update((v) => !v);
    this.modalTitle = 'Privacy Policy';
    this.modalContent =
      "This website does not transmit images or data provided by users to a server. They are stored only in the user's browser. All analysis is performed solely in the user's browser.";
  }
}
