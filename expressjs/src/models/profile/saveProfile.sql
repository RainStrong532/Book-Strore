INSERT INTO [profile]([firstname], [lastname], [surname], [description], [dob], [gender], [phone_number], [address], [account_id])
VALUES (@firstname, @lastname, @surname, @description, @dob, @gender, @phone_number, @address, @account_id);
SELECT SCOPE_IDENTITY() AS [profile_id] FROM [profile];