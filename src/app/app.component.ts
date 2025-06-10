import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { HeaderNavigationComponent } from './core/components/header-navigation/header-navigation.component';
import { LoadingService } from './core/services/loading.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, HeaderNavigationComponent, CommonModule],
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    console.log('AppComponent initialized');
    
    // Show loading indicator during route transitions
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.showLoading();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadingService.hideLoading();
      }
    });
  }
}
