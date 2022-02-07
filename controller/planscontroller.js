// ---------------------------------------------------
// Imports
const database_pool = require('../modules/database_pool')
// ---------------------------------------------------

const getAllPlans = async (req,res) => {
  result = await database_pool.select("select * from NAYATELUSER.Mursleen_plans where status='ACTIVE' order by id desc")
  // result = await database_pool.selectWithParam(`select * from userplans where planname = :planname and rownum<10`,['POTS'])
  // result = await database_pool.selectWithParam(`select * from userplans where planname = :planname and rownum<10`,['POTS'])
  res.send(result)
}

const createNewPlan = async (req,res) => {
  const reqData = req.body
  result = await database_pool.execute(`INSERT INTO NAYATELUSER.Mursleen_plans(ID,NAME,PRICE,STATUS) VALUES(NAYATELUSER.Mursleen_plans_ID_SEQ.NEXTVAL,:name,:price,:status)`,
  [reqData.name,reqData.price,'ACTIVE'])
  res.send(result)
}

const getPlanById = async (req,res) => {
  const id = req.params.id
  const foundPlan = await database_pool.selectWithParam(`select * from NAYATELUSER.Mursleen_plans where id = :id and status = :status`,[id,'ACTIVE'])
  res.send(foundPlan)
}

const deletePlan = async (req,res) => {
  const id = req.params.id
  const deletePlan = await database_pool.execute(`update NAYATELUSER.Mursleen_plans set status = :status where id = :id`,['DEL',id])
  res.send(deletePlan)
}

const updatePlan = async (req,res) => {
  const id = req.params.id
  const reqData = req.body
  const foundPlan = await database_pool.execute(`update NAYATELUSER.Mursleen_plans set name = :name, price = :price where id = :id`,[reqData.name,reqData.price,id])
  res.send(foundPlan)
}

module.exports = {
  getAll : getAllPlans,
  create : createNewPlan,
  search : getPlanById,
  delete : deletePlan,
  update: updatePlan
}
