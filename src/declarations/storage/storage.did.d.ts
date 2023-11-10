import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'register' : ActorMethod<
    [string, string, string, string, string, string],
    undefined
  >,
  'searchObjectId' : ActorMethod<[string], Array<string>>,
  'searchUserId' : ActorMethod<[string], Array<string>>,
}
