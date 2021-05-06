CREATE DATABASE "Book Store";
USE "Book Store";

CREATE TABLE account(
   account_id int IDENTITY(1,1) PRIMARY KEY,
   email VARCHAR(80) NOT NULL UNIQUE,
   user_name VARCHAR(100) NOT NULL UNIQUE,
   password VARCHAR(100) NOT NULL,
   is_verify int DEFAULT 0,
   enable int DEFAULT 1,
   status int DEFAULT 0,
   create_date DATETIME DEFAULT GETDATE(),
   update_date DATETIME,
   last_singin DATETIME NOT NULL DEFAULT GETDATE(),
);

CREATE TABLE image(
	image_id int IDENTITY(1,1) PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	create_date DATETIME DEFAULT GETDATE(),
    update_date DATETIME,
);

CREATE TABLE role(
	role_id int IDENTITY(1,1) PRIMARY KEY,
	role_name VARCHAR(50) NOT NULL UNIQUE,
	create_date DATETIME DEFAULT GETDATE(),
    update_date DATETIME,
);

CREATE TABLE account_role(
	account_id int NOT NULL,
	role_id int NOT NULL,
	CONSTRAINT pk_account_role PRIMARY KEY(account_id, role_id),
	FOREIGN KEY (account_id) REFERENCES account(account_id),
	FOREIGN KEY (role_id) REFERENCES role(role_id),
);

CREATE TABLE verify(
	verify_id int IDENTITY(1,1) PRIMARY KEY,
	code VARCHAR(50) NOT NULL UNIQUE,
	expried_date DATETIME NOT NULL DEFAULT DATEADD(MINUTE, 10, GETDATE()) CHECK(expried_date > GETDATE()),
	create_date DATETIME DEFAULT GETDATE(),
    update_date DATETIME,
	account_id int NOT NULL,
	FOREIGN KEY (account_id) REFERENCES account(account_id),
);

CREATE TABLE profile(
   profile_id int IDENTITY(1,1) PRIMARY KEY,
   firstname NVARCHAR(50) COLLATE Latin1_General_100_CI_AI_SC_UTF8,
   lastname NVARCHAR(50) COLLATE Latin1_General_100_CI_AI_SC_UTF8,
   description NVARCHAR(2500) COLLATE Latin1_General_100_CI_AI_SC_UTF8,
   dob DATETIME CHECK (dob < DATEADD(YEAR,-10, GETDATE())),
   gender int,
   phone_number NVARCHAR(12),
   address NVARCHAR(250) COLLATE Latin1_General_100_CI_AI_SC_UTF8,
   create_date DATETIME DEFAULT GETDATE(),
   update_date DATETIME,
   avatar int,
   cover_image int,
   FOREIGN KEY (avatar) REFERENCES image(image_id),
   FOREIGN KEY (cover_image) REFERENCES image(image_id),
   account_id int NOT NULL UNIQUE,
   FOREIGN KEY (account_id) REFERENCES account(account_id),
);

CREATE TABLE conversation(
	user_id INT FOREIGN KEY REFERENCES account(account_id) PRIMARY KEY,
	enable INT NOT NULL DEFAULT 1
)

CREATE TABLE conversation_admin(
	user_id INT NOT NULL FOREIGN KEY REFERENCES conversation(user_id),
	admin_id INT NOT NULL FOREIGN KEY REFERENCES account(account_id),
	CONSTRAINT pk_conversation_admin PRIMARY KEY(user_id, admin_id)
);

CREATE TABLE message(
	message_id INT IDENTITY(1,1) PRIMARY KEY,
	content NVARCHAR(1000) COLLATE Latin1_General_100_CI_AI_SC_UTF8,
	image_id INT FOREIGN KEY REFERENCES image(image_id),
	type INT NOT NULL DEFAULT 0,
	account_id INT FOREIGN KEY REFERENCES account(account_id) NOT NULL,
	create_date DATETIME DEFAULT GETDATE(),
	enable INT NOT NULL DEFAULT 1,
	seen_date DATETIME,
	conversation_id INT FOREIGN KEY REFERENCES conversation(user_id) NOT NULL,
);