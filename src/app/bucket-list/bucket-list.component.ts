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

  constructor(private bucketService: BucketService, private dialog: MatDialog) { }


  ngOnInit(): void {
    // Load the list of buckets when the component initializes
    this.bucketService.getBuckets().subscribe(
      data => this.buckets = data,
      error => console.error('Error fetching buckets:', error)
    );
  }

  // The method to open the "Create Bucket" modal will be added later
  openCreateBucketModal(): void {
    const dialogRef = this.dialog.open(CreateBucketComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can refresh the bucket list here if needed
    });
  }

}

