import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators'
import { NewBucket } from '../interfaces/newBucket';
import { Bucket } from '../interfaces/bucket';
//const fs = require("fs");

import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
  private bucketsUrl = 'assets/buckets.json';

  constructor(private http: HttpClient) { }

  // Get all buckets
  getBuckets(): Observable<any[]> {
    return this.http.get<any[]>(this.bucketsUrl);
  }

  // Get a specific bucket by ID
  getBucket(id: number): Observable<any> {
    return this.http.get<any[]>(this.bucketsUrl).pipe(
      map(buckets => buckets.find(bucket => bucket.id === id))
    );
  }

  saveBucket(newBucket: NewBucket): void {
    this.getBuckets().subscribe(async (buckets: Bucket[]) => {
      newBucket.id = buckets.length + 1;
      console.log(buckets)
      this.http.put(this.bucketsUrl, newBucket);
      await fs.writeFile(this.bucketsUrl, JSON.stringify(newBucket), 'utf8', () => { });
    });
    // this.http.post(bucket)
  }

}
