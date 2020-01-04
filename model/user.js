const conn = require('../model/database');
const bcrypt = require('bcrypt');

let UserModel = {
    all: () => {
        return new Promise((res, rej) => {
            let query = "SELECT * FROM users";
            let connection = conn.query(query, (err, results) => {
                if (err) throw err;
                else {
                    res(results);
                }
            });
        });
    },
    insert: data => {
        // console.log(data);
        return new Promise((res, rej) => {
            let query = "INSERT INTO users (first_name,last_name,username,email,password,role,access_token,remember_token,profile_picture) VALUES (?,?,?,?,?,?,?,?,?)";
            let password = bcrypt.hash(data.password, 5, (err, pwwd) => {
                conn.query(query, [data.first_name, data.last_name, data.username, data.email, pwwd, data.role, null, null, null], (err, record, info) => {
                    if (err) {
                        throw err;
                        res(false);
                    } else {
                        res(true);
                    }
                });
            });
        });
    },
    update: data => {
        return new Promise((res, rej) => {
            let query = "UPDATE users SET first_name=?,last_name=?,username=?,email=? WHERE id=?";
            conn.query(query, [data.first_name, data.last_name, data.username, data.email, data.id], (err, result) => {
                if (err) {
                    throw err;
                    res(false);
                } else {
                    res(true);
                }
            });
        });
    },
    findById: id => {
        return new Promise((res, rej) => {
            let query = "SELECT * FROM users WHERE id=?";
            conn.query(query, [id], (err, result) => {
                if (err) {
                    res(null);
                } else {
                    console.log(result);
                    if (Object.keys(result).length === 0) {
                        res(null);
                    } else {
                        res(result[0]);
                    }
                }
            });
        });
    },
    delete: id => {
        return new Promise(res => {
            let query = "DELETE FROM users WHERE id=?";
            conn.query(query, [id], (err, result) => {
                if (err) {
                    res(false);
                    throw new err;
                } else {
                    res(true);
                }
            });
        })
    },
    loadScheduleById: id=> {
        return new Promise((res,rej)=> {
            let query= `
                SELECT 
                    a.*,
                    r.room_name as room_name,
                    r.id as room_id
                FROM users u
                LEFT JOIN appointments a
                ON u.id= a.dentist_id
                LEFT JOIN room r
                ON a.room_id= r.id
                WHERE u.id=?
            `;
            conn.query(query,id,(err,results)=> {
                if(err) throw new Error();
                else res(results);
            });
        });
    },
    find:(column,value)=> {
        return new Promise((res,rej)=> {
            if(column==undefined || value==undefined)
                rej('Data is undefined');
            else {
                let query=`
                    SELECT * 
                    FROM users
                    WHERE ${column}=?
                `;
                // console.log(column,value);
                conn.query(query,value,(error,results)=> {
                    console.log(results);
                    if(error || results==[]) {
                        throw new Error('Cannot read');
                        rej('Cannot read');
                    }else {
                        res(results);
                    }
                });
            }
        });
    },
    findOne:(column,value)=> {
        return new Promise((res,rej)=> {
            if(column==undefined || value==undefined)
                rej('Data is undefined');
            else {
                UserModel.find(column,value).then((value)=> {
                    res(value[0]);
                }).catch(rejected=> {
                    rej(rejected);
                });
            }
        });
    }
}
module.exports = UserModel;