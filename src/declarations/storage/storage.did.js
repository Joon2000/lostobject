export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'inc' : IDL.Func([], [IDL.Nat], []),
    'get' : IDL.Func([IDL.Text], [IDL.Text], []),
    'store' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'changeStateFound' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'changeStateLost' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'changeStateReceived' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'register' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'searchObjectId' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], []),
    'searchUserId' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], []),
  });
};
export const init = ({ IDL }) => { return []; };
