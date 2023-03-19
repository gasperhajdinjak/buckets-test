import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  private initialData: any;

  constructor() { }

  createDb() {
    const buckets = [
      {
        id: "1",
        name: "BestStorage",
        location: "Ljubljana",
        files: [
          {
            id: "file1",
            name: "file1.txt",
            lastModified: "2023-03-16T00:00:00.000Z",
            size: 1024,
          },
        ],
      },
      {
        id: "2",
        name: "Pics",
        location: "Kranj",
        files: [
          {
            id: "file2",
            name: "image1.jpg",
            lastModified: "2023-03-16T00:00:00.000Z",
            size: 2048,
          },
        ],
      },
    ];

    return { buckets };
  }


  // getInitialData(): any {
  //   return JSON.parse(JSON.stringify(this.initialData));
  // }
}
