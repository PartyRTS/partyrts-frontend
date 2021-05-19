import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SharedModule} from './features/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './features/core/core.module';
import {MainModule} from './routed/main/main.module';
import {UserModule} from './features/user/user.module';
import {VideoModule} from './features/video/video.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    MainModule,
    UserModule,
    VideoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
