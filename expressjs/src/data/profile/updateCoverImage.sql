UPDATE [profile] SET [cover_image] = @cover_image, [update_date] = GETDATE() WHERE [account_id] = @account_id;
SELECT * FROM [image] WHERE [image_id] = @cover_image;