import Buffer "mo:base/Buffer";
import Text "mo:base/Text";

actor {
  class Object(_objectId: Text, _userId : Text, _typeName : Text, _name: Text, _color: Text, _state: Text) {
    public let objectId = _objectId;
    public let userId = _userId;
    public let typeName = _typeName;
    public let name  = _name;
    public let color = _color;
    public let state = _state;

  }; 

  let storage = Buffer.Buffer<Object>(0);

  public func register(objectId: Text, userId: Text, typeName: Text, name: Text, color: Text, state: Text): async () {
    let data = Object(objectId, userId, typeName, name, color, state);
    storage.add(data);
  };

  public func searchUserId(userId: Text): async [Text] {
    let objectList = Buffer.Buffer<Text>(0);
    for (e in storage.vals()){
      if (e.userId == userId){
        objectList.add(e.objectId)
      };
    };
    return Buffer.toArray(objectList);
  };

  
  public func searchObjectId(objectId: Text): async [Text] {
    for (e in storage.vals()){
      if (e.objectId == objectId){
        return [e.userId, e.typeName, e.name, e.color, e.state]

      };
    };
    return ["","","","","",""];
  }
};