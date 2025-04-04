import { IRefreshTokenBodyRes } from '@Breaklin-Inc/external';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenBodyResDto implements IRefreshTokenBodyRes {
  @ApiProperty()
  accessToken: string;
}
