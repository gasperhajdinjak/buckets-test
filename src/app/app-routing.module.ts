import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { BucketDetailsComponent } from './bucket-details/bucket-details.component';

const routes: Routes = [
  { path: '', component: BucketListComponent },
  { path: 'bucket/:id', component: BucketDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
