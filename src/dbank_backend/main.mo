import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 0;
  // currentValue := 0;
  let id = 546757574357;

  stable var startTime = Time.now();
  // startTime := Time.now();
  Debug.print(debug_show(startTime));

  // Update call
  public func topUp(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  // Update call
  public func withdraw(amount : Float) {
    let tempValue: Float = currentValue - amount;
    if(tempValue < 0){
      Debug.print("There are not enough funds for that size of a withdraw");
      return; 
      };
    currentValue -= amount;
    Debug.print(debug_show(currentValue));
  };

  // Update call
  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  };

  // Query call
  public query func checkBalance() : async Float {
    return currentValue;
  };

}
