import * as fs from 'fs'

export function cat(str){
    try {
        const readableStream = fs.createReadStream(str, 'utf8'); 

        readableStream.on('data', (chunk) => {
        console.log(chunk);
        });

        readableStream.on('error', (err) => {
            console.error(`Ошибка чтения файла: ${err}`);
        });

        readableStream.on('end', () => {
        console.log('Конец файла');
        });
    } catch (err) {
        console.error(`Ошибка: ${err}`);
    }
}

export function add(str){
    try {
        fs.writeFile(str, '', (err) => {
            if (err) {
            console.error(err);
            return;
            }
            console.log('Файл успешно создан');
        }); } catch (err) {
            console.error(`Ошибка: ${err}`);
        }
}

export function rn(str1, str2){
    try {
        fs.rename(str1, str2, (err) => {
            if (err) {
            console.error(err);
            return;
            }
            console.log('Файл успешно переименован');
        }); } catch (err) {
            console.error(`Ошибка: ${err}`);
        }
}

export function cp(str1, str2) {
    try {
        const readableStream = fs.createReadStream(str1);
        const writableStream = fs.createWriteStream(str2);

        readableStream.on('error', (err) => {
            console.error(`Ошибка чтения файла: ${err}`);
        });

        writableStream.on('error', (err) => {
            console.error(`Ошибка записи файла: ${err}`);
        });

        writableStream.on('finish', () => {
            console.log('Файл успешно скопирован');
        });

        readableStream.pipe(writableStream);
    } catch (err) {
        console.error(`Ошибка: ${err}`);
    }
}

export function mv(str1, str2) {
    try {
        const readableStream = fs.createReadStream(str1);
        const writableStream = fs.createWriteStream(str2);

        readableStream.on('error', (err) => {
            console.error(`Ошибка чтения файла: ${err}`);
        });

        writableStream.on('error', (err) => {
            console.error(`Ошибка записи файла: ${err}`);
        });

        writableStream.on('finish', () => {
            fs.unlink(str1, (err) => {
                if (err) {
                    console.error(`Ошибка удаления файла: ${err}`);
                } else {
                    console.log(`Файл "${str1}" успешно перемещен в "${str2}"`);
                }
            });
        });

        readableStream.pipe(writableStream);
    } catch (err) {
        console.error(`Ошибка: ${err}`);
    }
}

export function rm(str1) {
    try {
      fs.unlink(str1, (err) => {
        if (err) {
          console.error(`Ошибка удаления файла: ${err}`);
          return;
        }
        console.log('Файл удален');
      });
    } catch (err) {
      console.error(`Ошибка: ${err}`);
    }
  }