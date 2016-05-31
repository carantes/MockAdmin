/* The PostsDAO must be constructed with a connected database object */
function ApplicationsDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof ApplicationsDAO)) {
        console.log('Warning: ApplicationDAO constructor called without "new" operator');
        return new ApplicationsDAO(db);
    }

    var apps = db.collection("apps");
    var ObjectID = require('mongodb').ObjectID; //converte string _id para object ID do MongoDB


    this.getApps = function(num, callback) {
        "use strict";

        apps.find().limit(num).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

            console.log('Encontrado ' + items.length + ' apps');

            callback(err, items);
        });
    }


    this.getAppByID = function(id, callback) {
        "use strict";

        //TODO: Validar ID antes de passar para o BD
        var oid = new ObjectID(id);

        apps.findOne({'_id': oid}, function(err, item) {
            "use strict";

            if (err) return callback(err, null);

            console.log('Encontrado item: ', item);

            callback(err, item);
        });
    }

    this.insertApp = function (nome, descricao, callback) {
        "use strict";
        
        // Build a new post
        var entry = {
            "nome": nome,
            "descricao": descricao,
            "data": new Date()
        }

        apps.insert (entry, function (err) {
            "use strict";

            if (err) return callback(err, null);

            callback(err, entry._id);
        });
    }

    this.updateAppByID = function (id, nome, descricao, callback) {
        "use strict";

        //TODO: Validar ID antes de passar para o BD
        var oid = new ObjectID(id);

        apps.update({'_id': oid}, {$set: {nome : nome, descricao : descricao}}, function(err) {
            "use strict";

            if (err) return callback(err);

            callback(null);
        });
    }

    this.pushModuleToAppByID = function (appID, moduleID, callback) {
        "use strict";

        //TODO: Validar ID antes de passar para o BD
        var oAppID = new ObjectID(appID);
        var oModuleID = new ObjectID(moduleID);
        
        apps.update({'_id': oAppID}, {$push: {modulos: oModuleID} }, function(err) {
            "use strict";

            if (err) return callback(err);

            callback(null);
        });
    }

    this.deleteAppByID = function (id, callback) {
        "use strict";

        //TODO: Validar ID antes de passar para o BD
        var oid = new ObjectID(id);

        apps.deleteOne({'_id': oid}, function(err) {
            "use strict";

            if (err) return callback(err);

            callback(null);
        });
    }

}

module.exports.ApplicationsDAO = ApplicationsDAO;
