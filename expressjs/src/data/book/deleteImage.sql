USE [Book Store];
DELETE [book_image]
WHERE [book_id] = @book_id
    AND [image_id] = @image_id;