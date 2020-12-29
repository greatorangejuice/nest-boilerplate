import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    console.log(`CUSTOM PIPE value: ${JSON.stringify(value)}`);
    if (metadata) {
      console.log(`CUSTOM PIPE metadata: ${JSON.stringify(metadata)}`);
    }
    return undefined;
  }
}
