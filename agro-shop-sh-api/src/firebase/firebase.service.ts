// import { Injectable } from '@nestjs/common';
// import * as firebase from '@firebase/app';
// import 'firebase/storage';
// import { initializeApp } from '@firebase/app';

// @Injectable()
// export class FirebaseService {
//   private storage: firebase.storage.Storage;

//   constructor() {
//     const firebaseConfig = {
//       apiKey: 'YOUR_API_KEY',
//       authDomain: 'YOUR_AUTH_DOMAIN',
//       projectId: 'YOUR_PROJECT_ID',
//       storageBucket: 'YOUR_STORAGE_BUCKET',
//       messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//       appId: 'YOUR_APP_ID',
//     };

//     initializeApp(firebaseConfig);
//     this.storage = firebase.storage();
//   }

//   async uploadFile(file: Express.Multer.File): Promise<string> {
//     const storageRef = this.storage.ref();
//     const fileRef = storageRef.child(file.originalname);
//     await fileRef.put(file.buffer);
//     return await fileRef.getDownloadURL();
//   }
// }
