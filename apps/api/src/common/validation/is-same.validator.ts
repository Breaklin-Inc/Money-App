import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export const IsSame =
  <T = Record<string, any>>(property: keyof T, options?: ValidationOptions) =>
  (object: any, propertyName: string) =>
    registerDecorator({
      options,
      name: 'IsSame',
      constraints: [property],
      target: object.constructor,
      propertyName,
      validator: {
        validate(
          value: any,
          validationArguments?: ValidationArguments,
        ): Promise<boolean> | boolean {
          const thisObject = validationArguments.object;
          const [relatedProperty] = validationArguments?.constraints || [];
          if (!relatedProperty) {
            return false;
          }
          return thisObject[relatedProperty] === value;
        },
      },
    });
