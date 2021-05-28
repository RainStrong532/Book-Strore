USE [Book Store];
INSERT INTO [category]([category_name], [description], [parent_id])
VALUES(@category_name, @description, @parent_id);
SELECT SCOPE_IDENTITY() AS [category_id]
FROM [category];