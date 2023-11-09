import Buffer "mo:base/Buffer";
import Text "mo:base/Text";

actor {

  class Object(_id : Text, _descrip : Text) {

  public let id = _id;
  public let descrip = _descrip;

  public func getFullName() : Text {
    firstName # " " # lastName;
  };
};

let storage = Buffer.Buffer<Object>(0);
  public query func store(id: Text, descrip: Text) {
    let data = Object(id, decript);
    myBuffer.add(data);
  };
};