// Test script to log the API response structure
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-test-api',
  standalone: true,
  imports: [CommonModule],
  template: '<div>API Test</div>'
})
export class TestApiComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const baseUrl = environment.apiBaseUrl;
    const endpointItem = `${baseUrl}/api/content/item/homepageContentModel`;
    const endpointItems = `${baseUrl}/api/content/items/homepageContentModel`;

    console.log('Testing /api/content/item endpoint:');
    this.http.get(endpointItem).subscribe({
      next: (response) => console.log('Item response:', response),
      error: (err) => console.error('Item error:', err)
    });

    console.log('Testing /api/content/items endpoint:');
    this.http.get(endpointItems).subscribe({
      next: (response) => console.log('Items response:', response),
      error: (err) => console.error('Items error:', err)
    });
  }
}
