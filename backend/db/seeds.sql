INSERT INTO users (name, email, password)
VALUES ('Conrad Wen', 'conradwen@gmail.com', '$2b$12$V1sF2H2RAAkgYQ4aLrqMveNtUNoZOUD5Fu8v7F3jevS8/rAjCD9Gi'),
('Jeff Barnes', 'itsjeff@gmail.com', '$2b$12$V1sF2H2RAAkgYQ4aLrqMveNtUNoZOUD5Fu8v7F3jevS8/rAjCD9Gi'),
('Peter Jones', 'parzar@yahoo.com', '$2b$12$V1sF2H2RAAkgYQ4aLrqMveNtUNoZOUD5Fu8v7F3jevS8/rAjCD9Gi'),
('Zoe Izzopi', 'zoe101@rocketmail.com', '$2b$12$V1sF2H2RAAkgYQ4aLrqMveNtUNoZOUD5Fu8v7F3jevS8/rAjCD9Gi'),
('Girelle Leslie', 'gleslie@hotmail.com', '$2b$12$V1sF2H2RAAkgYQ4aLrqMveNtUNoZOUD5Fu8v7F3jevS8/rAjCD9Gi');

-- INSERT INTO portfolios (name, user_id)
-- VALUES ('TFSA', 1),
-- ('RRSP', 1),
-- ('Taxable', 1),
-- ('TFSA', 2),
-- ('RRSP', 2),
-- ('Taxable', 2),
-- ('TFSA', 3),
-- ('RRSP', 3),
-- ('Taxable', 3),
-- ('TFSA', 4),
-- ('RRSP', 4),
-- ('Taxable', 4),
-- ('TFSA', 5),
-- ('RRSP', 5),
-- ('Taxable', 5);

INSERT INTO transactions (date, ticker, type, price, quantity, user_id, portfolio_name)
VALUES ('2017-03-14', 'XIC', 'BUY', 12345, 13, 1, 'TFSA'),
('2017-03-14', 'HXS', 'BUY', 12342, 123, 3, 'TFSA'),
('2017-03-14', 'VUS', 'BUY', 1245, 130, 2, 'RESP'),
('2017-03-14', 'AAPL', 'BUY', 16545, 213, 5, 'TRESP'),
('2017-03-14', 'TSLA', 'BUY', 12845, 53, 4, 'TEST'),
('2017-03-14', 'FB', 'BUY', 1235, 73, 2, 'SAV'),
('2017-04-14', 'FB', 'BUY', 1345, 23, 3, 'RESP'),
('2017-05-14', 'FB', 'BUY', 3535, 65, 1, 'TFSA');