USE "Book Store";
SELECT '1' AS [isExisted]
WHERE EXISTS (
        SELECT *
        FROM [book_image]
        WHERE [book_id] = @book_id
            AND [image_id] = @image_id
    )
UNION
SELECT '0' AS [isExisted]
WHERE NOT EXISTS (
        SELECT *
        FROM [book_image]
        WHERE [book_id] = @book_id
            AND [image_id] = @image_id
    );