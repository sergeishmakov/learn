Установка Postgresql  
==============  
Это очень популярный сервер баз данных, потому программа есть в официальных репозиториях. Но если вы хотите получить самую новую версию, то придется добавить в систему PPA. Для этого выполните команды:  

`sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc apt/sources.list.d/pgdg.list'\n`
`$ wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -`  
   
Затем обновите списки пакетов, чтобы получить самую новую доступную версию:  
`sudo apt-get update`  
  
Установка Postgresl Ubuntu из PPA или официальных репозиториев выглядит одинаково:  
`sudo apt-get install postgresql postgresql-contrib`
