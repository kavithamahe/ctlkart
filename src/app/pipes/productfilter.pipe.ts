import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'products',
  pure: false
 })
 export class ProductfilterPipe implements PipeTransform {

 constructor(){
  console.log("sdasdasd");
 }

  transform(collection:  Array<any>, property: string):  Array<any> {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if(!collection) {
        return null;
    }

    const groupedCollection = collection.reduce((previous, current)=> {
        if(!previous[current[property]]) {
            previous[current[property]] = [current];
        } else {
            previous[current[property]].push(current);
        }

        return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
}
}
  // transform(items: any, filter: any, defaultFilter: boolean): any {
  //   if (!filter){
  //     return items;
  //   }
 
  //   if (!Array.isArray(items)){
  //     return items;
  //   }
 
  //   if (filter && Array.isArray(items)) {
  //     let filterKeys = Object.keys(filter);
 
  //     if (defaultFilter) {
  //       return items.filter(item =>
  //           filterKeys.reduce((x, keyName) =>
  //               (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
  //     }
  //     else {
  //       return items.filter(item => {
  //         return filterKeys.some((keyName) => {
  //           return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
  //         });
  //       });
  //     }
  //   }
  // }
 
 