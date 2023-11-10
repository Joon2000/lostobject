import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'changeStateFound' : ActorMethod<[string], boolean>,
  'changeStateLost' : ActorMethod<[string, string], boolean>,
  'changeStateReceived' : ActorMethod<[string, string], boolean>,
  'register' : ActorMethod<[string, string, string, string, string], undefined>,
  'searchObjectId' : ActorMethod<[string], Array<string>>,
  'searchUserId' : ActorMethod<[string], Array<string>>,
}
