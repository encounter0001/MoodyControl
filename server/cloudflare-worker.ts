import express from 'express';
import { registerRoutes } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mock session middleware for Workers
app.use((req, res, next) => {
  if (!req.session) {
    req.session = {
      userId: undefined,
      accessToken: undefined,
    };
  }
  next();
});

// Register all API routes
registerRoutes({} as any, app);

// Export for Cloudflare Workers
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    // API routes
    if (url.pathname.startsWith('/api/')) {
      return new Promise((resolve) => {
        const req = {
          method: request.method,
          url: url.pathname + url.search,
          headers: Object.fromEntries(request.headers),
          query: Object.fromEntries(url.searchParams),
          path: url.pathname,
          session: {
            userId: undefined,
            accessToken: undefined,
          },
          body: {} as any,
        };

        let body = '';
        if (request.method !== 'GET') {
          request.text().then((text) => {
            try {
              req.body = JSON.parse(text);
            } catch {
              req.body = {};
            }
            
            // Create a simple response handler
            const res = {
              statusCode: 200,
              headers: { 'Content-Type': 'application/json' },
              json: (data: any) => {
                resolve(new Response(JSON.stringify(data), {
                  status: res.statusCode,
                  headers: res.headers,
                }));
              },
              status: (code: number) => {
                res.statusCode = code;
                return res;
              },
              redirect: (url: string) => {
                resolve(new Response(null, {
                  status: 302,
                  headers: { Location: url },
                }));
              },
            };

            // Call the Express middleware/routes
            app._router.handle(req, res);
          });
        } else {
          const res = {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            json: (data: any) => {
              resolve(new Response(JSON.stringify(data), {
                status: res.statusCode,
                headers: res.headers,
              }));
            },
            status: (code: number) => {
              res.statusCode = code;
              return res;
            },
            redirect: (url: string) => {
              resolve(new Response(null, {
                status: 302,
                headers: { Location: url },
              }));
            },
          };

          app._router.handle(req, res);
        }
      });
    }

    // Serve static files or fallback to index.html
    return new Response('404 Not Found', { status: 404 });
  },
};
