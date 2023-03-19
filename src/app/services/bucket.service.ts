import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { NewBucket } from '../interfaces/newBucket';
import { Bucket } from '../interfaces/bucket';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
  private bucketsUrl = 'api/buckets/';
  public allBuckets$ = new BehaviorSubject<Bucket[]>([]);

  constructor(private http: HttpClient) { }

  // Get all buckets
  getBuckets(): void {
    this.http.get<Bucket[]>(this.bucketsUrl).subscribe(
      res => this.allBuckets$.next(res)
    );
  }

  // Get a specific bucket by ID
  getBucket(id: string): Observable<any> {
    return this.http.get<any[]>(this.bucketsUrl).pipe(
      map(buckets => { return buckets.find(bucket => bucket.id === id) })
    );
  }

  createBucket(newBucket: NewBucket): Observable<Bucket> {
    const backetToSave: Bucket = {
      id: uuidv4(),
      name: newBucket.name,
      location: newBucket.location,
      files: []
    }
    return this.http.post<Bucket>(this.bucketsUrl, backetToSave).pipe(
      tap(bucket => {
        const currentBuckets = this.allBuckets$.getValue();
        this.allBuckets$.next([bucket, ...currentBuckets]);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  deleteBucket(id: String) {
    return this.http.delete(this.bucketsUrl + id)
  }

  addFile(bucketId: string, file: File): Observable<Bucket | undefined> {
    const newFile = {
      fileId: uuidv4(),
      name: file.name,
      lastModified: new Date().toISOString(),
      size: file.size,
    };

    const currentBuckets = this.allBuckets$.getValue();
    const updatedBuckets = currentBuckets.map(bucket => {
      if (bucket.id === bucketId) {
        return { ...bucket, files: [...bucket.files, newFile] };
      }
      return bucket;
    });
    this.allBuckets$.next(updatedBuckets);

    return of(updatedBuckets.find(bucket => bucket.id === bucketId));
  }



  deleteFile(bucketId: string, fileId: string): Observable<Bucket | undefined> {
    const currentBuckets = this.allBuckets$.getValue();
    const updatedBuckets = currentBuckets.map(bucket => {
      if (bucket.id === bucketId) {
        const updatedFiles = bucket.files.filter(file => file.fileId !== fileId);
        return { ...bucket, files: updatedFiles };
      }
      return bucket;
    });
    this.allBuckets$.next(updatedBuckets);

    return of(updatedBuckets.find(bucket => bucket.id === bucketId));
  }

}
