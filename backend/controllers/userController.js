const e = require('express')
const con = require('../utils/connection')

const validateKey = require('../utils/vallidateKey')
const validateLength = require('../utils/validateLength')

const getUser = (req,res) => {
  const query = `SELECT * FROM user`
  con.query(query, (err, data) => {
    if (err) {
      res.status(500).json({
        error: true,
        data: err
      })
    } else {
      res.json({
        status: 200,
        message: 'ok',
        data: data
      })
    }
  })  
}

const getDetailUser = (req, res) => {
  const id = req.params.id
  const query = `SELECT * FROM user WHERE id=${id}`
  con.query(query, (err, data) => {
    if (err) {
      res.status(500).json({
        error: true,
        data: err
      })
    } else {
      res.json({
        status: 200,
        message: 'ok',
        data: data
      })
    }
  })
}

const deleteDetailUser = (req, res) => {
  const id = req.params.id
  const query = `DELETE FROM user WHERE id=${id}`
  con.query(query, (err) => {
    if (err) {
      res.status(500).json({
        error: true,
        data: err
      })
    } else {
      res.json({
        status: 200,
        message: 'deleted',
      })
    }
  })
}

const addUser = (req, res) => {
  // console.log(req.headers, 'halo')
  const keySecret = req.headers['key-secret']
  if (!validateKey(keySecret)) {
    res.status(400).json({
      message: 'sorry, cant'
    })
  } else {
    // console.log(req.body, '--- ini budi')
    const name = req.body.name
    const query = `INSERT INTO user (name) VALUES ("${name}")`
    con.query(query, (err, data) => {
      if (err) {
        res.status(500).json({
          error: true,
          message: data
        })
      } else {
        res.status(200).json({
          status: 'success',
          message: 'inserted'
        })
      }
    })
  }
}

const updateAttendUser = (req, res) => {
  const keySecret = req.headers['key-secret']
  if(validateLength(keySecret)){
    const id = req.params.id
    const queryCheck = `SELECT * FROM user WHERE id=${id}`
    con.query(queryCheck, (err, data, field) => {
      if(data.length == 0) {
        res.status(400).json({
          message: 'nothing in database'
        })
      } else {
        let attend = 0
        if (data[0].attend == 0) {
          attend = 1;
        }
        const queryUpdateAttend = `UPDATE user SET attend=${attend} WHERE id=${id}`
        con.query(queryUpdateAttend, (err) => {
          if (err) {
            res.status(500).json({
              error: true,
              data: err
            })
          } else {
            res.json({
              status: 200,
              message: 'updated',
            })
          }
        }) 
      }
    })
  } else {
    res.status(403).json({
      message: 'Unauthorize (403)'
    })
  }
}

module.exports = {
  getUser,
  getDetailUser,
  deleteDetailUser,
  addUser,
  updateAttendUser
}