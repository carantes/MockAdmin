var //SessionHandler = require('./session'),
    ApplicationHandler = require('./application'),
    ModuleHandler = require('./module'),
    ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    //var sessionHandler = new SessionHandler(db);
    var appHandler = new ApplicationHandler(db);

    // Middleware to see if a user is logged in
    //app.use(sessionHandler.isLoggedInMiddleware);

    // Main Page
    app.get('/', function (req, res) {
        res.redirect ('/aplicativos');
    });
    
    //Aplicativos
    //Lista
    app.get('/aplicativos', appHandler.displayAppListPage);

    //Novo
    app.get('/aplicativos/novo', appHandler.displayNewAppPage);
    app.post('/aplicativos/novo', appHandler.handleNewApp);

    //Alterar
    app.get('/aplicativos/:id', appHandler.displayAppByID);
    app.post('/aplicativos/:id', appHandler.handleUpdateAppByID);

    //Excluir
    app.get('/aplicativos/:id/excluir', appHandler.handleRemoveAppByID);


    var moduleHandler = new ModuleHandler(db);

    //Módulos
    //Novo
    app.get('/aplicativos/:id/modulos/novo', moduleHandler.displayNewModulePage);
    app.post('/aplicativos/:id/modulos/novo', moduleHandler.handleNewModule);

    //Alterar
    //app.get('/aplicativos/:id/modulos/:moduloID', contentHandler.displayModuleByID);
    //app.post('/aplicativos/:id/modulos/:moduloID', contentHandler.handleUpdateModuleByID);

    //Excluir
    //app.get('/aplicativos/:id/modulos/:moduloID/excluir', contentHandler.handleRemoveModuleByID);

    // Login form
    //app.get('/login', sessionHandler.displayLoginPage);
    //app.post('/login', sessionHandler.handleLoginRequest);

    // Logout page
    //app.get('/logout', sessionHandler.displayLogoutPage);

    // Welcome page
    //app.get("/welcome", sessionHandler.displayWelcomePage);

    // Error handling middleware
    app.use(ErrorHandler);
}
