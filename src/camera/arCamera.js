export class ARCameraManager {
  constructor(videoElement, onStatusChange) {
    this.video = videoElement;
    this.onStatusChange = onStatusChange || (() => {});
    this.stream = null;
    this.isActive = false;
    this.facingMode = 'environment'; // back camera preferred for AR
    this.opacity = 0.85;
  }

  async startCamera() {
    if (this.isActive) return true;

    try {
      this.onStatusChange('connecting', 'Kameraga ulanmoqda...');

      const constraints = {
        video: {
          facingMode: this.facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.video.srcObject = this.stream;
      await this.video.play();

      this.isActive = true;
      this.onStatusChange('active', 'Kamera faol (AR rejimi yoqildi)');
      return true;
    } catch (err) {
      console.warn('AR Camera failed with facingMode environment, trying user fallback...', err);

      try {
        // Fallback for laptops / desktop webcams
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        this.video.srcObject = this.stream;
        await this.video.play();

        this.isActive = true;
        this.onStatusChange('active', 'Veb-kamera faol');
        return true;
      } catch (fallbackErr) {
        console.error('Camera access denied or unavailable:', fallbackErr);
        this.isActive = false;
        this.onStatusChange('error', 'Kameraga ruxsat berilmadi yoki kamera topilmadi.');
        return false;
      }
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.video.srcObject = null;
    this.isActive = false;
    this.onStatusChange('inactive', 'Kamera o\'chirildi (3D Studio rejimi)');
  }

  toggleCamera() {
    if (this.isActive) {
      this.stopCamera();
      return false;
    } else {
      return this.startCamera();
    }
  }

  async switchCameraFacing() {
    if (!this.isActive) return;
    this.facingMode = this.facingMode === 'environment' ? 'user' : 'environment';
    this.stopCamera();
    await this.startCamera();
  }

  setOpacity(val) {
    this.opacity = val;
    this.video.style.opacity = val;
  }
}
