import { Component, input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Modal } from './features/modal/modal';

type ModalData = {
  title: string;
  content: string;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Modal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Post-It Task Board');

  modal = signal<ModalData | null>(null);

  openModal(title: string, content: string) {
    this.modal.set({ title, content });
  }

  closeModal() {
    this.modal.set(null);
  }

  openCredits() {
    this.openModal(
      'Credits',
      "The logic and website source codes are the developer's own work and this site operates as a non-commercial fan site. Content will be immediately removed if requested by the rights holder.",
    );
  }

  openPrivacy() {
    this.openModal(
      'Privacy Policy',
      "This website does not transmit images or data provided by users to a server. They are stored only in the user's browser. All analysis is performed solely in the user's browser.",
    );
  }
}
