import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BucketService } from '../services/bucket.service';
import { Bucket } from '../interfaces/bucket';

@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.component.html',
  styleUrls: ['./bucket-details.component.css']
})
export class BucketDetailsComponent implements OnInit {
  bucket!: Bucket;

  constructor(private route: ActivatedRoute, private bucketService: BucketService) { }

  ngOnInit(): void {
    const bucketIdString = this.route.snapshot.paramMap.get('id');

    if (bucketIdString !== null) {
      const bucketId = +bucketIdString;

      // Load the bucket details when the component initializes
      this.bucketService.getBucket(bucketId).subscribe(
        (data) => (this.bucket = data),
        (error) => console.error('Error fetching bucket:', error)
      );
    } else {
      // Handle the case when the ID is not provided or invalid
      console.error('Bucket ID not provided');
    }
  }
}
