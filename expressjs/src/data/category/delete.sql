USE [Book Store];
UPDATE [category]
SET [parent_id] = NULL
WHERE [parent_id] = @category_id;
UPDATE [category]
SET [enable] = 0
WHERE [category_id] = @category_id;