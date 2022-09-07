export interface PostTimer {
   id: string;
   startTime: string;
}

export type Param = {
   startTime: string;
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

export const updateTime = async (
   KV: KVNamespace,
   id: string,
   param: Param
): Promise<PostTimer | undefined> => {
   if (!(param && param.startTime)) return undefined;

   // めんどいのでupdateとcreate兼用

   const newTimer: PostTimer = {
      id,
      startTime: param.startTime,
   };

   await KV.put(id, JSON.stringify(newTimer));
   return newTimer;
};
