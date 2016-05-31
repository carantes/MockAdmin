/* The PostsDAO must be constructed with a connected database object */
function ModulesDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof ModulesDAO)) {
        console.log('Warning: ModulesDAO constructor called without "new" operator');
        return new ModulesDAO(db);
    }

    var modules = db.collection("modules");
    var ObjectID = require('mongodb').ObjectID; //converte string _id para object ID do MongoDB


    this.getModules = function(idArray, callback) {
        "use strict";

        modules.find({_id : {$in : idArray}}).toArray(function(err, items) {
            "use strict";

            if (err) return callback(err, null);

            console.log('Encontrado ' + items.length + ' modules');

            callback(err, items);
        });
    }

    this.insertModule = function (appID, nome, descricao, callback) {
        "use strict";
        
        // Build a new post
        var entry = {
            "nome": nome,
            "descricao": descricao,
            "date": new Date()
        }

        modules.insert (entry, function (err) {
            "use strict";

            if (err) return callback(err, null);

            callback(err, entry._id);
        });
    }

}

module.exports.ModulesDAO = ModulesDAO;
