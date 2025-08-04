// server.js
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

// /!\ Bind the router db to the app
server.db = router.db;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add auth middleware
server.use(auth);

// Add custom routes before JSON Server router
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

// Use default router
server.use(router);

// Start server
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});