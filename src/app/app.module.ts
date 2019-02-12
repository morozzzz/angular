import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { HeaderComponent } from './header/header.component';
import { ArticleComponent } from './article/article.component';
import { FooterComponent } from './footer/footer.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { MainPageComponent } from './main-page/main-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TrancatePipe } from './pipes/trancate.pipe';
import { KeyWordPipe } from './pipes/key-word.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from './services/store.service';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'details/:id', component: DetailPageComponent },
  { path: 'edit/:id', component: EditPageComponent },
  { path: 'create', component: CreatePageComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HeaderComponent,
    ArticleComponent,
    FooterComponent,
    EditFormComponent,
    MainPageComponent,
    EditPageComponent,
    DetailPageComponent,
    CreatePageComponent,
    TrancatePipe,
    KeyWordPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  providers: [StoreService]
})

export class AppModule { }
