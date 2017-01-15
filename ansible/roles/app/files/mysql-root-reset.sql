UPDATE user
SET plugin = 'mysql_native_password'
WHERE user = 'root' AND host = 'localhost' AND plugin = 'auth_socket';

FLUSH PRIVILEGES;