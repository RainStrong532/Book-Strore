UPDATE [message] SET [enable] = 0 WHERE [message_id] = @message_id;
SELECT * FROM  [message] WHERE [message_id] = @message_id;