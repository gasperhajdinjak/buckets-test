import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { CreateBucketComponent } from './create-bucket/create-bucket.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BucketDetailsComponent } from './bucket-details/bucket-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FileSizePipe } from './pipes/file-size.pipe';


// Add these two imports
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    BucketListComponent,
    CreateBucketComponent,
    BucketDetailsComponent,
    FileSizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    // Add the InMemoryWebApiModule with forRoot() method and DataService as its argument
    InMemoryWebApiModule.forRoot(DataService)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
