INSERT INTO users (name, email, password)
VALUES ('Conrad Wen', 'conradwen@gmail.com', 'password'),
('Jeff Barnes', 'itsjeff@gmail.com', 'password'),
('Peter Jones', 'parzar@yahoo.com', 'password'),
('Zoe Izzopi', 'zoe101@rocketmail.com', 'password'),
('Girelle Leslie', 'gleslie@hotmail.com', 'password');

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

INSERT INTO transactions (date, ticker, type, price, shares)
VALUES (2020-01-10, 'XIC', 'BUY', )