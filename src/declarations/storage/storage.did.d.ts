import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'inc' : ActorMethod<[], bigint>,
  'store' : ActorMethod<[string, string], undefined>,
}
