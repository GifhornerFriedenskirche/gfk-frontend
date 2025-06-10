// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { NavigationService } from '../../services/navigation.service';

// @Component({
//   selector: 'app-header-navigation',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   providers: [NavigationService],
//   templateUrl: './header-navigation.component.html',
// })
// export class HeaderNavigationComponent implements OnInit {
//   constructor(private navigationService: NavigationService) {}

//   ngOnInit(): void {
//     this.navigationService.getNavigationPages().subscribe((data) => {
//       console.log('getNavigationPages', data);
//     });
//     this.navigationService.getNavigationMenus().subscribe((data) => {
//       console.log('getNavigationMenus', data);
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { Link, NavigationMenu } from '../../interfaces/menu.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-navigation.component.html',
})
export class HeaderNavigationComponent implements OnInit {
  menuItems: Link[] = [];

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    console.log('🧭 HeaderNavigation ngOnInit started');

    this.navigationService.getNavigationMenus().subscribe({
      next: (data: NavigationMenu[]) => {
        console.log('✅ Navigation data received:', data);
        this.menuItems = data[0].links;
      },
      error: (error) => {
        console.error('❌ Navigation error:', error);
        console.error('❌ Navigation error details:', error.error);
      },
    });
  }
}
