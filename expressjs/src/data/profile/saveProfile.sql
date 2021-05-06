INSERT INTO [profile]([firstname], [lastname], [description], [dob], [gender], [phone_number], [address], [account_id])
VALUES (@firstname, @lastname, @description, @dob, @gender, @phone_number, @address, @account_id);
SELECT DISTINCT SCOPE_IDENTITY() AS [profile_id] FROM [profile];