/**
   * Get homepage content data
   * @returns Observable of HomepageContentApiResponse
   */
  getHomepageContentData(): Observable<HomepageContentApiResponse> {
    const modelName = 'homepageContentModel';
    
    return this.http
      .get<any>(`${this.apiEndpoint}/${modelName}`)
      .pipe(
        map((response: any) => {
          // Handle both the old format (single tile) and new format (array of tiles)
          if (Array.isArray(response)) {
            // If the API is directly returning an array of tiles
            return { tiles: response } as HomepageContentApiResponse;
          } else if (response && 'tiles' in response && Array.isArray(response.tiles)) {
            // If the API is already returning the correct format
            return response as HomepageContentApiResponse;
          } else if (response) {
            // If the API is returning a single tile, wrap it in an array
            return { tiles: [response] } as HomepageContentApiResponse;
          } else {
            // Fallback for empty response
            return { tiles: [] } as HomepageContentApiResponse;
          }
        }),
        catchError((error) => this.errorHandler.handleHttpError(error))
      );
  }
