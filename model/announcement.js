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
                res(success);
            })
        })
    }
}


module.exports= Announcement;