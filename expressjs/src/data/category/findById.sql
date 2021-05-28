USE [Book Store];
SELECT *
FROM [category]
WHERE [enable] = 1
    AND [category_id] = @category_id;