// ---------------------------------------------------
// Imports
const oracledb = require('oracledb');
const bodyParser= require('body-parser')
// Configs
const DBConfig = require('../config/database_config')
// ---------------------------------------------------
let connection
// ---------------------------------------------------

// Initalizing ORACLE Client
async function init() {
  // start : Instant Client Code
  try {
    oracledb.initOracleClient({
      libDir: 'C:\\Users\\PC\\Downloads\\Compressed\\New folder\\instantclient_21_3'
    })
    console.log("ORACLE Instant Client Success")
  }
  catch (err) {
    console.log('ORACLE Instant Client Error');
    console.error(err);
    process.exit(1);
  }
  // end : Instant Client Code
  oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
} // end of init()

// Create Connection on Basis of Pool
async function makeConnection() {
  try {
    let defaultPool = oracledb.getPool(DBConfig.POOL_ALIAS)
    if(defaultPool) {
      connection = await defaultPool.getConnection()
      console.log('ORACLE Old Pool Used')
      return true
    }
  }
  catch(err) {
    // If pool does not exists
    console.log(err.toString().match('NJS-047'))
    if (err.toString().match('NJS-047')) {
      await oracledb.createPool({
        user: DBConfig.USER,
        password: DBConfig.PASSWORD,
        connectString: DBConfig.CONNECTIONSTRING,
        poolAlias: DBConfig.POOL_ALIAS
      })
      connection = await oracledb.getConnection(DBConfig.POOL_ALIAS)
      console.log('ORACLE New Pool Created')
      return true
    }
    else {
      throw new Error(err);
    }
  } // end of catch
} // end of makeConnection()

// FUN: Close Connection
async function closeConnection() {
  if (connection) {
    try {
      await connection.close()
      console.log('ORACLE Connection Closing Success')
    }
    catch (err) {
      console.log('ORACLE Connection Closing Failed')
      console.error(err);
    }
  }
}

// Fun : to execute any query
async function executeSelectQuery(query) {
  let result
  // Step 1 : Make Connection
  connect = await makeConnection()

  // Step 2-A: If SUCCESS then return Result
  if(connect) {
    const queryResult = await connection.execute(query);
    result = queryResult.rows
  }
  // Step 2-B: If FAIL then return Result
  else {
    result = []
  }
  // Step 3 : Closing Connection
  closeConnection()
  // Step 4 : Returning result
  return result
} // end of executeSelect()

// 3. Fun to select with where
async function executeSelectQueryWithParam(query,par_array) {
  let result
  let connect
  // Step 1 : Make Connection
  connect = await makeConnection()
  // Step 2-A: If SUCCESS then return Result
  if(connect) {
    const queryResult = await connection.execute(query,par_array);
    result = queryResult.rows
  }
  // Step 2-B: If FAIL then return Result
  else {
    result = []
  }
  // Step 3 : Closing Connection
  closeConnection()
  // Step 4 : Returning result
  return result
} // end of executeSelectWhere()

// 4. Fun : Execute insert,del and update queries
async function executeQuery(query,par_array) {
  let result
  // Step 1 : Make Connection
  connect = await makeConnection()
  // Step 2-A: If SUCCESS then return Result
  console.log(connect)
  if(connect) {
    const queryResult = await connection.execute(query,par_array,{ autoCommit: true});
    result = true
  }
  // Step 2-B: If FAIL then return Result
  else {
    result = false
  }
  // Step 3 : Closing Connection
  closeConnection()
  // Step 4 : Returning result
  return result
} // end of execute()

// Initializing ORACLE Instant client
init()

module.exports = {
    select : executeSelectQuery,
    selectWithParam : executeSelectQueryWithParam,
    execute : executeQuery
}
