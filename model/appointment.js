const conn= require('./database');
const User= require('./user');

const Appointment= {
    listData: `
        a.*,
        u.id as user_id,
        u.first_name as user_fname,
        u.last_name as user_lname,
        u.email as user_email,
        u.role as user_role,
        u.phone as user_phone,
        d.id as doctor_id,
        d.first_name as doctor_fname,
        d.last_name as doctor_lname,
        d.email as doctor_email,
        d.role as doctor_role,
        d.phone as doctor_phone
    `,
    all:()=> {
        return new Promise((res,rej)=> {
            let query=`
                SELECT
                    ${Appointment.listData}
                FROM appointments a
                JOIN users d
                    ON a.dentist_id= d.id
                JOIN users u
                    ON a.patient_id= u.id
                WHERE d.role like 'dentist'
            `;
            conn.query(query,(error,data)=> {
                if(error) throw new Error(error);
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
            if(!'room_id' in data)
                data.room_id=null;
            conn.query(query,[data.date_from, data.date_to, data.dentist_id, data.patient_id, data.room_id, data.status],(error,result)=> {
                if(error) throw new Error(error);
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
    },
    checkDentistFreeTermin:(data)=> {
        return new Promise((res,rej)=> {
            if((!'date_from' in data) || (!'date_to' in data) || (!'dentist_id' in data))
                res(false); 
            // convert dates to javascript date object
            let date_from= new Date(data.date_from);
            let date_to= new Date(data.date_to);
            let {dentist_id} = data;
            let query= `
                SELECT *
                FROM appointments
                WHERE (date_from >= ?)
                AND (date_to <= ?)
                AND dentist_id=?
            `;
            conn.query(query,[date_from,date_to,dentist_id], (err,result)=> {
                if(err)
                    throw new Error(err);
                else if(result==[] || result== null || !result.length)
                    res(true);
                else res(false);
            });
        })
    },
    unregistered: ()=> {
        return new Promise((res,rej)=> {
            let query= `
                SELECT 
                    ${Appointment.listData}
                FROM appointments a
                JOIN users d
                    ON a.dentist_id= d.id
                JOIN users u
                    ON a.patient_id= u.id
                WHERE 
                    d.role like 'dentist' 
                AND 
                    a.status like 'approved'
            `;
            conn.query(query,[],(err,fields)=> {
                if(err)
                    rej(err);
                else res(fields);
            })
        });
    },
    getForUser: user=> {
        return new Promise((res,rej)=> {
            if(!user || !'id' in user)
                rej('Bad data');
            let query=`
                SELECT
                    ${Appointment.listData}
                FROM appointments a
                JOIN users d
                    ON a.dentist_id= d.id
                JOIN users u
                    ON a.patient_id= u.id
                WHERE
                    u.id= ?
                OR
                    a.status like 'approved'
            `;
            conn.query(query, [user.id], (err,fields)=> {
                if(err)
                    rej(err);
                else res(fields);
            });
        });
    },
    getForDoctor: doctor=> {
        return new Promise((res,rej)=> {
            if(!doctor || doctor==undefined || !'id' in doctor)
                rej('User is not a doctor');
            let query= `
                SELECT 
                    ${Appointment.listData}
                FROM appointments a
                JOIN users d
                    ON a.dentist_id= d.id
                JOIN users u
                    ON a.patient_id= u.id
                WHERE 
                    d.id= ?
                OR 
                    a.status like 'approved';
            `;
            conn.query(query, [doctor.id], (err,data)=> {
                if(err)
                    rej(err);
                else res(data);
            });
        });
    }
}

module.exports= Appointment;