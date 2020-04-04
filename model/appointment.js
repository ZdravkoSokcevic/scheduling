const conn= require('./database');
const User= require('./user');

const Appointment= {
    all:()=> {
        return new Promise((res,rej)=> {
            let query=`
                SELECT appointments.*,
                    users.id as user_id,
                    users.first_name as doctor_fname,
                    users.last_name as doctor_lname,
                    users.email as doctor_email,
                    users.role as doctor_role,
                    users.phone as doctor_phone
                FROM appointments
                JOIN users 
                    ON appointments.dentist_id=users.id
                WHERE users.role like 'dentist'
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
                    appointments.*,
                    users.first_name as doctor_first_name
                    users.last_name as doctor_last_name,
                    users.email as doctor_email,
                    users.phone as doctor_phone
                FROM appointments
                JOIN users
                    ON appointments.dentist_id= users.id
                WHERE 
                    users.role like 'dentist' 
                AND 
                    appointments.status like 'approved'
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
            Appointment.all().then(result=> {
                res(result);
            });
        });
    },
    getForDoctor: doctor=> {
        return new Promise((res,rej)=> {
            if(!doctor || doctor==undefined || !'id' in doctor)
                rej('User is not a doctor');
            let query= `
                SELECT 
                    appointments.*,
                    users.first_name as doctor_first_name
                    users.last_name as doctor_last_name,
                    users.email as doctor_email,
                    users.phone as doctor_phone
                    FROM appointments
                    JOIN users
                        ON appointments.dentist_id= users.id
                    WHERE 
                        appointments.dentist_id= ?
                    OR 
                        appointments.status like 'approved';
            `;
            conn.query(query, [], (err,data)=> {
                if(err)
                    rej(err);
                else res(data);
            });
        });
    }
}

module.exports= Appointment;