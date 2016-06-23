class Provisioner {
  constructor(instanceManagers = []) {

    this.managers = [];

    mgrs.forEach(x => {
      this.registerManager(x);
    });
  }

  async init() {

  }

  registerManager(instanceManger) {
    assert(instanceManager);
    assert(typeof instanceManager === 'string');
    this.manager.push(instanceManager);
  }

  async start() {

  }

  async stop() {

  }

  // Return a list of worker type name strings
  async loadWorkerTypes() {
    // Here we load a list of objects which are the worker types.  make it a list of objects
    // so we can use map and filter nicely
  }

  // Run an iteration of the provisioner loop
  async runIteration() {
    let workerTypes = this.loadWorkerTypes();

    await Promise.all(this.managers.map(manager => {
      return manager.preIterationCleanup(workerTypes);
    }));

    let requests = await Promise.all(workerTypes.map(this.determineRequests));

    let submissions = await Promise.all(requests.map(this.submitRequests));

    await Promise.all(this.managers.map(manager => {
      return manager.postIterationCleanup(workerTypes);
    }));
  }

  // Given a need, determine the requests that we want to create
  async determineRequests(workerType) {
    // Here we should create two lists of things:
    // one list of {bid} things which we'll create
    // one list of {managerInfo} of things we'll delete
    return {
      workerType: workerType,
      creation: [], // a list of Bid objects
      deletion: [], // a list of ManagerData objects to delete
    };
  }

  // Submit the return values of determineRequests to 
  async submitRequests(requests) {
    return Promise.all(
      Promise.all(requests.creation.map(x => {
        return this.requestCreation(requests.workerType, x);
      })),
      Promise.all(requests.deletion.map(x => {
        return this.requestDeletion(requests.workerType, x);
      })),
    );
  }
  
  async requestCreation(workerType, requests) {

  }

  async requestDeletion(workerType, requests) {

  }
}
