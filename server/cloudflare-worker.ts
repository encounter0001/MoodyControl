/**
 * Simple Cloudflare Worker that proxies API requests
 * This is a minimal Worker without Express dependencies that cause compatibility issues
 */

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle API requests
    if (url.pathname.startsWith('/api/')) {
      // Get backend URL from environment or fallback to a default
      const backendUrl = env.BACKEND_URL || 'http://localhost:3000';
      
      try {
        // Proxy the request to the backend
        const proxyRequest = new Request(
          backendUrl + url.pathname + url.search,
          {
            method: request.method,
            headers: request.headers,
            body: request.body,
          }
        );

        const response = await fetch(proxyRequest);
        
        // Return the backend response with proper CORS headers
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: new Headers({
            ...Object.fromEntries(response.headers.entries()),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }),
        });
      } catch (error) {
        return new Response(
          JSON.stringify({
            error: 'Failed to connect to backend',
            message: error instanceof Error ? error.message : 'Unknown error',
          }),
          {
            status: 503,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    }

    // Handle OPTIONS requests for CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // Default: return 404
    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
