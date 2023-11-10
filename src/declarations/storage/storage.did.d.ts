import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
<<<<<<< HEAD
  'inc' : ActorMethod<[], bigint>,
=======
  'get' : ActorMethod<[string], string>,
>>>>>>> 991b28f (Add storage motoko)
  'store' : ActorMethod<[string, string], undefined>,
}
