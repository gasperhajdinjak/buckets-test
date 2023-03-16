import { Component, OnInit } from '@angular/core';
import { BucketService } from '../services/bucket.service';
import { NewBucket } from '../interfaces/newBucket';

@Component({
  selector: 'app-create-bucket',
  templateUrl: './create-bucket.component.html',
  styleUrls: ['./create-bucket.component.css']
})
export class CreateBucketComponent implements OnInit {
  newBucket: NewBucket = {
    name: '',
    location: ''
  };

  constructor(private bucketService: BucketService) { }

  ngOnInit(): void {
  }

  onSubmit(event: Event): void {
    event.stopPropagation();
    // For this demo, we will not implement this method as updating a local JSON file requires a server-side implementation.
    console.log('New bucket:', this.newBucket);
    this.bucketService.saveBucket(this.newBucket);
    this.newBucket.name = '';
    this.newBucket.location = '';
  }
}
