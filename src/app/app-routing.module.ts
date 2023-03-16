import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BucketDetailsComponent } from './bucket-details/bucket-details.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';

const routes: Routes = [
  { path: '', component: BucketListComponent },
  { path: 'details', component: BucketDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
