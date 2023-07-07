import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage  } from "@angular/fire/storage";
import { StorageComponent } from './components/storage/storage.component';
import { HeaderComponent } from './template/header/header.component';

@NgModule({
  declarations: [AppComponent, StorageComponent, HeaderComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     provideFirebaseApp(()=>initializeApp(environment.firebase)),
     provideFirestore(()=>getFirestore()),
     provideAuth(() => getAuth()),
     provideStorage(()=>getStorage()),
      AppRoutingModule, ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent,],
})
export class AppModule {}
