// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-unsere-gemeinde',
//   standalone: true,
//   imports: [],
//   templateUrl: './unsere-gemeinde.component.html',
// })
// export class UnsereGemeindeComponent {}

import { Component, OnInit } from '@angular/core';
// import { HeroService } from '../../core/services/hero.service';
import { Hero } from '../../core/interfaces/hero.interface';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../core/services/base.service';
import { PageService } from '../../core/services/page.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  providers: [PageService],
  templateUrl: './unsere-gemeinde.component.html',
})
export class UnsereGemeindeComponent implements OnInit {
  constructor(
    // private heroService: HeroService,
    private pageService: PageService,
    private baseService: BaseService
  ) {}
  data!: Hero;

  ngOnInit(): void {
    this.pageService.getHeroData().subscribe({
      next: (heroData: Hero) => {
        console.log('heroData', heroData);
        this.data = heroData;
        // this.heroData = data;
      },
    });
  }

  getFullImagePath(path: string): string {
    return `${this.baseService.getBaseImagePathUrl()}${path}`;
  }
}

// export class UnsereGemeindeComponent {}
