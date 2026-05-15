const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface FetchOptions extends RequestInit {
  tags?: string[];
}

export async function fetchPayload<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { tags = [], ...fetchOptions } = options;

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      next: {
        revalidate: 60,
        tags,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

export async function getPages() {
  return fetchPayload('/payload/collections/pages', {
    tags: ['pages'],
  });
}

export async function getServices() {
  return fetchPayload('/payload/collections/services', {
    tags: ['services'],
  });
}

export async function getPortfolio() {
  return fetchPayload('/payload/collections/portfolio', {
    tags: ['portfolio'],
  });
}

export async function getTeam() {
  return fetchPayload('/payload/collections/team', {
    tags: ['team'],
  });
}

export async function getTestimonials() {
  return fetchPayload('/payload/collections/testimonials', {
    tags: ['testimonials'],
  });
}

export async function getSiteSettings() {
  return fetchPayload('/payload/globals/site-settings', {
    tags: ['site-settings'],
  });
}

export async function getNavigation() {
  return fetchPayload('/payload/globals/navigation', {
    tags: ['navigation'],
  });
}

export async function getFooter() {
  return fetchPayload('/payload/globals/footer', {
    tags: ['footer'],
  });
}
