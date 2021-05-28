USE [Book Store];

SELECT * FROM [book] WHERE [book_id]
IN
(
    SELECT [book_id] FROM [book_author] WHERE [author_id] = @author_id;
);