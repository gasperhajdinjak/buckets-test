import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bucket } from '../interfaces/bucket';
import { BucketService } from '../services/bucket.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.component.html',
  styleUrls: ['./bucket-details.component.css']
})
export class BucketDetailsComponent implements OnInit {
  bucket: Bucket = { id: '', name: '', location: '', files: [] };
  selectedFileId: string | null = null;
  selectedView: string = 'files';

  constructor(private route: ActivatedRoute, private bucketService: BucketService, private router: Router) { }


  //hook, ki se pokliče, ko se komponenta inicializra
  ngOnInit(): void {
    this.getBucket();
  }

  //fetchanje bucketa
  getBucket(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.bucketService.getBucket(id).subscribe(bucket => this.bucket = bucket);
    }
  }

  //metoda, ki naloženo datoteko sharni kot HTML element
  onUploadButtonClick(): void {
    const fileUploadInput = document.getElementById('fileUploadInput') as HTMLInputElement;
    fileUploadInput.click();
  }

  //metoda, ki hendla ibran file in ga uploada na API
  onFileSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const file = files[0];
      this.bucketService.addFile(this.bucket.id, file).subscribe((updatedBucket) => {
        if (updatedBucket) {
          this.bucket = updatedBucket;
        }
      });
    }
  }

  selectFile(fileId: string): void {
    if (this.selectedFileId === fileId) {
      this.selectedFileId = null;
    } else {
      this.selectedFileId = fileId;
    }
  }

  //metoda, ki izbriše izbrano datoteko
  deleteFile(): void {
    if (this.selectedFileId) {
      if (confirm('Do you really want to delete this object?')) {
        this.bucketService.deleteFile(this.bucket.id, this.selectedFileId).subscribe(() => {
          this.bucketService.getBucket(this.bucket.id).subscribe(bucket => {
            this.bucket = bucket;
            this.selectedFileId = null;
          });
        });
      }
    } else {
      alert('Please select a file to delete.');
    }
  }


  trackByFileId(index: number, file: any): string {
    return file.fileId;
  }



  deleteBucket(id: string): void {
    if (confirm('Do you really want to delete this bucket?')) {
      this.bucketService.deleteBucket(this.bucket.id).subscribe(() => {
        // Navigate back to the main page after the bucket is deleted
        this.router.navigate(['/']);
      });
    }
  }
  //metoda, ki izdračuna velikost vseh datotek v bucketu
  getBucketSize(): number {
    return this.bucket.files.reduce((total, file) => total + file.size, 0);
  }

}
