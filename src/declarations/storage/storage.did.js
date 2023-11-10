export const idlFactory = ({ IDL }) => {
  return IDL.Service({
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
