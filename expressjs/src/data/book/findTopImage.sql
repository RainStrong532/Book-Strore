USE [Book Store];
SELECT TOP 1 bi.book_id, i.*
FROM [book_image] AS bi, [image] AS i
WHERE bi.book_id = @book_id
AND bi.image_id = i.image_id;