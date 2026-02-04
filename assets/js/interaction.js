/*
  interaction.js
  Menangani logika Gesture (Putar/Zoom) dan Klik untuk Info
*/

// KOMPONEN 1: Gesture Detector
AFRAME.registerComponent('gesture-detector', {
  schema: {
    element: { default: '' }
  },
  init: function() {
    this.targetElement = this.data.element && document.querySelector(this.data.element);
    if (!this.targetElement) {
      this.targetElement = this.el;
    }
    this.internalState = {
      previousState: null
    };
    this.emitGestureEvent = this.emitGestureEvent.bind(this);
    this.targetElement.addEventListener("touchstart", this.emitGestureEvent);
    this.targetElement.addEventListener("touchend", this.emitGestureEvent);
    this.targetElement.addEventListener("touchmove", this.emitGestureEvent);
  },
  remove: function() {
    this.targetElement.removeEventListener("touchstart", this.emitGestureEvent);
    this.targetElement.removeEventListener("touchend", this.emitGestureEvent);
    this.targetElement.removeEventListener("touchmove", this.emitGestureEvent);
  },
  emitGestureEvent: function(event) {
    const currentState = this.getTouchState(event);
    const previousState = this.internalState.previousState;
    const gestureContinuous = Boolean(previousState && currentState && currentState.touchCount === previousState.touchCount);
    
    if (gestureContinuous) {
      const eventDetail = {
        positionChange: {
          x: currentState.position.x - previousState.position.x,
          y: currentState.position.y - previousState.position.y
        },
        spreadChange: currentState.spread - previousState.spread,
        startPosition: previousState.position,
        position: currentState.position
      };
      if (currentState.touchCount === 1) {
        this.el.emit("onefingermove", eventDetail);
      } else if (currentState.touchCount === 2) {
        this.el.emit("twofingermove", eventDetail);
      }
    }
    this.internalState.previousState = currentState;
  },
  getTouchState: function(event) {
    if (event.touches.length === 0) return null;
    if (event.touches.length === 1) {
      return {
        touchCount: 1,
        position: { x: event.touches[0].pageX, y: event.touches[0].pageY },
        spread: 0
      };
    }
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    const dx = touch1.pageX - touch2.pageX;
    const dy = touch1.pageY - touch2.pageY;
    return {
      touchCount: 2,
      position: { x: (touch1.pageX + touch2.pageX) / 2, y: (touch1.pageY + touch2.pageY) / 2 },
      spread: Math.sqrt(dx * dx + dy * dy)
    };
  }
});

// KOMPONEN 2: Gesture Handler
AFRAME.registerComponent('gesture-handler', {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.1 },
    maxScale: { default: 8 }
  },
  init: function() {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);
    
    this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
    this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
  },
  remove: function() {
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
  },
  handleRotation: function(event) {
    if (!this.data.enabled) return;
    // Cek visibilitas objek sebelum rotasi
    if (!this.el.object3D.visible) return; 
    
    this.el.object3D.rotation.y += event.detail.positionChange.x * this.data.rotationFactor * 0.001;
  },
  handleScale: function(event) {
    if (!this.data.enabled) return;
    // Cek visibilitas objek sebelum scale
    if (!this.el.object3D.visible) return;

    const scaleFactor = 1 + event.detail.spreadChange * 0.005;
    const currentScale = this.el.object3D.scale.clone();
    const newScale = currentScale.multiplyScalar(scaleFactor);

    if (newScale.x >= this.data.minScale && newScale.x <= this.data.maxScale) {
      this.el.object3D.scale.copy(newScale);
    }
  }
});

// KOMPONEN 3: Info Click Handler
// Menampilkan Popup saat model diklik dengan konten dinamis
AFRAME.registerComponent('info-click-handler', {
  schema: {
    title: { type: 'string', default: 'Informasi' },
    text: { type: 'string', default: 'Tidak ada deskripsi tersedia.' }
  },
  init: function () {
    const el = this.el;
    const data = this.data;
    
    el.addEventListener('click', function (evt) {
      // PERBAIKAN LOGIKA: Cek apakah objek benar-benar terlihat
      // Jika parent marker tidak terdeteksi (visible=false), abaikan klik ini.
      if (el.object3D.visible === false) return;

      const infoPanel = document.getElementById('info-panel');
      const infoTitle = document.getElementById('info-title');
      const infoText = document.getElementById('info-text');

      // Update konten teks berdasarkan properti komponen
      if (infoTitle) infoTitle.textContent = data.title;
      if (infoText) infoText.textContent = data.text;

      // Tampilkan panel
      infoPanel.style.display = 'flex';
    });

    // Cursor visual feedback
    el.addEventListener('mouseenter', function () {
      if (el.object3D.visible) el.object3D.scale.multiplyScalar(1.1);
    });
    el.addEventListener('mouseleave', function () {
      if (el.object3D.visible) el.object3D.scale.multiplyScalar(0.909); 
    });
  }
});