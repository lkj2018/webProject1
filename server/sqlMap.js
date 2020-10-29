// sqlMap.js  sql语句
const sqlMap = {
    Stu: {
      add: 'insert into user_info(id,name,sex,username,email) values (0,?,?,?,?)',
      show: 'select * from user_info',
      del: 'delete from user_info where id = ?',
      update: 'update user_info set name = ?,sex = ?,username = ?,email = ? where id = ?'
    }
  }
  
  module.exports = sqlMap