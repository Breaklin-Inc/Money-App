import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { Trim } from '../transformation';

export const StringValidator = applyDecorators(
  IsNotEmpty(),
  IsString(),
  Trim(),
);
