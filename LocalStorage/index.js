import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase("myTestDatabase.db")

const createTable = () => {
  console.log("sjdbhbcaj")
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      let query = 'CREATE TABLE IF NOT EXISTS mytable (id INTEGER PRIMARY KEY, name TEXT)'
      tx.executeSql(query, [], (tt, rs) => {
        console.log(rs)
        resolve(rs)
      }, (tt, err) => {
        reject(err)
      })
    }, err => {
      console.log(err)
      reject(err)
    }, su => {
      console.log(su)
      resolve("created")
    });
  });
};


const insertData = (name) => {
  console.log(name)
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO mytable (name) VALUES (?);',
        [name],
        (tx, results) => {
          console.log('Data inserted successfully');
          resolve();
        },
        (error) => {
          console.log(error);
          reject(error);
        },
      );
    });
  });
};

const fetchData = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM mytable;',
        [],
        (tx, results) => {
          const len = results.rows.length;
          const data = [];
          for (let i = 0; i < len; i++) {
            data.push(results.rows.item(i));
          }
          resolve(data);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
      );
    });
  });
};
const createMessagesTable = () => {
  db.transaction(tx => {
   
    let query = `CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          myRole varchar(50) not null,
          messageId varchar(36) not null unique,
          senderName varchar(50) NOT NULL,
          senderPhone varchar(10) NOT NULL,
          receiverPhone varchar(10) NOT NULL,
          receiverName varchar(50) NOT NULL,
          message TEXT NOT NULL,
          amIsender INTEGER not null,
          status int(1) not null default 0,
          otherData TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    tx.executeSql(query, [], (tt, rs) => {
      console.log("create table ", rs)
    }, (tt, err) => {
      console.log(err)
    })
  })
}
const insertMessageToTable = (myRole='',messageId='',senderName = "", senderPhone = "", receiverPhone = "", receiverName = "", message = "",amISender=true,status=0,otherData=null) => {
 let otherDataString = JSON.stringify(otherData)
db.transaction(tx=>{
  let query = `INSERT INTO messages (myRole, messageId, senderName, senderPhone, receiverPhone, receiverName, message, amIsender, status, otherData) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  
  tx.executeSql(query,[myRole,messageId,senderName,senderPhone,receiverPhone,receiverName,message,amISender,status,otherDataString],(tt,rs)=>{
    console.log("insert message ",rs);
  },(tt,err)=>{
    console.log("error in insert",err.message)
  });
})
}
const fetchAllMessagesFromTable = (role="user") => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //let query = `SELECT * FROM messages`;
      let  query = `
      SELECT 
          amIsender AS "amIsender",
          senderPhone AS "fromPhone",
          messageId AS "messageId",
          message AS "msg",
          timestamp AS "timestamp",
          receiverName AS "receiverName",
          senderName AS "senderName",
          receiverPhone AS "toPhone",
          status as "status"
          
      FROM 
          messages where myRole=?`;

      tx.executeSql(
        query,
        [role],
        (tt, rs) => {
          console.log(rs);
          resolve(rs.rows._array);
        },
        (tt, err) => {
          console.log("Error select ", err);
          reject(err);
        }
      );
    });
  });
};
const dropTable=()=>{
  db.transaction((tx) => {
    tx.executeSql(
      'DROP TABLE IF EXISTS messages',
      [],
      (tx, results) => {
        console.log('Table dropped successfully');
      },
      (error) => {
        console.log(error);
      }
    );
  });
}
export default {
  createMessagesTable,
  insertMessageToTable,
  createTable,
  insertData,
  fetchData,
  fetchAllMessagesFromTable,
  dropTable

};
