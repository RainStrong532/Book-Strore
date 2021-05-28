USE [Book Store];
INSERT INTO [author]([author_name], [description])
VALUES(@author_name, @description);
SELECT SCOPE_IDENTITY() AS [author_id]
FROM [author];