var ModulesDAO = require('../dao/modules').ModulesDAO,
    AppsDAO = require('../dao/apps').ApplicationsDAO,
    sanitize = require('validator').sanitize; // Helper to sanitize form input

/* The ContentHandler must be constructed with a connected db */
function ModulesHandler (db) {
    "use strict";

    var modules = new ModulesDAO(db);
    var apps = new AppsDAO(db);

    this.displayNewModulePage = function(req, res, next) {
        "use strict";

        var appID = req.params.id;

        var title = 'Novo Módulo';
        var action = '/aplicativos/' + appID + '/modulos/novo';

        return res.render('module_form_template', {
            title: title,
            action: action,
            errors: ""
        });
    }

    this.handleNewModule = function(req, res, next) {
        "use strict";

        var appID = req.params.id;
        var nome = req.body.nome;
        var descricao = req.body.descricao;

        if (!nome) {
            var errors = "Campo NOME é obrigatório";
            console.log('errors: ', errors);
            return res.render("module_form_template", {errors:errors});
        }

        modules.insertModule(appID, nome, descricao, function(err, id) {
            "use strict";

            if (err) return next(err);

            console.log('moduleID:', id);

            apps.pushModuleToAppByID(appID, id, function(err) {
                "use strict";

                if (err) return next(err);

                return res.redirect('/aplicativos/' + appID);
            });
        });
    }

}

module.exports = ModulesHandler;
