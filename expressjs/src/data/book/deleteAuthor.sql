USE [Book Store];
DELETE [author_book]
WHERE [book_id] = @book_id
    AND [author_id] = @author_id;