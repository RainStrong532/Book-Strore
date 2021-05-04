USE [Book Store];
INSERT INTO [account]([user_name], [password], [email])
VALUES(@user_name, @password, @email);
SELECT SCOPE_IDENTITY() AS [account_id] FROM [account];