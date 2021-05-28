USE [Book Store];

SELECT * FROM [book] WHERE [book_id]
IN
(
    SELECT [book_id] FROM [category_book] WHERE [category_id] = @category_id;
);