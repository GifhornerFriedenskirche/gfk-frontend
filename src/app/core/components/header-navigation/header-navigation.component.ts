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
import { HttpClientModule } from '@angular/common/http';
import { NavigationService } from '../../services/navigation.service';
import { Link, NavigationMenu } from '../../interfaces/menu.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-navigation',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [NavigationService],
  templateUrl: './header-navigation.component.html',
})
export class HeaderNavigationComponent implements OnInit {
  menuItems: Link[] = [];

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService
      .getNavigationMenus()
      .subscribe((data: NavigationMenu[]) => {
        console.log('data', data);
        this.menuItems = data[0].links;
      });
  }
}
