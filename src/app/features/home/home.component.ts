import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../core/services/hero.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers: [HeroService],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // ngOnInit(): void {
  //   this.heroService.getHeroData().subscribe((data) => {
  //     this.heroData = data;
  //     console.log('Hero Data:', this.heroData);
  //   });
  constructor(private heroService: HeroService) {}
  ngOnInit(): void {
    this.heroService.getHeroData().subscribe((data) => {
      console.log('data', data);
    });
  }
}
