import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { AboutComponent } from './about/about.component';
import { CountsComponent } from './counts/counts.component';
import { FeaturesComponent } from './features/features.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TeamComponent } from './team/team.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardSuperAdminComponent } from './dashboard-super-admin/dashboard-super-admin.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardTechComponent } from './dashboard-tech/dashboard-tech.component';
import { FinishOrderComponent } from './finish-order/finish-order.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { RatingComponent } from './rating/rating.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EditLogsComponent } from './edit-logs/edit-logs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    OurServicesComponent,
    AboutComponent,
    CountsComponent,
    FeaturesComponent,
    PortfolioComponent,
    TeamComponent,
    FaqComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    AddUserComponent,
    DashboardSuperAdminComponent,
    LoginComponent,
    OrderComponent,
    DashboardAdminComponent,
    DashboardTechComponent,
    FinishOrderComponent,
    DashboardClientComponent,
    RatingComponent,
    EditLogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
