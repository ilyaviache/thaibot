import { Scenes, Context as BaseContext } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { Works } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Context extends BaseContext {
  update: Update.CallbackQueryUpdate;
  session: SessionData;
  scene: Scenes.SceneContextScene<Context, MySceneSession>;
  match: any;
}

interface SessionData extends Scenes.SceneSession<MySceneSession> {
  messageId: number;
  work: Works;
}

interface MySceneSession extends Scenes.SceneSessionData {
  state: {
    wallet?: string;
    amount?: string;
    prevScene?: string[];
    orderId?: number;
    walletBalance?: number;
  };
}
