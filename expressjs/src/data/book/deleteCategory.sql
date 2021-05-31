USE [Book Store];
DELETE [category_book]
WHERE [book_id] = @book_id
    AND [category_id] = @category_id;