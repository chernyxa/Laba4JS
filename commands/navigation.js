import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';

export function ls(){
  try {
    const currentDirectory = process.cwd();
    const items = readdirSync(currentDirectory);

    // Функция, возвращающая тип элемента (файл или папка)
    function getType(itemPath) {
      return lstatSync(itemPath).isDirectory() ? 'папка' : 'файл';
    }

    // Сортируем элементы сначала по типу, а затем по имени и выводим список
    const sortedItems = items.map((item) => {
      const itemPath = join(currentDirectory, item);
      const type = getType(itemPath);
      return { name: item, type };
    }).sort((a, b) => {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    
    console.table(sortedItems);
  }catch (err) {
    console.error(`Ошибка: ${err}`);
  }
}

export function cd(str){
  try{
    process.chdir(str);
  } catch (err){
    console.log("Ошибка в выполнении")
  }
  
}

export function up(){
    
  const currentDirectory = process.cwd(); // получаем текущую директорию
  if (currentDirectory !== '/') { // проверяем, что это не корневая директория
  process.chdir('..'); // переходим вверх на уровень
  } 
}