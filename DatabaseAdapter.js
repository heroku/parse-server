// Database Adapter
//
// Allows you to change the underlying database.
//
// Adapter classes must implement the following methods:
// * a constructor with signature (connectionString, optionsObject)
// * connect()
// * loadSchema()
// * create(className, object)
// * find(className, query, options)
// * update(className, query, update, options)
// * destroy(className, query, options)
// * This list is incomplete and the database process is not fully modularized.
//
// Default is ExportAdapter, which uses mongo.

var ExportAdapter = require('./ExportAdapter');

var adapter = ExportAdapter;
var cache = require('./cache');
var dbConnections = {};
var databaseURI = 'mongodb://localhost:27017/parse';

function setAdapter(databaseAdapter) {
  adapter = databaseAdapter;
}

function setDatabaseURI(uri) {
  databaseURI = uri;
}

function getDatabaseConnection(appId) {
  if (dbConnections[appId]) {
    return dbConnections[appId];
  }
  dbConnections[appId] = new adapter(databaseURI, {
    collectionPrefix: cache.apps[appId]['collectionPrefix']
  });
  dbConnections[appId].connect();
  return dbConnections[appId];
}

module.exports = {
  dbConnections: dbConnections,
  getDatabaseConnection: getDatabaseConnection,
  setAdapter: setAdapter,
  setDatabaseURI: setDatabaseURI
};
