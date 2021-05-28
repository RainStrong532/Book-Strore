USE "Book Store";
SELECT '1' AS [isExisted]
WHERE EXISTS (
        SELECT *
        FROM [author_image]
        WHERE [author_id] = @author_id
            AND [image_id] = @image_id
    )
UNION
SELECT '0' AS [isExisted]
WHERE NOT EXISTS (
        SELECT *
        FROM [author_image]
        WHERE [author_id] = @author_id
            AND [image_id] = @image_id
    ) A