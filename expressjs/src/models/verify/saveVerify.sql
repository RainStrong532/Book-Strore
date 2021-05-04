INSERT INTO [verify]([code], [expried_date], [account_id]) VALUES(@code, @expried_date, @account_id);
SELECT SCOPE_IDENTITY() AS [verify_id] FROM [verify];