USE [Book Store];
UPDATE [book]
SET [book_name] = @book_name,
    [description] = @description,
    [price] = @price,
    [quantity] = @quantity,
    [discount] = @discount,
    [publish_year] = @publish_year,
    [enable] = @enable
WHERE [book_id] = @book_id;