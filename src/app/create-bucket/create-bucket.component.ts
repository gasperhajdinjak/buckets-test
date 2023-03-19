import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BucketService } from '../services/bucket.service';
import { NewBucket } from '../interfaces/newBucket';
import { NgForm } from '@angular/forms';

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

  @Output() bucketCreated = new EventEmitter<void>();

  constructor(private bucketService: BucketService) { }

  ngOnInit(): void {
  }

  onSubmit(event: Event, form: NgForm): void {
    event.preventDefault();
    this.bucketService.createBucket(this.newBucket).subscribe(res => {
      this.bucketService.getBuckets();
      this.newBucket.name = '';
      this.newBucket.location = '';
      this.bucketCreated.emit();
    });
  }
}
