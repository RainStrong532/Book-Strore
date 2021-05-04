UPDATE [profile] SET [avatar] = @avatar, [update_date] = GETDATE() WHERE [account_id] = @account_id;
SELECT * FROM [image] WHERE [image_id] = @avatar;