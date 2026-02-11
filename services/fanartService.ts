import { FanartItem } from '../types';

// In a real production build, this file would be in the public folder.
// For this environment, we assume relative path works or we mock it if file fetch fails.
export const fetchFanarts = async (): Promise<FanartItem[]> => {
  try {
    const response = await fetch('./fanarts.json');
    if (!response.ok) {
      throw new Error('Failed to load fanarts configuration');
    }
    const data = await response.json();
    return data as FanartItem[];
  } catch (error) {
    console.error("Error fetching fanarts:", error);
    // Fallback for demo purposes if the JSON file isn't served correctly in some dev environments
    return [
      {
        id: "demo-1",
        imageUrl: "https://picsum.photos/seed/demo1/500/500",
        artistName: "System Error (Demo Mode)",
        artistUrl: "#",
        dateAdded: new Date().toISOString()
      }
    ];
  }
};