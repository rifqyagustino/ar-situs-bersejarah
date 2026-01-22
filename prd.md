# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Produk
**Web-based Augmented Reality (WebAR) – Visualisasi Situs Bersejarah Dunia**

- **Tipe Produk:** Prototype Edukasi / Research Product  
- **Platform:** Web (Mobile-first, browser-based)  
- **Metodologi:** Research & Development (R&D) + SDLC Waterfall  

---

## 1. Product Vision

Membangun aplikasi **WebAR tanpa instalasi** yang memungkinkan pengguna memvisualisasikan situs-situs bersejarah dunia dalam bentuk **model 3D interaktif berbasis marker**, disertai informasi historis terintegrasi, guna meningkatkan pemahaman, minat belajar, dan pengalaman eksplorasi sejarah secara imersif.

---

## 2. Problem Statement

- Akses fisik ke situs bersejarah terbatas oleh faktor geografis dan biaya.
- Media pembelajaran sejarah konvensional bersifat statis dan tidak kontekstual secara spasial.
- Informasi sejarah tersebar dan tidak terintegrasi dengan visualisasi objek.
- Pemanfaatan WebAR sebagai media edukasi sejarah masih belum optimal.

---

## 3. Target Users

### Primary Users
- Mahasiswa dan pelajar  
- Masyarakat umum dengan minat sejarah dan budaya  
- Pengguna smartphone dengan browser modern  

### User Environment
- Smartphone (Android / iOS)  
- Browser: Chrome, Firefox (WebRTC + WebGL enabled)  
- Tanpa instalasi aplikasi tambahan  

---

## 4. Goals & Success Metrics

### Goals
- Menyediakan visualisasi 3D situs bersejarah melalui WebAR.  
- Menyajikan informasi sejarah secara kontekstual dan real-time.  
- Memberikan pengalaman eksplorasi non-invasif terhadap warisan budaya.  

### Success Metrics
- Marker terdeteksi stabil (>90% success rate).  
- Model 3D tampil < 3 detik setelah marker dikenali.  
- Aplikasi berjalan tanpa crash di browser mobile utama.  
- Pengguna dapat memahami informasi situs tanpa panduan eksternal.  

---

## 5. Core Features (Functional Requirements)

### FR-01 Marker-Based AR Detection
- Sistem mengenali marker visual melalui kamera browser.  
- Marker menjadi pemicu utama pemunculan objek 3D.  

### FR-02 3D Site Visualization
- Menampilkan model 3D situs bersejarah (format glTF / OBJ).  
- Interaksi yang didukung:
  - Rotate  
  - Zoom  
  - Translasi terbatas mengikuti marker  

### FR-03 Historical Information Overlay
- Informasi sejarah ditampilkan bersamaan dengan objek 3D.  
- Konten mencakup:
  - Nama situs  
  - Lokasi  
  - Ringkasan sejarah  
  - Nilai budaya  

### FR-04 Multi-Site Support
- Sistem mendukung lebih dari satu situs bersejarah.  
- Setiap situs memiliki marker dan model 3D masing-masing.  

### FR-05 Web-Based Execution
- Aplikasi berjalan langsung di browser.  
- Tidak memerlukan instalasi APK atau aplikasi native.  

---

## 6. Non-Functional Requirements

### Performance
- Rendering real-time dengan framerate stabil (>24 FPS).  
- Ukuran model 3D dioptimasi untuk mobile (<5 MB per model).  

### Compatibility
- Mobile-first design.  
- Mendukung Chrome & Firefox versi terbaru.  
- WebGL + WebRTC wajib tersedia.  

### Usability
- Zero-learning curve.  
- UI minimalis.  
- Instruksi penggunaan singkat di layar awal.  

### Reliability
- Marker tracking stabil pada pencahayaan normal.  
- Graceful fallback jika kamera tidak tersedia.  

---

## 7. Tech Stack (Fixed)

### Frontend
- HTML5  
- JavaScript (ES6)  

### AR & 3D
- **AR.js** – marker-based tracking  
- **A-Frame** – declarative WebAR scene  
- **Three.js** – rendering, lighting, material  

### Assets
- Model 3D: glTF / OBJ  
- Marker: Custom high-contrast image marker  

---

## 8. User Flow

1. User membuka URL WebAR.  
2. Browser meminta izin kamera.  
3. User mengarahkan kamera ke marker.  
4. Sistem mendeteksi marker.  
5. Model 3D situs muncul di atas marker.  
6. Informasi sejarah ditampilkan.  
7. User berinteraksi dengan objek (rotate / zoom).  

---

## 9. System Architecture (Logical)

Browser
├── Camera Input (WebRTC)
├── AR.js (Marker Detection)
├── A-Frame Scene
│ ├── Camera
│ ├── Marker
│ └── 3D Model (Three.js)
└── UI Layer (Info Overlay)



---

## 10. Testing Requirements

### Test Type
- Black-box testing  

### Test Scenarios
- Marker dikenali / tidak dikenali  
- Model 3D tampil sesuai marker  
- Informasi sejarah sesuai objek  
- Cross-browser testing (Chrome, Firefox)  
- Performa pada berbagai smartphone  

---

## 11. Constraints & Assumptions

### Constraints
- Tidak menggunakan backend kompleks.  
- Tidak menggunakan markerless AR.  
- Fokus pada prototype, bukan production-scale system.  

### Assumptions
- Pengguna memiliki kamera yang berfungsi.  
- Marker dicetak atau ditampilkan dengan kualitas baik.  
- Koneksi internet tersedia untuk memuat asset.  

---

## 12. Deliverables

- WebAR Prototype (HTML + JavaScript)  
- Marker image set  
- Model 3D situs bersejarah  
- Dokumentasi penggunaan  
- Laporan hasil pengujian  

---

## 13. Gemini CLI – Coding Orientation Notes

- Fokus menghasilkan **static WebAR project**.  
- Gunakan **A-Frame + AR.js (marker-based)**.  
- Optimasi untuk mobile browser.  
- Hindari dependency native atau backend.  
- Prioritaskan kejelasan implementasi dibandingkan penambahan fitur berlebihan.  
