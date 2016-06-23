/**
 * This file describes the interface that an instance manager must present
 * basic concepts: 
 *   - one unit of capacity can run one task
 *   - running means able to accept job
 *   - pending means request for instance submitted but not accepting jobs
 */

class Bid {
  constructor(managerId, bid, capacity, managerData) {
    assert(managerId);
    assert(typeof managerId === 'string');
    this.managerId = managerId;
    assert(bid);
    assert(typeof bid === 'number');
    this.bid = bid;
    assert(capacity);
    assert(typeof capacity === 'number');
    this.capacity = capacity;
    assert(managerData);
    assert(typeof managerData === 'object);
    this.managerData = managerData;
  }

  // Compute an effective per-capacity unit price
  price() {
    return this.bid / this.capacity;
  }

  // Compare this Bid to another bid to see if it's cheaper
  isCheaperThan(other) {
    return this.price() < other.price();
  }

  // We probably will also want other conditions later on
  isBetterThan(other) {
    return this.isCheaperThan(other);  
  }

  // So we can use nice names
  isWorseThan(other) {
    return !this.isBetterThan(other);
  }
}


class InstanceManager {
  // static constructor method.
  constructor(id) {
    this.id = id;
  }

  // async init routines that must be called
  async init() {

  }

  async describeState(workerType) {
    throw new Exception('describeState NOT implemented');
    return {
      running: [],
      runningCapacity: 0,
      pending: [],
      pendingCapacity: 0,
    }
  }

  /**
   * Return available bids.  It will give the return value in the form
   * {
   *   price: 1,  # This is the price we compare things with
   *   info: { # Information that goes to the provider
   *     bid: 0.2,  # This is the bid to submit to Provider
   *     region: 'us-west-2',
   *     instanceType: 'm3.xlarge',
   *   }
   * }
   */
  async listAvailableBids(workerType) {
    throw new Exception('listAvailableBids NOT implemented');
    return [
      new Bid(this.id, 0.5, 4, {}),
    ];
  }

  /**
   * Based on a bid and a rendered config 
   */
  async requestInstance(bid, config) {
    // Take bid.info and config and do stuff with it here
    throw new Exception('requestInstance NOT implemented');
    return {
      managerId: this.id,
      success: true,
      managerData: {},
    }
  }

  // Based on information
  async killInstance(instanceInfo) {

  }

  async validateInstanceConfig(config) {

  }

  async preIterationCleanup(workerTypes) {

  }

  async postIterationCleanup(workerTypes) {

  }


}
