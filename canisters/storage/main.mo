import Buffer "mo:base/Buffer";
import Text "mo:base/Text";

actor {
  class Object(_id : Text, _descrip : Text) {

    public let id = _id;
    public let descrip = _descrip;

    public func getFullName(firstName : Text, lastName : Text) : Text {
      return "" # firstName # " " # lastName # "";
    };
  }; 

  let storage = Buffer.Buffer<Object>(0);

  public func store(id: Text, descript: Text): async() {
    let data = Object(id, descript);
    storage.add(data);
  };

  var value = 0;

  public func inc() : async Nat {
    value += 1;
    return value;
  };
};