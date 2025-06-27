// Test script to log the API response structure
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-test-api',
  standalone: true,
  imports: [CommonModule],
  template: '<div>API Test</div>',
})
export class TestApiComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const baseUrl = environment.apiBaseUrl;
    const endpointItem = `${baseUrl}/api/content/item/homepageContentModel`;
    const endpointItems = `${baseUrl}/api/content/items/homepageContentModel`;

    this.http.get(endpointItem).subscribe({
      next: () => {
        // API response received - item endpoint
      },
      error: () => {
        // Error occurred - item endpoint
      },
    });

    this.http.get(endpointItems).subscribe({
      next: () => {
        // API response received - items endpoint
      },
      error: () => {
        // Error occurred - items endpoint
      },
    });
  }
}
