import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'custome',
pure: false})
export class CustomePipe implements PipeTransform {
transform(collection: Array<any>, property: string = 'date'): Array<any> {
    if(!collection) {
        return null;
    }
    const gc = collection.reduce((previous, current)=> {
        if(!previous[current[property]]) {
            previous[current[property]] = [];
        }
            current.events.forEach(x => previous[current[property]].push(x));
        return previous;
    }, {});
    return Object.keys(gc).map(date => ({ date: date, events: gc[date] }));
    }  
}
