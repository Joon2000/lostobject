export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'inc' : IDL.Func([], [IDL.Nat], []),
    'store' : IDL.Func([IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
