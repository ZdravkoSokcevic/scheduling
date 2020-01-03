const conn= require('./database');
const User= require('./user');

const Appointment= {
    all:()=> {
        return new Promise((res,rej)=> {
            let query= "SELECT * FROM appointments";
            conn.query(query,(error,data)=> {
                if(error) throw new Error('Cannot read from db');
                else res(data);
            });
        });
    },
    insert:(data)=> {
        return new Promise((res,rej)=> {
            let query= `
                INSERT 
                INTO 
                appointments(date_from, date_to, dentist_id, patient_id, room_id, status) 
                VALUES(?, ?, ?, ?, ?, ?)
            `;
            // console.log(`INSERT 
            //             INTO 
            //             appointments(date_from, date_to, dentist_id, patient_id, room_id, status) 
            //             VALUES(${data.date_from}, ${data.date_to}, ${data.dentist_id}, ${data.patient_id}, ${data.room_id}, ${data.status})`);
            conn.query(query,[data.date_from, data.date_to, data.dentist_id, data.patient_id, data.room_id, data.status],(error,result)=> {
                if(error) throw new Error('Cannot insert data');
                else res(result);
            });
        });
    },
    delete:(id)=> {
        return new Promise((res,rej)=> {
            Appointment.findById(id).then(result=> {
                if(result==null) {
                    res(true);
                }else {
                    let query=`
                        DELETE
                        FROM appointments
                        WHERE id=?
                    `;
                    conn.query(query,id,(error,done)=> {
                        if(error) throw new Error('Cannot Delete');
                        else res(done);
                    });
                }
            });
        });
    },
    findById:(id)=> {
        return new Promise((res,rej)=> {
            if(id==null)
                rej('Null value');
            else {
                let query=`
                    SELECT *
                    FROM appointments
                    WHERE id=?
                    LIMIT 1
                `;
                conn.query(query,id,(error,result)=> {
                    if(error) throw new Error('Cannot read data');
                    else {
                        if(result==null)
                            res(null);
                        else res(result);
                    }
                });
            }
        });
    }
}

module.exports= Appointment;