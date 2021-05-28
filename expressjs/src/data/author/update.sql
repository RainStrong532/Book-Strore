USE [Book Store];
UPDATE [author]
SET [author_name] = @author_name,
    [description] = @description,
    [enable] = @enable
WHERE [author_id] = @author_id;