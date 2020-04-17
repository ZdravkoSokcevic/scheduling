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
        return new Promise((res, rej) => {
            let query = `
                INSERT INTO users 
                    (first_name,last_name,email,password,phone, role,access_token,remember_token,profile_picture) 
                VALUES 
                    (?,?,?,?,?,?,?,?,?)`;
            let password = bcrypt.hash(data.password, 5, (err, pwwd) => {
                conn.query(query, [data.first_name, data.last_name, data.email, pwwd, data.phone, data.role, null, null, null], (err, record, info) => {
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
            let query = `
                UPDATE users 
                SET first_name=?,last_name=?,email=?,phone=?,role=?
                WHERE id=?`;
            conn.query(query, [data.first_name, data.last_name, data.email, data.phone, data.role, data.id], (err, result) => {
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
                conn.query(query,value,(error,results)=> {
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
    },
    searchOrAll:(data, loggedInId)=> {
        return new Promise((res,rej)=> {
            if((!('search' in data) || data.search=='') && (!('role' in data) || data.role=='')) {
                let query= `
                    SELECT *
                    FROM users 
                    WHERE users.id <> ?
                `;
                conn.query(query, [loggedInId], (err,users)=> {
                    if(err) throw err;
                    else {
                        res(users);
                    }
                })
            }else {
                let q_data= data;
                if(q_data.role=='')
                {
                    let query=`
                        SELECT *
                        FROM users
                        WHERE users.id <> ? AND (
                            first_name like ?
                            OR last_name like ?
                            OR email like ?
                        )
                    `;
                    let search= '%' + data.search + '%';
                    conn.query(query,[loggedInId, search, search, search],(err,users)=> {
                        if(err) throw new Error('Something wen\'t wrong');
                        else {
                            res(users);
                        }
                    });
                }else {
                    let query=`
                        SELECT *
                        FROM users
                        WHERE role like ?
                        AND (
                            first_name like ?
                            OR last_name like ?
                            OR email like ?
                        ) AND id <> ? 
                    `;
                    let data_search=[data.role,'%'+data.search+'%','%'+data.search+'%','%'+data.search+'%', loggedInId];
                    conn.query(query,data_search,(err,users)=> {
                        if(err) throw new Error('Something wen\'t wrong');
                        else {
                            res(users);
                        }
                    });
                }
            }
        });
    },
    loadOrSearchPatientsAndDoctors: (data,loggedInId) => {
        return new Promise(res=> {
            if((!('search' in data) || data.search=='') && (!('role' in data) || data.role=='')) {
                let query=`
                    SELECT *
                    FROM users
                    WHERE id <> ? AND (
                        role like 'patient'
                        OR role like 'dentist'
                    )
                `;

                conn.query(query, [loggedInId], (err, users)=> {
                    if(err)
                        throw new Error(err);
                    else res(users);
                });
            }else {
                let query=`
                SELECT *
                FROM users
                WHERE (
                    first_name like ?
                    OR last_name like ?
                    OR email like ?
                ) AND role like ?
                AND (
                    role like 'patient'
                    OR role like 'dentist'
                ) AND users.id <> ?
                `;
                let search= '%' + data.search + '%';
                let role= data.role;
                conn.query(query, [search, search, search, role, loggedInId], (err,users)=> {
                    if(err)
                        throw new Error(err);
                    else res(users);
                });
            }
        });
    },
    loadOrSearchPatients: (data,loggedInId) => {
        return new Promise((res,rej) => {
            if((!('search' in data) || data.search== '') && (!('role' in data) || data.role=='')) {
                let query=`
                    SELECT *
                    FROM users
                    WHERE role like 'patient'
                    AND id <> ?
                `;
                conn.query(query, [loggedInId], (err,users) => {
                    if(err)
                        throw new Error(err);
                    else res(users);
                });
            }else {
                let search= data.search;
                if(search== '') {
                    let query=`
                        SELECT *
                        FROM users
                        WHERE role like 'patient'
                        AND id <> ?;
                    `;
                    conn.query(query, [loggedInId], (err,users) => {
                        if(err)
                            throw new Error(err.message);
                        else res(users);
                    });        
                }else {
                    search= '%' + search + '%';
                    let query=`
                        SELECT *
                        FROM users
                        WHERE role like 'patient' AND (
                            LOWER(first_name) like LOWER(?)
                            OR LOWER(last_name) like LOWER(?)
                            OR LOWER(email) like LOWER(?)
                        ) AND id <> ?;
                    `;
                    conn.query(query, [search, search, search, loggedInId], (err,users) => {
                        if(err)
                            throw new Error(err.message);
                        else res(users);
                    });
                }
            }
        });
    },
    dentists:()=> {
        return new Promise((res,rej)=> {
            let query=`
                SELECT *
                FROM users
                WHERE role like ?
            `;
            conn.query(query,['dentist'],(err,results)=> {
                if(err) throw new Error();
                else res(results);
            });
        });
    }
}
module.exports = UserModel;