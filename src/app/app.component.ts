import { Component } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'QR-Generator';
  text = '';
  qrDataUrl: string | null = null;
  error: string | null = null;
  loading = false;

  async generateQrCode(): Promise<void> {
    this.error = null;
    this.qrDataUrl = null;

    const value = this.text?.trim();
    if (!value) {
      this.error = 'Veuillez saisir un texte.';
      return;
    }

    this.loading = true;
    try {
      // Génère une image (Data URL) du QR code
      this.qrDataUrl = await QRCode.toDataURL(value, {
        width: 240,
        margin: 2,
        errorCorrectionLevel: 'M',
      });
    } catch (e) {
      this.error = 'Erreur lors de la génération du QR code.';
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  clear(): void {
    this.text = '';
    this.qrDataUrl = null;
    this.error = null;
  }
}
