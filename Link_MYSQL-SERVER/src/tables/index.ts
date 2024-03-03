export const info = `
    create table if not exists info (
        id int not null unique auto_increment primary key,
        userId int not null,
        address varchar(255) not null,
        age int not null,
        check(age > 1)
    )
`;