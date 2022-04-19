
async function doSomething ()  {
  return 10;
}

async function doSomethingElse(number){
  return number + 20;
}

describe("Promises test", () => {
  it("First variant,should be chain in sequence with no params pass",() => {
     const result = doSomething().then(function () {
       return doSomethingElse();
     });
    expect(result).resolves.toBe(NaN);
  })

  it("Second variant,should be executed in sequence, with no parameter passing", () => {
    const result = doSomething().then(function () {
      doSomethingElse();
    });
    expect(result).resolves.toBe(undefined)
  });

  it("Third variant, first promise resolves, second not resolves, bugs on each step, and most unexpected variant", () => {
    const result = doSomething().then(doSomethingElse());
    expect(result).resolves.toBe(10);
  })

  it("Fourth variant, optimal, chain with params, equal doSomething().then(function(res) {return doSomethingElse(res)})",() => {
    const result = doSomething().then(doSomethingElse);
    expect(result).resolves.toBe(30)
  })
})


describe("Async await variant", () => {
  it("First variant", async () => {
    const expectFun = async () => {
      const doSomethingResult = await doSomething();
      return await doSomethingElse();
    }
    expect(await expectFun()).toBe(NaN)
  })

  it("Second variant", async () => {
    const expectFun = async () => {
      const doSomethingResult = await doSomething();
      await doSomethingElse();
    }
    expect(await expectFun()).toBe(undefined)
  })

  it("Third variant",async () => {
    const expectFun = async () => {
      const doSomethingResult = doSomething();
      await doSomethingElse();
    }
    expect(await expectFun()).toBe(undefined)
  })

  it("Fourth variant", async () => {
    const expectFun = async () => {
      const doSomethingResult = await doSomething();
      return await doSomethingElse(doSomethingResult);
    }
    expect(await expectFun()).toBe(30)
  })
})
