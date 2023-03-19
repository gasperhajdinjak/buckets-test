import { Component, OnInit } from '@angular/core';
import { BucketService } from '../services/bucket.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBucketComponent } from '../create-bucket/create-bucket.component';
import { Bucket } from '../interfaces/bucket';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit {
  buckets: Array<Bucket> = [];
  showCreateBucketForm = false;

  constructor(private bucketService: BucketService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }

  //metoda, ki pokliče podatke
  private getData() {
    this.bucketService.getBuckets();
    this.bucketService.allBuckets$.subscribe(
      data => this.buckets = data.reverse(),
      error => console.error('Error fetching buckets:', error)
    );
  }

  toggleCreateBucketForm(): void {
    this.showCreateBucketForm = !this.showCreateBucketForm;
  }

  deleteBucket(id: String) {
    this.bucketService.deleteBucket(id).subscribe(res => {
      this.bucketService.getBuckets();
    })
  }
}
