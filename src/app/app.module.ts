import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './providers/api.service';
import { AuthService } from './providers/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Toast } from '@ionic-native/toast/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
/* import { LocalNotifications } from '@ionic-native/local-notifications/ngx' */
import { AuthInterceptor } from './interceptors/auth.interceptor';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),HttpClientModule,ReactiveFormsModule,FormsModule,AppRoutingModule],
  providers: [
    StatusBar,
    ApiService,
    AuthService,
    InAppBrowser,
    SplashScreen,
    /* LocalNotifications, */
    Toast,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy ,}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

