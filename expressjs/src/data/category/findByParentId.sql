USE [Book Store];
SELECT *
FROM [category]
WHERE [enable] = 1
    AND [parent_id] = @parent_id;