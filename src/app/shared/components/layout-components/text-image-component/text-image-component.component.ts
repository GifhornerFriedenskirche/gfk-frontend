import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  PageLayoutComponent,
  PageLayoutComponentData,
} from '../../../../core/interfaces/page.interface';
import { BaseService } from '../../../../core/services/base.service';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-text-image-component',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeHtmlPipe],
  templateUrl: './text-image-component.component.html',
  styleUrls: ['./text-image-component.component.scss'],
})
export class TextImageComponent implements OnInit {
  @Input() component!: PageLayoutComponent;
  @Input() set index(value: number) {
    this._index = typeof value === 'number' ? value : 0;
    // Update isReversed when index changes
    this.updateReversedState();
  }

  get index(): number {
    return this._index;
  }

  private _index = 0; // Internal index storage

  isReversed = false;
  private readonly baseService = inject(BaseService);

  ngOnInit(): void {
    // Update reversed state on initialization
    this.updateReversedState();
    console.log(
      `TextImageComponent ${this.component.id}: index=${this._index}, isReversed=${this.isReversed}`
    );
  }

  /**
   * Update the reversed state based on the index
   * Even indices (0, 2, 4...) have standard layout (image left, text right)
   * Odd indices (1, 3, 5...) have reversed layout (text left, image right)
   */
  private updateReversedState(): void {
    // Ensure we're working with a valid number
    const indexValue = typeof this._index === 'number' ? this._index : 0;

    // Odd indices should have reversed layout
    this.isReversed = indexValue % 2 === 1;

    // Log the updated state for debugging
    console.log(
      `TextImageComponent ${this.component?.id}: Updated index=${indexValue}, isReversed=${this.isReversed}`
    );

    // Debug output to the console in a more visible format
    console.warn(
      `⚠️ TextImage Layout: index=${indexValue}, ${
        this.isReversed ? 'REVERSED' : 'STANDARD'
      }`
    );
  }

  /**
   * Check if the component has valid content
   */
  hasValidContent(): boolean {
    return !!(this.getTitle() && this.getText() && this.getImage());
  }

  /**
   * Get the component title
   */
  getTitle(): string {
    return (
      ((this.component?.data as PageLayoutComponentData)?.[
        'title'
      ] as string) || ''
    );
  }

  /**
   * Get the component text content
   */
  getText(): string {
    return (
      ((this.component?.data as PageLayoutComponentData)?.['text'] as string) ||
      ''
    );
  }

  /**
   * Get the button text if available
   */
  getButtonText(): string {
    return (
      ((this.component?.data as PageLayoutComponentData)?.[
        'buttonText'
      ] as string) || ''
    );
  }

  /**
   * Get the button link if available
   */
  getButtonLink(): string {
    return (
      ((this.component?.data as PageLayoutComponentData)?.[
        'buttonLink'
      ] as string) || ''
    );
  }

  /**
   * Check if the component has a valid button
   */
  hasButton(): boolean {
    return !!(this.getButtonText() && this.getButtonLink());
  }

  /**
   * Get the image path if available
   */
  getImage(): string {
    const data = this.component?.data as PageLayoutComponentData;
    const image = (data?.['image'] as unknown as { path?: string }) || {};
    const asset = (data?.['asset'] as unknown as { path?: string }) || {};

    const imagePath = image?.path || asset?.path;

    if (!imagePath) return '';

    return `${this.baseService.getBaseImagePathUrl()}${imagePath}`;
  }

  /**
   * Get the image alt text
   */
  getImageAlt(): string {
    const data = this.component?.data as PageLayoutComponentData;
    const image = (data?.['image'] as unknown as { title?: string }) || {};
    const asset = (data?.['asset'] as unknown as { title?: string }) || {};

    return (
      image?.title ||
      asset?.title ||
      (data?.['imageAlt'] as string) ||
      this.getTitle()
    );
  }
}
