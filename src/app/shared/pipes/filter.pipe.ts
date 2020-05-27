import { Pipe, PipeTransform } from '@angular/core';
import {Task} from '../../../assets/models/models';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value?: Task[], status?: string, priority?: string): Task[] {
    if (priority && priority.length >= 3) {
      return value.filter(v =>
        v.status.toLowerCase() === status.toLowerCase() && v.priority.toLowerCase().includes(priority.toLowerCase()));
    }
    return value.filter(v => v.status.toLowerCase() === status.toLowerCase());
  }
}
