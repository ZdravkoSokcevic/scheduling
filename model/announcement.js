const db= require('./database');

const Announcement= {
    all:()=> {
        return new Promise((res,rej)=> {
            let query=`
                SELECT *
                FROM announcement
            `;
            db.query(query,(err,data)=> {
                if(err) throw new Error();
                else {
                    res(data);
                }
            });
        });
    },
    findById: id => {
        return new Promise((res, rej) => {
            let query = `
                SELECT *
                FROM announcement
                WHERE id = ?
            `;
            db.query(query, [id], (err,fields) => {
                if(err)
                    throw new Error('Cannot retrieve data');
                if(fields.length == 0)
                    res(null);
                else res(fields);  
            })
        })
    },
    insert:data=> {
        return new Promise((res,rej)=> {
            if(!'active' in data)
                data.active = 1;
            let query=`
                INSERT INTO announcement
                    (content,active)
                VALUES
                    (?,?)
            `;
            db.query(query,[data.content,data.active],(err,success)=> {
                if(err) {
                    rej(err);
                }else res(success);
            });
        });
    },
    delete: id => {
        return new Promise((res,rej) => {
            let query = `
                DELETE FROM announcement
                WHERE id = ?
            `
            db.query(query, [id], (err,success) => {
                if(err)
                    rej(err);
                else res(success);
            })
        })
    },
    updateActiveStatus: (id,status) => {
        return new Promise((res,rej) => {
            let query = `
                UPDATE announcement
                SET active = ?
                WHERE id = ?
            `;
            db.query(query, [status,id], (err, success, fields) => {
                // console.log(success);
                if(err)
                    throw new Error(err);
                else res(success);  
            })
        })
    },
    allActive: () => {
        return new Promise((res,rej) => {
            let query = `
                SELECT *
                FROM announcement
                WHERE active = 1;
            `;
            db.query(query, [], (err, fields) => {
                if(err)
                    throw new Error(err);
                else res(fields);
            })
        })
    }
}


module.exports= Announcement;