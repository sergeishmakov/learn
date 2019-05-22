Добавление нового пользователя в PostgreSQL

Добавление нового пользователя в PostgreSQL:
CREATE ROLE newusername LOGIN PASSWORD 'newuserpassword';`
Эта команда создаст пользователя с логином newusername и паролем newuserpassword.
Нужно создать для него базу данных:
`CREATE DATABASE newusername;`
`ALTER DATABASE newusername OWNER TO newusername;`
