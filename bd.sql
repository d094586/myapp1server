CREATE TABLE `mytest`.`tablee` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` LONGTEXT NULL,
  `number` INT,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


    // for (let i = 1; i <= 50000; i++) {
    //     connection.query(`INSERT INTO tablee(name, number) values ('NAME${i}', ${i})`,
    //         function (err, results, fields) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             console.log('ok');

    //             // console.log(results); // собственно данные
    //             // console.log(fields); // мета-данные полей 
    //         });
    // }