UPDATE mysql.user
SET plugin='mysql_native_password'
WHERE user='root' AND host='localhost';

FLUSH PRIVILEGES;