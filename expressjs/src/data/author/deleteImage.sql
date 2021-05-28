USE [Book Store];
DELETE [author_image]
WHERE [author_id] = @author_id
    AND [image_id] = @image_id;