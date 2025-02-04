import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([BrowserAnimationsModule]),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyBTWbVoIzT8VtC6mG0JQ3GIsz2f92CtB-I',
        authDomain: 'taha-personal.firebaseapp.com',
        projectId: 'taha-personal',
        storageBucket: 'taha-personal.appspot.com',
        messagingSenderId: '672529236067',
        appId: '1:672529236067:web:3cad5b6950ba23389b3856',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
};
