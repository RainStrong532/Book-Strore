USE [Book Store];
SELECT *
FROM [author_image]
WHERE [author_id] = @author_id
    AND [image_id] = @image_id;