UPDATE [message] SET [seen_date] = GETDATE() WHERE [message_id] = @message_id;
SELECT * FROM  [message] WHERE [message_id] = @message_id;