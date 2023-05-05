import { Otp } from '@prisma/client';

export class OtpEntity implements Otp {
  id: string;
  createdAt: Date;

  expiresAt: Date;
  hashedCode: string;
  userId: string;

  constructor(partial: Partial<OtpEntity>) {
    Object.assign(this, partial);
  }
}
