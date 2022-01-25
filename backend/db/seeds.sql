INSERT INTO users (name, email, password)
VALUES ('Conrad Wen', 'conradwen@gmail.com', '$2b$12$V1sF2H2RAAkgYQ4aLrqMveNtUNoZOUD5Fu8v7F3jevS8/rAjCD9Gi'),
('Jeff Barnes', 'itsjeff@gmail.com', '$2b$12$V1sF2H2RAAkgYQ4aLrqMveNtUNoZOUD5Fu8v7F3jevS8/rAjCD9Gi'),
('Peter Jones', 'parzar@yahoo.com', '$2b$12$V1sF2H2RAAkgYQ4aLrqMveNtUNoZOUD5Fu8v7F3jevS8/rAjCD9Gi'),
('Zoe Izzopi', 'zoe101@rocketmail.com', '$2b$12$V1sF2H2RAAkgYQ4aLrqMveNtUNoZOUD5Fu8v7F3jevS8/rAjCD9Gi'),
('Girelle Leslie', 'gleslie@hotmail.com', '$2b$12$V1sF2H2RAAkgYQ4aLrqMveNtUNoZOUD5Fu8v7F3jevS8/rAjCD9Gi');

INSERT INTO portfolios (name, user_id)
VALUES ('TFSA', 1),
('RRSP', 1),
('Taxable', 1),
('TFSA', 2),
('RRSP', 2),
('Taxable', 2),
('TFSA', 3),
('RRSP', 3),
('Taxable', 3),
('TFSA', 4),
('RRSP', 4),
('Taxable', 4),
('TFSA', 5),
('RRSP', 5),
('Taxable', 5);

INSERT INTO positions (date, ticker, book_cost, quantity, portfolio_id)
VALUES ('2017-03-14', 'XIC', 12345, 13, 1),
('2017-03-14', 'HXS', 12342, 123, 2),
('2017-03-14', 'VUS', 1245, 130, 3),
('2017-03-14', 'AAPL', 16545, 213, 4),
('2017-03-14', 'TSLA', 12845, 53, 5),
('2017-03-14', 'FB', 1235, 73, 6),
('2017-03-14', 'TD', 12345, 13, 1),
('2017-03-14', 'GOOG', 12342, 123, 2),
('2017-03-14', 'DIS', 1245, 130, 3),
('2017-03-14', 'QQQ', 16545, 213, 4),
('2017-03-14', 'AMD', 12845, 53, 5),
('2017-03-14', 'AMZN', 1235, 73, 6);

INSERT INTO transactions (date, ticker, type, price, quantity, portfolio_id)
VALUES ('2017-03-14', 'XIC', 'BUY', 12345, 13, 1),
('2017-03-14', 'HXS', 'BUY', 12342, 123, 2),
('2017-03-14', 'VUS', 'BUY', 1245, 130, 3),
('2017-03-14', 'AAPL', 'BUY', 16545, 213, 4),
('2017-03-14', 'TSLA', 'BUY', 12845, 53, 5),
('2017-03-14', 'FB', 'BUY', 1235, 73, 6),
('2017-03-14', 'TD', 'BUY', 12345, 13, 1),
('2017-03-14', 'GOOG', 'BUY', 12342, 123, 2),
('2017-03-14', 'DIS', 'BUY', 1245, 130, 3),
('2017-03-14', 'QQQ', 'BUY', 16545, 213, 4),
('2017-03-14', 'AMD', 'BUY', 12845, 53, 5),
('2017-03-14', 'AMZN', 'BUY', 1235, 73, 6);
