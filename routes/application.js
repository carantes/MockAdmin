var AppsDAO = require('../dao/apps').ApplicationsDAO,
    ModulesDAO = require('../dao/modules').ModulesDAO,
    sanitize = require('validator').sanitize; // Helper to sanitize form input

/* The ContentHandler must be constructed with a connected db */
function ApplicationHandler (db) {
    "use strict";

    var apps = new AppsDAO(db);
    var modules = new ModulesDAO(db);

    this.displayAppListPage = function(req, res, next) {
        "use strict";

        apps.getApps(10, function(err, results) {
            "use strict";

            if (err) return next(err);

            return res.render('app_list_template', {
                title: 'Aplicativos',
                apps: results
            });
        });
    }

    this.displayNewAppPage = function(req, res, next) {
        "use strict";

        var title = 'Novo App';
        var action = '/aplicativos/novo';

            return res.render('app_form_template', {
            title: title,
            action: action,
            errors: ""
        });
    }

    this.handleNewApp = function(req, res, next) {
        "use strict";

        var nome = req.body.nome;
        var descricao = req.body.descricao;

        if (!nome) {
            var errors = "Campo NOME é obrigatório";
            console.log('errors: ', errors);
            return res.render("app_form_template", {errors:errors});
        }

        apps.insertApp(nome, descricao, function(err, id) {
            "use strict";

            if (err) return next(err);

            console.log('appID:', id);

            return res.redirect("/aplicativos/" + id);
        });
    }


    this.displayAppByID = function(req, res, next) {
        "use strict";

        var appID = req.params.id;
        var acao = req.query.acao;
        var title;
        var action;

        console.log('appID:', appID);

        apps.getAppByID(appID, function(err, item) {
                    "use strict";

            if (err) return next(err);

            if (!item) return res.redirect("/app_not_found");

            switch (acao) {
                case 'editar':
                    console.log('editar');
                    title = 'editar ' + item.nome;
                    action = '/aplicativos/' + appID;

                    return res.render('app_form_template', {
                        title: title,
                        app: item,
                        action: action,
                        errors: ""
                    });

                    break;
                default:
                    console.log('visualizar');
                    title = 'consultar ' + item.nome;

                    modules.getModules (item.modulos, function (err, results) {
                        return res.render('app_view_template', {
                            title: title,
                            app: item,
                            modules: results,
                            errors: ""
                        });
                    })

                    break; 
            }            
        });
    }


    this.handleUpdateAppByID = function(req, res, next) {
        "use strict";

        console.log('update');

        var appID = req.params.id;
        var nome = req.body.nome;
        var descricao = req.body.descricao;

        console.log('nome: ', nome);

        if (!nome) {
            var errors = "Campo NOME é obrigatório";
            console.log('errors: ', errors);
            return res.render("app_form_template", {errors:errors});
        }

        apps.updateAppByID(appID, nome, descricao, function(err) {
            "use strict";

            if (err) return next(err);

            return res.redirect("/aplicativos");
        });
    }

    this.handleRemoveAppByID = function(req, res, next) {
        "use strict";

        console.log('remove');

        var appID = req.params.id;
        
        apps.deleteAppByID(appID, function(err) {
            "use strict";

            if (err) return next(err);

            return res.redirect("/aplicativos");
        });
    }
}

module.exports = ApplicationHandler;
