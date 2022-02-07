// ---------------------------------------------------
// Imports
const oracledb = require('oracledb');
// Configs
const DBConfig = require('../config/database_config')
// ---------------------------------------------------
let connection
// ---------------------------------------------------
// 1.Fun : Connect to DB
async function makeConnection() {
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
  // start : Connecting to DB
  try {
    connection = await oracledb.getConnection({
      user: DBConfig.USER,
      password: DBConfig.PASSWORD,
      connectString: DBConfig.CONNECTIONSTRING
    })
    console.log('ORACLE Connection Success')
    return true
  }
  catch (err) {
    console.log('ORACLE Connection Error')
    console.error(err)
    return false
  }
  // end : Connecting to DB
} // end of makeConnection()

// 2.FUN: Close Connection
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

// 3. Fun : to execute any query
async function executeSelectQuery(query) {
  let result
  // Step 1 : Make Connection
  connect = await makeConnection()
  // Step 2-A: If SUCCESS then return Result
  console.log(connect)
  if(connect) {
    const queryResult = await connection.execute(query);
    result = queryResult.rows
  }
  // Step 2-B: If FAIL then return Result
  else {
    result = []
  }
  // Step 3 : Closing connection
  await closeConnection()
  // Step 4 : Returning result
  return result
} // end of executeSelect()

// 4. Fun to select with where
async function executeSelectQueryWithParam(query,par_array) {
  let result
  // Step 1 : Make Connection
  connect = await makeConnection()
  // Step 2-A: If SUCCESS then return Result
  console.log(connect)
  if(connect) {
    const queryResult = await connection.execute(query,par_array);
    result = queryResult.rows
  }
  // Step 2-B: If FAIL then return Result
  else {
    result = []
  }
  // Step 3 : Closing connection
  await closeConnection()
  // Step 4 : Returning result
  return result
} // end of executeSelectWhere()

// 5. Fun : Execute insert,del and update queries
async function executeQuery() {
  let result
  // Step 1 : Make Connection
  connect = await makeConnection()
  // Step 2-A: If SUCCESS then return Result
  console.log(connect)
  if(connect) {
    const queryResult = await connection.execute(query,par_array,{ autoCommit: true})
    result = true
  }
  // Step 2-B: If FAIL then return Result
  else {
    result = false
  }
  // Step 3 : Closing connection
  await closeConnection()
  // Step 4 : Returning result
  return result
} // end of execute()

module.exports = {
    select : executeSelectQuery,
    selectWithParam : executeSelectQueryWithParam,
    execute : executeQuery
}
