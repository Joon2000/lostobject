actor {
    stable var currentValue: Nat = 0;

    public func increment(): async () {
        currentValue += 1;
    };

    public query func getValue(): async Nat {
        currentValue;
    };

    public shared (msg) func whoami() : async Principal {
        msg.caller
    };
};
