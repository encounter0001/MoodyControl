import { registerRoutes } from "./routes";
import { Router } from "express";
import express from "express";

// Create a minimal Express-compatible app for Workers
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mock session for Workers environment
app.use((req, res, next) => {
  if (!req.session) {
    req.session = {
      userId: undefined,
      accessToken: undefined,
    };
  }
  next();
});

registerRoutes(app);

// Export for Cloudflare Workers
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    // Only handle /api/* routes
    if (!url.pathname.startsWith("/api/")) {
      return new Response("Not Found", { status: 404 });
    }

    // Create a mock Express request/response
    const req = {
      method: request.method,
      url: url.pathname + url.search,
      headers: Object.fromEntries(request.headers),
      body: request.method !== "GET" ? await request.json().catch(() => ({})) : {},
      session: {
        userId: undefined,
        accessToken: undefined,
      },
    };

    let responseStatus = 200;
    let responseHeaders = new Headers({ "Content-Type": "application/json" });
    let responseBody: any = null;

    // Simple routing logic - delegate to Express routes
    try {
      const routeHandler = getRouteHandler(app, req.method, url.pathname);
      if (routeHandler) {
        responseBody = await routeHandler(req);
      } else {
        responseStatus = 404;
        responseBody = { error: "Not Found" };
      }
    } catch (error: any) {
      responseStatus = 500;
      responseBody = { error: error.message || "Internal Server Error" };
    }

    return new Response(JSON.stringify(responseBody), {
      status: responseStatus,
      headers: responseHeaders,
    });
  },
};

// Helper to route requests through Express app
function getRouteHandler(app: any, method: string, path: string) {
  // This is a simplified routing - in production, you'd want to properly integrate Express
  // For now, we'll call the actual route handlers
  const router = app._router;
  if (!router) return null;

  // Find matching route
  for (const layer of router.stack) {
    if (layer.route) {
      const routePattern = layer.route.path;
      if (pathMatches(routePattern, path) && layer.route.methods[method.toLowerCase()]) {
        return layer.route.stack[0].handle;
      }
    }
  }
  return null;
}

function pathMatches(pattern: string, path: string): boolean {
  // Simple path matching - can be enhanced
  return pattern === path || pattern.includes(":") && path.includes(pattern.split(":")[0]);
}
