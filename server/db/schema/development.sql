
INSERT INTO users (name, email, password, role)
VALUES
('James Brown', 'jb@mymenu.com', 'asd', 'admin');


INSERT INTO menus (user_id, name, description) VALUES
(1, 'My Menu 1','the first menu on our app!');

INSERT INTO menu_items (menu_id, name, description, price)
VALUES
(1, 'Snail Soup', 'A delicious soup made to be enjoyed by snails', 9.99),
(1, 'Snail Salad', 'A wonderfully light salad that all snails will love', 20);
