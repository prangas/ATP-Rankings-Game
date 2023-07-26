const { request, response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Rankings',
  password: 'Rafanadal18',
  port: 5432,
})


const getUserById = (request, response) => {
  pool.query('SELECT * FROM "Top"', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const checkUser = (request, response) => {
  pool.query('SELECT * FROM "Accounts"', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
}

const checkPass = (request, response) => {
  pool.query('SELECT "password" FROM "Accounts"', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
}

const createAcc = (request, response) => {
  let acc = request.body.account;
  let pass = request.body.password;
  let s = 'INSERT INTO "Accounts" (account, password, score) VALUES ($1, $2, $3)';
  try {
   pool.query(s, [acc, pass, 0]);
    response.send("good")
  }
  catch (error){
    console.log(error)
  }
  
}

const updateScore = (request, response) => {
  let acc = request.body.account;
  // let pass = request.body.password;
  let score = request.body.score;
  //console.log(acc + score);
  let q = 'UPDATE "Accounts" SET score = $1 WHERE account = $2';
  try {
    pool.query(q, [score, acc]);
     response.send("good")
   }
   catch (error){
     console.log(error)
   }
}

module.exports = {
  getUserById,
  checkUser,
  checkPass,
  createAcc,
  updateScore
}