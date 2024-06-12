import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header-navigation',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [NavigationService],
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss'],
})
export class HeaderNavigationComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService.getNavigation().subscribe((data) => {
      console.log('data', data);
    });
  }
}
