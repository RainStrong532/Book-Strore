USE [Book Store];
UPDATE [category]
SET [parent_id] = @parent_id
WHERE [category_id] = @category_id;