const conn= require('./database');

const Schedule= {
    all:()=> {
        return new Promise((res,rej)=> {
            let query= `
                SELECT *
                FROM schedule
            `;
            conn.query(query,(error,results)=> {
                if(error) throw new Error('Cannot read data');
                else res(results);
            });
        });
    },
    insert:(data)=> {
        return new Promise((res,rej)=> {
            let query= `
                INSERT INTO schedule
                    (date_from, date_to, room_id, dentist_id)
                VALUES
                    (?, ?, ?, ?)
            `;
            conn.query(query,[data.date_from, data.date_to, data.room_id, data.dentist_id],(error,done)=> {
                if(error) throw new Error('Cannot insert');
                else res(done);
            });
        });
    },
    destroy:(id)=> {
        return new Promise((res,rej)=> {
            Schedule.findById(id).then(result=> {
                if(result!==null) {
                    let query=`
                        DELETE
                        FROM schedule
                        WHERE id=?
                    `;
                    conn.query(query,id,(error,done)=> {
                        if(error) throw new Error('Cannot delete');
                        else res(done);
                    })
                }else res(true);
            });
        });
    },
    findById:(id)=> {
        return new Promise((res,rej)=> {
            let query=`
                SELECT *
                FROM schedule
                WHERE id=?
                LIMIT 1
            `;
            conn.query(query,id,(error,result)=> {
                if(error) throw new Error('Cannot read');
                else res(result);
            });
        });
    }
}

module.exports= Schedule;
