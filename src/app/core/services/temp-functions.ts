  /**
   * Normalize card item properties to ensure consistent property names
   */
  private normalizeCardItem(item: any): HomepageCardItem {
    return {
      tiletitle: item.tiletitle || item.title || '',
      title: item.tiletitle || item.title || '',
      
      tileText: item.tileText || item.text || item.description || '',
      text: item.tileText || item.text || item.description || '',
      description: item.tileText || item.text || item.description || '',
      
      tileImage: item.tileImage || item.image || { path: '', title: '', mime: '' },
      image: item.tileImage || item.image || { path: '', title: '', mime: '' }
    };
  }
  
  private normalizeCardItems(items: any[]): HomepageCardItem[] {
    return items.map(item => this.normalizeCardItem(item));
  }
