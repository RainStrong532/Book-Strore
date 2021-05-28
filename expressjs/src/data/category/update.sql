USE [Book Store];
UPDATE [category]
SET [category_name] = @category_name,
    [description] = @description,
    [parent_id] = @parent_id,
    [enable] = @enable
WHERE [category_id] = @category_id;