import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../core/services/hero.service';
import { Hero } from '../../core/interfaces/hero.interface';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../core/services/base.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  providers: [HeroService],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private baseService: BaseService
  ) {}
  data!: Hero;

  ngOnInit(): void {
    this.heroService.getHeroData().subscribe({
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
