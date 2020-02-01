const conn= require('./database');

const RoomModel= {
    all:()=> {
        return new Promise((res,rej)=> {
            let query= "SELECT * FROM room";
            conn.query(query,(error,results)=> {
                if(error) {
                    throw new Error('Cannot fetch data');
                }else {
                    res(results);
                }
            });
        });
    },
    insert:(data)=> {
        return new Promise((res,rej)=> {
            if(data instanceof Object) {
                let query= "INSERT INTO room (name) VALUES (?)";
                conn.query(query,[data.name],(error,result)=> {
                    if(error) {
                        rej('Cannot insert data');
                        throw new Error('Cannot insert data');
                    } else res(true);
                })
            }
        });
    },
    destroy:(id)=> {
        return new Promise((res,rej)=> {
            RoomModel.findById(id).then(result=> {
                if(result===null) {
                    rej('Failed');
                }else {
                    let query= "DELETE FROM room WHERE id=?";
                    conn.query(query,id,(error,result)=> {
                        if(error) rej(error);
                        else res('Success');
                    })
                }
            })
        });
    },
    findById:(id)=> {
        return new Promise((res,rej)=> {
            let query= "SELECT * FROM room WHERE id=?";
            conn.query(query,id,(error,result)=> {
                if(error) {
                    res(null);
                } else {
                    res(result);
                }
            });
        })
    },
    edit:(id,data)=> {
        return new Promise((res,rej)=> {
            let query=`
                UPDATE room
                SET name=?
                WHERE id=?
            `;
            console.log(query);
            conn.query(query,[data.name,id],(err,result)=> {
                if(err) {
                    rej(err);
                }else {
                    res(result);
                }
            });
        });
    }
}


module.exports= RoomModel;


