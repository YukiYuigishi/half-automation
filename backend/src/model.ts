export interface PostTimer {
   id: string;
   startTime: string;
   timer: string;
   // 0 時限起動家電 // 1 タイマー式家電
   type: number;
}

export type TimerParam = {
   timer: string;
   // 0 時限起動家電
   // // 1 タイマー式家電
   type: number;
};

export const getTime = async (
   KV: KVNamespace,
   id: string
): Promise<PostTimer | undefined> => {
   const value = await KV.get(id);
   if (!value) return undefined;
   const post: PostTimer = JSON.parse(value);

   return post;
};

export const updateStartupTimer = async (
   KV: KVNamespace,
   id: string,
   param: TimerParam
): Promise<PostTimer | undefined> => {
   if (!(param && param.timer && param.type)) return undefined;

   switch (param.type) {
      case 0:
         break;
      case 1:
         break;
   }

   // めんどいのでupdateとcreate兼用

   const newTimer: PostTimer = {
      id,
      startTime: param.type == 0 ? param.timer : "",
      timer: param.type == 1 ? param.timer : "",
      type: param.type,
   };

   await KV.put(id, JSON.stringify(newTimer));
   return newTimer;
};
