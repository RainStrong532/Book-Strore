UPDATE [profile] SET [firstname] = @firstname, [lastname] = @lastname, [description] = @description, [dob] = @dob, [gender] = @gender, [phone_number] = @phone_number, [address] = @address, [update_date] = GETDATE() WHERE [account_id] = @account_id;
SELECT * FROM [profile] WHERE [account_id] = @account_id;