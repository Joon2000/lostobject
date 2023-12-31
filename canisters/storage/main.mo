import Buffer "mo:base/Buffer";
import Text "mo:base/Text";

actor {
  class Object(_objectId: Text, _userId : Text, _typeName : Text, _name: Text, _color: Text, _state: Text) {
    public let objectId = _objectId;
    public let userId = _userId;
    public let typeName = _typeName;
    public let name  = _name;
    public let color = _color;
    public var state = _state;

  }; 

  let storage = Buffer.Buffer<Object>(0);

  public func register(objectId: Text, userId: Text, typeName: Text, name: Text, color: Text): async () {
    let data = Object(objectId, userId, typeName, name, color, "owned");
    storage.add(data);
  };

  public func searchUserId(userId: Text): async [Text] {
    let objectList = Buffer.Buffer<Text>(0);
    for (e in storage.vals()){
      if (e.userId == userId){
        objectList.add(e.objectId);
      };
    };
    return Buffer.toArray(objectList);
  };

  
  public func searchObjectId(objectId: Text): async [Text] {
    for (e in storage.vals()){
      if (e.objectId == objectId){
        return [e.objectId, e.userId, e.typeName, e.name, e.color, e.state];

      };
    };
    return ["","","","","","",""];
  };

  public func changeStateLost(objectId: Text, userId: Text): async Bool {
    for (e in storage.vals()){
      if(e.objectId == objectId){
        if(e.userId != userId){
          return false;
        };
        e.state := "lost";
        return true
      };
    };
    return false;
  };

  
  public func changeStateFound(objectId: Text): async Bool {
    for (e in storage.vals()){
      if(e.objectId == objectId){
        e.state := "found";
        return true;
      };
    };
    return false
  };

  public func changeStateReceived(objectId: Text, userId: Text): async Bool {
    for (e in storage.vals()){
      if(e.userId != userId){
          return false;
        };
      if(e.objectId == objectId){
        e.state := "owned";
        return true;
      };
    };
    return false;
  };



};